// DOM Elements
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadPage('page/home.html', 'home');
    setupNavigation();
    setupMobileMenu();
    setupFooterLinks();
});

// Function to force scroll to top
function forceScrollToTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

// Function to load pages dynamically
async function loadPage(pageUrl, pageName) {
    try {
        showLoading();
        
        // Force scroll to top before loading
        forceScrollToTop();
        
        const response = await fetch(pageUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        content.innerHTML = html;
        
        // Update active nav link based on page
        updateActiveNavLink(pageName);
        
        // Force scroll to top after content loads
        forceScrollToTop();
        
        // Re-initialize animations
        initializeAnimations();
        
    } catch (error) {
        console.error('Error loading page:', error);
        content.innerHTML = `
            <div class="error-container">
                <h2>Error Loading Page</h2>
                <p>Unable to load the requested content. Please try again later.</p>
            </div>
        `;
    }
}

// Update active state for navigation links
function updateActiveNavLink(activePage) {
    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to corresponding nav link
    const activeLink = document.querySelector(`.nav-link[href="#${activePage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Setup navigation functionality
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            handleNavigation(target, this);
        });
    });
}

// Setup footer links functionality
function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            handleNavigation(target, this);
        });
    });
}

// Handle navigation for both nav and footer links
function handleNavigation(target, linkElement) {
    let pageUrl = '';
    
    switch(target) {
        case 'home':
            pageUrl = 'page/home.html';
            break;
        case 'products':
            pageUrl = 'page/products.html';
            break;
        case 'services':
            pageUrl = 'page/services.html';
            break;
        case 'company':
            pageUrl = 'page/company.html';
            break;
        case 'contact':
            pageUrl = 'page/contact.html';
            break;
        default:
            pageUrl = 'page/home.html';
            target = 'home';
    }
    
    loadPage(pageUrl, target);
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Setup mobile menu functionality
function setupMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Initialize animations for loaded content
function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Add loading state
function showLoading() {
    content.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
}

// Add CSS for loading and error states
const style = document.createElement('style');
style.textContent = `
    .loading-container, .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        text-align: center;
    }
    
    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Handle all anchor links including footer
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        handleNavigation(target, e.target);
    }
});

// Ensure scroll to top on initial load
window.addEventListener('load', function() {
    forceScrollToTop();
});
