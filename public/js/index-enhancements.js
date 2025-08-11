// index-enhancements.js

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  });

  // Theme Toggle
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeSwitch.checked = true;
    }
    themeSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    });
  }

  // Particles.js
  if (window.tsParticles) {
    tsParticles.load('tsparticles', {
      background: { color: { value: '#000000' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: { push: { quantity: 4 } }
      },
      particles: {
        color: { value: '#e50914' },
        links: { enable: true, color: '#ffffff', distance: 150 },
        collisions: { enable: true },
        move: { enable: true, speed: 1 },
        number: { value: 50 },
        opacity: { value: 0.4 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true
    });
  }

  // GSAP ScrollTrigger for Floating Ticket
  const floatingTicket = document.querySelector('.floating-ticket');
  if (floatingTicket && typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(floatingTicket, {
      scrollTrigger: {
        trigger: '#todayShow',
        start: 'top bottom',
        end: 'top center',
        scrub: true
      },
      y: 200,
      ease: 'power2.out'
    });

    gsap.to(floatingTicket, {
      y: '+=10',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 2
    });
  }

  // Parallax Effect
  const parallax = document.querySelector('.hero');
  if (parallax) {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      parallax.style.backgroundPositionY = offset * 0.5 + 'px';
    });
  }

  // Scroll to top button
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    window.onscroll = () => {
      topBtn.style.display = document.documentElement.scrollTop > 200 ? 'block' : 'none';
    };
    topBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // Countdown Timer
  const countdown = () => {
    const countdownDate = new Date("August 14, 2025 11:00:00").getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (days && hours && minutes && seconds) {
      days.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds.innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
  };
  setInterval(countdown, 1000);

  // Dummy Auth Logic
  const userPhoto = document.getElementById('userPhoto');
  const userName = document.getElementById('userName');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (loginBtn && logoutBtn && userPhoto && userName) {
    const fakeUser = {
      name: "Teja Kodiyala",
      photo: "https://i.pravatar.cc/100?img=67"
    };

  loginBtn.onclick = () => {
    userPhoto.src = fakeUser.photo || '/public/assets/default-user.png';
    userName.textContent = fakeUser.name;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  };
  logoutBtn.onclick = () => {
    userPhoto.src = '';
    userName.textContent = '';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  };
}

  // Custom Cursor
  const cursor = document.createElement('div');
  cursor.id = 'customCursor';
  document.body.appendChild(cursor);

  cursor.style.position = 'fixed';
  cursor.style.zIndex = '10000';
  cursor.style.width = '12px';
  cursor.style.height = '12px';
  cursor.style.borderRadius = '50%';
  cursor.style.background = 'rgba(255, 255, 255, 0.7)';
  cursor.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
  cursor.style.pointerEvents = 'none';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'transform 0.1s ease-out';

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
});