import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import "./ProjectShowcase.css";

const ProjectShowcase = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const live = {
      get vh() {
        return window.innerHeight;
      },
      get vw() {
        return window.innerWidth;
      },
      get w75() {
        return this.vw * 0.75;
      },
      get end() {
        return `+=${this.vh * 10}px`;
      }, // 1️⃣ scroll distance
      get arc() {
        // 2️⃣ bezier points
        const startX = this.w75 - 220;
        const cpX = startX + 500; // config.arcRadius
        const cpY = this.vh / 2;
        return { startX, cpX, cpY };
      },
    };
    gsap.set("body", { overflowX: "hidden" });
    window.addEventListener("wheel", (e) => e.deltaX && e.preventDefault(), {
      passive: false,
    });
    window.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });

    const config = {
      gap: 0.08,
      speed: 0.4,
      arcRadius: 500,
    };

    //Max - 8 in 4
    const spotlightItems = [
      { name: "Silent Arc", img: "/img-1.png" },
      { name: "Bloom24", img: "/img-2.png" },
      { name: "Glass Fade", img: "/img-3.png" },
      { name: "Stilllroom", img: "/img-7.png" },
      { name: "Echo 9", img: "/img-4.png" },
      { name: "Mono 73", img: "/img-9.png" },
      { name: "Echo 9", img: "/img-4.png" },
      { name: "Mono 73", img: "/img-9.png" },
    ];

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    //DOM
    const titlesContainer = document.querySelector(".spotlight-titles");
    const imagesContainer = document.querySelector(".spotlight-images");
    const spotlightHeader = document.querySelector(".spotlight-header");

    const titlesContainerElement = document.querySelector(
      ".spotlight-titles-container"
    );

    const introTextElement = document.querySelectorAll(
      ".spotlight-intro-text"
    ) as NodeListOf<HTMLElement>;
    const imageElement: HTMLDivElement[] = [];

    spotlightItems.forEach((item, index) => {
      const titleElement = document.createElement("h1");
      titleElement.textContent = item.name;
      if (index === 0) titleElement.style.opacity = "1";
      titlesContainer?.appendChild(titleElement);

      const imgWrapper = document.createElement("div");
      imgWrapper.className = "spotlight-img";
      const imgElement = document.createElement("img");
      imgElement.src = item.img;
      imgElement.alt = "";
      imgWrapper.appendChild(imgElement);
      imagesContainer?.appendChild(imgWrapper);
      imageElement.push(imgWrapper);
    });

    const titleElement = titlesContainer?.querySelectorAll("h1");
    let currentActiveIndex = 0;

    function getBezierPosition(t: number) {
      /* everything is now computed on-the-fly */
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const w75 = vw * 0.75;

      const startX = w75 - 220;
      const cpX = startX + 500; // same as config.arcRadius
      const cpY = vh / 2;

      const startY = -200;
      const endY = vh + 200;

      const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * cpX + t ** 2 * startX;

      const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * cpY + t ** 2 * endY;

      return { x, y };
    }

    function getImgProgressState(index: number, overallProgress: number) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;
      return (overallProgress - startTime) / config.speed;
    }

    imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));

    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: live.end,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;
          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElement[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElement[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElement[0], {
            opacity: 1,
          });
          gsap.set(introTextElement[1], {
            opacity: 1,
          });

          gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
          });

          gsap.set(".spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader)
            (spotlightHeader as HTMLElement).style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          gsap.set(introTextElement[0], { opacity: 0 });
          gsap.set(introTextElement[1], { opacity: 0 });

          imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader)
            (spotlightHeader as HTMLElement).style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          gsap.set(introTextElement[0], { opacity: 0 });
          gsap.set(introTextElement[1], { opacity: 0 });

          imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));
          if (spotlightHeader)
            (spotlightHeader as HTMLElement).style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer?.scrollHeight || 0;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`,
          });

          imageElement.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElement?.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            titlesContainerHeight;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            if (
              titleElement &&
              titleElement[currentActiveIndex] &&
              spotlightItems[currentActiveIndex]
            ) {
              titleElement[currentActiveIndex].style.opacity = "0.25";
            }
            if (
              titleElement &&
              titleElement[closestIndex] &&
              spotlightItems[closestIndex]
            ) {
              titleElement[closestIndex].style.opacity = "1";
              (
                document.querySelector(
                  ".spotlight-bg-img img"
                ) as HTMLImageElement
              ).src = spotlightItems[closestIndex].img;
            }
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          if (spotlightHeader)
            (spotlightHeader as HTMLElement).style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    /* ----------  MODAL HANDLERS  ---------- */
    const modal = document.getElementById("spotlight-modal");
    const mTitle = modal?.querySelector(".spotlight-modal__title");
    const mClose = modal?.querySelector(".spotlight-modal__close");

    /* open */
    /* open modal ONLY on highlighted title */
    titlesContainer?.addEventListener("click", (e) => {
      const h1 = (e.target as HTMLElement).closest("h1");
      if (!h1) return;

      const idx = titleElement ? [...titleElement].indexOf(h1) : -1;
      // allow click only if it is the highlighted one
      if (idx !== currentActiveIndex) return;

      const item = spotlightItems[idx];

      /* populate modal */
      (modal?.querySelector(".spotlight-modal__img") as HTMLImageElement).src =
        item.img;
      if (modal)
        (
          modal.querySelector(".spotlight-modal__title") as HTMLElement
        ).textContent = item.name;
      if (modal)
        (
          modal.querySelector(".spotlight-modal__desc") as HTMLElement
        ).textContent = (item as any).desc;
      (modal?.querySelector(".live") as HTMLAnchorElement).href = (
        item as any
      ).liveUrl;
      (modal?.querySelector(".git") as HTMLAnchorElement).href = (
        item as any
      ).gitUrl;

      modal?.classList.add("open");
      originalScrollFn.open();
    });

    /* close */
    mClose?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("open")) closeModal();
    });

    const originalScrollFn = {
      open() {
        lenis.stop();
      },
      close() {
        lenis.start();
      },
    };

    /* plug the pause/resume into the existing close helpers */
    function closeModal() {
      modal?.classList.remove("open");
      originalScrollFn.close();
    }

    /* ----------  HANDLE RESIZE  ---------- */
    let resizeDebounce: any;
    window.addEventListener("resize", () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        /* recompute the geometry that the scroll animation uses */
        let containerHeight = window.innerHeight;
        let containerWidth = window.innerWidth * 0.75;
        let arcStartX = containerWidth - 220;
        let arcControlPointX = arcStartX + config.arcRadius;
        let arcControlPointY = containerHeight / 2;

        /* let ScrollTrigger re-measure and re-pin */
        ScrollTrigger.refresh(true);
      }, 150); // debounce so we don’t do it 50× while dragging
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      if (titlesContainer) titlesContainer.innerHTML = "";
      if (imagesContainer) imagesContainer.innerHTML = "";
      window.removeEventListener("resize", () => {});
      window.removeEventListener("wheel", () => {});
      window.removeEventListener("touchmove", () => {});
    };
  }, []);

  return (
    <>
      {/* spotlightsection */}
      <section className="spotlight">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text">
            <p>Project</p>
          </div>
          <div className="spotlight-intro-text">
            <p>is Fun</p>
          </div>
        </div>

        <div className="spotlight-bg-img">
          <img
            src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
            alt=""
          />
          <div className="spotlight-shade"></div>
        </div>

        <div className="spotlight-titles-container">
          <div className="spotlight-titles"></div>
        </div>

        <div className="spotlight-images"></div>

        <div className="spotlight-header">
          <p>Discover</p>
        </div>
      </section>

      {/* Spotlight Modal */}
      <div id="spotlight-modal" className="spotlight-modal">
        <button className="spotlight-modal__close" aria-label="close">
          ✕
        </button>

        <img className="spotlight-modal__img" src="#" alt="" />
        <h2 className="spotlight-modal__title"></h2>
        <p className="spotlight-modal__desc"></p>

        <div className="spotlight-modal__btns">
          <a
            className="spotlight-modal__btn live"
            href="#"
            target="_blank"
            rel="noopener"
          >
            View Live
          </a>
          <a
            className="spotlight-modal__btn git"
            href="#"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;