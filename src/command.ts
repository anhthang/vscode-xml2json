import * as vscode from 'vscode'
import { Document } from './document'
import { Config } from './config'
const { parseString } = require('xml2js')
const clipboardy = require('clipboardy')
const unescape = require('lodash.unescape')

const DOCUMENT_ERROR = 'Selection or document is invalid XML???'
const CLIPBOARD_ERROR = 'Clipboard is invalid XML???'

export class Command {

    static convertDocument(): void {
        const activeEditor = vscode.window.activeTextEditor
        if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
            activeEditor.edit(editor => {
                const select = activeEditor.document.getText(activeEditor.selection)
                let input = select || activeEditor.document.getText()
                const callback = (err, result) => {
                    if (err || !result) {
                        vscode.window.showErrorMessage(DOCUMENT_ERROR)
                    } else {
                        const output = JSON.stringify(result, null, 2)
                        if (select) {
                            Document.replaceSelection(editor, activeEditor.selection, output)
                        } else {
                            Document.replaceDocument(editor, activeEditor.document, output)
                        }
                    }
                }
    
                this._parser(input, callback)
            })
        }
    }

    static convertClipboard(): void {
        const activeEditor = vscode.window.activeTextEditor
        if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
            activeEditor.edit(editor => {
                const select = activeEditor.document.getText(activeEditor.selection)

                let input = clipboardy.readSync()
                const callback = (err, result) => {
                    if (err || !result) {
                        vscode.window.showErrorMessage(CLIPBOARD_ERROR)
                    } else {
                        const output = JSON.stringify(result, null, 2)
                        if (select) {
                            Document.replaceSelection(editor, activeEditor.selection, output)
                        } else {
                            Document.insert(editor, activeEditor.selection, output)
                        }
                    }
                }
    
                this._parser(input, callback)
            })
        }
    }

    static _parser(input, callback): void {
        const builder = Config.preferStyle
        input = unescape(input)

        switch (builder) {
            case 'xml2js':
                parseString(input, callback)
                break
            case 'xmlbuilder':
            case 'custom':
                const opts = Config[builder]
                parseString(input, opts, callback)
                break
        }
    }
}
