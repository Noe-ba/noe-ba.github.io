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

// Fonction pour initialiser le mode sombre
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Si le bouton n'existe pas (page d'accueil), ne rien faire
    if (!darkModeToggle) return;
    
    // Vérifier si l'utilisateur a déjà une préférence sauvegardée
    const savedMode = localStorage.getItem('darkMode');
    
    // Appliquer le mode sauvegardé au chargement
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    // Écouteur d'événement sur le bouton
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Sauvegarder la préférence
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', initDarkMode);
