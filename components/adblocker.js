var adObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const classNames = [
        'rlg-ven-preloader', 
        'vm-footer', 
        'rlg-footer-ads',
        'vm-skin vm-skin-left',
        'vm-skin vm-skin-right',
        'rlg-trading-spacer',
        'rlg-trading-ad-container'
      ];
      
      classNames.forEach(className => {
        const ads = document.querySelectorAll(`.${className}`);
        document.querySelector(".rlg-input").value = "gggggggggggggggggg"
        ads.forEach(ad => {
          if (ad && ad.parentNode) {
            ad.parentNode.removeChild(ad);
            console.log(`Removed element with class name "${className}"`);
          }
        });
      });
    });
  });
  
  adObserver.observe(document.documentElement, { childList: true, subtree: true });