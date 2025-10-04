const fs = require('fs');
const path = require('path');

// Function to process @@include() directives
function processIncludes(content, baseDir = '.') {
  return content.replace(/@@include\('([^']+)'\)/g, (match, includePath) => {
    try {
      // Check if the path starts with 'partials/' or if it's a direct file
      let fullPath;
      if (includePath.startsWith('partials/')) {
        fullPath = path.join(baseDir, includePath);
      } else {
        fullPath = path.join(baseDir, 'partials', includePath);
      }
      
      const includeContent = fs.readFileSync(fullPath, 'utf8');
      return processIncludes(includeContent, path.dirname(fullPath));
    } catch (error) {
      console.error(`Error including file ${includePath}:`, error.message);
      return match; // Return original if file not found
    }
  });
}

// Function to process all HTML files
function processHtmlFiles() {
  const htmlFiles = [
    'index.html',
    'about.html',
    'service.html',
    'doctor.html',
    'department.html',
    'contact.html',
    'blog-sidebar.html',
    'blog-single.html',
    'department-single.html',
    'doctor-single.html',
    'appoinment.html',
    'confirmation.html'
  ];

  // Create a 'dist' directory for processed files
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`Processing ${file}...`);
      const content = fs.readFileSync(file, 'utf8');
      const processedContent = processIncludes(content);
      
      // Write processed content to dist directory, preserving original
      fs.writeFileSync(`dist/${file}`, processedContent);
      console.log(`✓ Processed ${file} -> dist/${file}`);
    }
  });

  // Copy other necessary files to dist
  const filesToCopy = ['images', 'js', 'plugins', 'css'];
  filesToCopy.forEach(item => {
    if (fs.existsSync(item)) {
      const destPath = `dist/${item}`;
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true });
      }
      fs.cpSync(item, destPath, { recursive: true });
      console.log(`✓ Copied ${item} -> dist/${item}`);
    }
  });
}

// Run the processing
processHtmlFiles();
console.log('Template processing complete!');
