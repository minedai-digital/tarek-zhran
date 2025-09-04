// Enhanced JavaScript for Tarek Zhran Portfolio

// Google Sheets Integration
class GoogleSheetsManager {
  constructor() {
    // TODO: Replace with your actual Google Sheets configuration
    // 1. Create a Google Sheet and share it publicly
    // 2. Get the Sheet ID from the URL
    // 3. Enable Google Sheets API and get API key
    // 4. Update these values:
    this.sheetId = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your sheet ID
    this.apiKey = 'YOUR_GOOGLE_API_KEY';   // Replace with your API key
    this.sheetName = 'Contact Form';
  }

  async submitToGoogleSheets(formData) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.sheetName}!A:E:append?valueInputOption=USER_ENTERED&key=${this.apiKey}`;
      
      const data = {
        values: [
          [
            new Date().toISOString(),
            formData.name,
            formData.email,
            formData.subject,
            formData.message
          ]
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        return { success: true, message: 'Data submitted successfully' };
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return { success: false, message: 'Failed to submit data' };
    }
  }
}

// Enhanced Navigation Manager
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.backToTop = document.getElementById('back-to-top');
    this.currentSection = 'home';
    this.init();
  }

  init() {
    this.setupSmoothScroll();
    this.setupMobileNavigation();
    this.setupScrollEffects();
    this.setupBackToTop();
    this.setupActiveNavigation();
    this.setupEnhancedEffects();
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        this.smoothScrollTo(target);
        
        // Close mobile menu if open
        if (this.navMenu.classList.contains('open')) {
          this.navMenu.classList.remove('open');
          this.navToggle.classList.remove('active');
        }
      });
    });
  }

  smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.ease(timeElapsed, startPosition, distance, 1000);
      window.scrollTo(0, run);
      if (timeElapsed < 1000) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  setupMobileNavigation() {
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('open');
        this.navToggle.classList.toggle('active');
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.navMenu.classList.remove('open');
        this.navToggle.classList.remove('active');
      }
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateNavbar = () => {
      // Navbar scroll effect
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Parallax effect for hero background
      const heroBg = document.querySelector('.hero-background');
      if (heroBg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }

  setupBackToTop() {
    if (this.backToTop) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          this.backToTop.classList.add('visible');
        } else {
          this.backToTop.classList.remove('visible');
        }
      });

      this.backToTop.addEventListener('click', () => {
        this.smoothScrollTo('#home');
      });
    }
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', throttle(updateActiveNav, 100));
  }

  setupEnhancedEffects() {
    // Enhanced scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animations for child elements
          const staggerItems = entry.target.querySelectorAll('.stagger-item, .skill-item, .timeline-item, .skill-category');
          staggerItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 100);
          });
        }
      });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section, .skill-item, .timeline-item, .skill-category').forEach(el => {
      observer.observe(el);
    });
    
    // Enhanced form interactions
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const label = group.querySelector('label');
      
      if (input && label) {
        input.addEventListener('focus', () => {
          label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            label.classList.remove('active');
          }
        });
        
        // Check if input already has value
        if (input.value) {
          label.classList.add('active');
        }
      }
    });
  }
}

// Enhanced Form Manager
class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.googleSheets = new GoogleSheetsManager();
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  async handleSubmit() {
    const formData = new FormData(this.contactForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    // Show loading state
    const submitBtn = this.contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div>';
    submitBtn.disabled = true;
    
    try {
      // Submit to Google Sheets
      const result = await this.googleSheets.submitToGoogleSheets(data);
      
      if (result.success) {
        // Show success notification
        NotificationManager.showNotification('Success', 'Your message has been sent successfully!', 'success');
        this.contactForm.reset();
        
        // Reset form labels
        const labels = this.contactForm.querySelectorAll('label');
        labels.forEach(label => {
          label.classList.remove('active');
        });
      } else {
        // Show error notification
        NotificationManager.showNotification('Error', 'Failed to send your message. Please try again.', 'error');
      }
    } catch (error) {
      // Show error notification
      NotificationManager.showNotification('Error', 'An unexpected error occurred. Please try again.', 'error');
    } finally {
      // Reset button
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  }
}

// Enhanced Notification Manager
class NotificationManager {
  constructor() {
    this.container = document.getElementById('notifications');
    this.badge = document.getElementById('notification-badge');
    this.notificationCount = 0;
    this.init();
  }

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'notifications';
      this.container.id = 'notifications';
      document.body.appendChild(this.container);
    }
    
    if (!this.badge) {
      this.badge = document.createElement('span');
      this.badge.className = 'notification-badge';
      this.badge.id = 'notification-badge';
      this.badge.textContent = '0';
      
      const notificationToggle = document.getElementById('enable-notifications');
      if (notificationToggle) {
        notificationToggle.appendChild(this.badge);
      }
    }
  }

  static showNotification(title, message, type = 'info') {
    const container = document.getElementById('notifications') || document.querySelector('.notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    notification.innerHTML = `
      <div class="notification-icon">${icon}</div>
      <div class="notification-content">
        <h4 class="notification-title">${title}</h4>
        <p class="notification-message">${message}</p>
      </div>
      <button class="notification-close">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Update badge
    const badge = document.getElementById('notification-badge');
    if (badge) {
      const count = parseInt(badge.textContent) || 0;
      badge.textContent = count + 1;
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('hiding');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.add('hiding');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }
}

// Enhanced Language Manager
class LanguageManager {
  constructor() {
    this.currentLanguage = 'en';
    this.toggleButton = document.getElementById('language-toggle');
    this.init();
  }

  init() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.currentLanguage = savedLang;
    }
    
    // Set initial language
    this.setLanguage(this.currentLanguage);
    
    // Setup toggle button
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => {
        this.toggleLanguage();
      });
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.setLanguage(this.currentLanguage);
    localStorage.setItem('language', this.currentLanguage);
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(element => {
      element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update placeholder texts
    const inputs = document.querySelectorAll('input[placeholder-en], input[placeholder-ar], textarea[placeholder-en], textarea[placeholder-ar]');
    inputs.forEach(input => {
      input.placeholder = input.getAttribute(`placeholder-${lang}`);
    });
  }
}

// Enhanced Theme Manager
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Utility function for throttling
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize managers
  const navigationManager = new NavigationManager();
  const formManager = new FormManager();
  const languageManager = new LanguageManager();
  const themeManager = new ThemeManager();
  const notificationManager = new NotificationManager();
  
  // Enhanced particle system for hero section
  const particlesContainer = document.getElementById('hero-particles');
  if (particlesContainer) {
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = Math.random() * 0.7 + 0.3;
      particlesContainer.appendChild(particle);
    }
  }
  
  // Enhanced loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1500);
  }
  
  // Add scroll animations to sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('section-entrance');
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Add entrance animations to elements
  const animateElements = document.querySelectorAll('.entrance-animation');
  animateElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Enhanced button effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.classList.add('pressed');
    });
    
    button.addEventListener('mouseup', function() {
      this.classList.remove('pressed');
    });
    
    button.addEventListener('mouseleave', function() {
      this.classList.remove('pressed');
    });
  });
  
  // Ensure WhatsApp button works correctly
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
      // Allow default behavior for WhatsApp link
      console.log('WhatsApp button clicked');
    });
  }
});

// Add service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Prevent scrolling on mobile when menu is open
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      if (navMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});