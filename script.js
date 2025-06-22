// #####################################  COLOR KIT SCRIPT  ######################################

// +++++++++++++++++++++++++++    START ANIMATIONS TITLE & BUTTONS      +++++++++++++++++++++++++++++++
// Quelle est la fonction 
function revealOnScroll(selector, animationClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    el.classList.add('fade-hidden'); // caché de base
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass); // déclenche l'animation
        entry.target.classList.remove('fade-hidden'); // n'est plus caché
       } else {
        entry.target.classList.remove(animationClass); // remise à zero
        entry.target.classList.add('fade-hidden'); // caché à nouveau
      }
    });
  }, {
    threshold: 0.3 // commence l'animation quand 30% est visible
  });

  elements.forEach(el => observer.observe(el));
}

// Appelle la fonction pour les éléments suivants
revealOnScroll('h2:not(.hero__title)', 'fade-zoom-in');
revealOnScroll('.cta__btn:not(.cta__btn--hero)', 'fade-zoom-in');
// ++++++++++++++++++++++++++++++++  END ANIMATIONS TITLE & BUTTONS  z+++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++  START BURGER MENU  +++++++++++++++++++++++++++++++++++++++++++

function setupBurgerMenu(btnSelector, menuSelector) {
  const btn = document.querySelector(btnSelector);
  const menu = document.querySelector(menuSelector);

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open'); // toggle menu visible
    btn.classList.toggle('active', isOpen);       // toggle anim barres en croix
    btn.setAttribute('aria-expanded', isOpen);
  });
}

setupBurgerMenu('.burger__btn', '#menu-desktop');
// ++++++++++++++++++++++++++++++++++++++  END BURGER MENU  +++++++++++++++++++++++++++++++++++++++++++




// ++++++++++++++++++++++++++++    START GALLERY SWIPER INDEX     +++++++++++++++++++++++++++++++++++++

 document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.gallery__swiper-wrapper');
    const btnPrev = document.querySelector('.swiper__btn--prev');
    const btnNext = document.querySelector('.swiper__btn--next');

    const scrollAmount = 700; // swipe de 700px 

    btnPrev.addEventListener('click', () => {
      wrapper.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    btnNext.addEventListener('click', () => {
      wrapper.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
// ++++++++++++++++++++++++++++    END GALLERY SWIPER INDEX     +++++++++++++++++++++++++++++++++++++





// ++++++++++++++++++++  START CAROUSEL 3D ANIMATION NUANCIERS & STICKERS PAGES  ++++++++++++++++++++++


const cards = document.querySelectorAll('.carousel3D__card');
const prevBtn = document.querySelector('.swiper__btn--prev');
const nextBtn = document.querySelector('.swiper__btn--next');
const totalCards = cards.length;
let centerIndex = Math.floor(totalCards / 2);

function updateCarousel() {
  const isMobile = window.innerWidth < 750;

  cards.forEach((card, i) => {
    const offset = i - centerIndex;

    card.style.zIndex = (totalCards - Math.abs(offset)).toString();

    if (offset === 0) {
      card.style.transform = 'translateX(-50%) scale(1.2) translateZ(50px)';
      card.style.filter = 'none';
      card.style.opacity = 1;
    } else if (offset === -1) {
      card.style.transform = 'translateX(calc(-50% - 150px)) scale(0.9) translateZ(-100px) rotateY(15deg)';
      card.style.filter = 'brightness(0.8)';
      card.style.opacity = 1;
    } else if (offset === 1) {
      card.style.transform = 'translateX(calc(-50% + 150px)) scale(0.9) translateZ(-100px) rotateY(-15deg)';
      card.style.filter = 'brightness(0.8)';
      card.style.opacity = 1;
    } else if (!isMobile && offset === -2) {
      card.style.transform = 'translateX(calc(-50% - 300px)) scale(0.7) translateZ(-200px) rotateY(30deg)';
      card.style.filter = 'brightness(0.6)';
      card.style.opacity = 1;
    } else if (!isMobile && offset === 2) {
      card.style.transform = 'translateX(calc(-50% + 300px)) scale(0.7) translateZ(-200px) rotateY(-30deg)';
      card.style.filter = 'brightness(0.6)';
      card.style.opacity = 1;
    } else {
      card.style.opacity = 0;
      card.style.transform = 'translateX(-50%) scale(0.5) translateZ(-300px)';
      card.style.zIndex = 0;
    }
  });
}

prevBtn.addEventListener('click', () => {
  if (centerIndex > 0) {
    centerIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (centerIndex < totalCards - 1) {
    centerIndex++;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
updateCarousel();
// ++++++++++++++++++++  END CAROUSEL 3D ANIMATION NUANCIERS & STICKERS PAGES  ++++++++++++++++++++++
