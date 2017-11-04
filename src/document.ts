import * as vscode from 'vscode'

const SUCCESSFUL = 'Converted successful!'

export class Document {
    static replaceSelection(editor: vscode.TextEditorEdit, selection: vscode.Selection, data: string): void {
        editor.replace(selection, data)
        vscode.window.showInformationMessage(SUCCESSFUL)
    }

    static replaceDocument(editor: vscode.TextEditorEdit, document: vscode.TextDocument, data: string): void {
        const lastLineIndex = (document.lineCount - 1)
        let range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(lastLineIndex, Number.MAX_VALUE))
        range = document.validateRange(range)
        editor.replace(range, data)
        vscode.window.showInformationMessage(SUCCESSFUL)
    }

    static insert(editor: vscode.TextEditorEdit, selection: vscode.Selection, data: string): void {
        editor.insert(selection.active, data)
        vscode.window.showInformationMessage(SUCCESSFUL)
    }
}