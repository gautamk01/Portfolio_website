import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Flip, SplitText);

const setupTextSpliting = () => {
  const container = document.querySelector(".container");
  if (!container) return;
  const textElements = container.querySelectorAll("h1, h2, p, a");
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

function animateImages() {
  const images = document.querySelectorAll(".img");
  images.forEach((img) => {
    img.classList.remove("animate-out");
  });

  const state = Flip.getState(images);

  images.forEach((img) => img.classList.add("animate-out"));
  const mainTimeline = gsap.timeline();

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

export const runAnimations = () => {
  const container = document.querySelector(".container");
  if (!container) return;

  setupTextSpliting();
  createCounterDigits();

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
      onStart: animateImages,
    })
    .to(".main-nav", { opacity: 1, duration: 1, ease: "power3.inOut" }, "-=1")
    .to(container.querySelector(".sidebar .divider"), {
      scaleY: "100%",
      duration: 1,
      ease: "power3.inOut",
      delay: 1.25,
    })
    .to(container.querySelectorAll(".main-nav .divider, .site-info .divider"), {
      scaleX: "100%",
      duration: 1,
      stagger: 0.5,
      ease: "power3.inOut",
    })
    .to(
      container.querySelector(".logo"),
      { scale: 1, duration: 1, ease: "power4.inOut" },
      "<"
    )
    .to(
      container.querySelectorAll(
        ".logo-name a span, .links a span, .links p span, .cta a span"
      ),
      { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" }
    )
    .to(
      container.querySelectorAll(
        ".header span, .site-info span, .hero-footer span"
      ),
      { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" },
      "<"
    );
};
