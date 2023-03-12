chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed!');
  });
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      setInterval(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                    func: () => {
                    console.log(`Attemping bump.`);
                    const buttons = document.querySelectorAll('.rlg-trade__action.rlg-trade__bump.--bump ');
                    buttons.forEach((button) => {
                        setTimeout(() => {
                            button.click();
                            console.log(`Clicking... `);
                        }, 1250)
                    });
                }
          });
        });
      }, 20000);
    }
});