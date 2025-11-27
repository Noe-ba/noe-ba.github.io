// ============================================
// SCRIPT.JS - Version avec wrapper protégé
// ============================================

// MODE SOMBRE - Initialiser AVANT DOMContentLoaded
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

// Fonction pour appliquer le mode sombre via data-attribute
function applyDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    console.log('🌙 Mode sombre activé (data-theme)');
}

// Fonction pour retirer le mode sombre
function removeDarkMode() {
    document.documentElement.removeAttribute('data-theme');
    console.log('☀️ Mode clair activé');
}

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        removeDarkMode();
        localStorage.setItem('darkMode', 'disabled');
    } else {
        applyDarkMode();
        localStorage.setItem('darkMode', 'enabled');
    }
}

// TOUT LE CODE S'EXÉCUTE AU CHARGEMENT
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('📄 Page chargée');
    
    // ===== PARTIE 1 : SOMMAIRE =====
    const pupilTrigger = document.getElementById('pupilTrigger');
    const sommaire = document.getElementById('sommaire');
    
    let isRevealed = false;
    
    function revealSommaire() {
        if (!isRevealed) {
            sommaire.classList.add('revealed');
            
            pupilTrigger.style.opacity = '0';
            pupilTrigger.style.pointerEvents = 'none';
            
            setTimeout(() => {
                sommaire.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
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
    
    // ===== PARTIE 2 : MODE SOMBRE =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        console.log('✅ Dark mode toggle initialized');
    } else {
        console.log('❌ Dark mode toggle button not found');
    }
    
});
