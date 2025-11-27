// ============================================
// SCRIPT.JS - Interactivité page d'accueil
// ============================================

// MODE SOMBRE - Initialiser AVANT DOMContentLoaded pour éviter le flash
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
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

// TOUT LE CODE S'EXÉCUTE AU CHARGEMENT
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PARTIE 1 : SOMMAIRE (ne pas toucher, fonctionne bien) =====
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
    
    // ===== PARTIE 2 : MODE SOMBRE =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        console.log('Dark mode toggle initialized');
    } else {
        console.log('Dark mode toggle button not found');
    }
    
});
