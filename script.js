/* script.js - Yumurcak Family Tüm Fonksiyonlar */

let activePage = 'anasayfa';

// --- 1. MÜZİK SİSTEMİ (Geliştirilmiş) ---
const myMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("music-toggle");

function startMusicOnFirstInteraction() {
    if (myMusic) {
        // Bazı tarayıcılar için önce sessize alıp sonra başlatıp sesi açıyoruz
        myMusic.muted = false; 
        myMusic.play().then(() => {
            if (musicBtn) musicBtn.innerText = "🔊";
            console.log("Müzik başarıyla başladı!");
            // Bir kez çalıştıktan sonra dinleyicileri kaldırıyoruz
            document.removeEventListener("click", startMusicOnFirstInteraction);
            document.removeEventListener("touchstart", startMusicOnFirstInteraction);
            document.removeEventListener("keydown", startMusicOnFirstInteraction);
        }).catch(error => {
            console.log("Müzik için hala kullanıcı etkileşimi bekleniyor...");
        });
    }
}

// Tüm etkileşim türlerini dinleyelim
document.addEventListener("click", startMusicOnFirstInteraction);
document.addEventListener("touchstart", startMusicOnFirstInteraction);
document.addEventListener("keydown", startMusicOnFirstInteraction);

function toggleMusic(event) {
    if (event) event.stopPropagation(); 
    if (myMusic.paused) {
        myMusic.play();
        musicBtn.innerText = "🔊";
    } else {
        myMusic.pause();
        musicBtn.innerText = "🔇";
    }
}

// --- 2. SAYFA DEĞİŞTİRME SİSTEMİ ---

function sayfaDegistir(sayfa) {
    activePage = sayfa;
    
    // Önce ana sayfayı ve tüm diğer sayfaları gizle
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    
    const anasayfa = document.getElementById('anasayfa');
    if (anasayfa) anasayfa.style.display = 'none';
    
    // İstenen sayfayı göster
    if (sayfa === 'anasayfa') {
        if (anasayfa) anasayfa.style.display = 'block';
    } else {
        const targetPage = document.getElementById(sayfa + '-sayfasi');
        if (targetPage) {
            targetPage.style.display = 'block';
            window.scrollTo(0, 0); 
        }
    }
    
    // Menü açıksa kapat
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) dropdown.classList.remove("show");
}

// --- 3. MENÜ (DROPDOWN) SİSTEMİ ---

function toggleMenu(e) { 
    if(e) e.stopPropagation(); 
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) dropdown.classList.toggle("show"); 
}

// Menü dışına tıklandığında kapatma
window.onclick = function(event) { 
    const dropdown = document.getElementById("myDropdown");
    if (dropdown && dropdown.classList.contains('show')) {
        if (!event.target.matches('.menu-btn')) {
            dropdown.classList.remove("show"); 
        }
    }
}

// --- 4. EĞLENCELİ ANİMASYONLAR ---

// ROKET FIRLATMA (🚀)
function launchRocket(el, e) {
    if(e) e.stopPropagation();
    el.style.transform = "rotate(-45deg)";
    setTimeout(() => {
        el.style.transition = "transform 1.5s ease-in-out, opacity 1.5s";
        el.style.transform = "translate(-100vw, -100vh) rotate(-45deg)";
        el.style.opacity = "0";
        setTimeout(() => { 
            el.style.transition = "none"; 
            el.style.transform = "translate(0,0) rotate(0deg)"; 
            el.style.opacity = "1"; 
        }, 1600);
    }, 400);
}

// ŞEKER YAĞMURU (🍭)
function candyRain(e) {
    if(e) e.stopPropagation();
    for (let i = 0; i < 30; i++) {
        let candy = document.createElement("div");
        candy.innerText = "🍭"; 
        candy.style.position = "fixed"; 
        candy.style.top = "-50px";
        candy.style.left = Math.random() * 100 + "vw"; 
        candy.style.fontSize = "50px"; 
        candy.style.zIndex = "10001";
        candy.style.pointerEvents = "none"; // Tıklamayı engellemesin
        candy.style.transition = "transform 3s linear"; 
        document.body.appendChild(candy);
        
        setTimeout(() => { 
            candy.style.transform = "translateY(110vh) rotate(360deg)"; 
        }, 50);
        
        setTimeout(() => candy.remove(), 3100);
    }
}

// DÖNME DOLAP (🎡)
function startWheel(el, e) {
    if(e) e.stopPropagation();
    el.style.transition = "transform 0.8s ease-in-out";
    el.style.transform = "rotate(360deg)";
    setTimeout(() => { 
        el.style.transition = "none"; 
        el.style.transform = "rotate(0deg)"; 
    }, 800);
}

// ARKA PLAN GÖKKUŞAĞI DEĞİŞİMİ (🌈)
function changeBg(e) { 
    if(e) e.stopPropagation(); 
    const randomColor = `hsl(${Math.random() * 360}, 100%, 97%)`;
    const anaDiv = document.getElementById('anasayfa');
    if (anaDiv) anaDiv.style.background = randomColor; 
}
