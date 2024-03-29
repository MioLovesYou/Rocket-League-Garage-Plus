let totalTrades = null;
let buttonsClicked = 0;
window.scrollTo(0, 1200);
var bumperObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // find the total number of trades if it hasn't been found yet
      if (!totalTrades) {
        const totalTradesNode = document.querySelector('.col-4-8 span:first-child');
        if (totalTradesNode) {
          totalTrades = parseInt(totalTradesNode.textContent.replace(/\(|\)/g, ""));
        }
      }
      // find and remove the bump buttons
      const bumpButtons = document.querySelectorAll('.rlg-trade__action.rlg-trade__bump.--bump');
      bumpButtons.forEach((button) => {
        console.log(`Button found!`);
        button.scrollIntoView();
        console.log(`Attempting bump.`);
        button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
        console.log(`Button removed!`);
        buttonsClicked++;
        console.log(buttonsClicked, totalTrades);
        // reload the page if all bump buttons have been clicked
        if (buttonsClicked === totalTrades) {
          console.log(`All buttons clicked.`);
          bumperObserver.disconnect();
          // uncomment the following line if you want to reload the page
          window.location.reload();
        }
      });
    }
  });
});

bumperObserver.observe(document, { childList: true, subtree: true });