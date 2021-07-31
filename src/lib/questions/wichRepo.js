

module.exports = async () => {
    
    const question = {
        type: 'input',
        name: 'repoName',
        message: "Git Repo Path",
        default: (data) => `${data.authorName}/${data.projectName}`
    }
    
    return question
}