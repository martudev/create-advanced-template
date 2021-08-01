

export default async () => {
    
    const question = {
        type: 'list',
        name: 'templateName',
        message: "Select an template",
        choices: [
            {
                key: '1',
                name: 'React + Webpack + Babel (JS)',
                value: 'template-react-babel-webpack'
            }
        ]
    }
    
    return question
}