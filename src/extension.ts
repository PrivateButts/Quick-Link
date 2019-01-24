// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let mailto = vscode.commands.registerCommand('extension.quick-link.mailto', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No text selected');
			return; // No open text editor
		}
		
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var text = '<a href="mailto:'+text+'">'+text+'</a>'
		editor.edit(function(e){
			e.replace(selection, text)
		})
	});
	
	context.subscriptions.push(mailto);

	let tel = vscode.commands.registerCommand('extension.quick-link.tel', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No text selected');
			return; // No open text editor
		}
		
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var text = '<a href="tel:'+text+'">'+text+'</a>'
		editor.edit(function(e){
			e.replace(selection, text)
		})
	});
	
	context.subscriptions.push(tel);

	let link = vscode.commands.registerCommand('extension.quick-link.link', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No text selected');
			return; // No open text editor
		}
		
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var text = '<a href="'+text+'">'+text+'</a>'
		editor.edit(function(e){
			e.replace(selection, text)
		})
	});
	
	context.subscriptions.push(link);
	console.log('Quick Link has been installed');
}

// this method is called when your extension is deactivated
export function deactivate() {}
