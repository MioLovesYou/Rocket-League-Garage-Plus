chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // Auto bumper
  chrome.storage.local.get("autoBumperChecked", (data) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://rocket-league.com/trades/')) {
      if (data.autoBumperChecked === true) {
        console.log(`Starting autobumper`)
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['./components/autobumper.js'],
        });
      }
    }
  });

  // Ad blocker
  chrome.storage.local.get("userType", (data) => {
    if (data.userType === 'premium' && tab.url.startsWith('https://rocket-league.com/')) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['./components/adblocker.js'],
      });
    }
  })
});