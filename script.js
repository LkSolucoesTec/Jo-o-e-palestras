gsap.registerPlugin(ScrollTrigger);

// Configuration for deliberate cinematic feel
const config = {
    duration: 1.5,
    stagger: 0.25, // 0.2s-0.3s range
    ease: "power3.out"
};

// Hero Animations
gsap.to(".hero-text-reveal", {
    autoAlpha: 1,
    y: 0,
    duration: config.duration,
    ease: config.ease,
    delay: 0.5
});

gsap.to(".hero-image-reveal", {
    autoAlpha: 1,
    x: 0,
    duration: config.duration,
    ease: config.ease,
    delay: 0.8
});

// General Scroll Reveals
gsap.utils.toArray(".scroll-reveal").forEach((el) => {
    gsap.fromTo(el, 
        { autoAlpha: 0, y: 50 },
        {
            autoAlpha: 1,
            y: 0,
            duration: config.duration,
            ease: config.ease,
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            }
        }
    );
});

// Staggered Item Reveals (Cards, Metrics, Form Fields)
const staggerGroups = [
    ".card-reveal",
    ".testimonial-reveal",
    ".form-field-reveal",
    ".authority-metrics div"
];

staggerGroups.forEach(selector => {
    const elements = gsap.utils.toArray(selector);
    if (elements.length > 0) {
        gsap.fromTo(elements,
            { autoAlpha: 0, y: 30 },
            {
                autoAlpha: 1,
                y: 0,
                duration: config.duration,
                stagger: config.stagger,
                ease: config.ease,
                scrollTrigger: {
                    trigger: elements[0],
                    start: "top 85%",
                }
            }
        );
    }
});

// Specialized reveals
gsap.fromTo(".form-text-reveal",
    { autoAlpha: 0, x: -50 },
    {
        autoAlpha: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        scrollTrigger: {
            trigger: ".form-text-reveal",
            start: "top 85%",
        }
    }
);

// Initial setup to avoid FOUC
window.addEventListener('load', () => {
    gsap.set(".reveal", { autoAlpha: 0, y: 30 });
    gsap.set(".hero-text-reveal", { autoAlpha: 0, y: 40 });
    gsap.set(".hero-image-reveal", { autoAlpha: 0, x: 100 });
});

// Animação da Timeline (Scroll e Neon Glow)
const timelineSection = document.querySelector('.timeline');
const progressLine = document.querySelector('.timeline-progress');
const timelineItems = gsap.utils.toArray('.timeline-item');

if (timelineSection) {
    // 1. Faz a barra do meio crescer acompanhando o scroll
    gsap.to(progressLine, {
        height: '100%',
        ease: "none",
        scrollTrigger: {
            trigger: timelineSection,
            start: "top center", // Começa quando o topo da timeline cruza o centro da tela
            end: "bottom center", // Termina no final da timeline
            scrub: true // Segue o movimento do mouse
        }
    });

    // 2. Acende os pontos e os cards sequencialmente
    timelineItems.forEach((item) => {
        const dot = item.querySelector('.timeline-dot');
        const card = item.querySelector('.timeline-card');
        
        ScrollTrigger.create({
            trigger: item,
            start: "top center+=100", // Acende quando o card chega perto do meio da tela
            onEnter: () => {
                dot.classList.add('active');
                card.classList.add('glow');
            },
            onLeaveBack: () => { // Apaga se o usuário subir a página
                dot.classList.remove('active');
                card.classList.remove('glow');
            }
        });
    });
}

// --- Animação Dinâmica dos Números ---
const numbersContainer = document.querySelector('.numbers-container');
const numberCards = gsap.utils.toArray('.reveal-number');

if (numbersContainer) {
    ScrollTrigger.create({
        trigger: numbersContainer,
        start: "top 85%", // Dispara quando o bloco entra 85% na tela
        once: true, // Anima apenas uma vez
        onEnter: () => {
            numberCards.forEach((card, index) => {
                // 1. Acende a linha laranja no topo
                card.classList.add('is-visible');

                // 2. Animação de contagem
                const numElement = card.querySelector('.num');
                const targetCount = parseInt(numElement.getAttribute('data-count'), 10);
                
                // Objeto proxy para o GSAP animar
                let counter = { val: 0 };
                
                gsap.to(counter, {
                    val: targetCount,
                    duration: 2.5, // Duração da contagem
                    delay: index * 0.2, // Efeito cascata da esquerda pra direita
                    ease: "power3.out", // Desacelera no final
                    onUpdate: function () {
                        // Formata com separador de milhar pt-BR (ex: 30.000)
                        numElement.innerText = Math.ceil(this.targets()[0].val).toLocaleString('pt-BR');
                    }
                });
            });
        }
    });
}

gsap.from(".clientes-header", {
    scrollTrigger: {
        trigger: "#nossos-clientes",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// --- Animação Stacking Cards (Scroll) ---
const stackContainer = document.querySelector('.stacking-container');
const stackCards = gsap.utils.toArray('.stack-card');

if (stackContainer && stackCards.length > 0) {
    let tlStack = gsap.timeline({
        scrollTrigger: {
            trigger: stackContainer,
            start: "top top",      
            end: "bottom bottom",  
            scrub: 1,              
        }
    });

    // PAUSA 1: Tempo para ler a Carta 1
    tlStack.to({}, {duration: 0.8});

    // Sobe a Carta 2 e escurece a Carta 1
    tlStack.to(stackCards[1], {
        y: 0, yPercent: 0, marginTop: 40, duration: 1, ease: "power2.out"
    }, "anim1"); 
    tlStack.to(stackCards[0], {
        scale: 0.95, filter: "brightness(0.3)", duration: 1, ease: "power2.out"
    }, "anim1");

    // PAUSA 2: Tempo para ler a Carta 2
    tlStack.to({}, {duration: 0.8});

    // Sobe a Carta 3 e escurece a Carta 2
    tlStack.to(stackCards[2], {
        y: 0, yPercent: 0, marginTop: 80, duration: 1, ease: "power2.out"
    }, "anim2"); 
    tlStack.to(stackCards[1], {
        scale: 0.95, filter: "brightness(0.3)", duration: 1, ease: "power2.out"
    }, "anim2");
    tlStack.to(stackCards[0], {
        scale: 0.90, filter: "brightness(0.15)", duration: 1, ease: "power2.out"
    }, "anim2");

    // PAUSA 3: Tempo para ler a Carta 3 e ver os dois botões no final
    tlStack.to({}, {duration: 0.8});
}