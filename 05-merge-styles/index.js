import * as fs from 'fs';
import * as path from 'path';

function mergeStyles(stylesDir, target) {
    fs.writeFile(target, "", (err, data) => {
        if (err) throw err;
        fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
            files.filter(f => f.isFile())
                .filter(f => path.extname(f.name).toLowerCase() === '.css')
                .forEach(f => {
                    fs.readFile(path.join(stylesDir, f.name), 'utf8', (err, data) => {
                        if (err) throw err;
                        fs.appendFile(target, data, (err) => {
                            if (err) throw err;
                        })
                    });
                })
        })
    });
}

mergeStyles('./05-merge-styles/styles','./05-merge-styles/project-dist/bundle.css')