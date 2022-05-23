import * as fs from 'fs';

function readFile(filePath,callback){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        callback(data);
      });
}

readFile('./01-read-file/text.txt',(data)=>console.log(data));

export default readFile