
import getProjectName from './questions/projectName'
import getWichTemplate from './questions/wichTemplate'
import getWichAuthor from './questions/wichAuthor'
import getWichRepo from './questions/wichRepo'
import getWichLicense from './questions/wichLicense'
import getWichPackageManager from './questions/wichPackageManager'
import getInitializeGitRepo from './questions/initializeGitRepo'
import { getTemplate } from './config'

export default async () => {
    const arr = [
        await getProjectName(),
        await getWichAuthor(),
        await getWichRepo(),
        await getWichLicense(),
        await getWichPackageManager(),
        await getInitializeGitRepo(),
    ]

    const template = getTemplate()
    if (!template.isValid) arr.splice(1, 0, await getWichTemplate())

    return arr
}