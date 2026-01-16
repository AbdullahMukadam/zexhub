import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateReadme } from '../template/builder';

export const createZipFile = async (files, userData, templateType = 'html') => {
  const zip = new JSZip();
  
  // Add all template files
  files.forEach(file => {
    zip.file(file.path, file.content);
  });
  
  // Generate README for HTML template
  const readme = generateReadme({ name: 'HTML Template', type: 'html' }, userData);
  zip.file('README.md', readme);
  
  // Generate zip
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
};

export const downloadZip = async (files, userData, filename, templateType = 'html') => {
  try {
    const zipBlob = await createZipFile(files, userData, templateType);
    const zipFilename = filename || `${userData.name?.replace(/\s+/g, '-') || 'website'}.zip`;
    saveAs(zipBlob, zipFilename);
    return { success: true, filename: zipFilename };
  } catch (error) {
    console.error('Error creating zip file:', error);
    throw error;
  }
};
