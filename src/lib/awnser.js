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
        //console.log(chalk.red.bold`X`, chalk.red`Check directory ${downloadPath} the folder alredy exsits.`)
        //return

        // ELIMINAR ESTO!
        fs.rmdirSync(downloadPath, { recursive: true, force: true })
    }

    const promiseDownload = new Promise((resolve, reject) => {
        download(`direct:https://github.com/martuuamengual/${templateName}.git`, downloadPath, { clone: true }, function(err) {
            if(err) reject(err)
            resolve()
        })
    })

    //await loading(`Copying template ${templateName}`, promiseDownload)
    ora.promise(promiseDownload, `Copying template ${templateName}`)
    await promiseDownload
    readFilesAndPrint(downloadPath)
    console.log()
    console.log()

    const rootP = execa(packageManager, ['install'], { cwd: downloadPath }).catch(err => console.log(err))
    ora.promise(rootP, `Running ${chalk.green`${packageManager} install`} in root app directory`)
    await rootP
    console.log()

    if (initializeGit) {

        const gitP = initGitRepo(downloadPath)
        ora.promise(gitP, `Initializing git repo in root app directory`)
        await gitP
    }
}