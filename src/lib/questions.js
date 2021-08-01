
import getProjectName from './questions/projectName'
import getWichTemplate from './questions/wichTemplate'
import getWichAuthor from './questions/wichAuthor'
import getWichRepo from './questions/wichRepo'
import getWichLicense from './questions/wichLicense'
import getWichPackageManager from './questions/wichPackageManager'
import getInitializeGitRepo from './questions/initializeGitRepo'

export default async () => {
    return [
        await getProjectName(),
        await getWichTemplate(),
        await getWichAuthor(),
        await getWichRepo(),
        await getWichLicense(),
        await getWichPackageManager(),
        await getInitializeGitRepo(),
    ]
}