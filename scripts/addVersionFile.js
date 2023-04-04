const path = require('path');
const fs = require('fs');

try {
    const distDir = path.resolve(__dirname, '../build');
    const packageVersion = process.env.npm_package_version

    console.log('package version:', packageVersion)
    
    fs.writeFile(path.resolve(distDir, 'version.json'), `{"version": "${packageVersion}"}`, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('file with version information created');
    })
} catch (e) {
    console.error(e.message)
}
