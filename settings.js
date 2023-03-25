document.addEventListener('DOMContentLoaded', () => {
    // Auto-bumper (Automatically bumps the trades if the tab is open)
    const autoBumperCheckbox = document.getElementById("auto-bumper");

    chrome.storage.local.get("autoBumperChecked", function(data) {
        if (data.autoBumperChecked) {
            autoBumperCheckbox.checked = true;
            chrome.storage.local.set({ "autoBumperChecked": true });
        } else {
            autoBumperCheckbox.checked = false;
            chrome.storage.local.set({ "autoBumperChecked": false });
        }
    });

    autoBumperCheckbox.addEventListener("change", () => {
        console.log(autoBumperCheckbox.checked)
        if (autoBumperCheckbox.checked) {
            chrome.storage.local.set({ "autoBumperChecked": true });
            chrome.tabs.query({url: "https://rocket-league.com/trades/*"}, function(tabs) {
                // Refresh the first tab that matches the URL
                if (tabs.length > 0) chrome.tabs.reload(tabs[0].id);
                else {
                    chrome.storage.local.get("username", (data) => {
                        if (data.username) chrome.tabs.create({url: `https://rocket-league.com/trades/${data.username}`});
                        else alert(`To use this, you need to set your username.`);
                    });
                }
            }); 
        } else {
            chrome.storage.local.set({ "autoBumperChecked": false });
        }
        chrome.storage.local.get("autoBumperChecked", (data) => {
            console.log(data);
        });
    });

    // Set username
    var usernameElement = document.getElementById("username");
    chrome.storage.local.get("username", (data) => {
        if (data.username) usernameElement.value = data.username;
    });
    
    usernameElement.addEventListener("change", () => {
        if (usernameElement.value) {
            chrome.storage.local.set({ "username": usernameElement.value });
        }
        else {
            chrome.storage.local.remove("username");
            console.log(`Removed username.`);
        }
    });


    // Auto description
    var descElement = document.getElementById("description");
    chrome.storage.local.get("description", (data) => {
        console.log(data.description)
        if (data.description) descElement.value = data.description;
    });
    
    descElement.addEventListener("change", () => {
        console.log(descElement.value);
        chrome.storage.local.set({ "description": descElement.value })
    });

    // Home
    document.getElementById(`back`).addEventListener('click', function() {
        window.location.href='/popup.html'; 
        chrome.action.setPopup({popup: '/popup.html'});
        console.log(`Redirecting to home page.`);
    });
});