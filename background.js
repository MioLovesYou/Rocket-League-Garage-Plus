chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({ active: false }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id)
        }
    })
})
