console.log("Save IMG extension background.js");

function buttonClicked(tab){
    
    console.log("button clicked", tab)

    let msg = {
        text: "extension switch",
        command: "switch"
    }

    chrome.tabs.sendMessage(tab.id, msg);
}

function commandReceived(command, tab){
    console.log(`Command: ${command}`);

    let msg = {
        text: "save image",
        command: "saveIMG"
    }

    chrome.tabs.sendMessage(tab.id, msg);
}


chrome.browserAction.onClicked.addListener(buttonClicked);
chrome.commands.onCommand.addListener(commandReceived);
