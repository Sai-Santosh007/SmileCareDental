// Test script to verify Tailwind CSS configuration

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Tailwind CSS configuration...');

// Check if tailwind.config.js exists and has proper structure
const configPath = path.join(__dirname, 'tailwind.config.js');
if (fs.existsSync(configPath)) {
  console.log('✅ tailwind.config.js exists');
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  if (configContent.includes('DEFAULT') && configContent.includes('teal')) {
    console.log('✅ Custom colors have DEFAULT values');
  } else {
    console.log('❌ Custom colors missing DEFAULT values');
  }
} else {
  console.log('❌ tailwind.config.js missing');
}

// Check if index.css has valid CSS
const cssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(cssPath)) {
  console.log('✅ index.css exists');
  
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  if (!cssContent.includes('@apply bg-teal')) {
    console.log('✅ No invalid @apply directives found');
  } else {
    console.log('❌ Invalid @apply directives still present');
  }
} else {
  console.log('❌ index.css missing');
}

console.log('🎯 Build test complete');
