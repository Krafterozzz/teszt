document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.mac-terminal');
    let lastScrollPosition = 0;
    let ticking = false;
    let isKeyboardVisible = false;
  
    function updateTerminalPosition() {
      const currentScrollPosition = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const terminalRect = terminal.getBoundingClientRect();
  
      // Check if keyboard is likely visible
      if (viewportHeight < window.outerHeight * 0.8) {
        isKeyboardVisible = true;
        terminal.classList.add('keyboard-visible');
      } else {
        isKeyboardVisible = false;
        terminal.classList.remove('keyboard-visible');
      }
  
      // Adjust terminal position based on scroll
      if (isKeyboardVisible) {
        const newTopPosition = Math.max(10, viewportHeight - terminalRect.height - 10);
        terminal.style.top = `${newTopPosition}px`;
      } else {
        terminal.style.top = '50%';
        terminal.style.transform = 'translateY(-50%)';
      }
  
      lastScrollPosition = currentScrollPosition;
      ticking = false;
    }
  
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateTerminalPosition);
        ticking = true;
      }
    }
  
    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTerminalPosition);
    window.addEventListener('orientationchange', function() {
      setTimeout(updateTerminalPosition, 300);
    });
  
    // Focus and blur events on input fields
    document.addEventListener('focus', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(updateTerminalPosition, 300);
      }
    }, true);
  
    document.addEventListener('blur', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(updateTerminalPosition, 300);
      }
    }, true);
  
    // Initial positioning
    updateTerminalPosition();
  });
