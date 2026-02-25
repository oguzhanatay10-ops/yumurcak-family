/* script.js - Yumurcak Family Tam Sürüm */

// 1. DEĞİŞKENLERİ TANIMLAYALIM
const myMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("music-toggle");
let activePage = 'anasayfa';

// 2. SES SİSTEMİ (Tarayıcı Engelini Aşan Versiyon)
function sesiBaslat() {
    if (myMusic) {
        myMusic.play().then(() => {
            musicBtn.innerText = "🔊";
            console.log("Müzik başladı!");
            // Müzik bir kez başladıktan sonra bu dinleyicileri kaldırıyoruz
            document.removeEventListener("click", sesiBaslat);
            document.removeEventListener("touchstart", sesiBaslat);
        }).catch(error => {
            console.log("Ses çalma hatası. Bir etkileşim bekleniyor.");
        });
    }
}

// Kullanıcı sayfada herhangi bir yere tıkladığında veya dokunduğunda müziği tetikle
document.addEventListener("click", sesiBaslat);
document.addEventListener("touchstart", sesiBaslat);

// Hoparlör Butonu (Aç/Kapat)
function toggleMusic(event) {
    if (event) event.stopPropagation(); // Tıklamanın diğer objelere gitmesini engeller
    if (myMusic.paused) {
        myMusic.play();
        musicBtn.innerText = "🔊";
    } else {
        myMusic.pause();
        musicBtn.innerText = "🔇";
    }
}

// 3. SAYFA DEĞİŞTİRME SİSTEMİ
function sayfaDegistir(sayfaId) {
    activePage = sayfaId;

    // Tüm karakter sayfalarını gizle
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');

    // Ana sayfayı gizle
    const anasayfa = document.getElementById('anasayfa');
    if (anasayfa) anasayfa.style.display = 'none';

    // İstenen sayfayı göster
    if (sayfaId === 'anasayfa') {
        if (anasayfa) anasayfa.style.display = 'block';
    } else {
        const hedefSayfa = document.getElementById(sayfaId + '-sayfasi');
        if (hedefSayfa) {
            hedefSayfa.style.display = 'block';
            window.scrollTo(0, 0); // Sayfa değişince en üste çıkar
        }
    }

    // Menü açıksa kapat
    const dropdown = document.getElementById("myDropdown");
    if (dropdown) dropdown.classList.remove("show");
}

// 4. KARAKTER MENÜSÜ (DROPDOWN)
function toggleMenu(event) {
    if (event) event.stopPropagation();
    document.getElementById("myDropdown").classList.toggle("show");
}

// Menü dışına tıklandığında menüyü kapatır
window.onclick = function(event) {
    if (!event.target.matches('.menu-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// 5. EĞLENCELİ STICKER ANİMASYONLARI

// Roket Fırlatma (🚀)
function launchRocket(el, event) {
    if (event) event.stopPropagation();
    el.style.transition = "transform 1.5s ease-in-out, opacity 1s";
    el.style.transform = "translate(-100vw, -100vh) rotate(-45deg)";
    el.style.opacity = "0";
    setTimeout(() => {
        el.style.transition = "none";
        el.style.transform = "translate(0,0) rotate(0deg)";
        el.style.opacity = "1";
    }, 2000);
}

// Şeker Yağmuru (🍭)
function candyRain(event) {
    if (event) event.stopPropagation();
    for (let i = 0; i < 25; i++) {
        let candy = document.createElement("div");
        candy.innerText = "🍭";
        candy.style.position = "fixed";
        candy.style.top = "-50px";
        candy.style.left = Math.random() * 100 + "vw";
        candy.style.fontSize = "40px";
        candy.style.zIndex = "9999";
        candy.style.transition = "transform 2.5s linear";
        candy.style.pointerEvents = "none";
        document.body.appendChild(candy);
        
        setTimeout(() => {
            candy.style.transform = "translateY(110vh) rotate(360deg)";
        }, 50);
        
        setTimeout(() => candy.remove(), 2600);
    }
}

// Dönme Dolap (🎡)
function startWheel(el, event) {
    if (event) event.stopPropagation();
    el.style.transition = "transform 1s ease-in-out";
    el.style.transform = "rotate(720deg)";
    setTimeout(() => {
        el.style.transition = "none";
        el.style.transform = "rotate(0deg)";
    }, 1000);
}

// Arka Plan Değiştirme (🌈)
function changeBg(event) {
    if (event) event.stopPropagation();
    const colors = ['#fff5f5', '#f0fff4', '#f0f9ff', '#fffaf0', '#f5f5ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('anasayfa').style.background = randomColor;
}
