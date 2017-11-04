import * as vscode from 'vscode'
import { Document } from './document'
const { parseString } = require('xml2js')
const cp = require('copy-paste')

const DOCUMENT_ERROR = 'Selection or document is invalid XML???'
const CLIPBOARD_ERROR = 'Clipboard is invalid XML???'

export class Command {

    static convertDocument(builder): void {
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
    
                this._parser(builder, input, callback)
            })
        }
    }

    static convertClipboard(builder): void {
        const activeEditor = vscode.window.activeTextEditor
        if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
            activeEditor.edit(editor => {
                const select = activeEditor.document.getText(activeEditor.selection)
                let input = cp.paste()
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
    
                this._parser(builder, input, callback)
            })
        }
    }

    static _parser(builder, input, callback): void {
        switch (builder) {
            case 'xml2js':
                parseString(input, callback)
                break
            case 'xmlbuilder':
                const opts = {
                    charkey: '#text',
                    explicitArray: false,
                    mergeAttrs: true,
                    attrNameProcessors: [str => `@${str}`]
                }
                parseString(input, opts, callback)
                break
        }
    }
}
