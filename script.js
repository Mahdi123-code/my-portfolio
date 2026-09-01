/* =========================================================
   MAHDI TAHERI — PORTFOLIO
   MODERN PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL ELEMENTS
    ===================================================== */

    const html = document.documentElement;

    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navLinks");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    const progress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const heroPhoto = document.querySelector(".hero-image-wrap");

    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function closeMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.remove("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuToggle?.querySelector("i");

        if (icon) {
            icon.className = "bx bx-menu";
        }
    }


    function openMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.add("open");

        menuToggle?.setAttribute(
            "aria-expanded",
            "true"
        );

        const icon = menuToggle?.querySelector("i");

        if (icon) {
            icon.className = "bx bx-x";
        }
    }


    menuToggle?.addEventListener("click", () => {

        const isOpen =
            navMenu?.classList.contains("open");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });


    /* =====================================================
       CLOSE MOBILE MENU OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!navMenu || !menuToggle) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            navMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMobileMenu();
        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length) {

        if (prefersReducedMotion) {

            revealElements.forEach(element => {
                element.classList.add("is-visible");
            });

        } else {

            const revealObserver =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(entry => {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -60px 0px"
                    }
                );


            revealElements.forEach(element => {
                revealObserver.observe(element);
            });

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    if (sections.length && navLinks.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${id}"]`
                            );

                        activeLink?.classList.add(
                            "active"
                        );

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollUI() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight;

        const viewportHeight =
            window.innerHeight;

        const scrollable =
            documentHeight - viewportHeight;


        const percentage =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;


        if (progress) {

            progress.style.width =
                `${percentage}%`;

        }


        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollTop > 650
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollUI,
        { passive: true }
    );

    updateScrollUI();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    backToTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        }
    );


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();


                    const navbar =
                        document.querySelector(
                            ".navbar"
                        );


                    const navbarHeight =
                        navbar?.offsetHeight || 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        20;


                    window.scrollTo({

                        top: targetPosition,

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });


    /* =====================================================
       FAQ
       ONLY ONE ITEM OPEN
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-list details"
        );


    faqItems.forEach(detail => {

        detail.addEventListener(
            "toggle",
            () => {

                if (!detail.open) {
                    return;
                }


                faqItems.forEach(other => {

                    if (other !== detail) {

                        other.removeAttribute(
                            "open"
                        );

                    }

                });

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    /* =========================================================
   CONTACT FORM → WHATSAPP
   ========================================================= */

    contactForm?.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !message) {
            if (formStatus) {
                formStatus.textContent = "Please fill in all fields.";
            }
            return;
        }

        /*
        * IMPORTANT:
        * Replace this with your WhatsApp number.
        *
        * Format:
        * Country code + number
        * WITHOUT +, spaces or dashes.
        *
        * Afghanistan example:
        * 937XXXXXXXXX
        */

        const whatsappNumber = "93777331793";

        const whatsappMessage =
    `Hello Mahdi,

    My name is ${name}.

    Email: ${email}

    Message:
    ${message}

    Sent from your portfolio website.`;

        const encodedMessage =
            encodeURIComponent(whatsappMessage);

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        if (formStatus) {
            formStatus.textContent =
                "Opening WhatsApp...";
        }

        window.open(
            whatsappURL,
            "_blank"
        );

    });
    /* =====================================================
       THEME SYSTEM
       LIGHT → MOON
       DARK  → SUN
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");


    const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    const initialTheme =
        savedTheme ||
        (
            systemPrefersDark
                ? "dark"
                : "light"
        );


    function updateThemeIcon(theme) {

        if (!themeIcon || !themeToggle) {
            return;
        }


        if (theme === "dark") {

            themeIcon.className =
                "bx bx-sun";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );


            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            themeIcon.className =
                "bx bx-moon";


            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );


            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    }


    function applyTheme(
        theme,
        animate = false
    ) {

        if (
            animate &&
            themeToggle &&
            !prefersReducedMotion
        ) {

            themeToggle.classList.add(
                "switching"
            );


            setTimeout(() => {

                html.setAttribute(
                    "data-theme",
                    theme
                );

                updateThemeIcon(theme);

            }, 100);


            setTimeout(() => {

                themeToggle.classList.remove(
                    "switching"
                );

            }, 400);

        } else {

            html.setAttribute(
                "data-theme",
                theme
            );

            updateThemeIcon(theme);

        }

    }


    applyTheme(initialTheme);


    themeToggle?.addEventListener(
        "click",
        () => {

            const currentTheme =
                html.getAttribute(
                    "data-theme"
                );


            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "theme",
                newTheme
            );


            applyTheme(
                newTheme,
                true
            );

        }
    );


    /* =====================================================
       HERO IMAGE
       PARALLAX + ROTATION
    ===================================================== */

    let heroAnimationFrame = null;


    function updateHeroImage() {

        if (
            !heroPhoto ||
            window.innerWidth < 700 ||
            prefersReducedMotion
        ) {
            return;
        }


        const rect =
            heroPhoto.getBoundingClientRect();


        const viewportCenter =
            window.innerHeight / 2;


        const elementCenter =
            rect.top +
            rect.height / 2;


        const distance =
            viewportCenter -
            elementCenter;


        const normalized =
            Math.max(
                -1,
                Math.min(
                    1,
                    distance /
                    window.innerHeight
                )
            );


        const translateY =
            normalized * 55;


        const rotate =
            normalized * -4;


        const translateX =
            normalized * 8;


        heroPhoto.style.transform =
            `translate3d(
                ${translateX}px,
                ${translateY}px,
                0
            ) rotate(${rotate}deg)`;

    }


    function requestHeroAnimation() {

        if (heroAnimationFrame) {
            return;
        }


        heroAnimationFrame =
            requestAnimationFrame(() => {

                updateHeroImage();

                heroAnimationFrame = null;

            });

    }


    window.addEventListener(
        "scroll",
        requestHeroAnimation,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        requestHeroAnimation
    );


    requestHeroAnimation();


    /* =====================================================
       HERO IMAGE CHANGER
       
       HTML:
       data-images='["image1.jpg","image2.jpg"]'
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image-wrap img"
        );


    let heroImages = [];


    if (
        heroPhoto &&
        heroPhoto.dataset.images
    ) {

        try {

            heroImages =
                JSON.parse(
                    heroPhoto.dataset.images
                );

        } catch (error) {

            console.warn(
                "Invalid hero image list:",
                error
            );

        }

    }


    let lastImageIndex = -1;


    function updateHeroImageByScroll() {

        if (
            !heroImage ||
            heroImages.length < 2 ||
            prefersReducedMotion
        ) {
            return;
        }


        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (maxScroll <= 0) {
            return;
        }


        const scrollProgress =
            window.scrollY /
            maxScroll;


        const imageIndex =
            Math.min(
                heroImages.length - 1,
                Math.floor(
                    scrollProgress *
                    heroImages.length
                )
            );


        if (
            imageIndex ===
            lastImageIndex
        ) {
            return;
        }


        lastImageIndex =
            imageIndex;


        heroImage.classList.add(
            "image-changing"
        );


        setTimeout(() => {

            heroImage.src =
                heroImages[imageIndex];

        }, 120);


        setTimeout(() => {

            heroImage.classList.remove(
                "image-changing"
            );

        }, 350);

    }


    window.addEventListener(
        "scroll",
        updateHeroImageByScroll,
        { passive: true }
    );


    /* =====================================================
       PROJECT CARDS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.setAttribute(
            "role",
            "link"
        );


        function openProject() {

            const url =
                card.dataset.projectUrl;


            if (url) {

                window.location.href =
                    url;

            }

        }


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }


                openProject();

            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openProject();

                }

            }
        );

    });


    /* =====================================================
       EXPERIENCE HELIX
       
       IMPORTANT:
       .experience-helix should be SVG
       .helix-progress should be <path>
    ===================================================== */

    const experienceSection =
        document.querySelector(
            ".experience-section"
        );


    const helixProgress =
        document.querySelector(
            ".helix-progress"
        );


    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );


    if (
        experienceSection &&
        helixProgress &&
        typeof helixProgress.getTotalLength === "function"
    ) {

        const pathLength =
            helixProgress.getTotalLength();


        helixProgress.style.strokeDasharray =
            `${pathLength}`;


        helixProgress.style.strokeDashoffset =
            `${pathLength}`;


        function updateHelix() {

            const rect =
                experienceSection.getBoundingClientRect();


            const sectionHeight =
                experienceSection.offsetHeight;


            const viewportHeight =
                window.innerHeight;


            /*
             * Animation starts when the
             * experience section enters
             * the lower part of viewport.
             */

            const start =
                viewportHeight * 0.78;


            const distance =
                Math.max(
                    1,
                    sectionHeight -
                    viewportHeight * 0.25
                );


            let helixProgressValue =
                (start - rect.top) /
                distance;


            helixProgressValue =
                Math.max(
                    0,
                    Math.min(
                        1,
                        helixProgressValue
                    )
                );


            /*
             * Scroll DOWN
             * → line grows
             *
             * Scroll UP
             * → line shrinks
             */

            helixProgress.style.strokeDashoffset =
                pathLength *
                (1 - helixProgressValue);


            /*
             * Line becomes thicker
             * and brighter progressively.
             */

            helixProgress.style.strokeWidth =
                2 +
                helixProgressValue * 3;


            helixProgress.style.opacity =
                0.35 +
                helixProgressValue * 0.65;


            /*
             * Activate experience items
             * progressively.
             */

            if (experienceItems.length) {

                experienceItems.forEach(
                    (item, index) => {

                        const itemPoint =
                            (index + 1) /
                            experienceItems.length;


                        item.classList.toggle(
                            "is-active",
                            helixProgressValue >=
                            itemPoint - 0.15
                        );

                    }
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHelix,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            updateHelix
        );


        updateHelix();

    }


    /* =====================================================
       MODERN WEBGL BACKGROUND
       THREE.JS
    ===================================================== */

    (() => {

        const container =
            document.getElementById(
                "webgl-background"
            );


        if (
            !container ||
            typeof THREE === "undefined"
        ) {

            console.warn(
                "WebGL background: Three.js is not loaded."
            );

            return;

        }


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           SCENE
        ================================================= */

        const scene =
            new THREE.Scene();


        /* =================================================
           CAMERA
        ================================================= */

        const camera =
            new THREE.PerspectiveCamera(
                55,
                window.innerWidth /
                window.innerHeight,
                0.1,
                100
            );


        camera.position.z = 11;


        /* =================================================
           RENDERER
        ================================================= */

        const renderer =
            new THREE.WebGLRenderer({

                alpha: true,

                antialias: true,

                powerPreference:
                    "high-performance"

            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                1.5
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setClearColor(
            0x000000,
            0
        );


        renderer.domElement.style.position =
            "fixed";


        renderer.domElement.style.inset =
            "0";


        renderer.domElement.style.width =
            "100%";


        renderer.domElement.style.height =
            "100%";


        renderer.domElement.style.pointerEvents =
            "none";


        container.appendChild(
            renderer.domElement
        );


        /* =================================================
           PARTICLE GROUP
        ================================================= */

        const particleGroup =
            new THREE.Group();


        scene.add(
            particleGroup
        );


        /* =================================================
           LARGE SOFT DOTS
        ================================================= */

        const particleCount =
            window.innerWidth < 768
                ? 45
                : 75;


        const positions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const i3 =
                i * 3;


            positions[i3] =
                (Math.random() - 0.5) * 22;


            positions[i3 + 1] =
                (Math.random() - 0.5) * 15;


            positions[i3 + 2] =
                (Math.random() - 0.5) * 7;

        }


        const particleGeometry =
            new THREE.BufferGeometry();


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({

                color: 0xfa6e43,

                size:
                    window.innerWidth < 768
                        ? 0.11
                        : 0.16,

                transparent: true,

                opacity: 0.38,

                depthWrite: false,

                sizeAttenuation: true,

                blending:
                    THREE.AdditiveBlending

            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        particleGroup.add(
            particles
        );


        /* =================================================
           SMALL PARTICLES
        ================================================= */

        const smallCount =
            window.innerWidth < 768
                ? 55
                : 110;


        const smallPositions =
            new Float32Array(
                smallCount * 3
            );


        for (
            let i = 0;
            i < smallCount;
            i++
        ) {

            const i3 =
                i * 3;


            smallPositions[i3] =
                (Math.random() - 0.5) * 25;


            smallPositions[i3 + 1] =
                (Math.random() - 0.5) * 17;


            smallPositions[i3 + 2] =
                (Math.random() - 0.5) * 9;

        }


        const smallGeometry =
            new THREE.BufferGeometry();


        smallGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                smallPositions,
                3
            )
        );


        const smallMaterial =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.035,

                transparent: true,

                opacity: 0.18,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending

            });


        const smallParticles =
            new THREE.Points(
                smallGeometry,
                smallMaterial
            );


        particleGroup.add(
            smallParticles
        );


        /* =================================================
           3D WIREFRAME OBJECT
        ================================================= */

        const geometry =
            new THREE.IcosahedronGeometry(
                1.8,
                1
            );


        const material =
            new THREE.MeshBasicMaterial({

                color: 0xfa6e43,

                wireframe: true,

                transparent: true,

                opacity: 0.055

            });


        const object =
            new THREE.Mesh(
                geometry,
                material
            );


        object.position.set(
            5,
            1,
            -2
        );


        scene.add(
            object
        );


        /* =================================================
           MOUSE
        ================================================= */

        const mouse = {
            x: 0,
            y: 0
        };


        const targetMouse = {
            x: 0,
            y: 0
        };


        window.addEventListener(
            "mousemove",
            event => {

                targetMouse.x =
                    (
                        event.clientX /
                        window.innerWidth
                    ) * 2 - 1;


                targetMouse.y =
                    -(
                        (
                            event.clientY /
                            window.innerHeight
                        ) * 2 - 1
                    );

            },
            {
                passive: true
            }
        );


        /* =================================================
           SCROLL
        ================================================= */

        let scrollTarget = 0;

        let scrollCurrent = 0;


        function updateWebGLScroll() {

            const max =
                document.documentElement.scrollHeight -
                window.innerHeight;


            if (max <= 0) {

                scrollTarget = 0;

                return;

            }


            scrollTarget =
                window.scrollY /
                max;

        }


        window.addEventListener(
            "scroll",
            updateWebGLScroll,
            { passive: true }
        );


        updateWebGLScroll();


        /* =================================================
           ANIMATION
        ================================================= */

        const clock =
            new THREE.Clock();


        function animate() {

            requestAnimationFrame(
                animate
            );


            const time =
                clock.getElapsedTime();


            /* ---------------------------------------------
               SMOOTH MOUSE
            --------------------------------------------- */

            mouse.x +=
                (
                    targetMouse.x -
                    mouse.x
                ) * 0.025;


            mouse.y +=
                (
                    targetMouse.y -
                    mouse.y
                ) * 0.025;


            /* ---------------------------------------------
               SMOOTH SCROLL
            --------------------------------------------- */

            scrollCurrent +=
                (
                    scrollTarget -
                    scrollCurrent
                ) * 0.025;


            /* ---------------------------------------------
               SOFT FLOATING
            --------------------------------------------- */

            if (!reducedMotion) {

                particleGroup.rotation.y =
                    time * 0.008;


                particleGroup.rotation.x =
                    Math.sin(
                        time * 0.15
                    ) * 0.015;


                particles.position.y =
                    Math.sin(
                        time * 0.35
                    ) * 0.15;


                particles.position.x =
                    Math.cos(
                        time * 0.20
                    ) * 0.08;


                smallParticles.position.y =
                    Math.cos(
                        time * 0.25
                    ) * 0.10;


                smallParticles.position.x =
                    Math.sin(
                        time * 0.18
                    ) * 0.06;


                object.rotation.x =
                    time * 0.055;


                object.rotation.y =
                    time * 0.075;

            }


            /* ---------------------------------------------
               MOUSE PARALLAX
            --------------------------------------------- */

            particleGroup.position.x =
                mouse.x * 0.22;


            particleGroup.position.y =
                mouse.y * 0.16;


            object.position.x =
                5 +
                mouse.x * 0.5;


            /* ---------------------------------------------
               OBJECT SCROLL MOVEMENT
            --------------------------------------------- */

            object.position.y =
                1 -
                scrollCurrent * 3;


            object.rotation.z =
                scrollCurrent *
                Math.PI *
                0.5;


            /* ---------------------------------------------
               CAMERA
            --------------------------------------------- */

            camera.position.x +=
                (
                    mouse.x * 0.25 -
                    camera.position.x
                ) * 0.02;


            camera.position.y +=
                (
                    mouse.y * 0.18 -
                    camera.position.y
                ) * 0.02;


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;


                camera.updateProjectionMatrix();


                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );


                renderer.setPixelRatio(
                    Math.min(
                        window.devicePixelRatio,
                        1.5
                    )
                );

            }
        );


        /* =================================================
           THEME
        ================================================= */

        function updateWebGLTheme() {

            const dark =
                html.getAttribute(
                    "data-theme"
                ) === "dark";


            if (dark) {

                particleMaterial.opacity =
                    0.42;


                smallMaterial.opacity =
                    0.20;


                material.opacity =
                    0.075;

            } else {

                particleMaterial.opacity =
                    0.22;


                smallMaterial.opacity =
                    0.12;


                material.opacity =
                    0.035;

            }

        }


        updateWebGLTheme();


        const observer =
            new MutationObserver(
                updateWebGLTheme
            );


        observer.observe(
            html,
            {
                attributes: true,

                attributeFilter: [
                    "data-theme"
                ]
            }
        );

    })();

});