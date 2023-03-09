// Get the current tab and show an alert message when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('preset1').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        var hasElements = document.querySelector('.rlg-trade__itemshas ')
        var items = []
        while (hasElements.hasChildNodes()) {
            items.push(hasElements.firstChild);
            hasElements.removeChild(hasElements.firstChild);
        }
        console.log(items[0]);
      }
    });
  });
})
/*
document.addEventListener('DOMContentLoaded', function() {
    for (var i = 1; i < 6; i++) {
        document.getElementById(`preset${i}`).addEventListener('click', function() {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                document.getElementById(`preset${i}`).addEventListener('click', function() {
                  chrome.tabs.executeScript(tabs[0].id, {
                    code: 'alert("yo")'
                  });
                });
              });
            alert('yo')
        });

    }
})

            chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
                console.log('Settings saved');
            });
});

        var element = document.getElementsByClassName("rlg-item");
        element.parentNode.removeChild(element);

    var presetOne = document.getElementById('presetOne');
    presetOne.addEventListener('click', function() {
        chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
            console.log('Settings saved');
        });
    });

    var presetTwo = document.getElementById('presetTwo');
    presetTwo.addEventListener('click', function() {
        chrome.storage.sync.get(['foo', 'bar'], function(items) {
            alert(JSON.stringify(items))
          });
    });
document.querySelector('.rlg-item').remove();

    for (var i = 1; i < 6; i++) {
        document.getElementById(`preset${i}`).addEventListener('click', function() {
            chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
                console.log('Settings saved');
            });
            alert('yo')
        });

    }
    */