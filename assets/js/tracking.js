(function(){
  function isModifiedClick(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  }

  function shouldBypassNavigation(e, link) {
    return link.target === '_blank' || isModifiedClick(e);
  }

  function bindTracking(selector, handler, flagName) {
    var links = document.querySelectorAll(selector);
    if (!links.length) return;
    links.forEach(function(link){
      if (link.dataset[flagName] === 'true') return;
      link.dataset[flagName] = 'true';

      link.addEventListener('click', function(e){
        try { handler(); } catch (err) {}
        if (shouldBypassNavigation(e, link)) {
          return;
        }
        e.preventDefault();
        var href = link.href;
        if (!href) return;
        setTimeout(function(){ window.location.href = href; }, 200);
      });
    });
  }

  bindTracking(
    'a[href*="hotmart.com"]',
    function(){
      if (window.fbq) window.fbq('track','InitiateCheckout');
    },
    'fbqCheckoutBound'
  );

  bindTracking(
    'a[href*="demo.pdf"]',
    function(){
      if (window.fbq) window.fbq('trackCustom','ViewDemo');
    },
    'fbqDemoBound'
  );
})();
