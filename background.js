chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // Ad blocker
  chrome.storage.local.get("userType", (data) => {
    // data.userType === 'premium' && 
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
      if (data.autoBumperChecked === true) {
        console.log(`Starting autobumper`);
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['./components/autobumper.js'],
        });
      }
    }
  });
});