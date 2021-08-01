

export default async () => {

    const question = {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        default: 'my-app'
    }

    return question
}