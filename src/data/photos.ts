import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n/ui";

const photoFiles = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.webp", { eager: true });

export function photoSource(id: string): ImageMetadata | undefined {
  return photoFiles[`../assets/photos/${id}.webp`]?.default;
}

type PhotoInfo = { alt: Record<Lang, string>; focusY?: number };

export const photos: Record<string, PhotoInfo> = {
  "pre-0": { alt: { pl: "Modelka trzyma pipetę z serum przy policzku", en: "Model holding the serum dropper near her cheek" } },
  "pre-1": { alt: { pl: "Zbliżenie twarzy modelki z zamkniętymi oczami", en: "Close-up of the model with her eyes closed" }, focusY: 30 },
  "pre-2": { alt: { pl: "Modelka oparta o postument ze słoikiem kremu", en: "Model leaning on a pedestal with the cream jar" } },
  "pre-3": { alt: { pl: "Modelka w jedwabnej sukience trzyma tubę żelu", en: "Model in a silk dress holding the gel tube" }, focusY: 30 },
  "ringa-0": { alt: { pl: "Butelka serum stojąca w płytkiej wodzie", en: "Serum bottle standing in shallow water" } },
  "ringa-1": { alt: { pl: "Twarz modelki z kroplą serum na policzku", en: "Model's face with a drop of serum on her cheekbone" } },
  "ringa-2": { alt: { pl: "Tuba żelu na złożonym jedwabiu z kroplami wody", en: "Gel tube on folded silk with water droplets" } },
  "ringa-3": { alt: { pl: "Uśmiechnięta modelka dotyka policzka", en: "Smiling model touching her cheek" } },
  "ringb-0": { alt: { pl: "Otwarty słoik z kremem na satynie", en: "Open cream jar on satin" } },
  "ringb-1": { alt: { pl: "Profil modelki z pipetą przy linii szczęki", en: "Model in profile with the dropper near her jaw" } },
  "ringb-2": { alt: { pl: "Pipeta z kroplą serum nad taflą wody", en: "Dropper releasing a drop of serum above water" } },
  "ringb-3": { alt: { pl: "Modelka z zamkniętymi oczami opiera policzek na dłoni", en: "Model with eyes closed resting her cheek on her hand" } },
  "studio-1": { alt: { pl: "Modelka w studiu trzyma butelkę serum", en: "Model in the studio holding the serum bottle" }, focusY: 20 },
  "life-0": { alt: { pl: "Modelka nakłada serum w jasnej łazience", en: "Model applying serum in a bright bathroom" }, focusY: 30 },
  "life-1": { alt: { pl: "Modelka z tubą żelu w ogrodzie z bzem", en: "Model holding the gel tube in a lilac garden" }, focusY: 30 },
  "life-2": { alt: { pl: "Modelka ze słoikiem kremu na słonecznym tarasie", en: "Model with the cream jar on a sunny terrace" }, focusY: 35 },
  "base-5": { alt: { pl: "Portret modelki na śliwkowym tle", en: "Portrait of the model on a plum background" } },
  "styled-2": { alt: { pl: "Modelka wśród płatków piwonii", en: "Model among peony petals" } },
  "styled-3": { alt: { pl: "Modelka przy ścianie z trawertynu", en: "Model by a travertine wall" } },
  "styled-5": { alt: { pl: "Modelka na tle śliwkowego aksamitu", en: "Model against plum velvet" } },
  "base-0": { alt: { pl: "Serum z pipetą na jasnym tle", en: "Serum dropper bottle on a pale background" } },
  "base-1": { alt: { pl: "Tuba żelu myjącego na jasnym tle", en: "Cleansing gel tube on a pale background" } },
  "base-2": { alt: { pl: "Słoik kremu na jasnym tle", en: "Cream jar on a pale background" } },
  "base-4": { alt: { pl: "Otwarty słoik z różowym kremem", en: "Open jar showing the pink cream" } },
  "styled-0": { alt: { pl: "Butelka serum w falującej liliowej wodzie", en: "Serum bottle in rippling lilac water" } },
  "styled-1": { alt: { pl: "Tuba żelu na lawendowym jedwabiu", en: "Gel tube on draped lavender silk" } },
  "styled-4": { alt: { pl: "Otwarty słoik kremu na lustrzanej tafli", en: "Open cream jar on mirrored glass" } },
  "styled2-0": { alt: { pl: "Serum na trawertynie w słońcu", en: "Serum on warm travertine in sunlight" } },
  "styled2-1": { alt: { pl: "Słoik kremu wśród płatków piwonii", en: "Cream jar among peony petals" } },
  "styled2-3": { alt: { pl: "Słoik kremu na postumencie z piaskowca", en: "Cream jar on a sandstone pedestal" } },
  "prod-0": { alt: { pl: "Serum, żel myjący i krem na liliowym postumencie", en: "Serum, cleansing gel and cream on a lilac pedestal" } }
};
