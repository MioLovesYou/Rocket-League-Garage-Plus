document.addEventListener('DOMContentLoaded', function() {
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
});