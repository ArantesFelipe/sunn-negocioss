// Mobile Navigation Toggle
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Form validation and submission
const contactForm = document.getElementById("contact-form")
const formFields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
}

const errorElements = {
  name: document.getElementById("name-error"),
  email: document.getElementById("email-error"),
  subject: document.getElementById("subject-error"),
  message: document.getElementById("message-error"),
}

// Validation functions
function validateName(name) {
  return name.trim().length >= 2
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateSubject(subject) {
  return subject.trim() !== ""
}

function validateMessage(message) {
  return message.trim().length >= 10
}

// Real-time validation
formFields.name.addEventListener("blur", () => {
  if (!validateName(formFields.name.value)) {
    errorElements.name.textContent = "O nome deve ter pelo menos 2 caracteres"
    formFields.name.style.borderColor = "#dc3545"
  } else {
    errorElements.name.textContent = ""
    formFields.name.style.borderColor = "#28a745"
  }
})

formFields.email.addEventListener("blur", () => {
  if (!validateEmail(formFields.email.value)) {
    errorElements.email.textContent = "Por favor, insira um endereço de e-mail válido"
    formFields.email.style.borderColor = "#dc3545"
  } else {
    errorElements.email.textContent = ""
    formFields.email.style.borderColor = "#28a745"
  }
})

formFields.subject.addEventListener("change", () => {
  if (!validateSubject(formFields.subject.value)) {
    errorElements.subject.textContent = "Por favor, selecione um assunto"
    formFields.subject.style.borderColor = "#dc3545"
  } else {
    errorElements.subject.textContent = ""
    formFields.subject.style.borderColor = "#28a745"
  }
})

formFields.message.addEventListener("blur", () => {
  if (!validateMessage(formFields.message.value)) {
    errorElements.message.textContent = "A mensagem deve ter pelo menos 10 caracteres"
    formFields.message.style.borderColor = "#dc3545"
  } else {
    errorElements.message.textContent = ""
    formFields.message.style.borderColor = "#28a745"
  }
})

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Clear previous errors
  Object.values(errorElements).forEach((element) => {
    element.textContent = ""
  })

  Object.values(formFields).forEach((field) => {
    field.style.borderColor = "#e9ecef"
  })

  let isValid = true

  // Validate all fields
  if (!validateName(formFields.name.value)) {
    errorElements.name.textContent = "O nome deve ter pelo menos 2 caracteres"
    formFields.name.style.borderColor = "#dc3545"
    isValid = false
  }

  if (!validateEmail(formFields.email.value)) {
    errorElements.email.textContent = "Por favor, insira um endereço de e-mail válido"
    formFields.email.style.borderColor = "#dc3545"
    isValid = false
  }

  if (!validateSubject(formFields.subject.value)) {
    errorElements.subject.textContent = "Por favor, selecione um assunto"
    formFields.subject.style.borderColor = "#dc3545"
    isValid = false
  }

  if (!validateMessage(formFields.message.value)) {
    errorElements.message.textContent = "A mensagem deve ter pelo menos 10 caracteres"
    formFields.message.style.borderColor = "#dc3545"
    isValid = false
  }

  if (isValid) {
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("Obrigado pela sua mensagem! A Sunn Negócios entrará em contato em breve.")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false

      // Reset field styles
      Object.values(formFields).forEach((field) => {
        field.style.borderColor = "#e9ecef"
      })
    }, 2000)
  } else {
    // Scroll to first error
    const firstError = contactForm.querySelector(".error-message:not(:empty)")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".segment, .about-card, .expertise-card, .stat-card, .blog-card").forEach((el) => {
  observer.observe(el)
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || "")
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || "")
    }
  }, 16)
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const text = statNumber.textContent
        const number = Number.parseInt(text.replace(/\D/g, ""))
        const suffix = text.replace(/\d/g, "")

        statNumber.dataset.suffix = suffix
        statNumber.textContent = "0" + suffix

        animateCounter(statNumber, number)
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card)
})

// Expertise card interactions
document.querySelectorAll(".expertise-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Blog card interactions
document.querySelectorAll(".blog-card").forEach((card) => {
  card.addEventListener("click", () => {
    // In a real implementation, this would navigate to the blog post
    alert("A funcionalidade do blog da Sunn Negócios seria implementada aqui")
  })

  card.style.cursor = "pointer"
})

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Error handling for external resources
window.addEventListener("error", (e) => {
  console.error("Resource loading error:", e.filename, e.message)
  // In production, you might want to report this to an error tracking service
})

// Enhanced Responsive Functionality

// Viewport height fix for mobile browsers
function setViewportHeight() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

// Update on resize and orientation change
window.addEventListener("resize", setViewportHeight)
window.addEventListener("orientationchange", setViewportHeight)
setViewportHeight()

// Touch device detection and optimization
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

if (isTouchDevice()) {
  document.body.classList.add("touch-device")

  // Optimize hover effects for touch devices
  document.querySelectorAll(".segment, .expertise-card, .blog-card").forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.classList.add("touch-active")
    })

    card.addEventListener("touchend", function () {
      setTimeout(() => {
        this.classList.remove("touch-active")
      }, 150)
    })
  })
}

// Responsive navigation improvements
function handleResponsiveNav() {
  const screenWidth = window.innerWidth

  if (screenWidth > 768) {
    // Desktop: ensure mobile menu is closed
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = ""
  }
}

window.addEventListener("resize", handleResponsiveNav)

// Enhanced mobile menu with body scroll lock
mobileMenu.addEventListener("click", () => {
  const isActive = mobileMenu.classList.contains("active")

  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Lock/unlock body scroll
  if (!isActive) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar") && navMenu.classList.contains("active")) {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Responsive font size adjustment
function adjustFontSizes() {
  const screenWidth = window.innerWidth
  const root = document.documentElement

  if (screenWidth < 375) {
    root.style.fontSize = "14px"
  } else if (screenWidth < 576) {
    root.style.fontSize = "15px"
  } else if (screenWidth < 768) {
    root.style.fontSize = "16px"
  } else {
    root.style.fontSize = "16px"
  }
}

window.addEventListener("resize", adjustFontSizes)
adjustFontSizes()

// Responsive image loading
function handleResponsiveImages() {
  const images = document.querySelectorAll(".placeholder-image")
  const screenWidth = window.innerWidth

  images.forEach((img) => {
    if (screenWidth < 576) {
      img.style.minHeight = "150px"
    } else if (screenWidth < 768) {
      img.style.minHeight = "180px"
    } else {
      img.style.minHeight = "200px"
    }
  })
}

window.addEventListener("resize", handleResponsiveImages)
handleResponsiveImages()

// Responsive form optimization
function optimizeFormForMobile() {
  const screenWidth = window.innerWidth
  const formInputs = document.querySelectorAll("input, select, textarea")

  formInputs.forEach((input) => {
    if (screenWidth < 576) {
      input.style.fontSize = "16px" // Prevents zoom on iOS
    }
  })
}

window.addEventListener("resize", optimizeFormForMobile)
optimizeFormForMobile()

// Responsive stats animation trigger
const responsiveStatsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const text = statNumber.textContent
        const number = Number.parseInt(text.replace(/\D/g, ""))
        const suffix = text.replace(/\d/g, "")

        // Adjust animation speed based on screen size
        const screenWidth = window.innerWidth
        const duration = screenWidth < 576 ? 1500 : 2000

        statNumber.dataset.suffix = suffix
        statNumber.textContent = "0" + suffix

        animateCounter(statNumber, number, duration)
        responsiveStatsObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: window.innerWidth < 576 ? 0.3 : 0.5,
  },
)

// Re-observe stats with responsive settings
document.querySelectorAll(".stat-card").forEach((card) => {
  responsiveStatsObserver.observe(card)
})

// Responsive scroll behavior
function handleResponsiveScroll() {
  const screenWidth = window.innerWidth
  const scrollOffset = screenWidth < 768 ? 60 : 70

  // Update smooth scrolling offset for mobile
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - scrollOffset
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active")
          navMenu.classList.remove("active")
          document.body.style.overflow = ""
        }
      }
    })
  })
}

handleResponsiveScroll()

// Responsive intersection observer thresholds
function createResponsiveObserver() {
  const screenWidth = window.innerWidth
  const threshold = screenWidth < 576 ? 0.1 : screenWidth < 768 ? 0.15 : 0.2

  const responsiveObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    {
      threshold: threshold,
      rootMargin: screenWidth < 576 ? "0px 0px -30px 0px" : "0px 0px -50px 0px",
    },
  )

  // Re-observe elements with new settings
  document.querySelectorAll(".segment, .about-card, .expertise-card, .stat-card, .blog-card").forEach((el) => {
    responsiveObserver.observe(el)
  })
}

window.addEventListener("resize", debounce(createResponsiveObserver, 250))

// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Responsive performance optimization
const debouncedResize = debounce(() => {
  handleResponsiveNav()
  adjustFontSizes()
  handleResponsiveImages()
  optimizeFormForMobile()
}, 250)

window.addEventListener("resize", debouncedResize)

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class removal after page load
  document.body.classList.add("loaded")

  // Initialize any third-party integrations here
  console.log("Site da Sunn Negócios carregado com sucesso")
})
