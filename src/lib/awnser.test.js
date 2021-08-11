import { answers } from './awnser'
import fs from 'fs'
import path from 'path'

jest.setTimeout(60*5*1000) //setting timeput for 5 min

const Clean = () => {
    const downloadPath = path.join(process.cwd(), `my-app-test`)
    if(fs.existsSync(downloadPath)) {
        fs.rmdirSync(downloadPath, { recursive: true, force: true })
    }
}

describe('awnser tests', () => {
    it('check answers()', async () => {
        Clean()
        const obj = await answers({
            projectName: 'my-app-test',
            templateName: 'babel-webpack-javascript',
            authorName: 'martuuamengual',
            license: 'MIT',
            repoName: 'martuuamengual/my-app-test',
            packageManager: 'npm',
            initializeGit: true
        })
        expect(obj.status).toBe('ok')
    })
})