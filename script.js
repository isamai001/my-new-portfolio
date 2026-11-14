// Color Palette System / Custom Theme Controller
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Retrieve previous theme state or default to Dark mode
    let currentTheme = localStorage.getItem('portfolio-theme');
    if (!currentTheme) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            document.body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-moon';
        } else {
            document.body.classList.remove('light-theme');
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Toggle Theme Click Listener
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('portfolio-theme', 'light-theme');
            showToast('Theme Updated', 'Switched to Light Mode', 'success');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('portfolio-theme', 'dark-theme');
            showToast('Theme Updated', 'Switched to Dark Mode', 'success');
        }
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Graphics Designer', 'Web Developer', 'Digital Marketer', 'QA Specialist'];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1000);
    }
}

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', function () {
    if (textArray.length) setTimeout(type, 1000);
});

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(skillBar => {
        const width = skillBar.getAttribute('data-width');
        skillBar.style.width = width + '%';
    });
}

// Interactive Stats Counter (Intersection Observer)
const statsSection = document.getElementById('stats');
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const animateCounters = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds duration
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        // Handle custom labels
        const getLabel = (val) => {
            if (target === 99) return val + '%';
            if (target === 24) return val + '/7';
            return val + '+';
        };

        const timer = setInterval(() => {
            current += Math.ceil(target / 100) || 1;
            if (current >= target) {
                stat.textContent = getLabel(target);
                clearInterval(timer);
            } else {
                stat.textContent = getLabel(current);
            }
        }, Math.max(stepTime, 20));
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Portfolio Filtering with CSS transitions
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const matches = filterValue === 'all' || itemCategory === filterValue;

            if (matches) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.85)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Detailed Mock Data for Interactive Modals
const projectData = {
    juakali: {
        title: "JuaKali Hub",
        tagline: "Connecting Skilled Local Artisans with Clients",
        challenge: "Skilled artisans and informal workers (plumbers, carpenters, electricians) struggle to find consistent clients in urban areas due to digital exclusion, while users lack a reliable, vetted directory.",
        solution: "Engineered a geolocation-enabled marketplace dashboard using React and Node.js. Integrated SMS notification gateways for instant booking alerts and structured a verification flow for local workers.",
        stats: {
            "active workers": "5,000+",
            "SMS delivery": "98%",
            "user rating": "4.8/5.0",
            " Kenyan stack": "100%"
        },
        tags: ["Web Development", "UI/UX Design", "Kenyan Startup", "SMS Gateway"],
        previewType: "desktop",
        previewData: {
            url: "https://juakalihub.co.ke",
            html: `
                <div style="font-family:sans-serif;color:var(--text);padding:5px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                        <h4 style="color:var(--secondary);margin:0;font-size:1rem;font-weight:700;">🇰🇪 JuaKali Hub Dashboard</h4>
                        <span style="font-size:0.7rem;background:rgba(6,182,212,0.15);padding:2px 8px;border-radius:10px;color:var(--secondary);">Nairobi Node</span>
                    </div>
                    <p style="font-size:0.75rem;color:var(--text-light);margin-top:0;margin-bottom:12px;">Vetted local service listings near you:</p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:15px;">
                        <div style="background:var(--bg-tertiary);padding:10px;border-radius:8px;border:1px solid var(--card-border);text-align:center;">
                            <div style="width:30px;height:30px;border-radius:50%;background:rgba(139,92,246,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 8px;color:var(--primary);"><i class="fas fa-wrench"></i></div>
                            <div style="font-weight:600;font-size:0.8rem;">Kamau (Plumbing)</div>
                            <div style="color:var(--secondary);font-size:0.75rem;margin:4px 0;">Nairobi East</div>
                            <button class="btn" style="padding:4px 10px;font-size:0.65rem;text-transform:none;border-radius:4px;" onclick="triggerJuaKaliBook('Kamau')">Book Service</button>
                        </div>
                        <div style="background:var(--bg-tertiary);padding:10px;border-radius:8px;border:1px solid var(--card-border);text-align:center;">
                            <div style="width:30px;height:30px;border-radius:50%;background:rgba(6,182,212,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 8px;color:var(--secondary);"><i class="fas fa-hammer"></i></div>
                            <div style="font-weight:600;font-size:0.8rem;">Otieno (Carpentry)</div>
                            <div style="color:var(--secondary);font-size:0.75rem;margin:4px 0;">Westlands</div>
                            <button class="btn" style="padding:4px 10px;font-size:0.65rem;text-transform:none;border-radius:4px;" onclick="triggerJuaKaliBook('Otieno')">Book Service</button>
                        </div>
                    </div>
                    <div style="background:var(--bg-tertiary);padding:10px;border-radius:8px;border:1px solid var(--card-border);font-size:0.75rem;">
                        ⚡ System Status: <span style="color:#10b981;font-weight:700;">Online</span> | Active SMS SMS Gateway: <span style="color:var(--secondary);">Connected</span>
                    </div>
                </div>
            `
        }
    },
    branding: {
        title: "Imara Clean Visual Identity",
        tagline: "Corporate Branding for Clean Leaf Enterprises",
        challenge: "Clean Leaf Enterprises needed a modern, highly memorable brand identity for their sanitation brand, Imara Clean, to apply across web catalogs and physical product labels.",
        solution: "Designed vector-based emblems, typography guidelines, and packaging standards in Adobe Illustrator. Established standard typography rules (Outfit & Montserrat) and color guidelines.",
        stats: {
            "deliverables": "15+ assets",
            "consistency": "100%",
            "platforms": "Web & Packaging",
            "tools": "Illustrator / Figma"
        },
        tags: ["Graphic Design", "Branding", "Visual Identity", "Typography"],
        previewType: "desktop",
        previewData: {
            url: "https://cleanleaf.co.ke/imaraclean-book",
            html: `
                <div style="font-family:sans-serif;color:var(--text);padding:5px;text-align:center;">
                    <h4 style="margin-top:0;margin-bottom:15px;font-size:0.95rem;">Imara Clean Brand Guidelines</h4>
                    <div style="display:flex;justify-content:center;align-items:center;gap:15px;margin-bottom:20px;background:var(--bg-tertiary);padding:15px;border-radius:10px;border:1px solid var(--card-border);">
                        <div style="width:50px;height:50px;background:linear-gradient(135deg,#10b981,#06b6d4);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.4rem;box-shadow:0 8px 15px rgba(16,185,129,0.25);">IC</div>
                        <div style="text-align:left;">
                            <div style="font-weight:700;font-size:1.1rem;line-height:1.1;color:var(--text);">Imara Clean</div>
                            <div style="font-size:0.75rem;color:var(--text-light);margin-top:2px;">Clean Leaf Enterprises</div>
                        </div>
                    </div>
                    <p style="font-size:0.75rem;color:var(--text-light);margin-bottom:15px;text-align:left;">Selected palettes represent health, sanitization and premium eco-friendly values.</p>
                    <div style="display:flex;justify-content:center;gap:8px;">
                        <span style="width:24px;height:24px;border-radius:50%;background:#10b981;border:1px solid #fff;display:inline-block;cursor:pointer;" title="Clean Green" onclick="alert('Green representation: Sanitization')"></span>
                        <span style="width:24px;height:24px;border-radius:50%;background:#06b6d4;border:1px solid #fff;display:inline-block;cursor:pointer;" title="Teal Ocean" onclick="alert('Teal representation: Health')"></span>
                        <span style="width:24px;height:24px;border-radius:50%;background:#e2e8f0;border:1px solid #fff;display:inline-block;cursor:pointer;" title="Pure White" onclick="alert('White representation: Purity')"></span>
                        <span style="width:24px;height:24px;border-radius:50%;background:#0f172a;border:1px solid #fff;display:inline-block;cursor:pointer;" title="Slate Blue" onclick="alert('Dark base color')"></span>
                    </div>
                </div>
            `
        }
    },
    imaraclean: {
        title: "Imara Clean Social Campaign",
        tagline: "Social Media Growth for Clean Leaf Enterprises",
        challenge: "Clean Leaf Enterprises needed to scale local B2B lead generation and raise consumer engagement for their sanitization products.",
        solution: "Drafted localized social media graphic campaigns. Structured marketing funnels and optimized ad budgets on Meta and LinkedIn, resulting in a 150% organic engagement increase.",
        stats: {
            "traffic growth": "+150%",
            "lead reduction": "-35%",
            "brand followers": "12k+",
            "ROAS score": "4.2x"
        },
        tags: ["Digital Marketing", "SEO", "Google Analytics", "Social Media"],
        previewType: "desktop",
        previewData: {
            url: "https://analytics.google.com/dashboard",
            html: `
                <div style="font-family:sans-serif;color:var(--text);padding:5px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
                        <h4 style="margin:0;font-size:0.95rem;color:var(--text);">📈 Social Media Insights</h4>
                        <span style="font-size:0.65rem;color:#10b981;background:rgba(16,185,129,0.1);padding:2px 8px;border-radius:10px;">Clean Leaf Portal</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px;">
                        <div style="background:var(--bg-tertiary);padding:10px;border-radius:8px;border:1px solid var(--card-border);">
                            <div style="font-size:0.7rem;color:var(--text-light);">Direct Leads</div>
                            <div style="font-size:1.2rem;font-weight:700;color:var(--secondary);margin-top:2px;">+150%</div>
                        </div>
                        <div style="background:var(--bg-tertiary);padding:10px;border-radius:8px;border:1px solid var(--card-border);">
                            <div style="font-size:0.7rem;color:var(--text-light);">Ad Spend CAC</div>
                            <div style="font-size:1.2rem;font-weight:700;color:var(--primary);margin-top:2px;">-35%</div>
                        </div>
                    </div>
                    <div style="height:90px;display:flex;align-items:flex-end;gap:20px;border-left:1px solid var(--text-light);border-bottom:1px solid var(--text-light);padding-left:10px;padding-bottom:5px;">
                        <div style="width:25px;height:25%;background:var(--accent);border-radius:3px 3px 0 0;text-align:center;font-size:0.6rem;color:#fff;">M1</div>
                        <div style="width:25px;height:45%;background:var(--accent);border-radius:3px 3px 0 0;text-align:center;font-size:0.6rem;color:#fff;">M2</div>
                        <div style="width:25px;height:70%;background:var(--primary);border-radius:3px 3px 0 0;text-align:center;font-size:0.6rem;color:#fff;">M3</div>
                        <div style="width:25px;height:95%;background:var(--secondary);border-radius:3px 3px 0 0;text-align:center;font-size:0.6rem;color:#fff;">M4</div>
                    </div>
                </div>
            `
        }
    },
    fitness: {
        title: "FitAfya Mobile App",
        tagline: "Freelance Health & Workout Tracker",
        challenge: "Developing a fitness tracker mobile app that retains user motivation and works seamlessly offline while tracking running routes and caloric benchmarks.",
        solution: "Designed a clean, dark-themed UI in Figma. Developed client-side local cache syncing and integrated Google Maps API tracking. Conducted end-to-end automated UI testing to verify dashboard analytics accuracy.",
        stats: {
            "downloads": "10k+",
            "app store rating": "4.8/5.0",
            "crash-free rate": "99.98%",
            "testing coverage": "92%"
        },
        tags: ["Mobile Development", "React Native", "UI/UX Design", "QA Testing"],
        previewType: "phone",
        previewData: {
            tabs: ["Home", "Stats", "Profile"],
            html: {
                Home: `
                    <div style="text-align:center;padding:15px 0;font-family:sans-serif;">
                        <h4 style="margin:0 0 5px;font-size:0.9rem;">👋 FitAfya Dashboard</h4>
                        <p style="font-size:0.7rem;color:var(--text-light);margin-top:0;margin-bottom:15px;">Your workout tracker is active</p>
                        <div style="width:105px;height:105px;border-radius:50%;border:6px solid var(--secondary);display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 15px;box-shadow:0 0 15px rgba(6,182,212,0.2)">
                            <span style="font-size:1.2rem;font-weight:700;">6,420</span>
                            <span style="font-size:0.6rem;color:var(--text-light);">Steps</span>
                        </div>
                        <p style="font-size:0.75rem;margin:0;">Goal: 10,000 steps</p>
                    </div>
                `,
                Stats: `
                    <div style="font-family:sans-serif;">
                        <h4 style="margin-top:0;margin-bottom:15px;font-size:0.9rem;">📈 Weekly Activities</h4>
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:3px;">
                                    <span>Running</span><span>3.2 km</span>
                                </div>
                                <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;overflow:hidden;">
                                    <div style="width:75%;height:100%;background:var(--primary);"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex;justify-content:space-between;font-size:0.7rem;margin-bottom:3px;">
                                    <span>Cycling</span><span>12.5 km</span>
                                </div>
                                <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;overflow:hidden;">
                                    <div style="width:55%;height:100%;background:var(--secondary);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                Profile: `
                    <div style="text-align:center;font-family:sans-serif;">
                        <div style="width:60px;height:60px;border-radius:50%;overflow:hidden;margin:0 auto 10px;border:2px solid var(--secondary);">
                            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120" style="width:100%;height:100%;object-fit:cover;" alt="Avatar">
                        </div>
                        <h4 style="margin:0 0 2px;font-size:0.9rem;">Isaya Maindi</h4>
                        <p style="font-size:0.7rem;color:var(--text-light);margin-top:0;margin-bottom:12px;">Active Member</p>
                        <span style="background:var(--bg-tertiary);font-size:0.65rem;padding:4px 10px;border-radius:10px;border:1px solid var(--card-border);display:inline-block;color:var(--secondary);">Cardio Master</span>
                    </div>
                `
            }
        }
    },
    kiwamitech_web: {
        title: "Kiwami Marketing System Platform Redesign",
        tagline: "Corporate Portal Refactoring",
        challenge: "Kiwami Marketing Sysytem's legacy site loaded slowly (above 6s) on mobile devices, leading to a high user bounce rate and a decrease in online consultation requests.",
        solution: "Refactored the front-end layout with semantic HTML5 and vanilla CSS. Optimized scripts, asset delivery sizes, and call-to-actions, reducing page load to 1.1 seconds.",
        stats: {
            "page load speed": "1.1s",
            "bounce rate": "-40%",
            "inbound queries": "+65%",
            "mobile speed score": "98/100"
        },
        tags: ["Web Development", "UI/UX Design", "SEO", "Responsive Design"],
        previewType: "desktop",
        previewData: {
            url: "https://kiwamitech.com",
            html: `
                <div style="font-family:sans-serif;color:var(--text);padding:5px;">
                    <nav style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--card-border);padding-bottom:10px;margin-bottom:15px;">
                        <span style="font-weight:700;color:var(--secondary);font-size:0.85rem;">✨ KIWAMITECH</span>
                        <span style="font-size:0.65rem;color:var(--text-light);">Services / Case Studies</span>
                    </nav>
                    <div style="text-align:center;padding:15px 0;">
                        <h3 style="font-size:1rem;margin:0 0 8px;color:var(--text);font-weight:700;">Accelerating Digital Future</h3>
                        <p style="font-size:0.7rem;color:var(--text-light);margin-top:0;margin-bottom:15px;">Next-Gen Cloud & QA Automation Consulting</p>
                        <button class="btn" style="padding:6px 12px;font-size:0.7rem;text-transform:none;border-radius:4px;" onclick="alert('Demo Contact Request Submitted')">Get Free Audit</button>
                    </div>
                </div>
            `
        }
    },
    kiwamitech_qa: {
        title: "Kiwamitech Automation Suite",
        tagline: "E2E Automated Testing Pipeline",
        challenge: "Legacy deployment cycles delayed by manual regression validation tests requiring up to 40 hours of development QA per sprint.",
        solution: "Authored regression suites using Playwright, NodeJS, and Jenkins. Configured automated visual tests, reducing validation cycle runtimes to under 5 minutes.",
        stats: {
            "testing runtime": "-70%",
            "detection rate": "94%",
            "CI/CD setup": "100%",
            "test coverage": "88%"
        },
        tags: ["Quality Assurance", "Automation", "Playwright", "CI/CD"],
        previewType: "terminal",
        previewData: {
            commands: [
                { cmd: "npm run test:e2e", type: "input" },
                { cmd: "> playwright test --project=chromium --project=firefox", type: "info" },
                { cmd: "Running 24 tests using 4 workers", type: "info" },
                { cmd: "[Chromium] › auth.spec.js:12 › Success Login (1.8s)", type: "success" },
                { cmd: "[Firefox]  › auth.spec.js:12 › Success Login (2.4s)", type: "success" },
                { cmd: "[Chromium] › shop.spec.js:45 › Add to Cart works (1.6s)", type: "success" },
                { cmd: "[Firefox]  › shop.spec.js:45 › Add to Cart works (2.1s)", type: "success" },
                { cmd: "[Chromium] › api.spec.js:80 › API Integration mocks (0.4s)", type: "success" },
                { cmd: "[Firefox]  › api.spec.js:80 › API Integration mocks (0.5s)", type: "success" },
                { cmd: "[Chromium] › pay.spec.js:10 › Checkout flow (failed - retrying)", type: "warn" },
                { cmd: "[Chromium] › pay.spec.js:10 › Checkout flow (passed on retry 2.2s)", type: "success" },
                { cmd: "[Firefox]  › pay.spec.js:10 › Checkout flow (2.5s)", type: "success" },
                { cmd: "✔ 24 passed (12.8s)", type: "success" },
                { cmd: "Compilation: E2E Pipeline SUCCESS.", type: "success" }
            ]
        }
    }
};

const portfolioDetailData = {
    brand_identity: {
        title: "Brand Identity Design",
        category: "Graphic Design",
        description: "Comprehensive corporate identity package including logo configurations, custom color guides, typography scales, business cards, and digital templates.",
        details: "Designed using Adobe Illustrator and Figma. Emphasized vector scalability and clean brand grids to ensure uniform reproduction across mobile layouts and large print mediums.",
        tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop"],
        deliverables: ["Primary & Secondary Logos", "Brand Style Guide Book", "Typography Hierarchy", "Business Card Design", "Digital Asset Templates"],
        results: "Established a cohesive visual brand presence that boosted customer recall by 40%."
    },
    mobile_uiux: {
        title: "Mobile App UI/UX Design",
        category: "UI/UX Design",
        description: "Wireframed and designed high-fidelity mockups for a multi-page health and fitness tracking client application.",
        details: "Created utilizing Figma. Implemented micro-interactions, dark mode screens, and interactive dashboard maps ensuring a high usability metric during user testing sprints.",
        tools: ["Figma", "Miro", "Adobe Photoshop"],
        deliverables: ["User Flow Diagrams", "Low-Fidelity Wireframes", "High-Fidelity Mockups", "Interactive Clickable Prototype", "UI Design System & Components"],
        results: "Achieved a 94% task completion rate in user testing runs prior to engineering handoff."
    },
    dashboard_design: {
        title: "Business Dashboard Design",
        category: "Graphic Design / UI",
        description: "Constructed UI/UX guidelines and dashboards layouts for a business analytics SaaS company.",
        details: "Optimized complex data tables, graphs, and filter blocks for maximum usability and aesthetic premium feel. Implemented glassmorphic panels and neon analytics markers.",
        tools: ["Figma", "Adobe Illustrator", "HTML/CSS Prototypes"],
        deliverables: ["Data Analytics Dashboard Layout", "Custom Data Visualizations", "Custom Icon Library", "Responsive Grid Specifications", "Light/Dark Mode Mockups"],
        results: "Reduced user onboarding support requests by 25% due to improved navigation clarity."
    },
    ecommerce_web: {
        title: "E-commerce Platform Development",
        category: "Web Development",
        description: "Developed custom backends and custom responsive checkouts for digital platforms.",
        details: "Used React, Express, MongoDB, and integrated third-party secure APIs (Stripe, Paypal) with complete validation and custom loading states.",
        tools: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
        deliverables: ["Responsive Storefront UI", "Secure Customer Checkout Flow", "Admin Inventory Dashboard", "JWT Authentication System", "API Documentation"],
        results: "Successfully handled over 10,000 monthly transactions with zero downtime during peak season."
    },
    corporate_web: {
        title: "Corporate Website Redesign",
        category: "Web Development",
        description: "Optimized and restructured standard corporate websites for loading speed and conversion rate.",
        details: "Enhanced load times from 6s to 1.1s by deferring non-essential assets, implementing smart responsive layouts, and minifying styling matrices.",
        tools: ["HTML5", "Vanilla CSS3", "JavaScript (ES6)", "Web vitals audits"],
        deliverables: ["Speed-Optimized Front-end Code", "Asset Optimization Pipeline", "Interactive Service Catalog", "Responsive Multi-Device Layouts", "SEO Tags Integration"],
        results: "Boosted mobile traffic conversion rate by 65% and reduced bounce rate from 55% to 18%."
    },
    custom_webapp: {
        title: "Custom Web Application",
        category: "Web Development",
        description: "Created client management portals featuring secure token-based logins, search lists, and data charts.",
        details: "Integrated JWT tokens, bcrypt security encryptions, and custom interactive data reports with smooth animations.",
        tools: ["Node.js", "Vue.js", "MySQL", "Chart.js", "TailwindCSS"],
        deliverables: ["Secure Login Portal", "Dynamic Client Database Grid", "Interactive Visual Reports", "Role-Based Access Control", "Email Notification Service"],
        results: "Streamlined internal client management flow, reducing task execution times by 35%."
    },
    marketing_campaign: {
        title: "Integrated Marketing Campaign",
        category: "Digital Marketing",
        description: "Devised online customer attraction and acquisition schemes for digital products.",
        details: "Analyzed demographics and implemented highly targeted visual copy and landing pages, yielding a 150% traffic increase and lower conversion costs.",
        tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Semrush"],
        deliverables: ["Customer Persona Profile", "Ad Copy & Banner Asset Pack", "Custom Landing Page Design", "A/B Testing Experiments Setup", "Performance Analytics Report"],
        results: "Generated over 2,500 qualified leads with a 3x Return on Ad Spend (ROAS)."
    },
    content_strategy: {
        title: "Content Marketing Plan",
        category: "Digital Marketing",
        description: "Drafted organic traffic generation systems utilizing high-quality blog postings and technical guides.",
        details: "Automated SEO indexing and content structures, securing first-page keyword placements on major search engines.",
        tools: ["WordPress", "Google Search Console", "Ahrefs", "Canva Pro"],
        deliverables: ["6-Month Editorial Calendar", "SEO Optimized Articles", "Social Media Content Prompts", "Keyword Strategy Blueprint", "Backlink Outreach Program"],
        results: "Drove organic search traffic up by 180% within 4 months, ranking 12 target keywords on Page 1."
    },
    ads_optimization: {
        title: "Ad Campaign Optimization",
        category: "Digital Marketing",
        description: "Managed and optimized PPC advertising spends across Google, Meta, and LinkedIn channels.",
        details: "Introduced pixel conversion tracking tools and A/B tested ad copy, reducing client acquisition costs by 35% in 60 days.",
        tools: ["LinkedIn Campaign Manager", "Facebook Pixel", "Google Tag Manager"],
        deliverables: ["Pixel Tracking Installation", "Custom Audiences Configuration", "A/B Tested Ad Variations", "Budget Allocation Plan", "ROAS Optimization Audits"],
        results: "Decreased Cost-Per-Acquisition (CPA) by 35% while maintaining the same leads volume."
    },
    manual_testing: {
        title: "Functional & Regression Testing",
        category: "Quality Assurance",
        description: "Prepared manual test logs, bug tracking tickets, and validation suites for software applications.",
        details: "Identified over 45 critical security and layout issues prior to app deployments, saving client deployment schedules.",
        tools: ["Jira", "TestRail", "BrowserStack", "Postman"],
        deliverables: ["Master Test Plan Document", "Interactive Test Cases Excel", "Detailed Bug Reports (Jira)", "Cross-Browser Testing Logs", "Exploratory Test Findings"],
        results: "Prevented major regression bugs from reaching production, keeping post-release bug reports under 2%."
    },
    automation_testing: {
        title: "E2E Automation Testing",
        category: "Quality Assurance",
        description: "Authored end-to-end automated testing pipelines using Selenium, Playwright, and Node.js.",
        details: "Constructed parallel testing execution blocks, cutting regression testing cycles by 70% and ensuring complete verification coverage.",
        tools: ["Playwright", "Node.js", "Jenkins CI/CD", "GitLab CI"],
        deliverables: ["E2E Regression Script Library", "CI/CD Auto-Trigger Test Pipeline", "HTML Test Execution Reports", "Page Object Model (POM) Structure", "Parallel Test Runner Config"],
        results: "Reduced smoke test runtime from 4 hours to just 8 minutes per release build."
    },
    api_testing: {
        title: "API Verification Testing",
        category: "Quality Assurance",
        description: "Developed structural API assertions and schema validations using Postman and Newman runners.",
        details: "Integrated continuous integration pipeline alerts ensuring that microservice responses maintain structure compliance and response constraints.",
        tools: ["Postman", "Newman CLI", "JavaScript", "GitHub Actions"],
        deliverables: ["Postman Collection & Mocks", "API Contract Validation Scripts", "Dynamic Environments File", "Automated Postman CI Runner", "Microservices Performance Tests"],
        results: "Guaranteed schema compatibility for 50+ REST endpoints, flagging 12 contract breaks before deployment."
    }
};

// Modal Operations
const projectModal = document.getElementById('projectModal');
const projectModalBody = document.getElementById('projectModalBody');
const closeProjectModalBtn = document.getElementById('closeProjectModal');

// Open Modal logic for Featured Projects & Portfolio Items
function openModal(data, isProject = true) {
    if (!data) return;

    document.body.style.overflow = 'hidden'; // Lock background scroll
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');

    if (isProject) {
        // Build Featured Project Grid structure
        let rightPaneHtml = '';

        if (data.previewType === 'terminal') {
            rightPaneHtml = `
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-dots">
                            <span class="terminal-dot-red"></span>
                            <span class="terminal-dot-yellow"></span>
                            <span class="terminal-dot-green"></span>
                        </div>
                        <div class="terminal-title">QA_Automation_Suite_Runner</div>
                    </div>
                    <div class="terminal-body" id="simTerminalBody">
                        <!-- Loaded dynamically -->
                    </div>
                </div>
            `;
        } else if (data.previewType === 'phone') {
            const tabsHtml = data.previewData.tabs.map((tab, idx) => `
                <span class="phone-nav-item ${idx === 0 ? 'active' : ''}" onclick="switchPhoneTab(this, '${tab}', 'fitness')">
                    <i class="fas ${tab === 'Home' ? 'fa-home' : (tab === 'Stats' ? 'fa-chart-bar' : 'fa-user')}"></i>
                </span>
            `).join('');

            rightPaneHtml = `
                <div class="phone-mockup">
                    <div class="phone-top-bar">
                        <span>9:41</span>
                        <span><i class="fas fa-wifi"></i> <i class="fas fa-battery-three-quarters"></i></span>
                    </div>
                    <div class="phone-screen" id="simPhoneScreen">
                        ${data.previewData.html.Home}
                    </div>
                    <div class="phone-nav-bar">
                        ${tabsHtml}
                    </div>
                </div>
            `;
        } else {
            // Desktop preview simulation
            rightPaneHtml = `
                <div class="desktop-preview">
                    <div class="desktop-header">
                        <div class="terminal-dots" style="margin-right:10px;">
                            <span class="terminal-dot-red"></span>
                            <span class="terminal-dot-yellow"></span>
                            <span class="terminal-dot-green"></span>
                        </div>
                        <div class="desktop-address">${data.previewData.url}</div>
                    </div>
                    <div class="desktop-body" id="simDesktopBody">
                        ${data.previewData.html}
                    </div>
                </div>
            `;
        }

        const statsHtml = Object.entries(data.stats).map(([label, val]) => `
            <div class="project-stat-box">
                <h5>${val}</h5>
                <p>${label}</p>
            </div>
        `).join('');

        const tagsHtml = data.tags.map(tag => `
            <span class="project-tag">${tag}</span>
        `).join('');

        projectModalBody.innerHTML = `
            <div class="project-modal-grid">
                <div class="project-modal-left">
                    <h3 class="project-modal-title">${data.title}</h3>
                    <p class="project-modal-tagline">${data.tagline}</p>
                    
                    <div class="project-modal-section">
                        <h4>The Challenge</h4>
                        <p>${data.challenge}</p>
                    </div>
 
                    <div class="project-modal-section">
                        <h4>The Solution</h4>
                        <p>${data.solution}</p>
                    </div>

                    <div class="project-modal-section">
                        <h4>Technologies Used</h4>
                        <div class="project-tags" style="margin-top:10px;">
                            ${tagsHtml}
                        </div>
                    </div>

                    <div class="project-modal-section">
                        <h4>Impact / Metrics</h4>
                        <div class="project-modal-stats">
                            ${statsHtml}
                        </div>
                    </div>
                </div>
                <div class="project-modal-right">
                    <div class="project-modal-section">
                        <h4 style="margin-bottom:15px; border-left-color: var(--secondary);"><i class="fas fa-play-circle"></i> Interactive Preview</h4>
                        ${rightPaneHtml}
                    </div>
                </div>
            </div>
        `;

        // Trigger simulation tasks after injection
        if (data.previewType === 'terminal') {
            const termBody = document.getElementById('simTerminalBody');
            startTerminalSimulation(termBody, data.previewData.commands);
        }

    } else {
        // Build Portfolio Case Study details structure with rich sections
        const toolsHtml = data.tools && data.tools.length ? `
            <div class="project-modal-section">
                <h4>Tools & Technologies</h4>
                <div class="project-tags" style="margin-top:10px;">
                    ${data.tools.map(tool => `<span class="project-tag" style="background:rgba(6,182,212,0.1); border-color:rgba(6,182,212,0.2); color:var(--secondary);">${tool}</span>`).join('')}
                </div>
            </div>
        ` : '';

        const deliverablesHtml = data.deliverables && data.deliverables.length ? `
            <div class="project-modal-section">
                <h4>Key Deliverables</h4>
                <ul style="list-style:none; padding-left:0; margin-top:10px;">
                    ${data.deliverables.map(item => `
                        <li style="margin-bottom:8px; font-size:0.95rem; color:var(--text-light); display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-check-circle" style="color:var(--secondary); font-size:0.85rem;"></i> ${item}
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : '';

        const resultsHtml = data.results ? `
            <div class="project-modal-section">
                <h4>Project Outcomes</h4>
                <p style="font-size:1.05rem; line-height:1.7; color:var(--text-light);">${data.results}</p>
            </div>
        ` : '';

        projectModalBody.innerHTML = `
            <div style="font-family: var(--font-body);">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--card-border); padding-bottom:15px; margin-bottom:25px;">
                    <h3 class="project-modal-title" style="margin:0;">${data.title}</h3>
                    <span style="font-weight:700; color:var(--secondary); background:var(--bg-tertiary); padding:6px 16px; border-radius:30px; font-size:0.85rem; border:1px solid var(--card-border);">${data.category}</span>
                </div>
                <div class="project-modal-grid">
                    <div class="project-modal-left">
                        <div class="project-modal-section">
                            <h4>Description</h4>
                            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-light);">${data.description}</p>
                        </div>
                        <div class="project-modal-section">
                            <h4>Execution Methodology</h4>
                            <p style="font-size:1.05rem; line-height:1.7; color:var(--text-light);">${data.details}</p>
                        </div>
                        ${resultsHtml}
                    </div>
                    <div class="project-modal-right">
                        ${toolsHtml}
                        ${deliverablesHtml}
                    </div>
                </div>
                <div style="margin-top:35px; border-top:1px solid var(--card-border); padding-top:25px; display:flex; gap:15px;">
                    <button class="btn" onclick="closeModalDirect()"><i class="fas fa-check"></i> Close Case Study</button>
                </div>
            </div>
        `;
    }
}

function closeModalDirect() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Unlock background scroll
    projectModalBody.innerHTML = '';
}

closeProjectModalBtn.addEventListener('click', closeModalDirect);

// Close modal when clicking on the outside overlay
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal || e.target.classList.contains('modal-dialog')) {
        closeModalDirect();
    }
});

// Setup click listeners on Featured Project cards & links
document.querySelectorAll('.open-project-modal').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectKey = link.getAttribute('data-project');
        openModal(projectData[projectKey], true);
    });
});

// Setup click listeners on Portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const portfolioKey = item.getAttribute('data-portfolio');
        openModal(portfolioDetailData[portfolioKey], false);
    });
});

// Resume Modal operations
const resumeModal = document.getElementById('resumeModal');
const closeResumeModalBtn = document.getElementById('closeResumeModal');
const openResumeBtn = document.getElementById('openResumeBtn');
const openResumeBtnAbout = document.getElementById('openResumeBtnAbout');

function openResume() {
    document.body.style.overflow = 'hidden';
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
}

function closeResume() {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
if (openResumeBtnAbout) openResumeBtnAbout.addEventListener('click', openResume);
if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResume);

resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal || e.target.classList.contains('modal-dialog')) {
        closeResume();
    }
});

// Simulated Terminal output renderer
function startTerminalSimulation(container, lines) {
    if (!container) return;
    container.innerHTML = '';
    let index = 0;

    function printLine() {
        if (!document.getElementById('simTerminalBody')) return; // Exit if modal closed

        if (index < lines.length) {
            const line = lines[index];
            const div = document.createElement('div');
            div.className = 'terminal-line';

            let typeClass = '';
            if (line.type === 'input') {
                div.innerHTML = `<span style="color:#10b981;font-weight:700;">Isaya-Kiwamitech-QA:~$</span> <span class="term-cmd">${line.cmd}</span>`;
            } else {
                if (line.type === 'success') typeClass = 'term-success';
                else if (line.type === 'warn') typeClass = 'term-warn';
                else if (line.type === 'err') typeClass = 'term-err';
                else if (line.type === 'info') typeClass = 'term-info';
                div.innerHTML = `<span class="${typeClass}">${line.cmd}</span>`;
            }

            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
            index++;
            setTimeout(printLine, line.type === 'input' ? 900 : 350);
        }
    }
    printLine();
}

// Simulated Phone Tab Toggle
window.switchPhoneTab = function (btn, tabName, projectKey) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.phone-nav-item').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');

    const screen = document.getElementById('simPhoneScreen');
    if (screen && projectData[projectKey]) {
        screen.innerHTML = projectData[projectKey].previewData.html[tabName];
    }
};

// JuaKali Hub Simulated Bookings
window.triggerJuaKaliBook = function (artisanName) {
    showToast('SMS Alert Dispatched', `Contacting ${artisanName} via JuaKali SMS Gateway...`, 'success');
    setTimeout(() => {
        showToast('Artisan Connected', `A sandbox request was approved by ${artisanName}!`, 'success');
    }, 2000);
};

// Custom Toast Dispatcher
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} glass-card`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="toast-content">
            <h4 style="margin:0 0 2px 0;font-size:0.95rem;">${title}</h4>
            <p style="margin:0;font-size:0.8rem;color:var(--text-light);">${message}</p>
        </div>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger CSS slide-in
    setTimeout(() => {
        toast.classList.add('show');
    }, 30);

    // Animate progress indicator bar
    const progress = toast.querySelector('.toast-progress');
    progress.style.transition = 'width 3.8s linear';
    setTimeout(() => {
        progress.style.width = '0%';
    }, 100);

    // Automatically close toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3800);
}

// Quick Contact Panel Logic
const inquiryPills = document.querySelectorAll('.inquiry-pill');
const whatsappBtn = document.getElementById('whatsappBtn');
const emailBtn = document.getElementById('emailBtn');
const messagePreviewText = document.getElementById('messagePreviewText');

if (inquiryPills.length && whatsappBtn && emailBtn) {
    const phoneNumber = '254707709042';
    const emailAddress = 'isayamaindi001@gmail.com';

    const messages = {
        project: {
            preview: "Hello Isaya, I would like to discuss hiring you for an upcoming project. I checked out your portfolio and would love to connect!",
            whatsapp: "Hello Isaya, I would like to discuss hiring you for an upcoming project. I checked out your portfolio and would love to connect!",
            emailSubject: "Project Hiring Inquiry",
            emailBody: "Hello Isaya,\n\nI would like to discuss hiring you for an upcoming project. I checked out your portfolio and would love to connect and discuss details.\n\nBest regards,"
        },
        design: {
            preview: "Hello Isaya, I am interested in your Graphic Design services and would love to get a quote or look at custom design packages.",
            whatsapp: "Hello Isaya, I am interested in your Graphic Design services and would love to get a quote or look at custom design packages.",
            emailSubject: "Graphic Design Services Inquiry",
            emailBody: "Hello Isaya,\n\nI am interested in your Graphic Design services and would love to get a quote or discuss custom design options for my brand.\n\nBest regards,"
        },
        webdev: {
            preview: "Hello Isaya, I'm reaching out regarding a Web Development project. Let's discuss development details and technical scope.",
            whatsapp: "Hello Isaya, I'm reaching out regarding a Web Development project. Let's discuss development details and technical scope.",
            emailSubject: "Web Development Project Inquiry",
            emailBody: "Hello Isaya,\n\nI'm reaching out regarding a Web Development project. I'd love to connect to discuss development details, timelines, and technical scope.\n\nBest regards,"
        },
        qa: {
            preview: "Hello Isaya, I saw your QA Specialist background and would like to talk about Quality Assurance or test automation for my application.",
            whatsapp: "Hello Isaya, I saw your QA Specialist background and would like to talk about Quality Assurance or test automation for my application.",
            emailSubject: "Quality Assurance Services Inquiry",
            emailBody: "Hello Isaya,\n\nI saw your Quality Assurance Specialist background and would like to discuss testing methodologies, QA audits, or test automation setups for my application.\n\nBest regards,"
        },
        general: {
            preview: "Hello Isaya, I have a general question or inquiry regarding your work, portfolio, or freelance availability.",
            whatsapp: "Hello Isaya, I have a general question or inquiry regarding your work, portfolio, or freelance availability.",
            emailSubject: "General Inquiry - Portfolio",
            emailBody: "Hello Isaya,\n\nI have a general question or inquiry regarding your work, portfolio projects, or freelance availability. Looking forward to hearing from you.\n\nBest regards,"
        }
    };

    const updateContactLinks = (reason) => {
        const msgData = messages[reason] || messages.project;

        // WhatsApp URL: https://wa.me/number?text=URLencodedtext
        const waText = encodeURIComponent(msgData.whatsapp);
        whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${waText}`;

        // Email URL: mailto:email?subject=Subject&body=Body
        const emailSubject = encodeURIComponent(msgData.emailSubject);
        const emailBody = encodeURIComponent(msgData.emailBody);
        emailBtn.href = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

        // Update Preview
        if (messagePreviewText) {
            messagePreviewText.textContent = msgData.preview;
        }
    };

    // Setup listeners for pills
    inquiryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all pills
            inquiryPills.forEach(p => p.classList.remove('active'));
            // Add active to clicked pill
            pill.classList.add('active');

            const reason = pill.getAttribute('data-reason');
            updateContactLinks(reason);

            // Dispatch a friendly toast notification for premium interaction feel
            showToast('Channel Ready', `Pre-filled templates updated for ${pill.textContent.trim()}!`, 'success');
        });
    });

    // Initialize default links
    updateContactLinks('project');
}

// Scroll to Top with Circular Scroll progress indicator
const backToTop = document.getElementById('backToTop');
const progressCircle = document.querySelector('.progress-ring-circle');
const circumference = 2 * Math.PI * 20; // 125.66

if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
}

window.addEventListener('scroll', () => {
    if (!backToTop) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollTop > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    if (docHeight > 0 && progressCircle) {
        const scrollPercentage = scrollTop / docHeight;
        const offset = circumference - (scrollPercentage * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animate elements on scroll trigger hook
function checkScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .project-card, .portfolio-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.15;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });

    // Skill bars animation check
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsPos = skillsSection.getBoundingClientRect().top;
        if (skillsPos < window.innerHeight / 1.1) {
            animateSkillBars();
        }
    }
}

// Initialize animations parameters
document.querySelectorAll('.service-card, .project-card, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
});

window.addEventListener('scroll', checkScrollAnimations);
window.addEventListener('load', checkScrollAnimations);

// Testimonial Auto-Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlideIdx = 0;

function showSlide(n) {
    if (!testimonialSlides.length) return;
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    currentSlideIdx = (n + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides[currentSlideIdx].classList.add('active');
    testimonialDots[currentSlideIdx].classList.add('active');
}

testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

if (testimonialSlides.length) {
    setInterval(() => {
        showSlide(currentSlideIdx + 1);
    }, 5500);
}