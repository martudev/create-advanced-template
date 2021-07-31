

module.exports = async () => {

    const question = {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: 'my-app'
    }

    return question
}