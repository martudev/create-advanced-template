import inquirer from 'inquirer'
import getQuestions from './questions.js'
import { answers } from './awnser'
import { setTemplate } from './config'


module.exports = async () => {
    
    setTemplate()
    
    const questions = await getQuestions()

    inquirer.prompt(questions).then(answers)


}

module.exports().catch((err) => {
    console.error(err)
    process.exit(1)
})