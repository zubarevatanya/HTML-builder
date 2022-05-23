import * as fs from 'fs';
import * as path from 'path';


const copyDir = (sourceDir, targetDir) => {
    fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
        files.forEach((f) => {
            if (f.isDirectory()) {
                copyDir(path.join(sourceDir, f.name), path.join(targetDir, f.name))
            }
            else {
                fs.mkdir(targetDir, { recursive: true }, (err) => {
                    if (err) throw err;
                    fs.copyFile(path.join(sourceDir, f.name), path.join(targetDir, f.name),(err) => {
                        if (err) throw err;
                    })
                });
            }
        })
    })
}

copyDir("./04-copy-directory/files", "./04-copy-directory/copy-files")
