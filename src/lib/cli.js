
const inquirer = require('inquirer');
const getQuestions = require('./questions.js')
const awnser = require('./awnser')


module.exports = async () => {
    
    const questions = await getQuestions()

    inquirer.prompt(questions).then(awnser)

}

module.exports().catch((err) => {
    console.error(err)
    process.exit(1)
})