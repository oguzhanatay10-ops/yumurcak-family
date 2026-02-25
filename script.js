/* script.js - Yumurcak Family Tüm Fonksiyonlar */

let activePage = 'anasayfa';
const myMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("music-toggle");

// --- 1. MÜZİK SİSTEMİ ---

// Tarayıcıların otomatik oynatma engeli için: İlk tıkta müziği başlatır
function startMusicOnFirstInteraction() {
    if (myMusic) {
        myMusic.play().then(() => {
            musicBtn.innerText = "🔊";
            // Başarıyla başladıysa bu dinleyicileri kaldır ki her tıkta müziği kurcalamasın
            document.removeEventListener("click", startMusicOnFirstInteraction);
            document.removeEventListener("touchstart", startMusicOnFirstInteraction);
        }).catch(error => {
            console.log("Müzik için etkileşim bekleniyor...");
        });
    }
}

document.addEventListener("click", startMusicOnFirstInteraction);
document.addEventListener("touchstart", startMusicOnFirstInteraction);

// Müzik Açma/Kapatma Butonu Fonksiyonu
function toggleMusic(event) {
    if (event) event.stopPropagation(); // Tıklamanın diğer elementlere yayılmasını engeller
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
    
    // Önce her şeyi gizle
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('anasayfa').style.display = 'none';
    
    // İstenen sayfayı göster
    if (sayfa === 'anasayfa') {
        document.getElementById('anasayfa').style.display = 'block'; // HTML yapısına göre block veya flex
    } else {
        const pElement = document.getElementById(sayfa + '-sayfasi');
        if (pElement) {
            pElement.style.display = 'block';
            window.scrollTo(0, 0); // Sayfa değişince en üste çıkar
        }
    }
    
    // Karakter menüsü açıksa kapat
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) dropdown.classList.remove("show");
}

// --- 3. MENÜ (DROPDOWN) SİSTEMİ ---

function toggleMenu(e) { 
    if(e) e.stopPropagation(); 
    document.getElementById("myDropdown").classList.toggle("show"); 
}

// Ekranın boş bir yerine basınca açık olan menüyü kapatır
window.onclick = function(event) { 
    const dropdown = document.getElementById("myDropdown");
    if (dropdown && dropdown.classList.contains('show')) {
        // Eğer tıklanan şey menü butonu değilse kapat
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
        candy.style.transition = "transform 3s linear"; 
        document.body.appendChild(candy);
        
        // Şekerleri düşür
        setTimeout(() => { 
            candy.style.transform = "translateY(110vh) rotate(360deg)"; 
        }, 50);
        
        // Belleği yormamak için şekerleri temizle
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
    // Ana sayfa arka planını değiştirir
    document.getElementById('anasayfa').style.background = randomColor; 
}
