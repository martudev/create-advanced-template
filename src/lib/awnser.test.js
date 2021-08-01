import { answers } from './awnser'

jest.setTimeout(60*5*1000) //setting timeput for 5 min

describe('awnser tests', () => {
    it('check answers()', async () => {
        await answers({
            projectName: 'my-app-test',
            templateName: 'template-react-babel-webpack',
            authorName: 'martuuamengual',
            license: 'MIT',
            repoName: 'martuuamengual/my-app-test',
            packageManager: 'npm',
            initializeGit: true
        })
    })
})