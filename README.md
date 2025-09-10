# Tarek Zhran - Professional Portfolio

A modern, responsive, and accessible portfolio website for Tarek Zhran, showcasing his expertise as a Business Development & Digital Transformation Leader.

## 🌟 Features

- **Fully Responsive Design**: Works seamlessly on all devices from mobile to desktop
- **Multi-language Support**: Bilingual interface (English/Arabic) with RTL support
- **Progressive Web App (PWA)**: Installable on devices, works offline
- **Accessibility Focused**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Critical CSS, lazy loading, and efficient resource management
- **Modern UI/UX**: Smooth animations, interactive elements, and contemporary design
- **SEO Optimized**: Semantic HTML, structured data, and meta tags
- **Form Integration**: Contact form with Google Sheets backend

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for better SEO and accessibility
- **CSS3**: Custom properties, Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Modern JavaScript with class-based architecture
- **Service Worker**: For offline functionality and PWA features
- **Web Manifest**: For PWA installation capabilities
- **Google Fonts**: Inter (English) and Cairo (Arabic) font families
- **Google Sheets API**: Backend for contact form submissions

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── style.css           # Critical CSS for above-the-fold content
│   ├── non-critical.css    # Non-critical styles (animations, responsive)
│   └── ...
├── js/
│   ├── main.js             # Main JavaScript application
│   ├── translations.js     # Multi-language support
│   └── ...
├── images/                 # Image assets
├── assets/                 # Icons and other static assets
├── manifest.json           # PWA manifest file
├── sw.js                   # Service worker for offline support
└── README.md              # This file
```

## 🚀 Performance Optimizations

1. **Critical CSS Inlining**: Essential styles are inlined in the HTML head for faster rendering
2. **Asynchronous CSS Loading**: Non-critical styles are loaded asynchronously
3. **Font Optimization**: Using `font-display: swap` for better loading experience
4. **Resource Preloading**: Critical resources are preloaded for faster initial render
5. **Efficient JavaScript**: Debounced event handlers and optimized DOM operations
6. **Service Worker Caching**: Strategic caching for offline functionality
7. **Image Optimization**: Properly sized images and lazy loading

## 🔤 Internationalization (i18n)

The website supports both English and Arabic languages with automatic RTL layout switching. Language preference is saved in localStorage.

### Supported Languages
- English (default)
- Arabic (RTL layout)

### Language Switching
Click the 🌐 icon in the navigation bar to toggle between languages.

## 📱 Progressive Web App (PWA)

This website is a fully functional PWA with:
- Offline support
- Add to Home Screen capability
- Push notifications (planned)
- Fast loading times
- Responsive design for all devices

## 🎨 Design System

### Color Palette
- Primary: `#0066cc` (Blue)
- Secondary: `#ffffff` (White)
- Background: `#f8f9fa` (Light Gray)
- Text: `#1a1a1a` (Dark Gray)
- Accent Colors: Various gradients based on primary color

### Typography
- English: Inter font family
- Arabic: Cairo font family
- Responsive font sizing with relative units

### Spacing System
- XS: 0.5rem
- SM: 1rem
- MD: 1.5rem
- LG: 2rem
- XL: 3rem
- XXL: 4rem

## 🔧 Setup and Configuration

### Google Sheets Integration
To enable the contact form:
1. Create a Google Sheet and share it publicly
2. Enable Google Sheets API and get an API key
3. Update the `sheetId` and `apiKey` in `js/main.js`:
```javascript
this.sheetId = 'YOUR_GOOGLE_SHEET_ID';
this.apiKey = 'YOUR_GOOGLE_API_KEY';
```

### PWA Configuration
Update `manifest.json` with your information:
- `name`: Full application name
- `short_name`: Short application name
- `description`: Application description
- Icons and screenshots paths

## 📱 Responsive Breakpoints

- **Mobile**: Up to 575px
- **Large Mobile**: 576px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: 1200px and up

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus indicators and logical focus order
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Reduced Motion**: Support for `prefers-reduced-motion` media query
- **Skip Links**: "Skip to main content" link for keyboard users

## 🚀 Deployment

1. Upload all files to your web server
2. Ensure your server supports HTTPS (required for PWA features)
3. Configure your Google Sheets integration (optional)
4. Test the website across different devices and browsers

## 📈 SEO Features

- Semantic HTML structure
- Structured data (JSON-LD) for rich search results
- Meta tags for description, keywords, and social sharing
- Canonical URLs to prevent duplicate content issues
- XML sitemap (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 👤 Author

**Tarek Zhran**
- Website: [tarekzhran.com](https://tarekzhran.com)
- LinkedIn: [linkedin.com/in/tarekzhran](https://linkedin.com/in/tarekzhran)
- GitHub: [github.com/tarekzhran](https://github.com/tarekzhran)

## 🙏 Acknowledgments

- Google Fonts for providing excellent typography
- All open-source libraries and tools used in this project
- Inspiration from modern portfolio design trends

---

*Last updated: September 2025*