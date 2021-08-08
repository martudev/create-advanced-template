

import Conf from 'conf'

const TEMPLATE_KEY = 'template_name'
const TEMPLATE_URL_KEY = 'template_url'

export const config = new Conf()

export const setTemplate = () => {
    config.delete(TEMPLATE_URL_KEY)
    config.delete(TEMPLATE_KEY)
    const template = process.argv[2]
    if (template) {
        if (template.includes('https://')) {
            config.set(TEMPLATE_URL_KEY, template)
        } else {
            config.set(TEMPLATE_KEY, template)
        }
    }
}

export const getTemplate = () => {
    const tempalteUrlFromConf = config.get(TEMPLATE_URL_KEY)
    const tempalteFromConf = config.get(TEMPLATE_KEY)

    const isUrl = (tempalteUrlFromConf ? true : false)
    
    let nameFromUrl = null
    if (isUrl) {
        const httpsArray = tempalteUrlFromConf.replace('.git', '').split('/')
        nameFromUrl = httpsArray[httpsArray.length-1]
    }
    const name = (!isUrl ? tempalteFromConf : nameFromUrl)
    const url = (isUrl ? tempalteUrlFromConf : `https://github.com/react-templating/${name}.git`)
    const isValid = (tempalteUrlFromConf || tempalteFromConf ? true : false)

    return {
        isUrl: isUrl,
        isValid: isValid,
        name: name,
        url: url
    }
}