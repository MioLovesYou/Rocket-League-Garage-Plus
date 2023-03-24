document.addEventListener('DOMContentLoaded', () => {
    const hasElements = document.querySelector('.rlg-trade__itemshas');
    const wantElements = document.querySelector('.rlg-trade__itemswants');

    // Storing preset
    for (var i = 1; i < 6; i ++) {
        console.log(`Preset ${i} being setup.`)
        document.getElementById(`preset${i}`).addEventListener('click', (function(i) {
            return async () => {
                let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    args: [i],
                    func: (i) => {
                        const hasElements = document.querySelector('.rlg-trade__itemshas ');
                        const wantElements = document.querySelector('.rlg-trade__itemswants ');
                        var hasItems = [];
                        var wantItems = [];
 
                        // Add each has item
                        while (hasElements.hasChildNodes()) {
                            hasItems.push(hasElements.firstChild.outerHTML);
                            hasElements.removeChild(hasElements.firstChild);
                        }
 
                        // Add each want item
                        while (wantElements.hasChildNodes()) {
                            wantItems.push(wantElements.firstChild.outerHTML);
                            wantElements.removeChild(wantElements.firstChild);
                        }
 
                        // Validate items
                        hasItems = hasItems.filter( Boolean );
                        wantItems = wantItems.filter( Boolean );
 
                        // Store items
                        chrome.storage.local.set({
                            [`preset${i}`]: {
                                hasItems: hasItems,
                                wantItems: wantItems
                            }
                        });
 
                        // Re-add the items
                        chrome.storage.local.get([`preset${i}`], (data) => {
                            const parser = new DOMParser();
                            data[`preset${i}`].hasItems.forEach(i => {
                                hasElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                            });
                            data[`preset${i}`].wantItems.forEach(i => {
                                wantElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                            });
                        });
                    }
                });
            }
        })(i));
    }

    // Restore preset
    for (let i = 1; i < 6; i ++) {
        document.getElementById(`restore${i}`).addEventListener('click', async () => {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                args: [i],
                func: (i) => {
                    console.log(`Attempting fetch`);
                    chrome.storage.local.get(`preset${i}`, (data) => {
                        if (Object.keys(data).length === 0) {
                            console.log(`Preset data does not exist.`);
                            alert(`Preset data does not exist.`);
                            return;
                        } else {
                            const hasElements = document.querySelector('.rlg-trade__itemshas ');
                            const wantElements = document.querySelector('.rlg-trade__itemswants ');
                            while (hasElements.hasChildNodes()) {
                                hasElements.removeChild(hasElements.firstChild);
                            }
                            while (wantElements.hasChildNodes()) {
                                wantElements.removeChild(wantElements.firstChild);
                            }
                            const parser = new DOMParser();
                            data[`preset${i}`].hasItems.forEach(i => {
                                hasElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                            });
                            data[`preset${i}`].wantItems.forEach(i => {
                                wantElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                            });
                            console.log(`Success.`);
                        }
                    });
                }
            });
        });
    }

    // Auto-bumper
    const autoBumperCheckbox = document.getElementById("auto-bumper");

    chrome.storage.local.get("autoBumperChecked", function(data) {
        if (data.autoBumperChecked) {
            autoBumperCheckbox.checked = true;
        } else {
            autoBumperCheckbox.checked = false;
            chrome.storage.local.set({ "autoBumperChecked": false });
        }
    });

    autoBumperCheckbox.addEventListener("change", function() {
        if (this.checked) {
            chrome.storage.local.set({ "autoBumperChecked": true });
            chrome.tabs.query({url: "https://rocket-league.com/trades/*"}, function(tabs) {
                // Refresh the first tab that matches the URL
                if (tabs.length > 0) chrome.tabs.reload(tabs[0].id);
            }); 
        } else {
            chrome.storage.local.set({ "autoBumperChecked": false });
        }
        chrome.storage.local.get("autoBumperChecked", (data) => {
            console.log(data);
        });
    });
});