/* ============================================
   PARTICLES CONFIG — Romantic Theme
   ============================================ */
particlesJS('particles-js', {
    particles: {
        number: {
            value: 65,
            density: { enable: true, value_area: 850 }
        },
        color: {
            value: ["#ff6b9d", "#e94560", "#ffd93d", "#ffffff", "#ff8fab", "#c44569", "#ffb3cb"]
        },
        shape: {
            type: ["circle", "heart", "star"],
            stroke: { width: 0, color: "#000000" }
        },
        opacity: {
            value: 0.65,
            random: true,
            anim: { enable: true, speed: 0.8, opacity_min: 0.08, sync: false }
        },
        size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 2.5, size_min: 0.4, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff6b9d",
            opacity: 0.18,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick:  { enable: true, mode: "push"   },
            resize:   true
        },
        modes: {
            bubble:  { distance: 200, size: 11, duration: 2.5, opacity: 0.85, speed: 3 },
            push:    { particles_nb: 7 },
            repulse: { distance: 200, duration: 0.4 }
        }
    },
    retina_detect: true
});

/* ============================================
   CONFETTI BURST
   ============================================ */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS  = ['#ff6b9d', '#e94560', '#ffd93d', '#ffffff', '#ff8fab', '#c44569', '#a8edea'];
    const SHAPES  = ['circle', 'rect', 'heart'];
    const pieces  = [];
    const TOTAL   = 140;

    for (let i = 0; i < TOTAL; i++) {
        pieces.push({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height * 0.4 - canvas.height * 0.2,
            vx:    (Math.random() - 0.5) * 6,
            vy:    Math.random() * 4 + 2,
            size:  Math.random() * 8 + 4,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            rot:   Math.random() * Math.PI * 2,
            rotV:  (Math.random() - 0.5) * 0.18,
            alpha: 1,
            decay: Math.random() * 0.012 + 0.008
        });
    }

    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size * 0.3);
        ctx.bezierCurveTo(x - size, y + size * 0.6, x, y + size * 0.9, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.9, x + size, y + size * 0.6, x + size, y + size * 0.3);
        ctx.bezierCurveTo(x + size, y, x, y, x, y + size * 0.3);
        ctx.closePath();
        ctx.fill();
    }

    let frame;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach((p, i) => {
            p.x   += p.vx;
            p.y   += p.vy;
            p.vy  += 0.12;            // gravity
            p.vx  *= 0.99;            // air resistance
            p.rot += p.rotV;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                pieces.splice(i, 1);
                return;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle   = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);

            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                drawHeart(ctx, -p.size / 2, -p.size / 2, p.size / 2);
            }

            ctx.restore();
        });

        if (pieces.length > 0) {
            frame = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    cancelAnimationFrame(frame);
    animate();
}

/* ============================================
   RIPPLE ON BUTTON CLICK
   ============================================ */
function createRipple(btn, event) {
    const circle = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;

    circle.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${event.clientX - rect.left}px;
        top:  ${event.clientY - rect.top }px;
        background: rgba(255,255,255,0.35);
        border-radius: 50%;
        transform: translate(-50%,-50%) scale(0);
        animation: ripple 0.7s linear forwards;
        pointer-events: none;
    `;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 750);
}

/* ============================================
   STAGGERED PARAGRAPH REVEAL
   ============================================ */
function revealLetterParagraphs() {
    const paras = document.querySelectorAll('.letter-body p');
    paras.forEach((p, i) => {
        setTimeout(() => {
            p.classList.add('visible');
        }, 200 + i * 180);
    });
}

/* ============================================
   PUSH PARTICLES BURST (safe helper)
   ============================================ */
function burstParticles(count = 5) {
    try {
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.modes.pushParticles(count);
        }
    } catch (e) { /* silently ignore if particles not ready */ }
}

/* ============================================
   MAIN BUTTON HANDLER
   ============================================ */
document.getElementById('open-btn').addEventListener('click', function (event) {
    const btn           = this;
    const btnContainer  = document.getElementById('btn-container');
    const letterContainer = document.getElementById('letter-container');
    const letterPaper   = document.querySelector('.letter-paper');
    const envelope      = document.querySelector('.envelope');

    // Ripple effect on click
    createRipple(btn, event);

    // Disable button immediately to prevent double-click
    btn.disabled = true;

    // ── Burst particles on click
    for (let i = 0; i < 24; i++) {
        setTimeout(() => burstParticles(1), i * 35);
    }

    // ── Fade & shrink button container
    btnContainer.style.transition = 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.4,0,0.2,1)';
    btnContainer.style.opacity    = '0';
    btnContainer.style.transform  = 'scale(0.75) translateY(-30px)';

    setTimeout(() => {
        btnContainer.style.display = 'none';

        // ── Show envelope
        letterContainer.classList.remove('hidden');
        letterContainer.classList.add('show');

        // ── Open envelope flap after envelope appears
        setTimeout(() => {
            envelope.classList.add('open');
        }, 900);

        // ── Slide in letter paper
        setTimeout(() => {
            letterPaper.classList.add('show');

            // ── Staggered paragraph reveal
            setTimeout(revealLetterParagraphs, 400);

        }, 1700);

        // ── Confetti burst when letter opens
        setTimeout(launchConfetti, 1900);

    }, 620);
});

/* ============================================
   HANDLE RESIZE for confetti canvas
   ============================================ */
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});