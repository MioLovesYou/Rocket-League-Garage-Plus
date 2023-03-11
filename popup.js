document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('preset1').addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
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
                    'preset1': {
                        hasItems: hasItems,
                        wantItems: wantItems
                    }
                }, function() {
                    console.log('Settings saved');
                });

                // Re-add the items
                chrome.storage.local.get('preset1', (data) => {
                    const parser = new DOMParser();
                    data['preset1'].hasItems.forEach(i => {
                        hasElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                    });
                    data['preset1'].wantItems.forEach(i => {
                        wantElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                    });
                });
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
                const hasElements = document.querySelector('.rlg-trade__itemshas ');
                const wantElements = document.querySelector('.rlg-trade__itemswants ');
                while (hasElements.hasChildNodes()) {
                    hasElements.removeChild(hasElements.firstChild);
                }
                while (wantElements.hasChildNodes()) {
                    wantElements.removeChild(wantElements.firstChild);
                }
                chrome.storage.local.get('preset1', (data) => {
                    const parser = new DOMParser();
                    data['preset1'].hasItems.forEach(i => {
                        hasElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                    });
                    data['preset1'].wantItems.forEach(i => {
                        wantElements.appendChild(parser.parseFromString(i, 'text/html').body.firstChild);
                    });
                });
            }
        });
    });
});
