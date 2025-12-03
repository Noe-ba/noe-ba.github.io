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
            // Sur mobile : désactiver temporairement toutes les transitions
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Ajouter une classe qui désactive les transitions
                document.body.classList.add('no-transition');
            }
            
            // Changer le mode
            document.body.classList.toggle('dark-mode');
            
            // Sauvegarder la préférence
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
            
            // Sur mobile : réactiver les transitions après le changement
            if (isMobile) {
                setTimeout(() => {
                    document.body.classList.remove('no-transition');
                }, 100);
            }
        });
    }
    
});
