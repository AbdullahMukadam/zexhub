import { GITHUB_CONFIG } from "@/config/github.config";


export const initiateGitHubOAuth = async () => {
  try {
    // Get the auth URL from the backend
    const response = await fetch(`${GITHUB_CONFIG.tokenUrl}/url`);
    if (!response.ok) {
      throw new Error('Failed to get auth URL');
    }
    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    // Fallback if backend fails (though ideally we shouldn't have client_id here)
    alert("Failed to connect to authentication server");
  }
};


export const handleOAuthCallback = async (code) => {
  try {
    const response = await fetch(`${GITHUB_CONFIG.tokenUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error("Failed to obtain access token");
    }
  } catch (error) {
    console.error("OAuth callback error:", error);
    throw error;
  }
};


export const logout = () => {
  sessionStorage.removeItem('github_token');
  sessionStorage.removeItem('github_user');
};
