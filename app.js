const express = require('express');
const app = express();
const PORT = 3000;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Gonzales App — Premium</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --c1:#0a0a0f;--c2:#111120;--accent:#7c3aed;--accent2:#06b6d4;
  --gold:#f59e0b;--white:#f1f5f9;--muted:#94a3b8;
}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--c1);color:var(--white);overflow-x:hidden}
/* CANVAS */
#bg-canvas{position:fixed;inset:0;z-index:0;pointer-events:none}
/* NAVBAR */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 2rem;display:flex;justify-content:space-between;align-items:center;
  backdrop-filter:blur(20px);background:rgba(10,10,15,.7);border-bottom:1px solid rgba(124,58,237,.2);
  transition:all .4s ease}
.logo{font-size:1.5rem;font-weight:900;background:linear-gradient(90deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:2px}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{color:var(--muted);text-decoration:none;font-weight:600;font-size:.9rem;letter-spacing:1px;text-transform:uppercase;transition:color .3s}
.nav-links a:hover{color:var(--white)}
.nav-cta{padding:.6rem 1.5rem;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:50px;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;cursor:pointer;transition:transform .3s,box-shadow .3s}
.nav-cta:hover{transform:scale(1.05);box-shadow:0 0 25px rgba(124,58,237,.6)}
/* HERO */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:6rem 2rem 4rem;z-index:1}
.hero-badge{display:inline-block;padding:.4rem 1.2rem;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.4);border-radius:50px;font-size:.8rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--accent2);margin-bottom:2rem;animation:fadeDown .8s ease both}
.hero h1{font-size:clamp(3rem,8vw,7rem);font-weight:900;line-height:1.05;margin-bottom:1.5rem;animation:fadeUp 1s .2s ease both}
.hero h1 .grad{background:linear-gradient(135deg,var(--accent),var(--accent2),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{max-width:600px;font-size:1.2rem;color:var(--muted);line-height:1.7;margin-bottom:3rem;animation:fadeUp 1s .4s ease both}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp 1s .6s ease both}
.btn-primary{padding:.9rem 2.5rem;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:50px;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--accent2),var(--accent));opacity:0;transition:opacity .3s}
.btn-primary:hover::after{opacity:1}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(124,58,237,.5)}
.btn-outline{padding:.9rem 2.5rem;background:transparent;border:2px solid rgba(124,58,237,.5);border-radius:50px;color:var(--white);font-family:'Outfit',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:all .3s}
.btn-outline:hover{border-color:var(--accent);background:rgba(124,58,237,.1);transform:translateY(-3px)}
/* FLOATING ORBS */
.orb{position:absolute;border-radius:50%;filter:blur(80px);animation:float 8s ease-in-out infinite;pointer-events:none}
.orb1{width:400px;height:400px;background:rgba(124,58,237,.3);top:-10%;left:-10%;animation-delay:0s}
.orb2{width:350px;height:350px;background:rgba(6,182,212,.2);bottom:10%;right:-5%;animation-delay:-3s}
.orb3{width:250px;height:250px;background:rgba(245,158,11,.15);top:40%;left:60%;animation-delay:-5s}
/* SCROLL INDICATOR */
.scroll-ind{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;animation:fadeIn 1s 1.5s both}
.scroll-ind span{font-size:.75rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase}
.scroll-line{width:1px;height:60px;background:linear-gradient(to bottom,var(--accent),transparent);animation:scrollPulse 2s ease-in-out infinite}
/* STATS */
.stats{position:relative;z-index:1;padding:5rem 2rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;max-width:900px;margin:0 auto}
.stat-card{text-align:center;padding:2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:20px;transition:all .4s;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,.1),transparent);opacity:0;transition:opacity .4s}
.stat-card:hover::before{opacity:1}
.stat-card:hover{transform:translateY(-8px);border-color:rgba(124,58,237,.4);box-shadow:0 20px 60px rgba(124,58,237,.2)}
.stat-num{font-size:3.5rem;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-label{font-size:.9rem;color:var(--muted);margin-top:.5rem;letter-spacing:1px;text-transform:uppercase}
/* FEATURES */
.section{position:relative;z-index:1;padding:6rem 2rem;max-width:1200px;margin:0 auto}
.section-title{text-align:center;margin-bottom:4rem}
.section-title h2{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:1rem}
.section-title p{color:var(--muted);font-size:1.1rem;max-width:500px;margin:0 auto}
.pill{display:inline-block;padding:.3rem 1rem;background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.3);border-radius:50px;font-size:.75rem;font-weight:700;color:var(--accent2);letter-spacing:2px;text-transform:uppercase;margin-bottom:1rem}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}
.feat{padding:2.5rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:24px;transition:all .4s;cursor:default;position:relative;overflow:hidden}
.feat::after{content:'';position:absolute;inset:0;opacity:0;transition:opacity .4s;background:linear-gradient(135deg,rgba(124,58,237,.08),rgba(6,182,212,.05))}
.feat:hover::after{opacity:1}
.feat:hover{transform:translateY(-10px);border-color:rgba(124,58,237,.4);box-shadow:0 30px 80px rgba(0,0,0,.4)}
.feat-icon{font-size:2.5rem;margin-bottom:1.5rem;display:block}
.feat h3{font-size:1.3rem;font-weight:700;margin-bottom:.8rem}
.feat p{color:var(--muted);line-height:1.7;font-size:.95rem}
/* MARQUEE */
.marquee-wrap{overflow:hidden;padding:3rem 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);margin:4rem 0;position:relative;z-index:1}
.marquee-track{display:flex;gap:3rem;animation:marquee 20s linear infinite;width:max-content}
.marquee-item{font-size:1.1rem;font-weight:700;color:var(--muted);letter-spacing:3px;text-transform:uppercase;white-space:nowrap;padding:0 1rem}
.marquee-item span{color:var(--accent);margin-right:1rem}
/* CTA SECTION */
.cta-section{position:relative;z-index:1;padding:8rem 2rem;text-align:center}
.cta-box{max-width:700px;margin:0 auto;padding:5rem 3rem;background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(6,182,212,.08));border:1px solid rgba(124,58,237,.3);border-radius:32px;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:conic-gradient(from 0deg,transparent,rgba(124,58,237,.1),transparent);animation:rotate 8s linear infinite}
.cta-box h2{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:1.5rem;position:relative}
.cta-box p{color:var(--muted);font-size:1.1rem;margin-bottom:2.5rem;position:relative}
/* FOOTER */
footer{position:relative;z-index:1;padding:2rem;text-align:center;border-top:1px solid rgba(255,255,255,.06);color:var(--muted);font-size:.85rem}
footer span{color:var(--accent)}
/* CURSOR */
.cursor{position:fixed;width:20px;height:20px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;transition:transform .2s,background .2s;mix-blend-mode:difference}
.cursor-trail{position:fixed;width:8px;height:8px;background:var(--accent2);border-radius:50%;pointer-events:none;z-index:9998;opacity:.6}
/* REVEAL */
.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s ease,transform .8s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
/* ANIMATIONS */
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-30px) scale(1.05)}66%{transform:translate(-20px,20px) scale(.95)}}
@keyframes scrollPulse{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.3;transform:scaleY(.5)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes countUp{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
@keyframes glitch{0%,100%{clip-path:inset(0 0 100% 0);transform:translate(0)}10%{clip-path:inset(20% 0 60% 0);transform:translate(-4px)}20%{clip-path:inset(50% 0 30% 0);transform:translate(4px)}30%{clip-path:inset(80% 0 5% 0);transform:translate(-2px)}40%{clip-path:inset(0 0 80% 0);transform:translate(2px)}50%{clip-path:inset(40% 0 40% 0);transform:translate(0)}}
@keyframes pulse-ring{0%{transform:scale(.9);box-shadow:0 0 0 0 rgba(124,58,237,.7)}70%{transform:scale(1);box-shadow:0 0 0 20px rgba(124,58,237,0)}100%{transform:scale(.9);box-shadow:0 0 0 0 rgba(124,58,237,0)}}
.typing::after{content:'|';animation:blink .7s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.pulse-btn{animation:pulse-ring 2s cubic-bezier(.455,.03,.515,.955) infinite}
</style>
</head>
<body>
<div class="cursor" id="cursor"></div>
<div class="cursor-trail" id="trail"></div>
<canvas id="bg-canvas"></canvas>

<nav id="navbar">
  <div class="logo">GONZALES</div>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#stats">Stats</a></li>
    <li><a href="#cta">Contacto</a></li>
  </ul>
  <button class="nav-cta">Empezar</button>
</nav>

<section class="hero">
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>
  <div class="orb orb3"></div>
  <div class="hero-badge">🚀 Versión 2.0 Disponible</div>
  <h1>El Futuro es<br/><span class="grad" id="typed-text"></span></h1>
  <p>Plataforma de siguiente generación diseñada para equipos que quieren resultados extraordinarios.</p>
  <div class="hero-btns">
    <button class="btn-primary pulse-btn">Comenzar Gratis</button>
    <button class="btn-outline">Ver Demo →</button>
  </div>
  <div class="scroll-ind">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<div class="marquee-wrap">
  <div class="marquee-track" id="mq">
    <div class="marquee-item"><span>✦</span>Innovación</div>
    <div class="marquee-item"><span>✦</span>Velocidad</div>
    <div class="marquee-item"><span>✦</span>Calidad Premium</div>
    <div class="marquee-item"><span>✦</span>Seguridad</div>
    <div class="marquee-item"><span>✦</span>Escalabilidad</div>
    <div class="marquee-item"><span>✦</span>Rendimiento</div>
    <div class="marquee-item"><span>✦</span>Innovación</div>
    <div class="marquee-item"><span>✦</span>Velocidad</div>
    <div class="marquee-item"><span>✦</span>Calidad Premium</div>
    <div class="marquee-item"><span>✦</span>Seguridad</div>
    <div class="marquee-item"><span>✦</span>Escalabilidad</div>
    <div class="marquee-item"><span>✦</span>Rendimiento</div>
  </div>
</div>

<div id="stats">
  <div class="stats">
    <div class="stat-card reveal">
      <div class="stat-num" data-target="99">0</div>
      <div class="stat-label">% Uptime</div>
    </div>
    <div class="stat-card reveal">
      <div class="stat-num" data-target="50">0</div>
      <div class="stat-label">K+ Usuarios</div>
    </div>
    <div class="stat-card reveal">
      <div class="stat-num" data-target="200">0</div>
      <div class="stat-label">Países</div>
    </div>
    <div class="stat-card reveal">
      <div class="stat-num" data-target="4">0</div>
      <div class="stat-label">★ Rating</div>
    </div>
  </div>
</div>

<section class="section" id="features">
  <div class="section-title reveal">
    <div class="pill">Características</div>
    <h2>Todo lo que necesitas</h2>
    <p>Herramientas poderosas para llevar tu negocio al siguiente nivel</p>
  </div>
  <div class="features-grid">
    <div class="feat reveal">
      <span class="feat-icon">⚡</span>
      <h3>Ultra Rápido</h3>
      <p>Rendimiento de clase mundial con tiempos de respuesta menores a 50ms en cualquier parte del planeta.</p>
    </div>
    <div class="feat reveal">
      <span class="feat-icon">🛡️</span>
      <h3>Máxima Seguridad</h3>
      <p>Encriptación de extremo a extremo y auditorías de seguridad continuas para proteger tus datos.</p>
    </div>
    <div class="feat reveal">
      <span class="feat-icon">🤖</span>
      <h3>IA Integrada</h3>
      <p>Automatización inteligente que aprende de tu negocio y optimiza procesos automáticamente.</p>
    </div>
    <div class="feat reveal">
      <span class="feat-icon">📊</span>
      <h3>Analytics Pro</h3>
      <p>Dashboards en tiempo real con insights accionables para tomar decisiones basadas en datos.</p>
    </div>
    <div class="feat reveal">
      <span class="feat-icon">🌐</span>
      <h3>Global Scale</h3>
      <p>Infraestructura distribuida en 30+ regiones para garantizar latencia mínima globalmente.</p>
    </div>
    <div class="feat reveal">
      <span class="feat-icon">🔗</span>
      <h3>100+ Integraciones</h3>
      <p>Conecta con todas tus herramientas favoritas con un solo clic, sin código requerido.</p>
    </div>
  </div>
</section>

<section class="cta-section" id="cta">
  <div class="cta-box reveal">
    <h2>¿Listo para el <span class="grad">siguiente nivel</span>?</h2>
    <p>Únete a miles de empresas que ya transformaron su negocio con Gonzales App.</p>
    <button class="btn-primary" style="font-size:1.1rem;padding:1rem 3rem">Comenzar Ahora — Es Gratis</button>
  </div>
</section>

<footer>
  <p>© 2026 <span>GONZALES APP</span> — Hecho con ❤️ en San Ramón</p>
</footer>

<script>
// ── CANVAS PARTICLES ──────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
resize();window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset()}
  reset(){
    this.x=Math.random()*W;this.y=Math.random()*H;
    this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;
    this.r=Math.random()*2+.5;this.alpha=Math.random()*.6+.1;
    this.color=Math.random()>.5?'124,58,237':'6,182,212';
  }
  update(){
    this.x+=this.vx;this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
  }
  draw(){
    ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle='rgba('+this.color+','+this.alpha+')';ctx.fill();
  }
}
for(let i=0;i<120;i++)particles.push(new Particle());
function drawLines(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath();
        ctx.strokeStyle='rgba(124,58,237,'+(1-d/120)*.12+')';
        ctx.lineWidth=.5;
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
}
function loop(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  drawLines();requestAnimationFrame(loop);
}
loop();

// ── CUSTOM CURSOR ──────────────────────────────────
const cursor=document.getElementById('cursor');
const trail=document.getElementById('trail');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx-10+'px';cursor.style.top=my-10+'px'});
function animTrail(){
  tx+=(mx-tx)*.15;ty+=(my-ty)*.15;
  trail.style.left=tx-4+'px';trail.style.top=ty-4+'px';
  requestAnimationFrame(animTrail);
}animTrail();
document.querySelectorAll('button,a,.feat,.stat-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='scale(2.5)';cursor.style.background='var(--accent2)'});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='scale(1)';cursor.style.background='var(--accent)'});
});

// ── TYPING EFFECT ──────────────────────────────────
const words=['Ahora.','Gonzales.','Posible.','Increíble.'];
let wi=0,ci=0,del=false;
const el=document.getElementById('typed-text');
el.classList.add('typing');
function type(){
  const w=words[wi];
  if(!del){
    el.textContent=w.slice(0,++ci);
    if(ci===w.length){del=true;setTimeout(type,1500);return}
  } else {
    el.textContent=w.slice(0,--ci);
    if(ci===0){del=false;wi=(wi+1)%words.length}
  }
  setTimeout(type,del?60:110);
}
type();

// ── SCROLL REVEAL ──────────────────────────────────
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*100);
    }
  });
},{threshold:.15});
reveals.forEach(r=>obs.observe(r));

// ── COUNT UP ──────────────────────────────────
const nums=document.querySelectorAll('.stat-num');
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target=+e.target.dataset.target;
      let curr=0;const step=target/60;
      const iv=setInterval(()=>{
        curr+=step;if(curr>=target){curr=target;clearInterval(iv)}
        e.target.textContent=Math.floor(curr);
      },30);
      cObs.unobserve(e.target);
    }
  });
},{threshold:.5});
nums.forEach(n=>cObs.observe(n));

// ── PARALLAX ORBS ──────────────────────────────────
document.addEventListener('mousemove',e=>{
  const rx=e.clientX/W-.5,ry=e.clientY/H-.5;
  document.querySelector('.orb1').style.transform='translate('+rx*40+'px,'+ry*40+'px)';
  document.querySelector('.orb2').style.transform='translate('+rx*-30+'px,'+ry*-30+'px)';
  document.querySelector('.orb3').style.transform='translate('+rx*20+'px,'+ry*20+'px)';
});

// ── NAVBAR SCROLL ──────────────────────────────────
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.background=scrollY>50?'rgba(10,10,15,.95)':'rgba(10,10,15,.7)';
  nav.style.boxShadow=scrollY>50?'0 4px 30px rgba(0,0,0,.5)':'none';
});

// ── TILT CARDS ──────────────────────────────────
document.querySelectorAll('.feat').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const cx=(e.clientX-r.left)/r.width-.5;
    const cy=(e.clientY-r.top)/r.height-.5;
    card.style.transform='translateY(-10px) rotateX('+(-cy*12)+'deg) rotateY('+(cx*12)+'deg)';
    card.style.transition='transform .1s';
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='translateY(0) rotateX(0) rotateY(0)';
    card.style.transition='transform .5s ease';
  });
});
</script>
</body>
</html>`;

app.get('/', (req, res) => {
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Landing page en http://localhost:${PORT}`);
});