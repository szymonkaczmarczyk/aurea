import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type FlashTiming = { appear: number; settle: number; stagger: number };

function flashColors() {
  const bodyStyles = getComputedStyle(document.body);
  return {
    first: bodyStyles.getPropertyValue("--flash-a").trim(),
    second: bodyStyles.getPropertyValue("--flash-b").trim()
  };
}

export function splitIntoWords(element: Element, wordClass: string): HTMLElement[] {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
  const words: HTMLElement[] = [];
  textNodes.forEach((textNode) => {
    const fragment = document.createDocumentFragment();
    (textNode.textContent ?? "").split(/(\s+)/).forEach((piece) => {
      if (!piece.trim()) {
        fragment.append(piece);
        return;
      }
      const word = document.createElement("span");
      word.className = wordClass;
      word.textContent = piece;
      words.push(word);
      fragment.append(word);
    });
    textNode.replaceWith(fragment);
  });
  return words;
}

export function hideWordsForFlash(words: HTMLElement[]) {
  gsap.set(words, { opacity: 0, color: flashColors().first });
}

export function flashWords(words: HTMLElement[], inkColor: string, timing: FlashTiming): gsap.TweenVars {
  const colors = flashColors();
  return {
    keyframes: [
      { opacity: 1, color: colors.first, duration: timing.appear, ease: "power2.out" },
      { color: colors.second, duration: 0.05 },
      { color: inkColor, duration: timing.settle }
    ],
    stagger: timing.stagger,
    ease: "power2.out",
    onComplete: () => gsap.set(words, { clearProps: "color" })
  };
}
