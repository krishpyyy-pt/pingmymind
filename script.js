// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Get DOM Elements ---
    const appearanceButton = document.getElementById('appearance-button');
    const appearanceModal = document.getElementById('appearance-modal');
    
    const themeButtonsContainer = document.getElementById('theme-buttons');
    const fontButtonsContainer = document.getElementById('font-buttons');

    // --- Toggle Modal ---
    appearanceButton.addEventListener('click', () => {
        // Toggle the 'hidden' attribute
        appearanceModal.hidden = !appearanceModal.hidden;
    });

    // --- Close Modal on Outside Click ---
    document.addEventListener('click', (e) => {
        // If the modal is open, and the click is NOT the button and NOT inside the modal
        if (!appearanceModal.hidden && 
            !appearanceModal.contains(e.target) && 
            e.target !== appearanceButton
        ) {
            appearanceModal.hidden = true;
        }
    });

    // --- Theme Switching ---
    themeButtonsContainer.addEventListener('click', (e) => {
        // Only act if a button was clicked
        if (e.target.tagName !== 'BUTTON') return;

        const newTheme = e.target.dataset.theme;

        // 1. Remove all theme classes from the body
        document.body.classList.remove('theme-light', 'theme-sepia', 'theme-dark');
        
        // 2. Add the new theme class
        document.body.classList.add(newTheme);
        
        // 3. Save the choice to localStorage
        localStorage.setItem('user-theme', newTheme);
        
        // 4. Update the '.active' class on buttons
        themeButtonsContainer.querySelector('.active')?.classList.remove('active');
        e.target.classList.add('active');
    });

    // --- Font Switching ---
    fontButtonsContainer.addEventListener('click', (e) => {
        // Only act if a button was clicked
        if (e.target.tagName !== 'BUTTON') return;

        const newFont = e.target.dataset.font;

        // 1. Remove all font classes from the body
        document.body.classList.remove('font-sans', 'font-serif', 'font-accessible');
        
        // 2. Add the new font class
        document.body.classList.add(newFont);
        
        // 3. Save the choice to localStorage
        localStorage.setItem('user-font', newFont);
        
        // 4. Update the '.active' class on buttons
        fontButtonsContainer.querySelector('.active')?.classList.remove('active');
        e.target.classList.add('active');
    });

    // --- Initialize Active Buttons on Load ---
    // This runs after the page loads to set the correct 'active' class
    // in the modal, based on what's in localStorage.
    function initializeActiveButtons() {
        const currentTheme = localStorage.getItem('user-theme') || 'theme-light';
        const currentFont = localStorage.getItem('user-font') || 'font-sans';

        const activeThemeButton = themeButtonsContainer.querySelector(`[data-theme="${currentTheme}"]`);
        const activeFontButton = fontButtonsContainer.querySelector(`[data-font="${currentFont}"]`);

        if (activeThemeButton) {
            activeThemeButton.classList.add('active');
        }
        if (activeFontButton) {
            activeFontButton.classList.add('active');
        }
    }

    // Run the initialization
    initializeActiveButtons();

});