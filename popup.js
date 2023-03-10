document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('preset1').addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                var hasElements = document.querySelector('.rlg-trade__itemshas ');
                var wantElements = document.querySelector('.rlg-trade__itemswants ');
                var items = [];
                while (hasElements.hasChildNodes()) {
                    items.push(hasElements.firstChild.outerHTML);
                    console.log(hasElements.firstChild.outerHTML);
                    hasElements.removeChild(hasElements.firstChild);
                }
                chrome.storage.local.set({
                    'preset1': items
                }, function() {
                    console.log(items)
                    console.log('Settings saved');
                });
                chrome.storage.local.get('preset1', (data) => {
                    const parser = new DOMParser();
                    data['preset1'].forEach(i => {
                        console.log(parser.parseFromString(i, 'text/html').body.firstChild);
                        hasElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                    })
                })
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('preset2').addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                var hasElements = document.querySelector('.rlg-trade__itemshas ');
                chrome.storage.local.get('preset1', function(items) {
                    console.log(JSON.stringify(items));
                });
            }
        });
    });
});
