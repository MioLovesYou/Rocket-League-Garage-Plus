chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get("autoBumperChecked", (data) => {
    console.log(data.autoBumperChecked)
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://rocket-league.com/trades/')) {
      if (data.autoBumperChecked === true) {
        console.log(`Starting autobumper`)
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['autobumper.js'],
        });
      }
    }
  });
});