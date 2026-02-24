/* script.js */

let activePage = 'anasayfa';

// SAYFA DEĞİŞTİRME FONKSİYONU
function sayfaDegistir(sayfa) {
    activePage = sayfa;
    // Tüm sayfaları gizle
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('anasayfa').style.display = 'none';
    
    // İstenen sayfayı göster
    if (sayfa === 'anasayfa') {
        document.getElementById('anasayfa').style.display = 'flex';
    } else {
        const pElement = document.getElementById(sayfa + '-sayfasi');
        if(pElement) pElement.style.display = 'block';
    }
    
    // Menüyü otomatik kapat
    document.getElementById("myDropdown").classList.remove("show");
    window.scrollTo(0,0);
}

// ROKET FIRLATMA (Sağ Alt - Roket emojisine eklenebilir)
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

// ŞEKER YAĞMURU (Sağ Orta - Lolipop emojisine tıklandığında)
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
        setTimeout(() => { candy.style.transform = "translateY(110vh) rotate(360deg)"; }, 50);
        setTimeout(() => candy.remove(), 3100);
    }
}

// DÖNME DOLAP DÖNDÜRME (Sol Alt -🎡 emojisi için)
function startWheel(el, e) {
    if(e) e.stopPropagation();
    el.style.transition = "transform 0.8s ease-in-out";
    el.style.transform = "rotate(360deg)";
    setTimeout(() => { 
        el.style.transition = "none"; 
        el.style.transform = "rotate(0deg)"; 
    }, 800);
}

// ARKA PLAN DEĞİŞTİRME (Sol Üst - 🌈 emojisi için)
function changeBg(e) { 
    if(e) e.stopPropagation(); 
    const randomColor = `hsl(${Math.random() * 360}, 100%, 97%)`;
    document.getElementById('anasayfa').style.background = randomColor; 
}

// MENÜ AÇMA/KAPAMA
function toggleMenu(e) { 
    if(e) e.stopPropagation(); 
    document.getElementById("myDropdown").classList.toggle("show"); 
}

// Ekranda herhangi bir yere basınca menüyü kapat
window.onclick = function() { 
    const dropdown = document.getElementById("myDropdown");
    if (dropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove("show"); 
    }
}
