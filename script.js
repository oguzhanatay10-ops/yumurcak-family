/* script.js - Yumurcak Family YouTube Ses & Animasyon Sistemi */

var player;

// 1. YOUTUBE API SİSTEMİ
// YouTube'un gerekli kodlarını sayfaya çağırır
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Oynatıcıyı oluşturur (Gizli şekilde çalışır)
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'QNcuxXA4x-U', // Senin Yumu TV videon
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'QNcuxXA4x-U' // Döngü için video ID'si tekrar yazılır
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    console.log("Müzik Sistemi Hazır! Sayfaya tıklayınca başlayacak.");
}

// 2. MÜZİK KONTROLÜ (🔊 Butonu İçin)
const musicBtn = document.getElementById("music-toggle");

function toggleMusic(event) {
    if (event) event.stopPropagation(); // Diğer tıklamaları engelle
    if (!player) return;

    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        musicBtn.innerText = "🔇";
    } else {
        player.playVideo();
        musicBtn.innerText = "🔊";
    }
}

// Tarayıcı engeli için: Sayfaya ilk tıklandığında müziği başlatır
document.addEventListener("click", function startOnFirstClick() {
    if (player && player.playVideo) {
        player.playVideo();
        if (musicBtn) musicBtn.innerText = "🔊";
        // Bir kez çalıştıktan sonra bu dinleyiciyi kaldır
        document.removeEventListener("click", startOnFirstClick);
    }
}, { once: true });


// 3. SAYFA DEĞİŞTİRME SİSTEMİ
function sayfaDegistir(sayfa) {
    // Tüm karakter sayfalarını gizle
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    // Ana sayfayı gizle
    const anasayfa = document.getElementById('anasayfa');
    if (anasayfa) anasayfa.style.display = 'none';
    
    // İstenen sayfayı göster
    if (sayfa === 'anasayfa') {
        if (anasayfa) anasayfa.style.display = 'block';
    } else {
        const target = document.getElementById(sayfa + '-sayfasi');
        if (target) {
            target.style.display = 'block';
            window.scrollTo(0, 0); // Sayfa değişince yukarı kaydır
        }
    }
    // Karakter menüsü açıksa kapat
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) dropdown.classList.remove("show");
}


// 4. KARAKTER MENÜSÜ (DROPDOWN)
function toggleMenu(e) { 
    if(e) e.stopPropagation(); 
    document.getElementById("myDropdown").classList.toggle("show"); 
}

// Menü dışına tıklandığında kapat
window.onclick = function(event) { 
    const dropdown = document.getElementById("myDropdown");
    if (dropdown && dropdown.classList.contains('show')) {
        if (!event.target.matches('.menu-btn')) {
            dropdown.classList.remove("show"); 
        }
    }
}


// 5. EĞLENCELİ ANİMASYONLAR (Stickerlar)

// Gökkuşağı - Arka Plan Değiştirme (🌈)
function changeBg(e) { 
    if(e) e.stopPropagation(); 
    const randomColor = `hsl(${Math.random() * 360}, 100%, 97%)`;
    const anaDiv = document.getElementById('anasayfa');
    if (anaDiv) anaDiv.style.background = randomColor; 
}

// Lolipop - Şeker Yağmuru (🍭)
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
        candy.style.pointerEvents = "none";
        candy.style.transition = "transform 3s linear";
        document.body.appendChild(candy);
        
        setTimeout(() => { 
            candy.style.transform = "translateY(110vh) rotate(360deg)"; 
        }, 50);
        
        setTimeout(() => candy.remove(), 3100);
    }
}

// Dönme Dolap - Döndürme (🎡)
function startWheel(el, e) {
    if(e) e.stopPropagation();
    el.style.transition = "transform 0.8s ease-in-out";
    el.style.transform = "rotate(360deg)";
    setTimeout(() => { 
        el.style.transition = "none"; 
        el.style.transform = "rotate(0deg)"; 
    }, 800);
}

// Roket - Fırlatma (🚀)
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
