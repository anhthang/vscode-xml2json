'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
const { parseString } = require('xml2js')
const cp = require('copy-paste')

function upsert(editor: vscode.TextEditorEdit, selection: vscode.Selection, data: string) {
    if (selection.start === selection.end) {
        editor.insert(selection.active, data)
    } else {
        editor.replace(selection, data)
    }
}

function converter(builder) {
    const activeEditor = vscode.window.activeTextEditor
    if (activeEditor && activeEditor.selection && activeEditor.selection.active) {
        activeEditor.edit((editor) => {
            const data = cp.paste() || activeEditor.document.getText()
            const cb = (err, result) => {
                if (err) {
                    vscode.window.showErrorMessage('Invalid XML???')
                } else {
                    upsert(editor, activeEditor.selection, JSON.stringify(result, null, 2))
                }
            }

            switch (builder) {
                case 'xml2js':
                    parseString(data, cb)
                    break
                case 'xmlbuilder':
                    const opts = {
                        attrkey: '@',
                        charkey: '#text',
                        explicitArray: false,
                        mergeAttrs: true,
                        attrNameProcessors: [(str) => `@${str}`]
                    }
                    parseString(data, opts, cb)
                    break
            }
            vscode.window.showInformationMessage('Converted!')
        })
    }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "xml2json" is now active!')

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const commands = [
        vscode.commands.registerCommand('xml2json.xml2js', () => converter('xml2js')),
        vscode.commands.registerCommand('xml2json.xmlbuilder', () => converter('xmlbuilder'))
    ]

    context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {
}