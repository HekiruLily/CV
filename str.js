const fs = require('fs');
const path = require('path');

function listProjectStructure(dir, level = 0, parent = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        if (item === 'node_modules' || item === '.git' || item === 'build' || item.startsWith('.')) continue;
        
        const fullPath = path.join(dir, item);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        
        // Bỏ qua file trong các folder cụ thể
        if (parent === 'i18n' || parent === 'docs' || parent === 'language' || parent === 'lang' || parent === 'H5P.InteractiveVideo-1.26' || parent === 'css' || parent === 'images' || parent === 'js' || parent === 'lib' || parent === 'node_modules' || parent === 'templates' || parent === 'views' || parent === 'FontAwesome-4.5' || parent === 'media') continue;
        
        console.log('  '.repeat(level) + (isDirectory ? '📁 ' : '📄 ') + item);
        
        if (isDirectory) {
            listProjectStructure(fullPath, level + 1, item);
        }
    }
}

listProjectStructure('.');
