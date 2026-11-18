import type { Lang } from "../i18n/ui";

type Localized = Record<Lang, string>;

export type Product = {
  id: "gel" | "serum" | "cream";
  step: string;
  gradient: "s1" | "s2" | "s3";
  slug: Localized;
  name: Localized;
  kind: Localized;
  lead: Localized;
  howTo: Localized;
  metaDescription: Localized;
  volume: string;
  price: number;
  periodAfterOpening: Localized;
  inci: string;
  forWhom: Localized;
  ritualTitle: Localized;
  ritualNotes: Record<Lang, { tag: string; text: string }[]>;
  cardPhoto: string;
  ritualPhotos: [string, string, string, string];
  galleryPhotos: [string, string, string];
};

export const PRICE_CURRENCY = "PLN";

export function formatPrice(lang: Lang, amount: number): string {
  return lang === "pl" ? `${amount} zł` : `${PRICE_CURRENCY} ${amount}`;
}

export const products: Product[] = [
  {
    id: "gel",
    step: "01",
    gradient: "s1",
    slug: { pl: "zel-myjacy", en: "cleansing-gel" },
    name: { pl: "Żel myjący", en: "Cleansing gel" },
    kind: { pl: "Oczyszczanie", en: "Cleansing" },
    lead: {
      pl: "Pierwszy krok rytuału Aurea. Zmywa to, co zostało na skórze po całym dniu, zanim sięgniesz po serum.",
      en: "The first step of the Aurea ritual. It washes away what the day left on your skin before you reach for the serum."
    },
    howTo: {
      pl: "Rozprowadź niewielką ilość żelu na wilgotnej skórze twarzy, masuj okrężnymi ruchami i spłucz letnią wodą. Omijaj okolice oczu.",
      en: "Spread a small amount of gel over damp skin, massage in circular motions and rinse with lukewarm water. Avoid the eye area."
    },
    metaDescription: {
      pl: "Żel myjący Aurea to pierwszy krok rytuału pielęgnacji twarzy. Zobacz, jak go stosować, i sprawdź skład.",
      en: "Aurea cleansing gel is the first step of the facial skincare ritual. See how to use it and check the ingredients."
    },
    volume: "150 ml",
    price: 89,
    periodAfterOpening: { pl: "12 miesięcy", en: "12 months" },
    inci: "Aqua, Glycerin, Coco-Glucoside, Sodium Cocoyl Glutamate, Cocamidopropyl Betaine, Betaine, Panthenol, Allantoin, Lavandula Angustifolia Flower Water, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    forWhom: {
      pl: "Do codziennego mycia twarzy, rano i wieczorem. Dla każdego typu skóry.",
      en: "For daily face cleansing, morning and evening. For every skin type."
    },
    ritualTitle: { pl: "Oczyść<br><span class=\"it\">delikatnie.</span>", en: "Cleanse<br><span class=\"it\">gently.</span>" },
    ritualNotes: {
      pl: [
        { tag: "Jak stosować", text: "Rozprowadź żel na wilgotnej skórze<br>i spłucz letnią wodą." },
        { tag: "Dlaczego na początku", text: "Serum i krem nakładasz<br>na czystą skórę." }
      ],
      en: [
        { tag: "How to use", text: "Spread the gel over damp skin<br>and rinse with lukewarm water." },
        { tag: "Why it comes first", text: "Serum and cream go<br>onto clean skin." }
      ]
    },
    cardPhoto: "styled-1",
    ritualPhotos: ["ringa-2", "life-1", "base-1", "pre-3"],
    galleryPhotos: ["styled-1", "base-1", "life-1"]
  },
  {
    id: "serum",
    step: "02",
    gradient: "s2",
    slug: { pl: "serum", en: "serum" },
    name: { pl: "Serum", en: "Serum" },
    kind: { pl: "Pielęgnacja", en: "Treatment" },
    lead: {
      pl: "Drugi krok rytuału Aurea. Nakładasz je na oczyszczoną skórę, zanim sięgniesz po krem.",
      en: "The second step of the Aurea ritual. You apply it to cleansed skin before you reach for the cream."
    },
    howTo: {
      pl: "Nanieś kilka kropli na oczyszczoną skórę twarzy i szyi i delikatnie wklep opuszkami palców. Omijaj okolice oczu.",
      en: "Apply a few drops to cleansed skin on the face and neck and gently pat in with your fingertips. Avoid the eye area."
    },
    metaDescription: {
      pl: "Serum Aurea to drugi krok rytuału pielęgnacji twarzy, między żelem a kremem. Zobacz, jak je stosować, i sprawdź skład.",
      en: "Aurea serum is the second step of the facial skincare ritual, between the gel and the cream. See how to use it and check the ingredients."
    },
    volume: "30 ml",
    price: 149,
    periodAfterOpening: { pl: "6 miesięcy", en: "6 months" },
    inci: "Aqua, Niacinamide, Glycerin, Propanediol, Sodium Hyaluronate, Panthenol, Betaine, Allantoin, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    forWhom: {
      pl: "Dla skóry, która potrzebuje nawilżenia. Rano i wieczorem, pod krem.",
      en: "For skin that needs hydration. Morning and evening, under the cream."
    },
    ritualTitle: { pl: "Dodaj<br><span class=\"it\">serum.</span>", en: "Add the<br><span class=\"it\">serum.</span>" },
    ritualNotes: {
      pl: [
        { tag: "Jak stosować", text: "Rozprowadź kilka kropli<br>na twarzy i szyi." },
        { tag: "Dlaczego w środku", text: "Lekkie formuły nakłada się<br>przed cięższymi." }
      ],
      en: [
        { tag: "How to use", text: "Spread a few drops<br>over the face and neck." },
        { tag: "Why it sits in the middle", text: "Light formulas go on<br>before heavier ones." }
      ]
    },
    cardPhoto: "styled-0",
    ritualPhotos: ["styled2-0", "life-0", "ringa-1", "ringb-2"],
    galleryPhotos: ["styled-0", "base-0", "studio-1"]
  },
  {
    id: "cream",
    step: "03",
    gradient: "s3",
    slug: { pl: "krem", en: "cream" },
    name: { pl: "Krem", en: "Cream" },
    kind: { pl: "Nawilżanie", en: "Moisturising" },
    lead: {
      pl: "Trzeci, ostatni krok rytuału Aurea. Krem zamyka pielęgnację po żelu i serum.",
      en: "The third and last step of the Aurea ritual. The cream completes the routine after the gel and the serum."
    },
    howTo: {
      pl: "Nabierz niewielką ilość kremu i wmasuj w skórę twarzy i szyi, gdy serum się wchłonie.",
      en: "Take a small amount of cream and massage it into the face and neck once the serum has absorbed."
    },
    metaDescription: {
      pl: "Krem Aurea to trzeci, ostatni krok rytuału pielęgnacji twarzy. Zobacz, jak go stosować, i sprawdź skład.",
      en: "Aurea cream is the third and last step of the facial skincare ritual. See how to use it and check the ingredients."
    },
    volume: "50 ml",
    price: 129,
    periodAfterOpening: { pl: "12 miesięcy", en: "12 months" },
    inci: "Aqua, Caprylic/Capric Triglyceride, Glycerin, Butyrospermum Parkii Butter, Cetearyl Alcohol, Glyceryl Stearate, Squalane, Niacinamide, Ceramide NP, Panthenol, Tocopherol, Sodium Hyaluronate, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    forWhom: {
      pl: "Dla skóry normalnej i suchej. Na dzień i na noc, jako ostatni krok.",
      en: "For normal and dry skin. Day and night, as the last step."
    },
    ritualTitle: { pl: "Zamknij<br><span class=\"it\">kremem.</span>", en: "Seal with<br><span class=\"it\">cream.</span>" },
    ritualNotes: {
      pl: [
        { tag: "Jak stosować", text: "Wmasuj niewielką ilość kremu<br>w twarz i szyję." },
        { tag: "Dlaczego na końcu", text: "Krem to ostatnia warstwa<br>codziennej pielęgnacji." }
      ],
      en: [
        { tag: "How to use", text: "Massage a small amount of cream<br>into the face and neck." },
        { tag: "Why it comes last", text: "Cream is the final layer<br>of the daily routine." }
      ]
    },
    cardPhoto: "styled2-3",
    ritualPhotos: ["styled2-1", "ringb-0", "life-2", "styled-4"],
    galleryPhotos: ["styled2-3", "base-2", "base-4"]
  }
];
