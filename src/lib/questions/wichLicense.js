

module.exports = async () => {
    
    const question = {
        type: 'input',
        name: 'license',
        message: "License",
        default: "MIT"
    }
    
    return question
}