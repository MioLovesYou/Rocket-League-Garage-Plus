

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // Ad blocker
  chrome.storage.local.get("userType", (data) => {
    if (tab.url.startsWith('https://rocket-league.com/')) {
      console.log(`Starting ad-blocker.`);
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./components/adblocker.js'],
      });
    }
  });

  // Auto bumper
  chrome.storage.local.get("autoBumperChecked", (data) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://rocket-league.com/trades/')) {
      if (data.autoBumperChecked) {
        console.log(`Starting autobumper`);
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['./components/autobumper.js'],
        });
      }
    }
  });

  // Auto description
  chrome.storage.local.get("description", (data) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://rocket-league.com/trading/new')) {
      if (data.description) {
        console.log(`Starting auto-description`);
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['./components/autodesc.js'],
        });
      }
    }
  });
});