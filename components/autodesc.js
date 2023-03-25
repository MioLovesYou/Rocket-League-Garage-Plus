chrome.storage.local.get("description", (data) => {
    console.log(`ehh`)
    if (data.description) {
        console.log(data.description)
        document.querySelector(".rlg-input").value = data.description;
        console.log(`Description set.`);
    }
});