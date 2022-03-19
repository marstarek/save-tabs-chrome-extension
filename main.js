let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
const downloadBtn = document.getElementById("download-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    });
});

function deleteLink(event, myLeads) {
    let deletedLink = event.target.parentElement.innerText;
    let sliceLink = deletedLink.slice(0, -2);
    var result = arrayRemove(myLeads, sliceLink);
    localStorage.setItem("myLeads", JSON.stringify(result));
    renderLeads(result);
}

function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}

function renderLeads(myLeads) {
    let listItems = "";
    for (let index = 0; index < myLeads.length; index++) {
        listItems += `<li> <a target="_blank" href="${myLeads[index]}">${myLeads[index]}</a> <button id="del-link" onClick="deleteLink(event,myLeads) " class="button-36">X</button>  </li>`;
    }
    ulEl.innerHTML = listItems;
}

function saveTxt() {
    var textDoc = document.createElement("a");
    textDoc.href = "data:attachment/text," + encodeURI(myLeads.join("\n"));
    textDoc.target = "_blank";
    textDoc.download = "myTabs.txt";
    textDoc.click();
}
deleteBtn.addEventListener("dblclick", function() {
    console.log("double clicked!");
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
});
downloadBtn.addEventListener("click", function() {
    saveTxt();
});