import * as fs from 'fs';
import * as path from 'path';


function readdir(dirpath) {
    fs.readdir(dirpath, { withFileTypes: true }, (err, files) => {
        files.filter(f => f.isFile())
            .map(f => f.name)
            .forEach(file => {
                let ext = path.extname(file)
                let name = path.basename(file, ext)
                ext = ext.substring(1)
                fs.stat(path.join(dirpath, file), (err, stat) => {
                    let size = stat.size
                    let fileInfo = `${name} - ${ext} - ${size}kb`
                    console.log(fileInfo)
                })
            })
    })
}

readdir('./03-files-in-folder/secret-folder')