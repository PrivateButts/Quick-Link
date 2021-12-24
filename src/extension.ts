// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	function multiReplace(templateCallback: (value: string) => string){
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('No text selected');
			return; // No open text editor
		}

		let selections = editor.selections;
		
		editor!.edit(function(e){
			selections.forEach(selection => {
				var text = editor!.document.getText(selection);
				text = templateCallback(text);
				e.replace(selection, text);
			});
		});
	}
	
	let mailto = vscode.commands.registerCommand('extension.quick-link.mailto', () => {
		multiReplace(v => {
			return `<a href="mailto:${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(mailto);

	let tel = vscode.commands.registerCommand('extension.quick-link.tel', () => {
		multiReplace(v => {
			return `<a href="tel:${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(tel);

	let sms = vscode.commands.registerCommand('extension.quick-link.sms', () => {
		multiReplace(v => {
			return `<a href="sms:${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(sms);

	let callto = vscode.commands.registerCommand('extension.quick-link.callto', () => {
		multiReplace(v => {
			return `<a href="callto:${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(callto);

	let fax = vscode.commands.registerCommand('extension.quick-link.fax', () => {
		multiReplace(v => {
			return `<a href="fax:${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(fax);

	let linkInPlace = vscode.commands.registerCommand('extension.quick-link.link-in-place', () => {
		multiReplace(v => {
			return `<a href="${v}">${v}</a>`;
		});
	});
	
	context.subscriptions.push(linkInPlace);

	let linkCustom = vscode.commands.registerCommand('extension.quick-link.link-builder', async () => {
		let href = await vscode.window.showInputBox(
			{
				placeHolder: "https://privatebutts.dev",
				prompt: "Destination (href attribute)?"
			},
		);

		if(href === undefined){
			return;
		}

		let content = await vscode.window.showInputBox(
			{
				placeHolder: "Visit my website!",
				prompt: "Display Text?"
			},
		);

		if(content === undefined){
			return;
		}

		let targets:vscode.QuickPickItem[] = [
			{
				label: 'Same Frame (no target)',
			},
			{
				label: 'New Tab or Window',
				detail: '_blank'
			},
			{
				label: 'Parent Frame',
				detail: '_parent'
			},
			{
				label: 'Top Frame',
				detail: '_top'
			},
			{
				label: 'Custom Frame'
			}

		];

		let target = await vscode.window.showQuickPick(
			targets,
			{
				title: "Target?"
			}
		);

		let text = "";
		switch(target) {
			case targets[0]:
				text = `<a href="${href}">${content}</a>`;
				break;
			case targets[4]:
				let t = await vscode.window.showInputBox(
					{
						placeHolder: "customframe",
						prompt: "Frame?"
					},
				);
				text = `<a href="${href}" target="${t}">${content}</a>`;
				break;
			default:
				text = `<a href="${href}" target="${target?.detail}">${content}</a>`;
				break;
		}


		multiReplace(v => {
			return text;
		});
	});
	
	context.subscriptions.push(linkCustom);
	console.log('Quick Link has been installed');
}

export function deactivate() {}
