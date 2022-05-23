import * as fs from 'fs';
import * as readline from 'readline';

let toWrite = 'Жили у бабуси два веселых гуся'

function appendLineToFile(filePath, text) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (data) data = data + "\n" + text
        else data = text
        fs.writeFile(filePath, data, (err, data) => {
            if (err) throw err;
        });
    })
}

console.log('Enter text:')
let rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('> ');
rl.prompt();
rl.on('line', (line) => {
    if (line === "exit") rl.close();
    appendLineToFile('./02-write-file/text.txt', line);
    rl.prompt();
}).on('close', () => {
    process.exit(0);
});

export default appendLineToFile