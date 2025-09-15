import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, SplitText, ScrollTrigger);

const setupTextSpliting = () => {
  const container = document.querySelector(".container");
  if (!container) return;
  const textElements = container.querySelectorAll(
    ".hero h1, .hero h2, .hero p, .hero a"
  );
  const aboutTitle = container.querySelector(".portfolio-profile-title");
  if (aboutTitle) {
    // Don't split the about title
  }
  textElements.forEach((element) => {
    SplitText.create(element, {
      type: "lines",
      linesClass: "line",
    });

    const lines = element.querySelectorAll(".line");
    lines.forEach((line) => {
      const textContent = line.textContent;
      line.innerHTML = `<span>${textContent}</span>`;
    });
  });
};

const createCounterDigits = () => {
  const counter1 = document.querySelector(".counter-1");
  if (!counter1) return;
  const num0 = document.createElement("div");
  num0.className = "num";
  num0.textContent = "0";
  counter1.appendChild(num0);

  const num1 = document.createElement("div");
  num1.className = "num num1offset1";
  num1.textContent = "1";
  counter1.appendChild(num1);

  const counter2 = document.querySelector(".counter-2");
  if (!counter2) return;
  for (let i = 0; i <= 10; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = i === 1 ? "num num1offset2" : "num";
    numDiv.textContent = i === 10 ? "0" : i;
    counter2.appendChild(numDiv);
  }

  const counter3 = document.querySelector(".counter-3");
  if (!counter3) return;
  for (let i = 0; i <= 30; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = "num";
    numDiv.textContent = i % 10;
    counter3.appendChild(numDiv);
  }

  const finalNum = document.createElement("div");
  finalNum.className = "num";
  finalNum.textContent = "0";
  counter3.appendChild(finalNum);
};

const animateCounter = (counter, duration, delay = 0) => {
  if (!counter) return;
  const numHeight = counter.querySelector(".num").clientHeight;
  const totalDistance =
    (counter.querySelectorAll(".num").length - 1) * numHeight;
  gsap.to(counter, {
    y: -totalDistance,
    duration: duration,
    delay: delay,
    ease: "power2.inOut",
  });
};

function animateImages(onComplete) {
  const images = document.querySelectorAll(".img");
  images.forEach((img) => {
    img.classList.remove("animate-out");
  });

  const state = Flip.getState(images);

  images.forEach((img) => img.classList.add("animate-out"));
  const mainTimeline = gsap.timeline({ onComplete });

  mainTimeline.add(
    Flip.from(state, {
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
    })
  );

  images.forEach((img, index) => {
    const scaleTimeline = gsap.timeline();

    scaleTimeline
      .to(
        img,
        {
          scale: 2.5,
          duration: 0.45,
          ease: "power3.in",
        },
        0.025
      )
      .to(
        img,
        {
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0.5
      );

    mainTimeline.add(scaleTimeline, index * 0.1);
  });

  return mainTimeline;
}

export const runAnimations = (onComplete) => {
  const container = document.querySelector(".container");
  if (!container) return;

  setupTextSpliting();
  createCounterDigits();
  setupPortfolioAboutMeAnimation();
  setupAchievementsAnimation();

  const counter3 = container.querySelector(".counter-3");
  const counter2 = container.querySelector(".counter-2");
  const counter1 = container.querySelector(".counter-1");

  animateCounter(counter3, 2.5);
  animateCounter(counter2, 3);
  animateCounter(counter1, 2, 1.5);

  const tl = gsap.timeline();
  gsap.set(container.querySelectorAll(".img"), { scale: 0 });
  gsap.set(".main-nav", { opacity: 0 });

  tl.to(container.querySelector(".hero-bg"), {
    scaleY: "100%",
    duration: 3,
    ease: "power2.inOut",
    delay: 0.25,
  })
    .to(
      container.querySelectorAll(".img"),
      { scale: 1, duration: 1, stagger: 0.125, ease: "power3.out" },
      "<"
    )
    .to(container.querySelector(".counter"), {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
      delay: 0.3,
      onStart: () => {
        animateImages(() => {
          const tl = gsap.timeline({ onComplete });
          tl.to(".main-nav", {
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
          })
            .to(
              container.querySelector(".sidebar .divider"),
              {
                scaleY: "100%",
                duration: 1,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              container.querySelectorAll(
                ".main-nav .divider, .site-info .divider"
              ),
              {
                scaleX: "100%",
                duration: 1,
                stagger: 0.5,
                ease: "power3.inOut",
              },
              "<"
            )
            .to(
              container.querySelector(".logo"),
              { scale: 1, duration: 1, ease: "power4.inOut" },
              "<"
            )
            .to(
              container.querySelectorAll(
                ".logo-name a span, .links a span, .links p span, .cta a span"
              ),
              { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" },
              "<"
            )
            .to(
              container.querySelectorAll(
                ".header span, .site-info span, .hero-footer span"
              ),
              { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" },
              "<"
            )
            .to(".portfolio-about", { opacity: 1, duration: 1 }, "-=0.5");
        });
      },
    });
};

const setupPortfolioAboutMeAnimation = () => {
  const animeTextContainers = document.querySelectorAll(".portfolio-about");

  animeTextContainers.forEach((container) => {
    const imageContainer = container.querySelector(
      ".portfolio-image-container"
    );
    const paragraphs = container.querySelectorAll(".portfolio-anime-text p");

    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent;
      const words = text.split(/\s+/);
      paragraph.innerHTML = "";

      words.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word";
          const wordText = document.createElement("span");
          wordText.textContent = word;
          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);
        }
      });
    });

    const words = container.querySelectorAll(".word");

    // Set initial state for the animation
    gsap.set(words, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 90%",
        scrub: 1,
      },
    });

    tl.to(imageContainer, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power3.out",
    }).to(
      words,
      {
        y: "0%",
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.75"
    );
  });
};
export const setupAchievementsAnimation = () => {
  const sectionRef = document.querySelector(".sticky-card-section");
  if (!sectionRef) return;

  const headerRef = sectionRef.querySelector(".sticky-header");
  const cardsRef = Array.from(sectionRef.querySelectorAll(".card"));

  const transform = [
    [
      [10, 50, -10, 10],
      [20, -10, -45, 20],
    ],
    [
      [0, 47.5, -10, 15],
      [-25, 15, -45, 30],
    ],
    [
      [0, 52.5, -10, 5],
      [15, -5, -40, 60],
    ],
    [
      [0, 50, 30, -80],
      [20, -10, 60, 5],
    ],
    [
      [0, 55, -15, 30],
      [25, -15, 60, 95],
    ],
  ];

  ScrollTrigger.create({
    trigger: sectionRef,
    start: "top top",
    end: `+=${window.innerHeight * 5}`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const maxTranslate = headerRef.offsetWidth - window.innerWidth;
      const translateX = -progress * maxTranslate;
      gsap.set(headerRef, { x: translateX });

      cardsRef.forEach((card, index) => {
        const delay = index * 0.1125;
        const cardProgress = Math.max(0, Math.min((progress - delay) * 2, 1));

        if (cardProgress > 0) {
          const cardStartx = 25;
          const cardEndx = -650;
          const ypos = transform[index][0];
          const rotation = transform[index][1];

          const cardx = gsap.utils.interpolate(
            cardStartx,
            cardEndx,
            cardProgress
          );

          const yprogress = cardProgress * 3;
          const yIndex = Math.min(Math.floor(yprogress), ypos.length - 2);
          const yinterpolation = yprogress - yIndex;
          const cardY = gsap.utils.interpolate(
            ypos[yIndex],
            ypos[yIndex + 1],
            yinterpolation
          );

          const cardRotation = gsap.utils.interpolate(
            rotation[yIndex],
            rotation[yIndex + 1],
            yinterpolation
          );

          gsap.set(card, {
            xPercent: cardx,
            yPercent: cardY,
            rotation: cardRotation,
            opacity: 1,
          });
        } else {
          gsap.set(card, { opacity: 0 });
        }
      });
    },
  });
};
