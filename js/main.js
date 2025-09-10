// Enhanced JavaScript for Tarek Zhran Portfolio - Performance Optimized Version

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Google Sheets Integration
/**
 * Manages integration with Google Sheets for contact form submissions
 */
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

  /**
   * Submits form data to Google Sheets
   * @param {Object} formData - Form data to submit
   * @returns {Promise<Object>} Submission result
   */
  async submitToGoogleSheets(formData) {
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('All fields are required');
      }
      
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
      return { success: false, message: error.message || 'Failed to submit data' };
    }
  }
}

// Enhanced Navigation Manager
/**
 * Manages navigation functionality including smooth scrolling and mobile menu
 */
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
          document.body.style.overflow = '';
        }
        
        // Focus the target element
        const targetElement = document.querySelector(target);
        if (targetElement) {
          targetElement.focus();
        }
      });
      
      // Add keyboard support for navigation links
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
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
        
        // Focus first link when menu opens
        if (this.navMenu.classList.contains('open')) {
          const firstLink = this.navMenu.querySelector('.nav-link');
          if (firstLink) {
            firstLink.focus();
          }
        }
      });
      
      // Keyboard navigation for mobile menu
      this.navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.navToggle.click();
        }
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.navMenu.classList.remove('open');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navMenu.classList.contains('open')) {
        this.navMenu.classList.remove('open');
        this.navToggle.classList.remove('active');
        this.navToggle.focus();
        document.body.style.overflow = '';
      }
    });
  }

  setupScrollEffects() {
    // Debounced scroll handler for performance
    const debouncedScroll = debounce(() => {
      this.updateNavbarOnScroll();
    }, 10);

    window.addEventListener('scroll', debouncedScroll);
  }

  updateNavbarOnScroll() {
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
  }

  setupBackToTop() {
    if (this.backToTop) {
      // Debounced scroll handler for back to top button
      const debouncedScroll = debounce(() => {
        if (window.pageYOffset > 300) {
          this.backToTop.classList.add('visible');
        } else {
          this.backToTop.classList.remove('visible');
        }
      }, 10);

      window.addEventListener('scroll', debouncedScroll);

      this.backToTop.addEventListener('click', () => {
        this.smoothScrollTo('#home');
      });
    }
  }

  /**
   * Sets up active navigation based on scroll position
   */
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

    // Debounced scroll handler for active navigation
    const debouncedScroll = debounce(updateActiveNav, 100);
    window.addEventListener('scroll', debouncedScroll);
  }

  setupEnhancedEffects() {
    // Enhanced scroll animations with Intersection Observer for better performance
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
/**
 * Manages contact form functionality and validation
 */
class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contactForm');
    this.googleSheets = new GoogleSheetsManager();
    this.init();
  }

  /**
   * Initializes the form manager
   */
  init() {
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
      
      // Add real-time validation
      this.addRealTimeValidation();
    }
  }
  
  /**
   * Validates the contact form
   * @returns {boolean} Whether form is valid
   */
  validateForm() {
    let isValid = true;
    const inputs = this.contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Clear previous errors
      this.clearFieldError(input);
      
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        this.showFieldError(input, getTranslation('fieldRequired', document.documentElement.lang || 'en'));
      } else if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
        isValid = false;
        this.showFieldError(input, getTranslation('invalidEmail', document.documentElement.lang || 'en'));
      } else if (input.type === 'text' && input.name === 'name' && input.value.trim().length < 2) {
        isValid = false;
        this.showFieldError(input, 'Name must be at least 2 characters long');
      } else if (input.type === 'text' && input.name === 'subject' && input.value.trim().length < 5) {
        isValid = false;
        this.showFieldError(input, 'Subject must be at least 5 characters long');
      } else if (input.tagName === 'TEXTAREA' && input.name === 'message' && input.value.trim().length < 10) {
        isValid = false;
        this.showFieldError(input, 'Message must be at least 10 characters long');
      } else {
        this.clearFieldError(input);
        // Show success state for valid fields
        if (input.value.trim()) {
          this.showFieldSuccess(input);
        }
      }
    });
    
    return isValid;
  }
  
  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Shows error message for a field
   * @param {HTMLElement} input - Input element
   * @param {string} message - Error message
   */
  showFieldError(input, message) {
    // Remove existing error
    this.clearFieldError(input);
    
    // Add error class
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--spacing-xs)';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    // Insert after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    
    // Add aria-describedby to input
    const errorId = `error-${input.name || input.id}`;
    errorElement.id = errorId;
    input.setAttribute('aria-describedby', errorId);
    
    // Focus the field to announce the error
    setTimeout(() => {
      input.focus();
    }, 100);
  }
  
  /**
   * Clears error message for a field
   * @param {HTMLElement} input - Input element
   */
  clearFieldError(input) {
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
      // Remove aria-describedby reference
      input.removeAttribute('aria-describedby');
      existingError.remove();
    }
    
    // Clear success state as well
    this.clearFieldSuccess(input);
  }
  
  /**
   * Clears success state for a field
   * @param {HTMLElement} input - Input element
   */
  clearFieldSuccess(input) {
    input.classList.remove('success');
    const existingSuccess = input.parentNode.querySelector('.field-success');
    if (existingSuccess) {
      existingSuccess.remove();
    }
  }
  
  /**
   * Shows success state for a field
   * @param {HTMLElement} input - Input element
   */
  showFieldSuccess(input) {
    input.classList.add('success');
    input.setAttribute('aria-invalid', 'false');
    
    // Add success icon
    const successElement = document.createElement('div');
    successElement.className = 'field-success';
    successElement.innerHTML = '✓';
    successElement.style.color = 'var(--success)';
    successElement.style.fontSize = 'var(--font-size-lg)';
    successElement.style.marginTop = 'var(--spacing-xs)';
    successElement.setAttribute('aria-label', 'Valid input');
    
    // Insert after input
    input.parentNode.insertBefore(successElement, input.nextSibling);
  }
  
  /**
   * Adds real-time validation to form fields
   */
  addRealTimeValidation() {
    const inputs = this.contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Validation on blur
      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          this.showFieldError(input, getTranslation('fieldRequired', document.documentElement.lang || 'en'));
        } else if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
          this.showFieldError(input, getTranslation('invalidEmail', document.documentElement.lang || 'en'));
        } else if (input.type === 'text' && input.name === 'name' && input.value.trim().length < 2 && input.value.trim().length > 0) {
          this.showFieldError(input, 'Name must be at least 2 characters long');
        } else if (input.type === 'text' && input.name === 'subject' && input.value.trim().length < 5 && input.value.trim().length > 0) {
          this.showFieldError(input, 'Subject must be at least 5 characters long');
        } else if (input.tagName === 'TEXTAREA' && input.name === 'message' && input.value.trim().length < 10 && input.value.trim().length > 0) {
          this.showFieldError(input, 'Message must be at least 10 characters long');
        } else {
          this.clearFieldError(input);
          // Show success state for valid fields
          if (input.value.trim()) {
            this.showFieldSuccess(input);
          }
        }
      });
      
      // Validation on input (as user types) with debounce for performance
      const debouncedInput = debounce(() => {
        // Clear error when user starts typing
        if (input.classList.contains('error')) {
          // Only clear error for required fields if they now have content
          if (input.hasAttribute('required') && input.value.trim()) {
            this.clearFieldError(input);
          }
          // Clear email error when user types in a valid format
          else if (input.type === 'email' && input.value && this.isValidEmail(input.value)) {
            this.clearFieldError(input);
          }
          // Clear name error when it reaches minimum length
          else if (input.type === 'text' && input.name === 'name' && input.value.trim().length >= 2) {
            this.clearFieldError(input);
          }
          // Clear subject error when it reaches minimum length
          else if (input.type === 'text' && input.name === 'subject' && input.value.trim().length >= 5) {
            this.clearFieldError(input);
          }
          // Clear message error when it reaches minimum length
          else if (input.tagName === 'TEXTAREA' && input.name === 'message' && input.value.trim().length >= 10) {
            this.clearFieldError(input);
          }
        }
        
        // Clear success state when user clears the field
        if (input.classList.contains('success') && !input.value.trim()) {
          this.clearFieldSuccess(input);
        }
      }, 300);
      
      input.addEventListener('input', debouncedInput);
      
      // Add aria-invalid attribute initially
      input.setAttribute('aria-invalid', 'false');
    });
  }

  /**
   * Handles form submission
   * @returns {Promise<void>}
   */
  async handleSubmit() {
    // Validate form before submission
    if (!this.validateForm()) {
      NotificationManager.showNotification('Error', 'Please fill in all required fields correctly.', 'error');
      return;
    }
    
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
          
    // Announce loading state to screen readers
    const loadingAnnouncement = document.createElement('div');
    loadingAnnouncement.setAttribute('aria-live', 'polite');
    loadingAnnouncement.setAttribute('aria-atomic', 'true');
    loadingAnnouncement.className = 'sr-only';
    loadingAnnouncement.textContent = 'Sending your message, please wait...';
    document.body.appendChild(loadingAnnouncement);
          
    // Remove announcement after a short delay
    setTimeout(() => {
      if (loadingAnnouncement.parentNode) {
        loadingAnnouncement.parentNode.removeChild(loadingAnnouncement);
      }
    }, 3000);
    
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
        NotificationManager.showNotification('Error', result.message || 'Failed to send your message. Please try again.', 'error');
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
/**
 * Manages notification system for user feedback
 */
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
/**
 * Manages language switching functionality
 */
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

  /**
   * Sets the current language and updates UI
   * @param {string} lang - Language code ('en' or 'ar')
   */
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
    
    // Dispatch custom event for language change
    document.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }
}

// Enhanced Theme Manager
/**
 * Manages theme switching functionality
 */
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

// Enhanced Timeline Manager
/**
 * Manages timeline section interactions
 */
class TimelineManager {
  constructor() {
    this.init();
  }

  init() {
    // Enhanced timeline interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
}

// Product Image Gallery Manager
/**
 * Manages product gallery modal functionality
 */
class ProductGalleryManager {
  constructor() {
    this.modal = document.getElementById('productGalleryModal');
    this.currentProductId = null;
    this.productData = {
      1: {
        title: {
          en: "Business Strategy Consulting",
          ar: "استشارات استراتيجية الأعمال"
        },
        description: {
          en: "Comprehensive business strategy development and implementation services.",
          ar: "خدمات شاملة لتطوير وتنفيذ استراتيجيات الأعمال."
        },
        specifications: {
          en: [
            "Strategic analysis and planning",
            "Market research and competitive intelligence",
            "Business model development",
            "Performance metrics and KPIs"
          ],
          ar: [
            "التحليل والاستراتيجية التخطيطية",
            "بحث السوق والمنافسة",
            "تطوير نموذج الأعمال",
            "مؤشرات الأداء والنتائج"
          ]
        },
        features: {
          en: [
            "Customized strategic frameworks",
            "Executive-level consulting",
            "Implementation roadmap",
            "Ongoing support and monitoring"
          ],
          ar: [
            "إطارات استراتيجية مخصصة",
            "استشارات على مستوى التنفيذيين",
            "خارطة طريق للتنفيذ",
            "دعم ومتابعة مستمرة"
          ]
        },
        price: "$2,500"
      },
      2: {
        title: {
          en: "Digital Transformation Package",
          ar: "حزمة التحول الرقمي"
        },
        description: {
          en: "End-to-end digital transformation solutions for businesses.",
          ar: "حلول التحول الرقمي الشاملة للأعمال."
        },
        specifications: {
          en: [
            "Digital maturity assessment",
            "Technology roadmap development",
            "Process automation implementation",
            "Change management support"
          ],
          ar: [
            "تقييم مستوى النضج الرقمي",
            "تطوير خارطة طريق التكنولوجيا",
            "تنفيذ أتمتة العمليات",
            "دعم إدارة التغيير"
          ]
        },
        features: {
          en: [
            "Cloud infrastructure setup",
            "Data analytics platform",
            "Cybersecurity implementation",
            "Employee digital training"
          ],
          ar: [
            "إعداد البنية التحتية السحابية",
            "منصة تحليل البيانات",
            "تنفيذ الأمن السيبراني",
            "تدريب الموظفين الرقمي"
          ]
        },
        price: "$5,000"
      },
      3: {
        title: {
          en: "Healthcare Management System",
          ar: "نظام إدارة الرعاية الصحية"
        },
        description: {
          en: "Specialized healthcare management solutions for medical facilities.",
          ar: "حلول إدارة الرعاية الصحية المتخصصة للمرافق الطبية."
        },
        specifications: {
          en: [
            "Patient management system",
            "Electronic health records",
            "Appointment scheduling",
            "Billing and insurance integration"
          ],
          ar: [
            "نظام إدارة المرضى",
            "السجلات الصحية الإلكترونية",
            "جدولة المواعيد",
            "التكامل مع الفواتير والتأمين"
          ]
        },
        features: {
          en: [
            "Telemedicine capabilities",
            "Mobile health apps",
            "Analytics and reporting",
            "Compliance with healthcare regulations"
          ],
          ar: [
            "قدرات الطب عن بُعد",
            "تطبيقات الصحة المحمولة",
            "التحليلات والتقارير",
            "الامتثال للوائح الرعاية الصحية"
          ]
        },
        price: "$7,500"
      },
      4: {
        title: {
          en: "Financial Optimization Service",
          ar: "خدمة تحسين المالية"
        },
        description: {
          en: "Financial analysis and optimization services for businesses.",
          ar: "خدمات التحليل والتحسين المالي للأعمال."
        },
        specifications: {
          en: [
            "Financial performance analysis",
            "Cost reduction strategies",
            "Cash flow optimization",
            "Investment portfolio review"
          ],
          ar: [
            "تحليل الأداء المالي",
            "استراتيجيات تقليل التكاليف",
            "تحسين التدفق النقدي",
            "مراجعة محفظة الاستثمارات"
          ]
        },
        features: {
          en: [
            "Budget planning and forecasting",
            "Risk assessment and mitigation",
            "Financial reporting automation",
            "Strategic financial consulting"
          ],
          ar: [
            "التخطيط المالي والتنبؤ",
            "تقييم المخاطر وتخفيفها",
            "أتمتة التقارير المالية",
            "الاستشارات المالية الاستراتيجية"
          ]
        },
        price: "$3,200"
      },
      5: {
        title: {
          en: "Market Research & Analysis",
          ar: "بحث وتحليل السوق"
        },
        description: {
          en: "Comprehensive market research and competitive analysis services.",
          ar: "خدمات بحث السوق وتحليل المنافسة الشاملة."
        },
        specifications: {
          en: [
            "Consumer behavior analysis",
            "Market segmentation",
            "Competitive landscape mapping",
            "Industry trend identification"
          ],
          ar: [
            "تحليل سلوك المستهلك",
            "تقسيم السوق",
            "رسم خريطة المنافسة",
            "تحديد اتجاهات الصناعة"
          ]
        },
        features: {
          en: [
            "Custom research methodologies",
            "Data visualization and reporting",
            "Strategic recommendations",
            "Ongoing market monitoring"
          ],
          ar: [
            "مناهج بحث مخصصة",
            "تصور البيانات والتقارير",
            "توصيات استراتيجية",
            "مراقبة السوق المستمرة"
          ]
        },
        price: "$1,800"
      },
      6: {
        title: {
          en: "Team Building & Leadership Training",
          ar: "بناء الفريق وتدريب القيادة"
        },
        description: {
          en: "Professional team building and leadership development programs.",
          ar: "برامج بناء الفريق وتطوير القيادة المهنية."
        },
        specifications: {
          en: [
            "Leadership skills assessment",
            "Team dynamics evaluation",
            "Communication skills training",
            "Conflict resolution techniques"
          ],
          ar: [
            "تقييم مهارات القيادة",
            "تقييم ديناميكيات الفريق",
            "تدريب مهارات التواصل",
            "تقنيات حل النزاعات"
          ]
        },
        features: {
          en: [
            "Customized training programs",
            "Interactive workshops",
            "360-degree feedback systems",
            "Ongoing coaching and mentoring"
          ],
          ar: [
            "برامج تدريب مخصصة",
            "ورش عمل تفاعلية",
            "أنظمة التغذية الراجعة الشاملة",
            "التدريب والإرشاد المستمر"
          ]
        },
        price: "$2,200"
      }
    };
    this.init();
  }

  init() {
    // Add event listeners to "More" buttons
    const moreButtons = document.querySelectorAll('.product-more-btn');
    moreButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productId = productCard.dataset.productId;
        this.openGallery(productId);
      });
    });
    
    // Close modal when clicking on close button or outside the modal content
    if (this.modal) {
      this.modal.querySelector('.modal-close').addEventListener('click', () => {
        this.closeGallery();
      });
      
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeGallery();
        }
      });
      
      // Close modal with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.style.display === 'block') {
          this.closeGallery();
        }
      });
    }
  }

  openGallery(productId) {
    this.currentProductId = productId;
    const product = this.productData[productId];
    const lang = document.documentElement.lang || 'en';
    
    // Set main image
    const mainImage = document.querySelector(`.product-card[data-product-id="${productId}"] .product-main-image`);
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    mainGalleryImage.src = mainImage.src;
    mainGalleryImage.alt = mainImage.alt;
    
    // Set product title
    const modalTitle = this.modal.querySelector('.product-modal-title');
    modalTitle.textContent = product.title[lang];
    
    // Set modal title
    const modalHeaderTitle = this.modal.querySelector('.modal-title');
    modalHeaderTitle.textContent = lang === 'en' ? 'Product Details' : 'تفاصيل المنتج';
    
    // Set specifications
    const specsList = this.modal.querySelector('.specifications-list');
    specsList.innerHTML = '';
    product.specifications[lang].forEach(spec => {
      const li = document.createElement('li');
      li.textContent = spec;
      specsList.appendChild(li);
    });
    
    // Set features
    const featuresList = this.modal.querySelector('.features-list');
    featuresList.innerHTML = '';
    product.features[lang].forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    
    // Set description
    const descriptionText = this.modal.querySelector('.description-text');
    descriptionText.textContent = product.description[lang];
    
    // Set price
    const priceValue = this.modal.querySelector('.price-value');
    priceValue.textContent = product.price;
    
    // Set WhatsApp link
    const whatsappLink = this.modal.querySelector('.product-modal-whatsapp');
    const productTitle = encodeURIComponent(product.title[lang]);
    whatsappLink.href = `https://wa.me/201009151540?text=I'm%20interested%20in%20${productTitle}`;
    
    // Update WhatsApp text based on language
    const whatsappText = this.modal.querySelector('.whatsapp-text');
    whatsappText.textContent = lang === 'en' ? 'Contact via WhatsApp' : 'تواصل عبر الواتساب';
    
    // Show modal
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeGallery() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    this.currentProductId = null;
  }
}

// Utility function for throttling
/**
 * Throttles function execution to limit calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
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

// Listen for language change events to update product gallery
document.addEventListener('languageChange', function(e) {
  const productGalleryManager = new ProductGalleryManager();
  if (productGalleryManager.currentProductId && productGalleryManager.modal.style.display === 'block') {
    // Update the gallery content when language changes
    productGalleryManager.openGallery(productGalleryManager.currentProductId);
  }
});

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize managers
  const navigationManager = new NavigationManager();
  const formManager = new FormManager();
  const languageManager = new LanguageManager();
  const themeManager = new ThemeManager();
  const notificationManager = new NotificationManager();
  const timelineManager = new TimelineManager();
  const productGalleryManager = new ProductGalleryManager();
  
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
  
  // Enhanced timeline interactions
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
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