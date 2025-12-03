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
// MODE SOMBRE
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Forcer la fermeture de tous les popups/overlays avant de changer de mode
            // Cela évite les bugs de superposition sur mobile
            
            // Fermer les notes de bas de page si ouvertes
            const notePopup = document.getElementById('note-popup');
            if (notePopup && notePopup.classList.contains('active')) {
                notePopup.classList.remove('active');
            }
            
            // Fermer les accordéons Grothendieck si ouverts
            const accordions = document.querySelectorAll('.grothendieck-accordion.active');
            accordions.forEach(acc => acc.classList.remove('active'));
            
            // Petit délai pour laisser les animations se terminer
            setTimeout(() => {
                document.body.classList.toggle('dark-mode');
                
                // Forcer un repaint pour éviter les bugs visuels sur mobile
                void document.body.offsetHeight;
                
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    localStorage.setItem('darkMode', 'disabled');
                }
            }, 50);
        });
    }
    
});
