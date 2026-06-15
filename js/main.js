/* ============================================================
   ICGIESTec 2026 - International Conference Website
   main.js - Complete JavaScript Functionality
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('loaded');
        // Initialize AOS after preloader
        if (typeof AOS !== 'undefined') {
          AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: 'mobile'
          });
        }
      }, 500);
    }
  });

  /* ============================================================
     2. NAVBAR FUNCTIONALITY
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {

    var navbar = document.getElementById('mainNavbar');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarCollapse = document.getElementById('navbarNav');

    // Navbar scroll effect
    function handleNavbarScroll() {
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // Close mobile menu on link click
    var allLinksAndItems = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');

    allLinksAndItems.forEach(function (link) {
      link.addEventListener('click', function () {
        if (!link.classList.contains('dropdown-toggle')) {
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      });
    });

    // Active nav link on scroll (spy)
    function updateActiveNav() {
      var scrollPos = window.scrollY + 100;
      var sections = document.querySelectorAll('section[id]');

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');

            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }

            // Check dropdown items context
            var parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
              var dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
              if (dropdownMenu) {
                var matches = dropdownMenu.querySelector('a[href="#' + id + '"]');
                if (matches) {
                  link.classList.add('active');
                }
              }
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav);

    /* ============================================================
       3. COUNTDOWN TIMER
       ============================================================ */
    var targetDate = new Date('2026-08-26T08:00:00+08:00').getTime();

    function updateCountdown() {
      var now = new Date().getTime();
      var distance = targetDate - now;

      if (distance < 0) {
        document.querySelectorAll('.countdown-number').forEach(function (el) {
          el.textContent = '0';
        });
        return;
      }

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var daysEl = document.getElementById('countdown-days');
      var hoursEl = document.getElementById('countdown-hours');
      var minutesEl = document.getElementById('countdown-minutes');
      var secondsEl = document.getElementById('countdown-seconds');

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
      if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
      if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ============================================================
       4. ANIMATED COUNTERS (CountUp)
       ============================================================ */
    function animateCounters() {
      var counters = document.querySelectorAll('.counter-value');

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-target'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              // Ease out
              var eased = 1 - Math.pow(1 - progress, 3);
              var current = Math.floor(eased * target);
              el.textContent = current + suffix;
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                el.textContent = target + suffix;
              }
            }

            window.requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    }

    animateCounters();


    /* ============================================================
       6. BACK TO TOP BUTTON
       ============================================================ */
    var backToTop = document.getElementById('backToTop');

    function handleBackToTopVisibility() {
      if (!backToTop) return;
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', handleBackToTopVisibility);

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ============================================================
       7. HERO PARTICLES
       ============================================================ */
    function createParticles() {
      var container = document.querySelector('.hero-particles');
      if (!container) return;

      for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
      }
    }

    createParticles();

    /* ============================================================
       8. VENUE SWIPER
       ============================================================ */
    if (typeof Swiper !== 'undefined') {
      new Swiper('.venue-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.venue-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.venue-swiper .swiper-button-next',
          prevEl: '.venue-swiper .swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
        },
        effect: 'slide',
      });
    }

    /* ============================================================
       9. GALLERY SWIPER
       ============================================================ */
    if (typeof Swiper !== 'undefined') {
      new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.gallery-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.gallery-swiper .swiper-button-next',
          prevEl: '.gallery-swiper .swiper-button-prev',
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
        effect: 'slide',
      });
    }

    /* ============================================================
       9a. HERO BACKGROUND SWIPER
       ============================================================ */
    if (typeof Swiper !== 'undefined') {
      new Swiper('.hero-bg-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: document.querySelector('.hero-swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: document.querySelector('.hero-swiper-button-next'),
          prevEl: document.querySelector('.hero-swiper-button-prev'),
        },
      });
    }

    /* ============================================================
       10. LIGHTBOX (GLightbox)
       ============================================================ */
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
      });
    }

    /* ============================================================
       11. CONTACT FORM
       ============================================================ */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple validation
        var name = document.getElementById('contactName');
        var email = document.getElementById('contactEmail');
        var message = document.getElementById('contactMessage');
        var isValid = true;

        [name, email, message].forEach(function (field) {
          if (field && !field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
          } else if (field) {
            field.classList.remove('is-invalid');
          }
        });

        if (email && email.value && !isValidEmail(email.value)) {
          email.classList.add('is-invalid');
          isValid = false;
        }

        if (isValid) {
          // Show success message
          var btn = contactForm.querySelector('.btn-submit');
          var originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
          btn.disabled = true;
          btn.style.background = '#10b981';

          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
          }, 3000);
        }
      });
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Remove invalid state on input
    document.querySelectorAll('.form-control').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });

    /* ============================================================
       12. LAZY LOADING IMAGES
       ============================================================ */
    function lazyLoadImages() {
      var images = document.querySelectorAll('img[data-src]');

      if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              img.classList.remove('img-placeholder');
              imageObserver.unobserve(img);
            }
          });
        }, { rootMargin: '50px' });

        images.forEach(function (img) {
          imageObserver.observe(img);
        });
      } else {
        // Fallback
        images.forEach(function (img) {
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
        });
      }
    }

    lazyLoadImages();

    /* ============================================================
       13. IMAGE ERROR HANDLING
       ============================================================ */
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        // Replace with placeholder
        var wrapper = this.closest('.speaker-photo-wrapper');
        if (wrapper) {
          var placeholder = document.createElement('div');
          placeholder.className = 'speaker-photo-placeholder';
          placeholder.innerHTML = '<i class="fas fa-user"></i>';
          wrapper.innerHTML = '';
          wrapper.appendChild(placeholder);
          // Re-add badge if needed
          var card = wrapper.closest('.speaker-card');
          if (card) {
            var country = card.querySelector('.speaker-country');
            if (country) {
              var badge = document.createElement('span');
              badge.className = 'speaker-country-badge';
              badge.textContent = country.textContent;
              wrapper.appendChild(badge);
            }
          }
        } else if (this.classList.contains('publication-logo')) {
          var pubCard = this.closest('.publication-card');
          if (pubCard) {
            var iconDiv = document.createElement('div');
            iconDiv.className = 'pub-placeholder-icon';
            iconDiv.innerHTML = '<i class="fas fa-journal-whills"></i>';
            this.replaceWith(iconDiv);
          }
        } else {
          // Generic fallback - make a gradient placeholder
          this.style.display = 'none';
          var div = document.createElement('div');
          div.className = 'img-placeholder';
          div.style.width = '100%';
          div.style.height = this.style.height || '300px';
          this.parentNode.insertBefore(div, this);
        }
      });
    });

    /* ============================================================
       14. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = navbar ? navbar.offsetHeight : 80;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });

    /* ============================================================
       15. YEAR IN FOOTER
       ============================================================ */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

  }); // End DOMContentLoaded
})();
