

export default async () => {
    
    const question = {
        type: 'confirm',
        name: 'initializeGit',
        message: "Initialize Git",
        default: true
    }
    
    return question
}