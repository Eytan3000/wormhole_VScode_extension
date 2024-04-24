const vscode = require('vscode');


// Function to go to a specific line
function goToLine(line = 500) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const newPosition = new vscode.Position(line, 0);
    const newSelection = new vscode.Selection(newPosition, newPosition);
    editor.revealRange(
      new vscode.Range(newPosition, newPosition),
      vscode.TextEditorRevealType.InCenter
    );
    editor.selection = newSelection;
  }
}
//---------------------------------------
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "wormhole" is now active!');

  // let disposable = vscode.commands.registerCommand('wormhole.helloWorld', function () {
  // 	// The code you place here will be executed every time your command is executed

  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from wormhole!');
  // });

  // context.subscriptions.push(disposable);

  let disposable = vscode.commands.registerCommand(
    'wormhole.helloWorld',
    () => {
      //   return printLowestVisibleLine();
      //   jumpToLine();
      goToLine();
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
