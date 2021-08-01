
import getGitConfigPath from 'git-config-path'
import githubUsername from 'github-username'
import parseGitConfig from 'parse-git-config'


class Git {

    static async getAuthor() {
        const gitConfigPath = getGitConfigPath('global')
        let author = 'unnamed'

        if (gitConfigPath) {
            const gitConfig = parseGitConfig.sync({ path: gitConfigPath })

            if (gitConfig.github && gitConfig.github.user) {
                author = gitConfig.github.user
            } else if (gitConfig.user && gitConfig.user.email) {
                author = await githubUsername(gitConfig.user.email)
            }
        }

        return author
    }
}



export default Git