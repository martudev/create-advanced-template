

export default async () => {
    
    const question = {
        type: 'list',
        name: 'packageManager',
        message: "Package Manager",
        choices: [
            {
                key: '1',
                name: 'npm',
                value: 'npm',
            },
            {
                key: '2',
                name: 'yarn',
                value: 'yarn',
            },
            {
                key: '3',
                name: 'none',
                value: 'none',
            }
        ]
    }
    
    return question
}