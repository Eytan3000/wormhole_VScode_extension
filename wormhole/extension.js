const vscode = require('vscode');

// Function to save the current line number
async function saveCurrentLine() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const currentPosition = editor.selection.active.line;
    console.log('currentPosition: ', currentPosition);

    const currentFilePath = editor.document.uri.fsPath; // Get the file path of the active document
    const fileInfo = {
      filePath: currentFilePath,
      line: currentPosition,
    };

    // Update the configuration
    await vscode.workspace
      .getConfiguration()
      .update('savedFileInfo', fileInfo, vscode.ConfigurationTarget.Global);

    // vscode.window.showInformationMessage(
    //   `Current Position saved!`
    // );

  }
}

// Function to go to the saved line
async function goToSavedLine() {
  const savedFileInfo = vscode.workspace
    .getConfiguration()
    .get('savedFileInfo');

  if (savedFileInfo) {
    const savedFilePath = savedFileInfo.filePath;
    const savedLine = savedFileInfo.line;
    console.log('Saved file info:', savedFileInfo);

    // Open the saved file
    const document = await vscode.workspace.openTextDocument(savedFilePath);
    const editor = await vscode.window.showTextDocument(document);

    // Go to the saved line
    if (editor) {
      const newPosition = new vscode.Position(savedLine, 0);
      const newSelection = new vscode.Selection(newPosition, newPosition);
      editor.revealRange(
        new vscode.Range(newPosition, newPosition),
        vscode.TextEditorRevealType.InCenter
      );
      editor.selection = newSelection;
    }
  } else {
    vscode.window.showInformationMessage('No line saved.');
  }
}

//---------------------------------------
function activate(context) {
  console.log('Congratulations, your extension "wormhole" is now active!');

  let disposable1 = vscode.commands.registerCommand(
    'wormhole.saveCurrentLine',
    () => {
      saveCurrentLine();
    }
  );
  let disposable2 = vscode.commands.registerCommand(
    'wormhole.goToSavedLine',
    () => {
      goToSavedLine();
    }
  );
  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
