export type Lang = "pl" | "en";

export const languages: Lang[] = ["pl", "en"];

export const ui = {
  pl: {
    ogLocale: "pl_PL",
    skipLink: "Przejdź do treści",
    header: {
      homeLabel: "Aurea - strona główna",
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
      menuLabel: "Menu",
      closeLabel: "Zamknij",
      themeLabel: "Przełącz motyw kolorystyczny",
      cta: "Poznaj produkty",
      switchLabel: "English version",
      switchShort: "EN"
    },
    menu: {
      navLabel: "Menu strony",
      groupMain: "Menu",
      groupInfo: "Informacje",
      groupLang: "Język",
      products: "Produkty",
      ritual: "Rytuał",
      philosophy: "Filozofia",
      about: "O marce",
      privacy: "Polityka prywatności",
      terms: "Regulamin",
      polish: "Polski",
      english: "English"
    },
    anchors: { philosophy: "filozofia", products: "produkty", ritual: "rytual" },
    home: {
      title: "Aurea – pielęgnacja twarzy w trzech krokach",
      description: "Aurea to trzy kosmetyki do twarzy stosowane w jednej kolejności: żel myjący, serum i krem. Poznaj produkty i rytuał.",
      heroTitle: "Rytuał w trzech<br><span class=\"it\">prostych</span> krokach.",
      heroLead: "Żel myjący, serum i krem. Trzy kosmetyki, zawsze w tej samej kolejności.",
      scroll: "przewiń w dół",
      chips: ["Żel myjący", "Serum", "Krem", "Krok po kroku", "Codzienny rytuał", "Trzy kosmetyki"],
      philosophyTag: "Filozofia",
      philosophyTitle: "Mniej kroków,<br>więcej <span class=\"it\">uwagi</span><br>dla skóry.",
      philosophyText: "Aurea to trzy kosmetyki, które stosujesz zawsze w tej samej kolejności. Bez dziesięciu kroków i bez zgadywania, co nałożyć po czym.",
      phrases: ["Oczyść skórę", "Dodaj serum", "Zamknij <span class=\"it\">kremem</span>"],
      lineTag: "Linia Aurea",
      lineTitle: "Trzy kosmetyki,<br>jedna kolejność.",
      lineText: "Każdy produkt ma swoje miejsce w rytuale. Zacznij od żelu, potem serum, na końcu krem.",
      outroTitle: "Zacznij od <span class=\"it\">pierwszego</span> kroku.",
      outroText: "Zobacz, co jest w każdym z trzech kosmetyków i jak ich używać."
    },
    product: {
      back: "Wszystkie produkty",
      step: "Krok",
      volume: "Pojemność",
      price: "Cena",
      pao: "Trwałość po otwarciu",
      view: "Zobacz produkt",
      howTo: "Jak stosować",
      inci: "Skład (INCI)",
      forWhom: "Dla kogo",
      whereToBuy: "Gdzie kupić",
      next: "Następny krok",
      backToFirst: "Wróć do pierwszego kroku",
      whereToBuyText: "Sprzedaż online jeszcze nie ruszyła. Napisz do nas, a damy znać, gdy produkty będą dostępne:"
    },
    about: {
      title: "O marce Aurea – trzy kosmetyki, jedna kolejność",
      description: "Aurea to marka pielęgnacji twarzy oparta na trzech kosmetykach: żelu myjącym, serum i kremie. Poznaj jej historię.",
      heading: "O <span class=\"it\">marce</span>",
      lead: "Aurea to marka pielęgnacji twarzy oparta na trzech kosmetykach stosowanych w jednej kolejności: żel myjący, serum, krem.",
      storyHeading: "Historia",
      storyText: "Aurea wzięła się ze zmęczenia łazienkową półką pełną słoiczków, z których połowa stała nieużywana. Zamiast dokładać kolejny produkt, zostawiliśmy trzy i ustaliliśmy dla nich jedną kolejność.",
      makingHeading: "Jak powstają kosmetyki",
      makingText: "Receptury opracowujemy z technologiem kosmetyków. Zanim produkt trafi do sprzedaży, przechodzi ocenę bezpieczeństwa wymaganą w Unii Europejskiej.",
      contactHeading: "Kontakt",
      contactText: "Masz pytanie o produkty albo współpracę? Napisz do nas:"
    },
    footer: {
      tagline: "Pielęgnacja twarzy w trzech krokach.",
      products: "Produkty",
      brand: "Marka",
      info: "Informacje",
      contact: "Kontakt",
      phone: "[[telefon]]",
      address: "[[adres siedziby]]",
      rights: "Wszelkie prawa zastrzeżone."
    },
    notFound: {
      title: "Nie znaleziono strony – Aurea",
      description: "Ta strona nie istnieje. Wróć na stronę główną Aurea.",
      heading: "Tej strony <span class=\"it\">nie ma</span>.",
      text: "Adres mógł się zmienić albo wkradła się literówka. Wróć na stronę główną i zacznij od pierwszego kroku.",
      cta: "Wróć na stronę główną"
    },
    legal: { updated: "Ostatnia aktualizacja" }
  },
  en: {
    ogLocale: "en_GB",
    skipLink: "Skip to content",
    header: {
      homeLabel: "Aurea home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuLabel: "Menu",
      closeLabel: "Close",
      themeLabel: "Toggle colour theme",
      cta: "Meet the products",
      switchLabel: "Wersja polska",
      switchShort: "PL"
    },
    menu: {
      navLabel: "Site menu",
      groupMain: "Menu",
      groupInfo: "Information",
      groupLang: "Language",
      products: "Products",
      ritual: "Ritual",
      philosophy: "Philosophy",
      about: "About",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      polish: "Polski",
      english: "English"
    },
    anchors: { philosophy: "philosophy", products: "products", ritual: "ritual" },
    home: {
      title: "Aurea – facial skincare in three steps",
      description: "Aurea is three facial skincare products used in one order: cleansing gel, serum and cream. Meet the products and the ritual.",
      heroTitle: "A ritual in three<br><span class=\"it\">simple</span> steps.",
      heroLead: "Cleansing gel, serum and cream. Three products, always in the same order.",
      scroll: "scroll down",
      chips: ["Cleansing gel", "Serum", "Cream", "Step by step", "Daily ritual", "Three products"],
      philosophyTag: "Philosophy",
      philosophyTitle: "Fewer steps,<br>more <span class=\"it\">care</span><br>for your skin.",
      philosophyText: "Aurea is three products you always use in the same order. No ten-step routines and no guessing what goes on after what.",
      phrases: ["Cleanse skin", "Add serum", "Seal with <span class=\"it\">cream</span>"],
      lineTag: "The Aurea line",
      lineTitle: "Three products,<br>one order.",
      lineText: "Each product has its place in the ritual. Start with the gel, then the serum, and finish with the cream.",
      outroTitle: "Start with the <span class=\"it\">first</span> step.",
      outroText: "See what is in each of the three products and how to use them."
    },
    product: {
      back: "All products",
      step: "Step",
      volume: "Volume",
      price: "Price",
      pao: "Period after opening",
      view: "View product",
      howTo: "How to use",
      inci: "Ingredients (INCI)",
      forWhom: "Who it is for",
      whereToBuy: "Where to buy",
      next: "Next step",
      backToFirst: "Back to the first step",
      whereToBuyText: "Online sales have not started yet. Write to us and we will let you know when the products are available:"
    },
    about: {
      title: "About Aurea – three products, one order",
      description: "Aurea is a facial skincare brand built on three products: cleansing gel, serum and cream. Read its story.",
      heading: "About the <span class=\"it\">brand</span>",
      lead: "Aurea is a facial skincare brand built on three products used in one order: cleansing gel, serum, cream.",
      storyHeading: "Story",
      storyText: "Aurea came from being tired of a bathroom shelf full of jars, half of them unused. Instead of adding one more product, we kept three and gave them one order.",
      makingHeading: "How the products are made",
      makingText: "We develop the formulas with a cosmetic chemist. Before a product goes on sale, it passes the safety assessment required in the European Union.",
      contactHeading: "Contact",
      contactText: "Do you have a question about the products or working together? Write to us:"
    },
    footer: {
      tagline: "Facial skincare in three steps.",
      products: "Products",
      brand: "Brand",
      info: "Information",
      contact: "Contact",
      phone: "[[phone]]",
      address: "[[registered address]]",
      rights: "All rights reserved."
    },
    notFound: {
      title: "Page not found – Aurea",
      description: "This page does not exist. Go back to the Aurea home page.",
      heading: "This page <span class=\"it\">is not here</span>.",
      text: "The address may have changed or there is a typo in it. Go back to the home page and start with the first step.",
      cta: "Back to the home page"
    },
    legal: { updated: "Last updated" }
  }
} as const;
