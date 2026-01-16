import { Octokit } from '@octokit/rest';
import { GITHUB_CONFIG } from '../../config/github.config';

class GitHubAPI {
  constructor() {
    this.octokit = null;
    this.token = this.loadToken();
    if (this.token) {
      this.initializeOctokit(this.token);
    }
  }

  initializeOctokit(token) {
    this.octokit = new Octokit({
      auth: token,
      baseUrl: GITHUB_CONFIG.apiUrl
    });
  }

  loadToken() {
    return sessionStorage.getItem('github_token');
  }

  saveToken(token) {
    sessionStorage.setItem('github_token', token);
    this.token = token;
    this.initializeOctokit(token);
  }

  clearToken() {
    sessionStorage.removeItem('github_token');
    this.token = null;
    this.octokit = null;
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Get authenticated user info
  async getUser() {
    if (!this.octokit) throw new Error('Not authenticated');
    try {
      const { data } = await this.octokit.users.getAuthenticated();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Get repository content
  async getRepoContent(owner, repo, path = '', ref = 'main') {
    try {
      const octokit = this.octokit || new Octokit();
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref
      });
      return data;
    } catch (error) {
      console.error('Error fetching repo content:', error);
      throw error;
    }
  }

  // Get file content from repository
  async getFileContent(owner, repo, path, ref = 'main') {
    try {
      const content = await this.getRepoContent(owner, repo, path, ref);
      if (content.type === 'file') {
        const decoded = atob(content.content);
        return decoded;
      }
      throw new Error('Path is not a file');
    } catch (error) {
      console.error('Error fetching file content:', error);
      throw error;
    }
  }

  // Get repository tree (all files)
  async getRepoTree(owner, repo, ref = 'main') {
    try {
      const octokit = this.octokit || new Octokit();
      const { data } = await octokit.git.getTree({
        owner,
        repo,
        tree_sha: ref,
        recursive: true
      });
      return data.tree;
    } catch (error) {
      console.error('Error fetching repo tree:', error);
      throw error;
    }
  }

  // Create a new repository
  async createRepo(name, description = '', isPrivate = false) {
    if (!this.octokit) throw new Error('Not authenticated');
    try {
      const { data } = await this.octokit.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
        auto_init: true
      });
      return data;
    } catch (error) {
      console.error('Error creating repository:', error);
      throw error;
    }
  }

  // Upload file to repository
  async uploadFile(owner, repo, path, content, message = 'Add file') {
    if (!this.octokit) throw new Error('Not authenticated');
    try {
      const encodedContent = btoa(unescape(encodeURIComponent(content)));
      
      // Check if file exists
      let sha;
      try {
        const { data: existingFile } = await this.octokit.repos.getContent({
          owner,
          repo,
          path
        });
        sha = existingFile.sha;
      } catch (error) {
        // File doesn't exist, that's fine
      }

      const { data } = await this.octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: encodedContent,
        sha
      });
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Upload multiple files to repository
  async uploadMultipleFiles(owner, repo, files, message = 'Add files') {
    if (!this.octokit) throw new Error('Not authenticated');
    
    try {
      const results = [];
      for (const file of files) {
        const result = await this.uploadFile(
          owner,
          repo,
          file.path,
          file.content,
          message
        );
        results.push(result);
      }
      return results;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  // Get user's repositories
  async getUserRepositories() {
    if (!this.octokit) throw new Error('Not authenticated');
    try {
      const { data } = await this.octokit.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 100
      });
      return data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }
}

export default new GitHubAPI();
