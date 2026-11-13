import { gsap, SplitText, prefersReducedMotion, splitIntoWords, hideWordsForFlash, flashWords } from "./motion";

const THEME_KEY = "aurea-light";

function setupThemeToggle() {
  const toggles = document.querySelectorAll<HTMLElement>("[data-theme-toggle]");
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  function applyTheme(isLight: boolean) {
    document.body.classList.toggle("light", isLight);
    try {
      localStorage.setItem(THEME_KEY, String(isLight));
    } catch {}
    toggles.forEach((toggle) => toggle.setAttribute("aria-pressed", String(!isLight)));
    themeColor?.setAttribute("content", getComputedStyle(document.body).getPropertyValue("--mainbg").trim());
  }

  applyTheme(document.body.classList.contains("light"));
  toggles.forEach((toggle) => toggle.addEventListener("click", () => applyTheme(!document.body.classList.contains("light"))));
}

function setupMenu() {
  const menuButton = document.querySelector<HTMLButtonElement>(".header__menu-btn");
  const menuLabel = document.querySelector<HTMLElement>(".header__menu-label");
  const menuCard = document.querySelector<HTMLElement>(".menu__wrap");
  const lines = document.querySelectorAll<HTMLElement>(".header__line");
  if (!menuButton || !menuLabel || !menuCard || lines.length < 2) return;

  const button = menuButton;
  const label = menuLabel;
  const card = menuCard;
  const menuGroups = gsap.utils.toArray<HTMLElement>(".menu__item");
  const [topLine, bottomLine] = lines;
  const SCRAMBLE_FRAMES = 20;
  const SCRAMBLE_FRAME_MS = 20;
  let isOpen = false;
  let openTimeline: gsap.core.Timeline | undefined;
  let groupsFadeOut: gsap.core.Tween | undefined;
  let scrambleTimer: number | undefined;

  const collapsedCard = () => window.innerWidth <= 767
    ? { width: "15.5rem", height: "2.7rem", y: "0.5rem", padding: 0 }
    : { width: "15rem", height: "2.7rem", y: "0.9rem", padding: 0 };

  const openCardBox = () => window.innerWidth <= 991
    ? { width: "16.2rem", padding: "5rem 1rem 1rem 1rem" }
    : { width: "18rem", padding: "6.25rem 1.25rem 2.5rem 1.25rem" };

  function measureOpenCard() {
    const box = openCardBox();
    gsap.set(card, { ...box, height: "auto" });
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return { ...box, height: `${card.offsetHeight / rootFontSize}rem` };
  }

  function buildOpenTimeline() {
    openTimeline?.kill();
    gsap.set(menuGroups, { autoAlpha: 0 });
    const openCard = measureOpenCard();
    gsap.set(card, collapsedCard());
    openTimeline = gsap.timeline({ paused: true, onReverseComplete: buildOpenTimeline })
      .to(card, { y: 0, ...openCard, duration: 0.4, ease: "power2.out" })
      .to(menuGroups, { autoAlpha: 1, stagger: 0.05, duration: 0.3 }, "-=0.2");
    if (isOpen) openTimeline.progress(1);
  }

  gsap.set(topLine, { y: "-0.2rem" });
  gsap.set(bottomLine, { y: "0.2rem" });
  const burgerTimeline = gsap.timeline({ paused: true, defaults: { duration: 0.25, ease: "power2.out" } })
    .to(topLine, { y: "0.025rem", rotation: 45 }, 0)
    .to(bottomLine, { y: "-0.025rem", rotation: -45 }, 0);

  function scrambleLabel(nextLabel: string) {
    window.clearInterval(scrambleTimer);
    if (prefersReducedMotion) {
      label.textContent = nextLabel;
      return;
    }
    const longest = Math.max(label.textContent?.length ?? 0, nextLabel.length);
    let frame = 0;
    scrambleTimer = window.setInterval(() => {
      frame += 1;
      if (frame > SCRAMBLE_FRAMES) {
        label.textContent = nextLabel;
        window.clearInterval(scrambleTimer);
        return;
      }
      let scrambled = "";
      for (let index = 0; index < longest; index += 1) {
        const revealed = index < nextLabel.length && frame / SCRAMBLE_FRAMES > index / longest;
        scrambled += revealed ? nextLabel[index] : "•";
      }
      label.textContent = scrambled;
    }, SCRAMBLE_FRAME_MS);
  }

  function setOpen(nextOpen: boolean) {
    isOpen = nextOpen;
    button.setAttribute("aria-label", (isOpen ? button.dataset.closeLabel : button.dataset.openLabel) ?? "");
    button.setAttribute("aria-expanded", String(isOpen));
    scrambleLabel((isOpen ? button.dataset.closeText : button.dataset.menuText) ?? "");
    groupsFadeOut?.kill();
    if (isOpen) {
      burgerTimeline.play();
      openTimeline?.play();
      return;
    }
    burgerTimeline.reverse();
    groupsFadeOut = gsap.to([...menuGroups].reverse(), { autoAlpha: 0, stagger: 0.05, duration: 0.2 });
    openTimeline?.reverse(0.3);
  }

  buildOpenTimeline();
  button.addEventListener("click", () => setOpen(!isOpen));
  menuGroups.forEach((group) => group.addEventListener("click", () => isOpen && setOpen(false)));
  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (isOpen && !card.contains(target) && !button.contains(target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      setOpen(false);
      button.focus();
    }
  });
  window.addEventListener("resize", buildOpenTimeline);
}

function setupHoverRoll() {
  if (prefersReducedMotion) return;
  document.querySelectorAll<HTMLElement>("[hover-stagger]").forEach((label) => {
    const hoverTarget = label.closest<HTMLElement>("[hover-stagger-wrap]") ?? label;
    const original = document.createElement("span");
    original.textContent = label.textContent;
    const copy = original.cloneNode(true) as HTMLElement;
    copy.className = "hover-roll__copy";
    copy.setAttribute("aria-hidden", "true");
    label.classList.add("hover-roll");
    label.replaceChildren(original, copy);
    const originalChars = SplitText.create(original, { type: "chars" }).chars;
    const copyChars = SplitText.create(copy, { type: "chars", aria: "none" }).chars;
    const roll = gsap.timeline({ paused: true, defaults: { duration: 0.2, stagger: 0.02, ease: "power1.inOut" } })
      .to(originalChars, { yPercent: -100 }, 0)
      .to(copyChars, { yPercent: -100 }, 0);
    hoverTarget.addEventListener("mouseenter", () => roll.restart());
    hoverTarget.addEventListener("mouseleave", () => roll.reverse());
  });
}

function setupScrollFlashes() {
  document.querySelectorAll<HTMLElement>("[data-flash]").forEach((element) => {
    const words = splitIntoWords(element, "flash-word");
    if (prefersReducedMotion) return;
    const inkColor = getComputedStyle(element).color;
    hideWordsForFlash(words);
    gsap.to(words, {
      ...flashWords(words, inkColor, { appear: 0.2, settle: 0.1, stagger: 0.1 }),
      scrollTrigger: { trigger: element, start: "top 90%", once: true }
    });
  });
}

function startProgressReadout() {
  const readout = document.getElementById("progress");
  if (!readout) return;
  const progress = readout;

  function updateReadout() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable <= 0 ? 0 : gsap.utils.clamp(0, 100, (window.scrollY / scrollable) * 100);
    const text = `${Math.round(percent)}%`;
    if (progress.textContent !== text) progress.textContent = text;
    requestAnimationFrame(updateReadout);
  }
  requestAnimationFrame(updateReadout);
}

setupThemeToggle();
setupMenu();
setupHoverRoll();
setupScrollFlashes();
startProgressReadout();
