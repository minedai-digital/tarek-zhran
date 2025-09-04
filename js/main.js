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
}

// Enhanced Animation Manager
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParticleEffects();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate children with staggered delay
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        }
      });
    }, this.observerOptions);

    // Observe all sections and timeline items
    document.querySelectorAll('.section, .timeline-item, .education-card, .achievement-card, .contact-item').forEach(el => {
      observer.observe(el);
    });
  }

  setupScrollAnimations() {
    // Add stagger-item class to elements that should animate
    document.querySelectorAll('.achievement-card, .skill-item, .contact-item, .education-card').forEach(el => {
      el.classList.add('stagger-item');
    });
  }

  setupHoverEffects() {
    // Add hover effects to cards
    document.querySelectorAll('.achievement-card, .contact-item, .skill-item, .education-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
      });
    });
  }

  setupParticleEffects() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const particlesContainer = document.querySelector('.hero-particles');
      if (particlesContainer) {
        // Create particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
          particlesContainer.appendChild(particle);
        }
      }
    }
  }
}

// Enhanced Contact Form Manager
class ContactFormManager {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.googleSheets = new GoogleSheetsManager();
    this.init();
  }

  init() {
    if (this.form) {
      this.setupFormValidation();
      this.setupFormSubmission();
      this.setupFloatingLabels();
      this.setupFormAnimations();
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'text':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'This field is required';
        }
        break;
      case 'textarea':
        if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters long';
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: var(--error);
      font-size: 0.8rem;
      margin-top: 0.25rem;
      display: block;
      animation: fadeInUp 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  setupFloatingLabels() {
    const formGroups = this.form.querySelectorAll('.form-group');
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
        
        // Check if input has value on load
        if (input.value) {
          label.classList.add('active');
        }
      }
    });
  }

  setupFormAnimations() {
    const formGroups = this.form.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`;
      group.classList.add('fade-in-child');
    });
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      const inputs = this.form.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        this.showNotification('Please fix the errors above', 'error');
        return;
      }

      // Get form data
      const formData = {
        name: this.form.querySelector('[name="name"]').value,
        email: this.form.querySelector('[name="email"]').value,
        subject: this.form.querySelector('[name="subject"]').value,
        message: this.form.querySelector('[name="message"]').value
      };

      // Show loading state
      const submitBtn = this.form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading"></span> Sending...';
      submitBtn.disabled = true;

      try {
        // Submit to Google Sheets
        const result = await this.googleSheets.submitToGoogleSheets(formData);
        
        if (result.success) {
          this.showNotification('Message sent successfully!', 'success');
          this.form.reset();
          
          // Reset floating labels
          const labels = this.form.querySelectorAll('label');
          labels.forEach(label => label.classList.remove('active'));
        } else {
          this.showNotification('Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        this.showNotification('An error occurred. Please try again.', 'error');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--accent)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    });
  }
}

// Enhanced Loading Screen Manager
class LoadingScreenManager {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoadingScreen();
      }, 1500);
    });
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
      }, 500);
    }
  }
}

// Language Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("language-toggle");
  let currentLang = "en";

  function translatePage(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = el.dataset[lang];
    });
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "ar" : "en";
      translatePage(currentLang);
    });
  }

  translatePage(currentLang);
});

// WhatsApp Button Manager
class WhatsAppButtonManager {
  constructor() {
    this.phoneNumber = '201020135203'; // Egyptian WhatsApp number
    this.init();
  }

  init() {
    this.setupWhatsAppButtons();
  }

  setupWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the product title from the card
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Create WhatsApp message
        const message = this.createWhatsAppMessage(productTitle);
        
        // Open WhatsApp with the message
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      });
    });
  }

  createWhatsAppMessage(productTitle) {
    const currentLang = localStorage.getItem('siteLang') || 'en';
    
    if (currentLang === 'ar') {
      return `مرحباً، أنا مهتم بشراء منتج: ${productTitle}

أود معرفة المزيد من التفاصيل حول هذا المنتج والخطوات التالية للشراء.

شكراً لك!`;
    } else {
      return `Hello, I'm interested in purchasing: ${productTitle}

I would like to know more details about this product and the next steps for purchase.

Thank you!`;
    }
  }
}

// Utility functions
const throttle = (func, limit) => {
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
};

// Initialize everything when DOM is loaded
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful:', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed:', err);
      });
  });
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing managers...');
  
  // ترجمة عبر الإنترنت باستخدام زر الترجمة (Google Translate API)
  function translatePageOnline(targetLang) {
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(el => {
      let text = el.getAttribute(targetLang === 'ar' ? 'data-ar' : 'data-en');
      if (text) {
        el.textContent = text;
      }
    });
    document.documentElement.dir = (targetLang === 'ar') ? 'rtl' : 'ltr';
    localStorage.setItem('siteLang', targetLang);
  }

  window.translatePageOnline = translatePageOnline;
  
  // Initialize all managers with error handling
  try {
    // Navigation
    const navigationManager = new NavigationManager();
    console.log('Navigation Manager initialized');
    
    // Contact Form
    const contactFormManager = new ContactFormManager();
    console.log('Contact Form Manager initialized');
    
    // Animations
    const animationManager = new AnimationManager();
    console.log('Animation Manager initialized');
    
    // Loading Screen
    const loadingScreenManager = new LoadingScreenManager();
    console.log('Loading Screen Manager initialized');
    
    // Language Toggle مع ترجمة عبر الإنترنت
    const langToggle = document.getElementById('lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    if (langToggle && langOptions.length) {
      langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = option.getAttribute('data-lang');
          window.translatePageOnline(lang);
        });
      });
      // تفعيل اللغة المحفوظة عند التحميل
      const savedLang = localStorage.getItem('siteLang') || 'en';
      window.translatePageOnline(savedLang);
    }
    
    // WhatsApp Button
    const whatsappButtonManager = new WhatsAppButtonManager();
    console.log('WhatsApp Button Manager initialized');
  } catch (error) {
    console.error('Error initializing managers:', error);
  }
  
  console.log('All managers initialized successfully');

  // Performance optimization
  window.addEventListener('load', () => {
    // Register for push notifications if supported
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    
    // Preload critical images
    const criticalImages = [
      'images/profile.jpg',
      'images/hero.jpg'
    ];
    
    // Load images with Priority Hints
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.fetchPriority = "high";
      img.loading = "eager";
    });
    
    // Remove loading screen class
    document.body.classList.remove('loading');
    
    // Enable offline functionality warning
    window.addEventListener('offline', () => {
      showNotification('You are now offline. Some features may be limited.', 'warning');
    });
    
    window.addEventListener('online', () => {
      showNotification('You are back online!', 'success');
    });
  });
});

// ======================
// Products Loader
// ======================
function loadProducts() {
  console.log("✅ loadProducts() تم استدعاؤها بنجاح");

  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) {
    console.warn("⚠️ لم يتم العثور على .products-grid في الصفحة");
    return;
  }

  const products = [
    {
      icon: "📊",
      title: { en: "Business Process Optimization", ar: "تحسين العمليات التجارية" },
      description: {
        en: "Comprehensive analysis and optimization of business processes to improve efficiency and reduce costs.",
        ar: "تحليل شامل وتحسين العمليات التجارية لزيادة الكفاءة وتقليل التكاليف."
      },
      features: [
        { en: "Process Analysis", ar: "تحليل العمليات" },
        { en: "Efficiency Improvement", ar: "تحسين الكفاءة" },
        { en: "Cost Reduction", ar: "تخفيض التكاليف" }
      ],
      priceLabel: { en: "Starting from:", ar: "يبدأ من:" },
      price: "$500",
      whatsapp: "تحسين العمليات التجارية"
    },
    {
      icon: "📈",
      title: { en: "Digital Transformation Consulting", ar: "استشارات التحول الرقمي" },
      description: {
        en: "Strategic guidance for digital transformation initiatives to modernize your business operations.",
        ar: "إرشاد استراتيجي لمبادرات التحول الرقمي لتحديث عملياتك التجارية."
      },
      features: [
        { en: "Strategy Development", ar: "تطوير الاستراتيجية" },
        { en: "Technology Integration", ar: "تكامل التقنيات" },
        { en: "Change Management", ar: "إدارة التغيير" }
      ],
      priceLabel: { en: "Starting from:", ar: "يبدأ من:" },
      price: "$800",
      whatsapp: "استشارات التحول الرقمي"
    },
    {
      icon: "📋",
      title: { en: "Financial Management Templates", ar: "قوالب الإدارة المالية" },
      description: {
        en: "Professional Excel templates and tools for financial management and budgeting.",
        ar: "قوالب إكسل مهنية وأدوات للإدارة المالية وإعداد الميزانيات."
      },
      features: [
        { en: "Excel Templates", ar: "قوالب إكسل" },
        { en: "Budget Planning", ar: "تخطيط الميزانية" },
        { en: "Financial Analysis", ar: "التحليل المالي" }
      ],
      priceLabel: { en: "Price:", ar: "السعر:" },
      price: "$50",
      whatsapp: "قوالب الإدارة المالية"
    },
    {
      icon: "🎯",
      title: { en: "HR Management System", ar: "نظام إدارة الموارد البشرية" },
      description: {
        en: "Complete HR management solution including recruitment, performance, and employee development.",
        ar: "حل شامل لإدارة الموارد البشرية يشمل التوظيف والأداء وتطوير الموظفين."
      },
      features: [
        { en: "Recruitment", ar: "التوظيف" },
        { en: "Performance Management", ar: "إدارة الأداء" },
        { en: "Employee Development", ar: "تطوير الموظفين" }
      ],
      priceLabel: { en: "Starting from:", ar: "يبدأ من:" },
      price: "$300",
      whatsapp: "نظام إدارة الموارد البشرية"
    }
  ];

  productsGrid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-icon">${p.icon}</div>
      <h3 class="product-title" data-en="${p.title.en}" data-ar="${p.title.ar}">${p.title.en}</h3>
      <p class="product-description" data-en="${p.description.en}" data-ar="${p.description.ar}">${p.description.en}</p>
      <div class="product-features">
        ${p.features.map(f => `<span class="feature-tag" data-en="${f.en}" data-ar="${f.ar}">${f.en}</span>`).join("")}
      </div>
      <div class="product-price">
        <span class="price-label" data-en="${p.priceLabel.en}" data-ar="${p.priceLabel.ar}">${p.priceLabel.en}</span>
        <span class="price-amount">${p.price}</span>
      </div>
      <div class="product-actions">
        <a href="https://wa.me/201020135203?text=مرحباً، أنا مهتم بشراء منتج: ${p.whatsapp}" 
           class="btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
          <span class="btn-icon">📱</span>
          <span class="btn-text" data-en="Contact via WhatsApp" data-ar="تواصل عبر واتساب">Contact via WhatsApp</span>
          <span class="btn-arrow">→</span>
        </a>
      </div>
    </div>
  `).join("");
}

// استدعاء تحميل المنتجات بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const notifyBtn = document.getElementById("enable-notifications");
  if (notifyBtn && "Notification" in window) {
    notifyBtn.addEventListener("click", () => {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          new Notification("✅ Notifications enabled!", {
            body: "ستصلك إشعارات عند وجود جديد.",
            icon: "/assets/icon.png" // عدل المسار حسب أيقونتك
          });
        }
      });
    });
  }
});




// استدعاء تحميل المنتجات بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 جاري تحميل المنتجات...");
  loadProducts();
});

// Export for use in other files
window.GoogleSheetsManager = GoogleSheetsManager;
window.NavigationManager = NavigationManager;
window.AnimationManager = AnimationManager;
window.ContactFormManager = ContactFormManager;
window.WhatsAppButtonManager = WhatsAppButtonManager;
