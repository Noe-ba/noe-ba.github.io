// ============================================
// SCRIPT.JS - Interactivité page d'accueil
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    const pupilTrigger = document.getElementById('pupilTrigger');
    const sommaire = document.getElementById('sommaire');
    
    // Variable pour savoir si le sommaire est déjà révélé
    let isRevealed = false;
    
    // Fonction pour révéler le sommaire
    function revealSommaire() {
        if (!isRevealed) {
            // Ajouter la classe pour révéler le sommaire
            sommaire.classList.add('revealed');
            
            // Faire disparaître la pupille cliquable en douceur
            pupilTrigger.style.opacity = '0';
            pupilTrigger.style.pointerEvents = 'none';
            
            // Scroll doux vers le sommaire
            setTimeout(() => {
                sommaire.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
            
            isRevealed = true;
        }
    }
    
    // Clic sur la pupille
    if (pupilTrigger) {
        pupilTrigger.addEventListener('click', revealSommaire);
    }
    
    // Optionnel : révéler aussi au scroll (si l'utilisateur scroll sans cliquer)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 200 && !isRevealed) {
                revealSommaire();
            }
        }, 100);
    });
    
});

/* ========================================
   MODE SOMBRE - JAVASCRIPT
   À ajouter à la fin de script.js
   ======================================== */

// Initialiser le mode sombre dès que possible
(function() {
    // Appliquer le mode sauvegardé AVANT le chargement pour éviter le flash
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
})();

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Sauvegarder la préférence
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Attacher l'événement au bouton quand la page est chargée
window.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        console.log('Dark mode toggle initialized'); // Pour debug
    } else {
        console.log('Dark mode toggle button not found'); // Pour debug
    }
});
