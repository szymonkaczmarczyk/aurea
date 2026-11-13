import { gsap, prefersReducedMotion, splitIntoWords, hideWordsForFlash, flashWords } from "./motion";

const root = document.documentElement;
const clamp01 = gsap.utils.clamp(0, 1);
const INTRO_READY_EVENT = "preloader:done";

function setupHeroRing() {
  const ring = document.querySelector(".hero__carousel__in");
  const ringPhotos = gsap.utils.toArray<HTMLElement>(".hero__carousel__img");
  gsap.utils.toArray<HTMLElement>(".hero__carousel__deg").forEach((holder) => {
    const angle = Number(holder.dataset.deg);
    gsap.set(holder, { rotation: angle });
    gsap.set(holder.querySelector(".hero__carousel__img"), { rotation: -angle });
  });
  if (prefersReducedMotion || !ring) return;
  gsap.to(ring, { rotation: 360, duration: 32, ease: "none", repeat: -1 });
  gsap.to(ringPhotos, { rotation: "-=360", duration: 32, ease: "none", repeat: -1 });
}

function setupHeroIntro() {
  if (prefersReducedMotion) return;
  const heroTexts = gsap.utils.toArray<HTMLElement>("[data-hero-text]");
  const popTargets = [".header__logo", ".header__main", ".menu__wrap-main", ".is-header-btn", ".hero__actions"];
  gsap.set(heroTexts, { opacity: 0 });
  gsap.set(popTargets, { opacity: 0, y: 24, scale: 0.9 });
  gsap.set(".hero__carousel__card", { opacity: 0, scale: 0.5 });
  gsap.set(".hero__chip", { opacity: 0, x: 40, scale: 0.9 });
  root.classList.remove("intro-pending");

  document.addEventListener(INTRO_READY_EVENT, () => {
    const intro = gsap.timeline();
    const popIn = { opacity: 1, y: 0, scale: 1, ease: "power2.out" };
    heroTexts.forEach((heroText) => {
      const words = splitIntoWords(heroText, "hero-flash-word");
      const inkColor = getComputedStyle(heroText).color;
      hideWordsForFlash(words);
      gsap.set(heroText, { opacity: 1 });
      intro.to(words, flashWords(words, inkColor, { appear: 0.05, settle: 0.05, stagger: 0.2 }), 0);
    });
    intro
      .to(".header__logo", { ...popIn, duration: 0.5 }, 0.1)
      .to([".header__main", ".menu__wrap-main"], { ...popIn, duration: 0.6 }, 0.2)
      .to(".hero__carousel__card", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.3)
      .to(".is-header-btn", { ...popIn, duration: 0.5 }, 0.35)
      .to(".hero__chip", { opacity: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.35)
      .to(".hero__actions", { ...popIn, duration: 0.6 }, 0.6);
  }, { once: true });
}

function setupPhraseBrightness() {
  const phraseWindow = document.querySelector<HTMLElement>(".how__right");
  const phrases = document.querySelectorAll<HTMLElement>(".how__phrase");
  if (!phraseWindow) return;
  const frame = phraseWindow;
  const DIM_OPACITY = 0.2;
  const FADE_FINISH = 0.15;

  function updatePhrases() {
    const windowRect = frame.getBoundingClientRect();
    const onScreen = windowRect.bottom > 0 && windowRect.top < window.innerHeight;
    if (onScreen) {
      phrases.forEach((phrase) => {
        const phraseRect = phrase.getBoundingClientRect();
        const top = phraseRect.top - windowRect.top;
        const bottom = top + phraseRect.height;
        let opacity = DIM_OPACITY;
        if (bottom > 0 && top < windowRect.height) {
          const rise = clamp01(1 - bottom / windowRect.height);
          opacity = DIM_OPACITY + (1 - DIM_OPACITY) * clamp01(rise / (1 - FADE_FINISH));
        }
        phrase.style.opacity = String(opacity);
      });
    }
    requestAnimationFrame(updatePhrases);
  }
  requestAnimationFrame(updatePhrases);
}

function setupRitualSlides() {
  if (prefersReducedMotion) return;
  const slides = gsap.utils.toArray<HTMLElement>(".list__main__slide");
  slides.slice(0, -1).forEach((slide) => {
    const pinnedWrap = slide.querySelector(".list__main__content-wrap");
    const card = slide.querySelector(".list__main__content");
    gsap.to(card, {
      rotationZ: (Math.random() - 0.5) * 10,
      scale: 0.7,
      rotationX: 40,
      ease: "power1.in",
      scrollTrigger: { pin: pinnedWrap, trigger: slide, start: "top 0%", end: () => `+=${window.innerHeight}`, scrub: true }
    });
    gsap.to(card, {
      autoAlpha: 0,
      ease: "power1.in",
      scrollTrigger: { trigger: card, start: "top -80%", end: () => `+=${window.innerHeight * 0.5}`, scrub: true }
    });
  });
}

function setupPreloader() {
  if (prefersReducedMotion) return;
  const preloader = document.querySelector<HTMLElement>(".preloader");
  const announceReady = () => document.dispatchEvent(new Event(INTRO_READY_EVENT));
  window.aureaPreloaderStarted = true;
  if (!preloader || !root.classList.contains("is-loading")) {
    announceReady();
    return;
  }

  const overlay = preloader;
  const VISITED_KEY = "aurea_preloader_v1";
  const COUNTER_STEPS = [0, 17, 35, 58, 76, 89, 100];
  const COUNTER_SECONDS = 0.9;
  const PHOTO_CUT_MS = 220;
  const counter = overlay.querySelector<HTMLElement>(".preloader__count");
  const layers = gsap.utils.toArray<HTMLElement>(".preloader__layer");
  const parts = gsap.utils.toArray<HTMLElement>(overlay.children);
  let started = false;

  function play() {
    if (started) return;
    started = true;
    try {
      localStorage.setItem(VISITED_KEY, "1");
    } catch {}

    window.scrollTo(0, 0);
    gsap.set([root, document.body], { overflow: "hidden" });

    let topLayer = 0;
    const cutTimer = window.setInterval(() => {
      layers.forEach((layer, layerIndex) => {
        layer.style.zIndex = layerIndex === topLayer ? "9" : "1";
      });
      topLayer = (topLayer + 1) % layers.length;
    }, PHOTO_CUT_MS);

    gsap.timeline({
      onComplete: () => {
        root.classList.remove("is-loading");
        announceReady();
        window.clearInterval(cutTimer);
        gsap.delayedCall(0.4, () => gsap.set([root, document.body], { clearProps: "overflow" }));
      }
    })
      .set(parts, { visibility: "visible" })
      .fromTo(parts, { opacity: 0, filter: "blur(20px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.04, ease: "power2.out" })
      .to(parts, { opacity: 0, filter: "blur(20px)", duration: 0.35, delay: 0.6, stagger: 0.04, ease: "power2.in" })
      .to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in" });

    const count = { value: 0 };
    const counterTimeline = gsap.timeline({ delay: 0.15 });
    COUNTER_STEPS.slice(1).forEach((step) => {
      counterTimeline.to(count, {
        value: step,
        duration: COUNTER_SECONDS / (COUNTER_STEPS.length - 1),
        ease: "power2.out",
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(count.value));
        }
      });
    });
  }

  if (document.readyState === "complete") play();
  else window.addEventListener("load", play);
  window.setTimeout(play, 4000);
}

setupHeroRing();
setupHeroIntro();
setupPhraseBrightness();
setupRitualSlides();
setupPreloader();
