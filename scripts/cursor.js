let initialized = false;

export function initCursorRain() {
  if (initialized) return;
  initialized = true;

  const canvas = document.getElementById("rain-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  /* ================= THROTTLE ================= */
  let lastDropTime = 0;
  const DROP_DELAY = 180;

  /* ================= RAIN AMBIENT ================= */
  const rainDrops = [];

  class Rain {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.len = Math.random() * 10 + 8;
      this.speed = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.3 + 0.2;
    }

    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.len);
      ctx.strokeStyle = `rgba(200,220,255,${this.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  for (let i = 0; i < 120; i++) {
    rainDrops.push(new Rain());
  }

  /* ================= CURSOR RIPPLE ================= */
  const drops = [];
  const ripples = [];

  class Drop {
    constructor(x, targetY) {
      this.x = x;
      this.y = -20;
      this.targetY = targetY;
      this.len = 16;
      this.speed = 5;
      this.done = false;
    }

    update() {
      this.y += this.speed;
      if (this.y >= this.targetY) {
        this.done = true;
        ripples.push(new Ripple(this.x, this.targetY));
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.len);
      ctx.lineTo(this.x, Math.min(this.y, this.targetY));
      ctx.strokeStyle = "rgba(180,210,255,0.9)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.opacity = 0.45;
    }

    update() {
      this.radius += 0.8;
      this.opacity -= 0.004;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180,210,255,${this.opacity})`;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(180,210,255,0.4)";
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  function onMouseMove(e) {
    const now = performance.now();
    if (now - lastDropTime > DROP_DELAY) {
      drops.push(new Drop(e.clientX, e.clientY));
      lastDropTime = now;
    }
  }

  window.addEventListener("mousemove", onMouseMove);

  /* ================= ANIMATION LOOP ================= */
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rainDrops.forEach(r => {
      r.update();
      r.draw();
    });

    drops.forEach((d, i) => {
      d.update();
      d.draw();
      if (d.done) drops.splice(i, 1);
    });

    ripples.forEach((r, i) => {
      r.update();
      r.draw();
      if (r.opacity <= 0) ripples.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
