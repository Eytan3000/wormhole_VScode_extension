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
    console.log('File info:', fileInfo);

    // // Update the configuration
    // await vscode.workspace
    //   .getConfiguration()
    //   .update('savedLine', currentPosition, vscode.ConfigurationTarget.Global);

    // Update the configuration
    await vscode.workspace
      .getConfiguration()
      .update('savedFileInfo', fileInfo, vscode.ConfigurationTarget.Global);


	  const savedPos = vscode.workspace.getConfiguration().get('savedFileInfo', -1); // Default to -1 if the key is not found
	  console.log('saved filePath:', savedPos.filePath);
	  console.log('saved line:', savedPos.line);
	  
    vscode.window.showInformationMessage(
      `Current Position saved!`
    );
  }
}

// Function to go to the saved line
function goToSavedLine() {
  const savedLine = vscode.workspace.getConfiguration().get('savedLine', -1); // Default to -1 if the key is not found

  console.log('savedLine: ', savedLine);

  if (savedLine !== -1) {
    const editor = vscode.window.activeTextEditor;
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
