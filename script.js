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
