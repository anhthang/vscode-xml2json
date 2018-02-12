'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { Command } from './command'

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
        vscode.commands.registerCommand('xml2json.xml2js', () => Command.convertDocument('xml2js')),
        vscode.commands.registerCommand('xml2json.xmlbuilder', () => Command.convertDocument('xmlbuilder')),
        vscode.commands.registerCommand('xml2json.clipboard', () => {
            return vscode.window.showQuickPick([
                <vscode.QuickPickItem>{
                    label: 'xml2js',
                    detail: 'convert to xml2js format'
                },
                <vscode.QuickPickItem>{
                    label: 'xmlbuilder',
                    detail: 'convert to xmlbuilder format'
                }
            ]).then((choice) => {
                if (choice && choice.label) {
                    return Command.convertClipboard(choice.label)
                }
            })
        })
    ]

    context.subscriptions.push(...commands)
}

// this method is called when your extension is deactivated
export function deactivate() {
}