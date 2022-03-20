console.log("Save Img extension content.js"); 

let saveExtensionOn = false;
let hoveredImgSrc;

const modal = document.createElement("dialog");
modal.innerHTML = `<h1 id="modalMessage">SaveIMG ${saveExtensionOn ? 'ON': 'OFF'}</h1>
<button style="margin-left:auto; margin-right:auto">x</button>
`;
document.body.appendChild(modal);
const dialog = document.querySelector("dialog");

function createFilename(fileExtension){
    let today = new Date();
    let day = today.getDate().toString();
    let hours = today.getHours().toString();
    let minutes = today.getMinutes().toString();
    let seconds = today.getSeconds().toString();
    return day + hours + minutes + seconds + "." + fileExtension;
}


function download(dataurl) {
    const link = document.createElement("a");
    const allowedFormats = ['jpeg', 'jpg', 'png', 'svg'];
    let splittedUrl = dataurl.split(".");
    let fileExtension = splittedUrl[splittedUrl.length - 1].toLowerCase();

    //if (allowedFormats.includes(fileExtension)){
	//if (true){
	if (dataurl.includes(fileExtension)){
        let filename = createFilename(fileExtension);
        link.href = dataurl;
        document.body.appendChild(link);
        link.download = filename;
        link.click();
        document.body.removeChild(link);

    }

}

function gotMessage(message, sender, sendResponse){
   //console.log(message) 
    if (message.command === "switch"){
        saveExtensionOn = !saveExtensionOn;
        console.log(saveExtensionOn)
        document.getElementById("modalMessage").innerHTML = `SaveIMG ${saveExtensionOn ? 'ON': 'OFF'}`;
        dialog.showModal();
    }
    if (message.command === "saveIMG" && hoveredImgSrc){
        console.log(`Save IMG src= ${hoveredImgSrc}`);
        download(hoveredImgSrc);
        hoveredImgSrc = null;
    }
}

$(window).mousemove(function(e) {
    let x = e.clientX;
    let y = e.clientY;
    let hoveredElement = document.elementFromPoint(x, y);
    let tagName = false;
    if (hoveredElement)
        tagName = hoveredElement.tagName

    if (saveExtensionOn && tagName && tagName === "IMG"){
        hoveredImgSrc = hoveredElement.src;
        //console.log(hoveredImgSrc);
    }
});

dialog.querySelector("button").addEventListener("click", () => {
    dialog.close();
});

chrome.runtime.onMessage.addListener(gotMessage);
