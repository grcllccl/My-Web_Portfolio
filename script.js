const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

const words = [
    "Web Developer",
    "Programmer",
    "Artist",
];

const typingElement = document.querySelector(".typing-text span");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const current = words[wordIndex];

    if (!deleting) {
        typingElement.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingElement.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

if (typingElement) typeEffect();


function openTab(event, tabId) {
    document.querySelectorAll(".tab-content")
        .forEach(tab => tab.classList.remove("active-tab"));

    document.querySelectorAll(".tab-btn")
        .forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active-tab");
    event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const firstTab = document.getElementById("education");
    const firstBtn = document.querySelector(".tab-btn");

    if (firstTab && firstBtn) {
        firstTab.classList.add("active-tab");
        firstBtn.classList.add("active");
    }
});

document.querySelectorAll('.nav-links a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute("href");
        

        if (targetId.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(targetId);

            if (target) {
                const offset = 90;
                const position = target.offsetTop - offset;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        }
    });
});

const sections = document.querySelectorAll("section, header, div[id]"); 
const navItems = document.querySelectorAll(".nav-links a");

const observerOptions = {
    root: null,
    rootMargin: "-100px 0px -60% 0px", 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            
            navItems.forEach(link => {
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }
    });
}, observerOptions);

navItems.forEach(link => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) observer.observe(targetSection);
    }
});

const reveals = document.querySelectorAll(".reveal");

function reveal() {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

const progCards = document.querySelectorAll(".skill-card.prog-card");

progCards.forEach(card => {
    card.addEventListener("click", () => {
        const progressBar = card.querySelector(".skill-progress-bar");
        const progressNumber = card.querySelector(".progress-number");
        const targetProgress = card.getAttribute("data-progress");

        if (card.classList.contains("active-card")) {
            card.classList.remove("active-card");
            if (progressBar) progressBar.style.width = "0%";
            if (progressNumber) progressNumber.textContent = "0%";
        } else {
            progCards.forEach(c => {
                c.classList.remove("active-card");
                const bar = c.querySelector(".skill-progress-bar");
                const num = c.querySelector(".progress-number");
                if (bar) bar.style.width = "0%";
                if (num) num.textContent = "0%";
            });

            card.classList.add("active-card");
            
            setTimeout(() => {
                if (progressBar) progressBar.style.width = targetProgress;
                if (progressNumber) {
                    let startValue = 0;
                    let endValue = parseInt(targetProgress);
                    let duration = 15;
                    
                    let counter = setInterval(() => {
                        startValue++;
                        progressNumber.textContent = startValue + "%";
                        if (startValue === endValue) {
                            clearInterval(counter);
                        }
                    }, duration);
                }
            }, 100);
        }
    });
});

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
    const circle = document.createElement("div");
    circle.classList.add("toggle-circle");

    circle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    themeToggle.appendChild(circle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const icon = circle.querySelector("i");

        if (document.body.classList.contains("light-mode")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        }
    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        circle.querySelector("i").classList.replace("fa-moon", "fa-sun");
    }
}

function toggleSkill(card){
    card.classList.toggle("active");
}