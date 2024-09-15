// Existing code in script.js (assumed)
// ... (your existing JavaScript code) ...

// Improved keyboard detection code
document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.mac-terminal');
    let originalHeight = window.innerHeight;
    let isKeyboardVisible = false;
  
    function checkKeyboard() {
      const currentHeight = window.innerHeight;
      const heightDifference = Math.abs(currentHeight - originalHeight);
  
      // Check if the height difference is significant (e.g., more than 100px)
      if (heightDifference > 100) {
        if (currentHeight < originalHeight && !isKeyboardVisible) {
          // Keyboard is likely visible
          terminal.classList.add('keyboard-visible');
          isKeyboardVisible = true;
        } else if (currentHeight > originalHeight && isKeyboardVisible) {
          // Keyboard is likely hidden
          terminal.classList.remove('keyboard-visible');
          isKeyboardVisible = false;
        }
      }
    }
  
    // Multiple event listeners for better cross-browser support
    window.addEventListener('resize', checkKeyboard);
    window.addEventListener('orientationchange', function() {
      setTimeout(checkKeyboard, 300);
    });
    
    // Focus and blur events on input fields
    document.addEventListener('focus', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(checkKeyboard, 300);
      }
    }, true);
    
    document.addEventListener('blur', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(checkKeyboard, 300);
      }
    }, true);
  
    // Initial check
    checkKeyboard();
  
    // Periodically check for changes
    setInterval(checkKeyboard, 1000);
  });