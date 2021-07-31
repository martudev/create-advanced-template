
const git = require('../Git')


module.exports = async () => {
    
    const question = {
        type: 'input',
        name: 'authorName',
        message: "Author's GitHub",
        default: await git.getAuthor()
    }
    
    return question
}