

module.exports = async () => {
    
    const question = {
        type: 'list',
        name: 'packageManager',
        message: "Package Manager",
        choices: [
            {
                key: '1',
                name: 'NPM',
                value: 'npm',
            },
            {
                key: '2',
                name: 'YARN',
                value: 'yarn',
            }
        ]
    }
    
    return question
}