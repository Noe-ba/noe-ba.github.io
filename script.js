// ============================================
// SCRIPT.JS - Version ultra minimaliste
// ============================================

// Initialiser le mode au chargement
(function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// Tout le code après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SOMMAIRE =====
    const pupilTrigger = document.getElementById('pupilTrigger');
    const sommaire = document.getElementById('sommaire');
    let isRevealed = false;
    
    function revealSommaire() {
        if (!isRevealed) {
            sommaire.classList.add('revealed');
            pupilTrigger.style.opacity = '0';
            pupilTrigger.style.pointerEvents = 'none';
            setTimeout(() => {
                sommaire.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
            isRevealed = true;
        }
    }
    
    if (pupilTrigger) {
        pupilTrigger.addEventListener('click', revealSommaire);
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 200 && !isRevealed) {
                revealSommaire();
            }
        }, 100);
    });
    
    // ===== MODE SOMBRE =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // UN SEUL événement click
        darkModeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                // Passer en mode clair
                html.removeAttribute('data-theme');
                localStorage.setItem('darkMode', 'disabled');
            } else {
                // Passer en mode sombre
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            }
        });
    }
    
});
