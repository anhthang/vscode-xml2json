import * as vscode from 'vscode'

const options = [
    'attrkey',
    'charkey',
    'explicitCharkey',
    'trim',
    'normalizeTags',
    'normalize',
    'explicitRoot',
    'emptyTag',
    'explicitArray',
    'ignoreAttrs',
    'mergeAttrs',
    'validator',
    'xmlns',
    'explicitChildren',
    'childkey',
    'preserveChildrenOrder',
    'charsAsChildren',
    'includeWhiteChars',
    'async',
    'strict',
    'attrNameProcessors',
    'attrValueProcessors',
    'tagNameProcessors',
    'valueProcessors'
]

class ConfigReader {
    // private _readConfig<T>(key: string): T {
    //     return vscode.workspace.getConfiguration('xml2json').get<T>(key)
    // }

    get defaultSettings(): string {
        return vscode.workspace.getConfiguration('xml2json').get('defaultSettings')
    }

    get custom(): object {
        const config = {}
        const customConfig = vscode.workspace.getConfiguration('xml2json.options')
        options.forEach(key => {
            const val = customConfig.get(key)
            if (typeof val !== 'undefined') {
                config[key] = val
            }
        })
        return config
    }

    get xmlbuilder(): object {
        return {
            charkey: '#text',
            explicitArray: false,
            mergeAttrs: true,
            attrNameProcessors: [str => `@${str}`]
        }
    }
}

export const Config = new ConfigReader()
