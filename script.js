// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Schedule Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const daySchedules = document.querySelectorAll('.day-schedule');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and schedules
        tabBtns.forEach(b => b.classList.remove('active'));
        daySchedules.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding schedule
        const targetDay = btn.getAttribute('data-day');
        document.getElementById(targetDay).classList.add('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.99)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form Submission
const registerForm = document.querySelector('.register-form form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registerForm);
        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const company = registerForm.querySelector('input[placeholder="회사명"]').value;
        const type = registerForm.querySelector('select').value;
        
        // Simple validation
        if (!name || !email || !company || !type) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '등록 중...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('등록이 완료되었습니다! 확인 이메일을 발송했습니다.');
            registerForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .category, .conference-card, .stat-card, .info-card, .step, .composition-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
});

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const targetDate = new Date('2024-12-11T00:00:00').getTime();
    const timeLeft = targetDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Event has started
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Quick Actions Menu
const quickActions = document.querySelector('.quick-actions');
const actionItems = document.querySelectorAll('.action-item');

actionItems.forEach(item => {
    item.addEventListener('click', () => {
        const action = item.querySelector('span').textContent;
        
        // Add click effect
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateY(-5px)';
        }, 150);
        
        // Handle different actions
        switch(action) {
            case '기업 참가신청':
                document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
                break;
            case '참관객 사전등록':
                document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
                break;
            case '컨퍼런스 참관등록':
                document.querySelector('#conference').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'E-카달로그':
                // Simulate download
                alert('E-카달로그 다운로드를 시작합니다.');
                break;
        }
    });
});

// Grid Item Hover Effects
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
    
    item.addEventListener('click', () => {
        // Add click effect
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'scale(1.02)';
        }, 150);
        
        // Navigate to relevant section based on content
        const title = item.querySelector('h3')?.textContent;
        if (title) {
            if (title.includes('컨퍼런스')) {
                document.querySelector('#conference').scrollIntoView({ behavior: 'smooth' });
            } else if (title.includes('전시')) {
                document.querySelector('#exhibition').scrollIntoView({ behavior: 'smooth' });
            } else if (title.includes('네트워킹')) {
                document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
            } else if (title.includes('혁신')) {
                document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Conference Card Interactions
const conferenceCards = document.querySelectorAll('.conference-card');

conferenceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add click effect
        card.style.transform = 'translateY(-15px)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 200);
        
        // Navigate to schedule section
        document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
    });
});

// Category Card Interactions
const categoryCards = document.querySelectorAll('.category');

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add click effect
        card.style.transform = 'scale(0.95) translateY(-10px)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 150);
        
        // Navigate to exhibition section
        document.querySelector('#exhibition').scrollIntoView({ behavior: 'smooth' });
    });
});

// Info Card Interactions
const infoCards = document.querySelectorAll('.info-card');

infoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add click effect
        card.style.transform = 'scale(0.95) translateY(-10px)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 150);
        
        // Handle different info types
        const title = card.querySelector('h3').textContent;
        if (title === '오시는 길') {
            // Open map or show directions
            alert('코엑스 C홀 위치를 보여줍니다.');
        } else if (title === '운영시간') {
            // Show detailed schedule
            document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
        } else if (title === '문의처') {
            // Show contact form
            document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
        } else if (title === '자료 다운로드') {
            // Simulate download
            alert('서밋 자료 다운로드를 시작합니다.');
        }
    });
});

// Step Interactions
const steps = document.querySelectorAll('.step');

steps.forEach((step, index) => {
    step.addEventListener('click', () => {
        // Add click effect
        step.style.transform = 'translateX(15px) scale(1.02)';
        setTimeout(() => {
            step.style.transform = 'translateX(10px)';
        }, 200);
        
        // Navigate to relevant section based on step
        switch(index) {
            case 0: // Step 01 - 씨앗
                document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
                break;
            case 1: // Step 02 - 인턴
                document.querySelector('#exhibition').scrollIntoView({ behavior: 'smooth' });
                break;
            case 2: // Step 03 - 창업가
                document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
                break;
            case 3: // Step 04 - 멘토
                document.querySelector('#conference').scrollIntoView({ behavior: 'smooth' });
                break;
            case 4: // Step 05 - 프로
                document.querySelector('#conference').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
});

// Composition Item Interactions
const compositionItems = document.querySelectorAll('.composition-item');

compositionItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add click effect
        item.style.transform = 'translateY(-15px) scale(1.02)';
        setTimeout(() => {
            item.style.transform = 'translateY(-10px)';
        }, 200);
        
        // Navigate to relevant section based on content
        const title = item.querySelector('h3').textContent;
        if (title === 'Global Summit') {
            document.querySelector('#conference').scrollIntoView({ behavior: 'smooth' });
        } else if (title === 'Poster Session') {
            document.querySelector('#exhibition').scrollIntoView({ behavior: 'smooth' });
        } else if (title === 'Mentoring Program') {
            document.querySelector('#schedule').scrollIntoView({ behavior: 'smooth' });
        } else if (title === 'IR Pitching') {
            document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    .quick-actions {
        animation: slideInRight 1s ease-out 0.5s both;
    }
    
    .content-grid {
        animation: fadeInUp 1s ease-out 0.8s both;
    }
    
    .about-content {
        animation: fadeInUp 1s ease-out 1s both;
    }
    
    .event-composition {
        animation: fadeInUp 1s ease-out 1.2s both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .grid-overlay {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .action-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .conference-card,
    .category,
    .info-card,
    .step,
    .composition-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .step {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .composition-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #00AA64;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(0, 170, 100, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
    backToTopBtn.style.background = '#00995A';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
    backToTopBtn.style.background = '#00AA64';
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to feature icons
    const featureIcons = document.querySelectorAll('.feature i');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchTerm = prompt('검색할 내용을 입력하세요:');
        if (searchTerm) {
            // Simple search implementation
            const sections = ['about', 'conference', 'exhibition', 'schedule', 'register', 'info'];
            let found = false;
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element && element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                    return;
                }
            });
            
            if (!found) {
                alert('검색 결과를 찾을 수 없습니다.');
            }
        }
    });
}

// Language selector functionality
const languageSelector = document.querySelector('.language-selector');
if (languageSelector) {
    languageSelector.addEventListener('click', () => {
        // Toggle between KOR and ENG
        const currentLang = languageSelector.querySelector('span');
        if (currentLang.textContent === 'KOR') {
            currentLang.textContent = 'ENG';
        } else {
            currentLang.textContent = 'KOR';
        }
    });
}

// Dropdown menu interactions
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Add hover effect for mobile
        if (window.innerWidth <= 768) {
            dropdown.addEventListener('click', (e) => {
                e.preventDefault();
                menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
                menu.style.transform = menu.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
            });
        }
    });
});

console.log('I LOVE X 코엑스 서밋 2024 홈페이지가 로드되었습니다! 🧬');
console.log('I LOVE X 스타일이 완벽하게 적용되었습니다! ✨');
console.log('새로운 About 섹션과 진행 단계가 추가되었습니다! 🚀');
console.log('정확한 I LOVE X 로고가 적용되었습니다! 🎨');
console.log('두 개의 겹쳐진 리본 모양 X 로고와 정확한 텍스트가 구현되었습니다! ✨');
