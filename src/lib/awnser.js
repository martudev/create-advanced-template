import download from 'download-git-repo'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import execa from 'execa'
import ora from 'ora'
import pEachSeries from 'p-each-series'
import pkg from '../../package.json'



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


export const answers = async answers => {
    
    const { projectName, templateName, authorName, license, repoName, packageManager, initializeGit } = answers

    const downloadPath = path.join(process.cwd(), `${projectName}`)

    if(fs.existsSync(downloadPath)) {
        console.log(chalk.red.bold`X`, chalk.red`Check directory ${downloadPath} the folder alredy exsits.`)
        return
    }

    const promiseDownload = new Promise((resolve, reject) => {
        download(`direct:https://github.com/martuuamengual/${templateName}.git`, downloadPath, { clone: true }, function(err) {
            if(err) reject(err)
            resolve()
        })
    })

    // Copying template..
    ora.promise(promiseDownload, `Copying template ${templateName}`)
    await promiseDownload
    readFilesAndPrint(downloadPath)
    console.log()
    console.log()

    // Running npm install..
    const rootP = execa(packageManager, ['install'], { cwd: downloadPath }).catch(err => console.log(err))
    ora.promise(rootP, `Running ${chalk.green`${packageManager} install`} in root app directory. It will take a few minutes`)
    await rootP
    console.log()

    const pathToPackage = path.join(downloadPath, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(pathToPackage, 'utf-8'))
    packageJson['name'] = projectName
    packageJson['homepage'] = `https://github.com/${authorName}/${projectName}#readme`
    packageJson['license'] = license
    const packageToWriteData = JSON.stringify(packageJson, null, 2)
    fs.writeFileSync(pathToPackage, packageToWriteData)

    if (initializeGit) {
        // Initializing git repo..
        const gitP = initGitRepo(downloadPath)
        ora.promise(gitP, `Initializing git repo in root app directory`)
        await gitP
    }
}