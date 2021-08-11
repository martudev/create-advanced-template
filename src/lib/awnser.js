import download from 'download-git-repo'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import execa from 'execa'
import ora from 'ora'
import pEachSeries from 'p-each-series'
import pkg from '../../package.json'
import { getTemplate } from './config'
import axios from 'axios'



export const readFilesAndPrint = (path) => {
    const files = fs.readdirSync(path)

    files.forEach(function (file) {
        console.log(file);
    })

    return files

}

export const initGitRepo = async (dest) => {
    const commands = [
        {
            cmd: 'git',
            args: ['init'],
            cwd: dest
        },
        {
            cmd: 'git',
            args: ['add', '.'],
            cwd: dest
        },
        {
            cmd: 'git',
            args: ['commit', '-m', `init app created by ${pkg.name}@${pkg.version}`],
            cwd: dest
        }
    ]

    return pEachSeries(commands, async ({ cmd, args, cwd }) => {
        return execa(cmd, args, { cwd })
    })
}

const getTemplateFullUrl = (templateName) => {
    const template = getTemplate()
    return (template.isValid ? `direct:${template.url}` : `direct:https://github.com/react-templating/${templateName}.git#master`)
}


export const answers = async answers => {
    
    const { projectName, templateName, authorName, license, repoName, packageManager, initializeGit } = answers

    const downloadPath = path.join(process.cwd(), `${projectName}`)

    if(fs.existsSync(downloadPath)) {
        console.log(chalk.red.bold`X`, chalk.red`Check directory ${downloadPath} the folder alredy exsits.`)
        return
    }

    const promiseDownload = new Promise((resolve, reject) => {
        const templateUrl = getTemplateFullUrl(templateName)
        axios.get(templateUrl.replace('.git', '').replace('direct:', ''))
        .then(response => {
            download(templateUrl, downloadPath, { clone: true }, function(err) {
                if(err) reject(`An error ocurs when cloning github repo \n ${err}`)
                resolve('Done')
            })
        }).catch(data => {
            reject(`The repository ${templateUrl.replace('direct:', '')} response with status ${chalk.bgRed`${data.response.statusText}`}`)
        })
    })

    // Copying template..
    const template = getTemplate()
    ora.promise(promiseDownload, `Copying template ${template.isValid ? template.name : templateName}`)
    const done = await promiseDownload.catch(err => console.log(err))
    if (!done) return
    readFilesAndPrint(downloadPath)
    console.log()
    console.log()

    // Running npm install..
    if (packageManager != 'none') {
        const rootP = execa(packageManager, ['install'], { cwd: downloadPath }).catch(err => console.log(err))
        ora.promise(rootP, `Running ${chalk.green`${packageManager} install`} in root app directory. It will take a few minutes`)
        await rootP
        console.log()
    }


    const pathToPackage = path.join(downloadPath, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(pathToPackage, 'utf-8'))
    packageJson['name'] = projectName
    packageJson['homepage'] = `https://github.com/${repoName}#readme`
    packageJson['license'] = license
    packageJson['author'] = authorName
    const packageToWriteData = JSON.stringify(packageJson, null, 2)
    fs.writeFileSync(pathToPackage, packageToWriteData)


    if (initializeGit) {
        // Initializing git repo..
        const gitP = initGitRepo(downloadPath)
        ora.promise(gitP, `Initializing git repo in root app directory`)
        await gitP
    }

    console.log(`Template configuration ${chalk.green`done`} 🐺 Auuuuu`)

    return {
        status: 'ok'
    }
}