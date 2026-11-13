import type { Lang } from "../i18n/ui";
import { site } from "../data/site";

export type LegalDocument = {
  title: string;
  description: string;
  heading: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const privacy: Record<Lang, LegalDocument> = {
  pl: {
    title: "Polityka prywatności – Aurea",
    description: "Jak strona Aurea przetwarza dane osobowe, co zapisuje w przeglądarce i jakie prawa ci przysługują na podstawie RODO.",
    heading: "Polityka <span class=\"it\">prywatności</span>",
    updated: "13 listopada 2026",
    sections: [
      {
        heading: "1. Administrator danych",
        paragraphs: [
          `Administratorem danych osobowych jest ${site.companyName} z siedzibą pod adresem [[adres siedziby]], NIP [[NIP]], REGON [[REGON]].`,
          `W sprawach dotyczących danych osobowych napisz na adres ${site.contactEmail}.`
        ]
      },
      {
        heading: "2. Jakie dane przetwarzamy",
        paragraphs: [
          "Strona ma charakter informacyjny. Nie ma na niej formularzy, kont użytkowników, newslettera ani sprzedaży online.",
          "Serwer, na którym działa strona, zapisuje w logach adres IP, datę i godzinę wizyty, adres otwartej podstrony oraz informację o przeglądarce. Podstawą jest prawnie uzasadniony interes administratora, czyli bezpieczeństwo i poprawne działanie strony (art. 6 ust. 1 lit. f RODO). Logi przechowujemy przez 30 dni.",
          "Jeśli napiszesz do nas e-mail, przetwarzamy twój adres i treść wiadomości, żeby odpowiedzieć (art. 6 ust. 1 lit. f RODO). Korespondencję przechowujemy do zakończenia sprawy, a potem przez 12 miesięcy."
        ]
      },
      {
        heading: "3. Pliki cookies i pamięć przeglądarki",
        paragraphs: [
          "Strona nie używa plików cookies do analityki ani marketingu i nie ładuje zasobów z zewnętrznych serwerów. Kroje pisma, skrypty i zdjęcia są pobierane z tego samego serwera co strona.",
          "W pamięci twojej przeglądarki (localStorage) zapisujemy dwie informacje: wybrany motyw kolorystyczny oraz to, czy animacja powitalna została już wyświetlona. Są niezbędne do działania strony zgodnie z twoim wyborem, nie trafiają na serwer i możesz je usunąć w ustawieniach przeglądarki."
        ]
      },
      {
        heading: "4. Odbiorcy danych",
        paragraphs: [
          "Dane z logów serwera przetwarza dostawca hostingu [[nazwa i adres dostawcy hostingu]] na podstawie umowy powierzenia.",
          "Danych nie przekazujemy poza Europejski Obszar Gospodarczy [[potwierdzić dla wybranego hostingu]]."
        ]
      },
      {
        heading: "5. Twoje prawa",
        paragraphs: [
          "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przenoszenia oraz prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
          "Możesz też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
          "Podanie danych jest dobrowolne. Nie podejmujemy decyzji w sposób zautomatyzowany i nie profilujemy."
        ]
      },
      {
        heading: "6. Zmiany polityki",
        paragraphs: [
          "Gdy na stronie pojawią się nowe funkcje, na przykład formularz kontaktowy, newsletter lub sklep, zaktualizujemy tę politykę przed ich uruchomieniem."
        ]
      }
    ]
  },
  en: {
    title: "Privacy Policy – Aurea",
    description: "How the Aurea website processes personal data, what it stores in your browser and which rights you have under the GDPR.",
    heading: "Privacy <span class=\"it\">Policy</span>",
    updated: "13 November 2026",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          `The controller of personal data is ${site.companyName} with its registered office at [[registered address]], tax ID (NIP) [[NIP]], REGON [[REGON]].`,
          `For any matter concerning personal data, write to ${site.contactEmail}.`
        ]
      },
      {
        heading: "2. What data we process",
        paragraphs: [
          "This website is informational. It has no forms, user accounts, newsletter or online sales.",
          "The server that hosts the website records your IP address, the date and time of the visit, the address of the page you opened and information about your browser in its logs. The legal basis is the controller's legitimate interest in keeping the website secure and working (Article 6(1)(f) GDPR). We keep the logs for 30 days.",
          "If you e-mail us, we process your address and the content of your message in order to reply (Article 6(1)(f) GDPR). We keep the correspondence until the matter is closed and then for 12 months."
        ]
      },
      {
        heading: "3. Cookies and browser storage",
        paragraphs: [
          "The website uses no analytics or marketing cookies and loads no resources from external servers. Fonts, scripts and photos come from the same server as the website.",
          "We store two pieces of information in your browser (localStorage): the colour theme you chose and whether the welcome animation has already been shown. They are necessary for the website to work the way you set it, they are never sent to the server, and you can delete them in your browser settings."
        ]
      },
      {
        heading: "4. Recipients of data",
        paragraphs: [
          "Server log data is processed by the hosting provider [[hosting provider name and address]] under a data processing agreement.",
          "We do not transfer data outside the European Economic Area [[confirm for the chosen hosting]]."
        ]
      },
      {
        heading: "5. Your rights",
        paragraphs: [
          "You have the right to access your data, to have it corrected or erased, to restrict its processing, to data portability, and to object to processing based on legitimate interest.",
          "You may also lodge a complaint with the President of the Personal Data Protection Office (UODO), ul. Stawki 2, 00-193 Warsaw, Poland.",
          "Providing data is voluntary. We make no automated decisions and do no profiling."
        ]
      },
      {
        heading: "6. Changes to this policy",
        paragraphs: [
          "When new features appear on the website, such as a contact form, a newsletter or a shop, we will update this policy before they go live."
        ]
      }
    ]
  }
};

export const terms: Record<Lang, LegalDocument> = {
  pl: {
    title: "Regulamin strony – Aurea",
    description: "Zasady korzystania ze strony Aurea: charakter informacyjny, prawa autorskie, informacje o kosmetykach i zgłaszanie uwag.",
    heading: "Regulamin <span class=\"it\">strony</span>",
    updated: "13 listopada 2026",
    sections: [
      {
        heading: "1. Postanowienia ogólne",
        paragraphs: [
          `Właścicielem strony jest ${site.companyName} z siedzibą pod adresem [[adres siedziby]], NIP [[NIP]], REGON [[REGON]]. Kontakt: ${site.contactEmail}.`,
          "Regulamin określa zasady korzystania ze strony. Korzystając z niej, akceptujesz jego treść."
        ]
      },
      {
        heading: "2. Charakter strony",
        paragraphs: [
          "Strona ma charakter informacyjny i prezentuje kosmetyki marki Aurea. Treści na stronie nie są ofertą w rozumieniu art. 66 § 1 Kodeksu cywilnego.",
          "Na stronie nie prowadzimy sprzedaży online. Informacje o tym, gdzie kupić kosmetyki, znajdziesz na stronach produktów."
        ]
      },
      {
        heading: "3. Wymagania techniczne",
        paragraphs: [
          "Do korzystania ze strony wystarczy urządzenie z dostępem do internetu i aktualna przeglądarka z włączoną obsługą JavaScript. Strona działa także przy włączonym ograniczeniu animacji w systemie."
        ]
      },
      {
        heading: "4. Informacje o kosmetykach",
        paragraphs: [
          "Opisy produktów mają charakter ogólny i nie zastępują porady lekarza ani dermatologa. Przed użyciem kosmetyku przeczytaj informacje na opakowaniu, w tym skład i sposób stosowania.",
          "Jeśli po użyciu kosmetyku wystąpi podrażnienie, przerwij stosowanie i skonsultuj się z lekarzem."
        ]
      },
      {
        heading: "5. Prawa autorskie",
        paragraphs: [
          "Teksty, zdjęcia, znaki graficzne i układ strony są chronione prawem autorskim. Kopiowanie i wykorzystywanie ich w celach komercyjnych wymaga pisemnej zgody właściciela strony."
        ]
      },
      {
        heading: "6. Uwagi i reklamacje",
        paragraphs: [
          `Uwagi dotyczące działania strony możesz zgłosić na adres ${site.contactEmail}. Odpowiadamy w ciągu 14 dni od otrzymania zgłoszenia.`
        ]
      },
      {
        heading: "7. Postanowienia końcowe",
        paragraphs: [
          "W sprawach nieuregulowanych regulaminem stosuje się przepisy prawa polskiego. Zasady przetwarzania danych osobowych opisuje polityka prywatności.",
          "Regulamin może się zmienić, gdy zmieni się zakres strony. Aktualna wersja jest zawsze dostępna pod tym adresem."
        ]
      }
    ]
  },
  en: {
    title: "Terms of Use – Aurea",
    description: "Rules for using the Aurea website: its informational nature, copyright, product information and how to send feedback.",
    heading: "Terms of <span class=\"it\">Use</span>",
    updated: "13 November 2026",
    sections: [
      {
        heading: "1. General provisions",
        paragraphs: [
          `The website is owned by ${site.companyName} with its registered office at [[registered address]], tax ID (NIP) [[NIP]], REGON [[REGON]]. Contact: ${site.contactEmail}.`,
          "These terms set out the rules for using the website. By using it, you accept them."
        ]
      },
      {
        heading: "2. Nature of the website",
        paragraphs: [
          "The website is informational and presents Aurea skincare products. Its content is not an offer within the meaning of Article 66 § 1 of the Polish Civil Code.",
          "We do not sell online through this website. Information on where to buy the products is on the product pages."
        ]
      },
      {
        heading: "3. Technical requirements",
        paragraphs: [
          "To use the website you need a device with internet access and an up-to-date browser with JavaScript enabled. The website also works with reduced motion turned on in your system."
        ]
      },
      {
        heading: "4. Product information",
        paragraphs: [
          "Product descriptions are general and do not replace advice from a doctor or dermatologist. Before using a product, read the information on the packaging, including the ingredients and directions for use.",
          "If irritation occurs after using a product, stop using it and consult a doctor."
        ]
      },
      {
        heading: "5. Copyright",
        paragraphs: [
          "The texts, photos, logos and layout of the website are protected by copyright. Copying or using them for commercial purposes requires the written consent of the website owner."
        ]
      },
      {
        heading: "6. Feedback and complaints",
        paragraphs: [
          `You can send feedback about how the website works to ${site.contactEmail}. We reply within 14 days of receiving it.`
        ]
      },
      {
        heading: "7. Final provisions",
        paragraphs: [
          "Matters not covered by these terms are governed by Polish law. The processing of personal data is described in the privacy policy.",
          "These terms may change when the scope of the website changes. The current version is always available at this address."
        ]
      }
    ]
  }
};
