// Viewport height fix for mobile browsers
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize viewport height
setViewportHeight();

// Update on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100);
});

// Mobile Navigation Toggle - Melhorado
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");
const body = document.body;

if (mobileMenu && navMenu) {
  mobileMenu.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains("active")) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.width = "100%";
    } else {
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }
  });
}

// Enhanced Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;
let ticking = false;

function updateNavbar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  
  // Hide navbar on scroll down, show on scroll up (mobile)
  if (window.innerWidth <= 768) {
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
  }
  
  lastScrollTop = scrollTop;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// Smooth scrolling for anchor links - Otimizado
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - (window.innerWidth <= 768 ? 60 : 70);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Touch device detection and optimization
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  document.body.classList.add("touch-device");
  
  // Optimize hover effects for touch devices
  document.querySelectorAll(".segment, .expertise-card, .blog-card, .stat-card").forEach((card) => {
    card.addEventListener("touchstart", function() {
      this.classList.add("touch-active");
    });
    
    card.addEventListener("touchend", function() {
      setTimeout(() => {
        this.classList.remove("touch-active");
      }, 150);
    });
  });
}

// Form validation and submission - Mobile optimized
const contactForm = document.getElementById("contact-form");
const formFields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
};

const errorElements = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
};

// Validation functions
function validateName(name) {
  return name.trim().length >= 2;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateSubject(subject) {
  return subject.trim() !== "";
}

function validateMessage(message) {
  return message.trim().length >= 10;
}

// Mobile-optimized form validation
if (contactForm) {
  // Prevent zoom on iOS when focusing inputs
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    Object.values(formFields).forEach(field => {
      if (field) {
        field.style.fontSize = "16px";
      }
    });
  }

  // Real-time validation with debouncing
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  if (formFields.name) {
    formFields.name.addEventListener("blur", debounce(() => {
      if (!validateName(formFields.name.value)) {
        errorElements.name.textContent = "O nome deve ter pelo menos 2 caracteres";
        formFields.name.style.borderColor = "#dc3545";
      } else {
        errorElements.name.textContent = "";
        formFields.name.style.borderColor = "#28a745"; // Corrected color value
      }
    }, 300));
  }

  if (formFields.email) {
    formFields.email.addEventListener("blur", debounce(() => {
      if (!validateEmail(formFields.email.value)) {
        errorElements.email.textContent = "Por favor, insira um endereço de e-mail válido";
        formFields.email.style.borderColor = "#dc3545";
      } else {
        errorElements.email.textContent = "";
        formFields.email.style.borderColor = "#28a745"; // Corrected color value
      }
    }, 300));
  }

  // Form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    Object.values(errorElements).forEach((element) => {
      if (element) element.textContent = "";
    });

    Object.values(formFields).forEach((field) => {
      if (field) field.style.borderColor = "#e9ecef";
    });

    let isValid = true;

    // Validate all fields
    if (formFields.name && !validateName(formFields.name.value)) {
      errorElements.name.textContent = "O nome deve ter pelo menos 2 caracteres";
      formFields.name.style.borderColor = "#dc3545";
      isValid = false;
    }

    if (formFields.email && !validateEmail(formFields.email.value)) {
      errorElements.email.textContent = "Por favor, insira um endereço de e-mail válido";
      formFields.email.style.borderColor = "#dc3545";
      isValid = false;
    }

    if (formFields.subject && !validateSubject(formFields.subject.value)) {
      errorElements.subject.textContent = "Por favor, selecione um assunto";
      formFields.subject.style.borderColor = "#dc3545";
      isValid = false;
    }

    if (formFields.message && !validateMessage(formFields.message.value)) {
      errorElements.message.textContent = "A mensagem deve ter pelo menos 10 caracteres";
      formFields.message.style.borderColor = "#dc3545";
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Obrigado pela sua mensagem! A Sunn Negócios entrará em contato em breve.");
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Reset field styles
        Object.values(formFields).forEach((field) => {
          if (field) field.style.borderColor = "#e9ecef";
        });
      }, 2000);
    } else {
      // Scroll to first error (mobile-friendly)
      const firstError = contactForm.querySelector(".error-message:not(:empty)");
      if (firstError) {
        firstError.scrollIntoView({ 
          behavior: "smooth", 
          block: "center",
          inline: "nearest"
        });
      }
    }
  });
}

// Intersection Observer for animations - Performance optimized
const observerOptions = {
  threshold: window.innerWidth <= 768 ? 0.1 : 0.2,
  rootMargin: window.innerWidth <= 768 ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".segment, .about-card, .expertise-card, .stat-card, .blog-card").forEach((el) => {
  observer.observe(el);
});

// Counter animation for stats - Mobile optimized
function animateCounter(element, target, duration = window.innerWidth <= 768 ? 1500 : 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || "");
    }
  }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber) {
          const text = statNumber.textContent;
          const number = parseInt(text.replace(/\D/g, ""));
          const suffix = text.replace(/\d/g, "");

          statNumber.dataset.suffix = suffix;
          statNumber.textContent = "0" + suffix;

          animateCounter(statNumber, number);
          statsObserver.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: window.innerWidth <= 768 ? 0.3 : 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    if (navMenu && navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
      body.style.position = "";
      body.style.width = "";
    }
  }
});

// Error handling for external resources
window.addEventListener("error", (e) => {
  console.error("Resource loading error:", e.filename, e.message);
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class removal after page load
  document.body.classList.add("loaded");
  
  // Initialize any third-party integrations here
  console.log("Site da Sunn Negócios carregado com sucesso");
  
  // Preload critical resources
  const criticalImages = document.querySelectorAll('img[loading="eager"]');
  criticalImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
});

// Network status detection
window.addEventListener('online', () => {
  console.log('Conexão restaurada');
});

window.addEventListener('offline', () => {
  console.log('Conexão perdida');
});
