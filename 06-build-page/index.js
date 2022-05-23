import * as fs from 'fs';
import * as path from 'path';
import mergeStyles from '../05-merge-styles/index.js'
import copyDir from '../04-copy-directory/index.js'

async function processTemplate(template, target, componentsDir) {
    fs.readFile(template, 'utf-8', (err, data) => {
        if (err) throw err;

        const regexp = "[^{\}]+(?=})"
        const components = {}

        const promises = []

        let matches = data.matchAll(regexp);
        for (const match of matches) {
            promises.push(new Promise((resolve, reject) => {
                fs.readFile(path.join(componentsDir, `${match[0]}.html`), 'utf-8', (err, fileContent) => {
                    if (err) reject()
                    components[match[0]] = fileContent
                    resolve()
                })
            }))
        }

        Promise.all(promises).then(v => {
            Object.keys(components).forEach((key) => {
                data = data.replace(`{{${key}}}`, components[key])
            });

            fs.writeFile(target, data, (err, data) => {
                if (err) throw err;
            })
        })

    })
}

async function buildHtml(sourceDir, targetDir) {
    fs.mkdir(targetDir, { recursive: true }, (err) => {
        if (err) throw err;
        processTemplate(path.join(sourceDir, 'template.html'), path.join(targetDir, 'index.html'), path.join(sourceDir, 'components'))
        mergeStyles(path.join(sourceDir, 'styles'), path.join(targetDir, 'style.css'))
        copyDir(path.join(sourceDir, 'assets'), path.join(targetDir, 'assets'))
    })
}

buildHtml('./06-build-page', './06-build-page/project-dist')


