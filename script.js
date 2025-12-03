// MODE SOMBRE - Initialiser au chargement
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
})();

// Chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    
    // SOMMAIRE
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
    

// MODE SOMBRE
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Changer le mode
            document.body.classList.toggle('dark-mode');
            
            // Forcer un repaint complet du navigateur
            // Cela évite les bugs de superposition sans fermer les éléments
            document.body.style.display = 'none';
            document.body.offsetHeight; // Force reflow
            document.body.style.display = '';
            
            // Sauvegarder la préférence
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
});
