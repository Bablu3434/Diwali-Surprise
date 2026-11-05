
/* ==========================================
   HAPPY DIWALI - PREMIUM JAVASCRIPT
========================================== */

// ELEMENTS
const musicBtn = document.getElementById("musicBtn");
const themeBtn = document.getElementById("themeBtn");
const giftBtn = document.getElementById("giftBtn");
const closeGiftBtn = document.getElementById("closeGiftBtn");
const fireworkBtn = document.getElementById("fireworkBtn");
const flowerBtn = document.getElementById("flowerBtn");
const createWishBtn = document.getElementById("createWishBtn");
const shareBtn = document.getElementById("shareBtn");

const visitorName = document.getElementById("visitorName");
const personalMessage = document.getElementById("personalMessage");

const giftCard = document.querySelector(".gift-card");

// ==========================================
// 1. FIREWORKS ANIMATION
// ==========================================

const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;

let fireworks = [];
let particles = [];

function resizeCanvas() {
    if (!canvas) return;

    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
        devicePixelRatio, 0, 0,
        devicePixelRatio, 0, 0
    );
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = window.innerHeight;
        this.targetY = y;
        this.speed = 5 + Math.random() * 3;
        this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
        this.exploded = false;
    }

    update() {
        this.y -= this.speed;

        if (this.y <= this.targetY) {
            this.exploded = true;
            createExplosion(this.x, this.y, this.color);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        this.velocityX = Math.cos(angle) * speed;
        this.velocityY = Math.sin(angle) * speed;

        this.alpha = 1;
        this.friction = 0.97;
        this.gravity = 0.06;
        this.size = Math.random() * 3 + 1;
    }

    update() {
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        this.velocityY += this.gravity;

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.alpha -= 0.012;
    }

    draw() {
        ctx.save();

        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.fill();
        ctx.restore();
    }
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 65; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function launchFirework() {
    if (!canvas) return;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.55 + 40;

    fireworks.push(new Firework(x, y));
}

function animateFireworks() {
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.exploded) {
            fireworks.splice(index, 1);
        }
    });

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// Automatic fireworks
setInterval(() => {
    launchFirework();
}, 1800);

// Firework button
if (fireworkBtn) {
    fireworkBtn.addEventListener("click", () => {
        for (let i = 0; i < 8; i++) {
            setTimeout(launchFirework, i * 250);
        }
    });
}

// ==========================================
// 2. PERSONALIZED DIWALI WISH
// ==========================================

if (createWishBtn) {
    createWishBtn.addEventListener("click", () => {
        const name = visitorName.value.trim();

        if (!name) {
            personalMessage.textContent =
                "✨ Pehle apna naam likhiye!";
            visitorName.focus();
            return;
        }

        personalMessage.innerHTML = `
            🪔 Happy Diwali, <strong>${escapeHTML(name)}</strong>! 
            <br><br>
            Aapki zindagi khushiyon ke ujale se bhar jaaye,
            har sapna poora ho aur har din nayi umeed lekar aaye.
            <br><br>
            ❤️ Aapko aur aapke parivaar ko Deepawali ki hardik shubhkamnayein!
        `;

        for (let i = 0; i < 5; i++) {
            setTimeout(launchFirework, i * 300);
        }
    });
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

// ==========================================
// 3. GIFT OPEN ANIMATION
// ==========================================

if (giftBtn && giftCard) {
    giftBtn.addEventListener("click", () => {
        giftCard.classList.add("show");

        giftCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        for (let i = 0; i < 6; i++) {
            setTimeout(launchFirework, i * 250);
        }
    });
}

if (closeGiftBtn && giftCard) {
    closeGiftBtn.addEventListener("click", () => {
        giftCard.classList.remove("show");
    });
}

// ==========================================
// 4. FALLING FLOWERS
// ==========================================

const flowerContainer =
    document.getElementById("flowerContainer");

const flowers = ["🌸", "🌺", "🌼", "✨", "🪷"];

function createFlower() {
    if (!flowerContainer) return;

    const flower = document.createElement("span");

    flower.className = "flower";
    flower.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "%";
    flower.style.fontSize = (15 + Math.random() * 20) + "px";

    const duration = 5 + Math.random() * 5;

    flower.style.animationDuration = duration + "s";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, duration * 1000);
}

let flowerInterval = setInterval(createFlower, 650);

if (flowerBtn) {
    flowerBtn.addEventListener("click", () => {
        for (let i = 0; i < 25; i++) {
            setTimeout(createFlower, i * 100);
        }
    });
}

// ==========================================
// 5. MUSIC ON / OFF
// ==========================================

// Put your own royalty-free Diwali music file
// inside the project folder: music.mp3

const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0.35;

let musicPlaying = false;

if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
        if (!musicPlaying) {
            try {
                await music.play();

                musicPlaying = true;
                musicBtn.textContent = "🔊 Music ON";
            } catch (error) {
                musicBtn.textContent = "🎵 Music unavailable";
                console.error("Music could not play:", error);
            }
        } else {
            music.pause();

            musicPlaying = false;
            musicBtn.textContent = "🔇 Music OFF";
        }
    });
}

// ==========================================
// 6. THEME CHANGE
// ==========================================

let alternateTheme = false;

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        alternateTheme = !alternateTheme;

        if (alternateTheme) {
            document.body.style.background =
                "linear-gradient(135deg, #251047, #601c42, #170d2c)";

            themeBtn.textContent = "🌙 Dark Theme";
        } else {
            document.body.style.background =
                "radial-gradient(ellipse at 50% 20%, #38204f 0%, transparent 45%), linear-gradient(135deg, #080b20, #160d2c 55%, #080b20)";

            themeBtn.textContent = "🎨 Change Theme";
        }
    });
}

// ==========================================
// 7. MAGIC MOUSE PARTICLES
// ==========================================

const magicCanvas = document.getElementById("magicCanvas");
const magicCtx = magicCanvas
    ? magicCanvas.getContext("2d")
    : null;

let mouseParticles = [];

function resizeMagicCanvas() {
    if (!magicCanvas) return;

    magicCanvas.width = window.innerWidth * devicePixelRatio;
    magicCanvas.height = window.innerHeight * devicePixelRatio;

    magicCanvas.style.width = window.innerWidth + "px";
    magicCanvas.style.height = window.innerHeight + "px";

    magicCtx.setTransform(
        devicePixelRatio, 0, 0,
        devicePixelRatio, 0, 0
    );
}

resizeMagicCanvas();
window.addEventListener("resize", resizeMagicCanvas);

if (magicCanvas) {
    window.addEventListener("pointermove", (event) => {
        mouseParticles.push({
            x: event.clientX,
            y: event.clientY,
            alpha: 1,
            size: Math.random() * 3 + 1
        });

        if (mouseParticles.length > 80) {
            mouseParticles.shift();
        }
    });
}

function animateMagic() {
    if (!magicCtx) return;

    magicCtx.clearRect(
        0, 0, window.innerWidth, window.innerHeight
    );

    mouseParticles.forEach((particle, index) => {
        particle.alpha -= 0.025;

        magicCtx.beginPath();

        magicCtx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        magicCtx.fillStyle =
            `rgba(255, 209, 102, ${Math.max(0, particle.alpha)})`;

        magicCtx.shadowBlur = 12;
        magicCtx.shadowColor = "#ffd166";

        magicCtx.fill();

        if (particle.alpha <= 0) {
            mouseParticles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateMagic);
}

animateMagic();

// ==========================================
// 8. SHARE WEBSITE
// ==========================================

if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        const shareData = {
            title: "Happy Diwali 🪔",
            text: "✨ Aapke liye ek special Diwali surprise! Is beautiful celebration ko dekhiye:",
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    shareData.text + " " + shareData.url
                );

                alert("🎉 Website link copied! Ab apne friends ko share karein.");
            } else {
                prompt("Website link copy karein:", window.location.href);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Sharing failed:", error);
            }
        }
    });
}

// ==========================================
// 9. WELCOME MESSAGE
// ==========================================

window.addEventListener("load", () => {
    console.log("🪔 Happy Diwali Website Loaded Successfully!");

    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(launchFirework, i * 500);
        }
    }, 1000);
});
