'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var m_output = vscode.window.createOutputChannel("Lua exclua output");
var m_exec = require('child_process').exec;
var m_fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    
    console.log('Congratulations, your extension "exclua" is now active!');

    let disposable = vscode.commands.registerCommand('extension.neweis.exclua', function () {

        var m_filepath = vscode.window.activeTextEditor.document.fileName;
        var m_fileary = vscode.window.activeTextEditor.document.fileName.split('\\');
        var m_filename = m_fileary[m_fileary.length - 1].toString();
        var m_prjpath = m_filepath.toString().replace(m_filename,"");

        return vscode.window.showInputBox({
            placeHolder: "Please input a lua script file path.",
            value: m_filename
        }).then(function (query:string){
            if(!m_fs.existsSync(m_prjpath + query)){
                vscode.window.showErrorMessage("The file \'" + m_prjpath + query + "\' is not exist.");
                return;
            }
            excutelua(m_prjpath + query);
        });
    });
    context.subscriptions.push(disposable);
}

export function excutelua(path:String){
    m_exec('lua53 ' + path,
        function (error, stdout, stderr) {
            m_output.show(true);
            m_output.clear();
            m_output.append("Lua exc out---------------------\n");
            m_output.append(stdout);
            if(error || stderr){
                m_output.append("err---------------------\n");
                m_output.append(stderr + "\n" + error);
            }
        });
}

// this method is called when your extension is deactivated
export function deactivate() {

}