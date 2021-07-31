
const getProjectName = require('./questions/projectName')
const getWichTemplate = require('./questions/wichTemplate')
const getWichAuthor = require('./questions/wichAuthor')
const getWichRepo = require('./questions/wichRepo')
const getWichLicense = require('./questions/wichLicense')
const getWichPackageManager = require('./questions/wichPackageManager')
const getInitializeGitRepo = require('./questions/initializeGitRepo')

module.exports = async () => {
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