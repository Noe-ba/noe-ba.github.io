// ============================================
// SCRIPT.JS - Version avec forçage des styles
// ============================================

// MODE SOMBRE - Initialiser AVANT DOMContentLoaded
(function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
})();

// Fonction pour appliquer les styles du mode sombre DIRECTEMENT
function applyDarkModeStyles() {
    // Forcer les styles directement sur les éléments
    document.body.style.background = '#0f1729';
    document.body.style.color = '#e5e7eb';
    
    // Forcer sur tous les textes principaux
    const titres = document.querySelectorAll('.main-title, h1, h2, h3');
    titres.forEach(el => {
        el.style.color = '#e5e7eb';
    });
    
    // Forcer sur les textes secondaires
    const textes = document.querySelectorAll('.subtitle, .meta-info, .author, .institution, .direction, p, .click-invitation');
    textes.forEach(el => {
        el.style.color = '#cbd5e1';
    });
    
    // Forcer sur le sommaire
    const sommaireItems = document.querySelectorAll('.sommaire-list li a');
    sommaireItems.forEach(el => {
        el.style.background = 'rgba(30, 41, 59, 0.6)';
        el.style.borderColor = 'rgba(74, 144, 226, 0.25)';
        el.style.color = '#e5e7eb';
    });
    
    const sommaireTitles = document.querySelectorAll('.sommaire-list .title');
    sommaireTitles.forEach(el => {
        el.style.color = '#e5e7eb';
    });
    
    const sommaireNumbers = document.querySelectorAll('.sommaire-list .number');
    sommaireNumbers.forEach(el => {
        el.style.color = '#94a3b8';
    });
    
    const sommaireArrows = document.querySelectorAll('.sommaire-list .arrow');
    sommaireArrows.forEach(el => {
        el.style.color = '#6ba3e8';
    });
    
    console.log('✅ Styles mode sombre appliqués directement');
}

// Fonction pour retirer les styles du mode sombre
function removeDarkModeStyles() {
    document.body.style.background = '';
    document.body.style.color = '';
    
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.background = '';
        el.style.color = '';
        el.style.borderColor = '';
    });
    
    console.log('✅ Styles mode sombre retirés');
}

// Fonction pour basculer le mode sombre
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        localStorage.setItem('darkMode', 'enabled');
        applyDarkModeStyles(); // Forcer les styles
        console.log('🌙 Mode sombre activé');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        removeDarkModeStyles(); // Retirer les styles
        console.log('☀️ Mode clair activé');
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
                
                // Si on est en mode sombre, ré-appliquer les styles après révélation
                if (document.body.classList.contains('dark-mode')) {
                    console.log('🔄 Ré-application des styles après révélation sommaire');
                    applyDarkModeStyles();
                }
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
    
    // Si le mode sombre était sauvegardé, appliquer les styles
    if (document.body.classList.contains('dark-mode')) {
        console.log('🌙 Mode sombre détecté au chargement, application des styles');
        applyDarkModeStyles();
    }
    
});
