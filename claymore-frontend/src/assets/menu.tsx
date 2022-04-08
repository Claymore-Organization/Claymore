/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import malenia from "./figure_images/malenia.jpg"
import malenia2 from "./figure_images/malenia2.jpg"
import ranni from "./figure_images/ranni.jpg"
import marika from "./figure_images/marika.jpg"
import melina from "./figure_images/melina.jpg"
import melina_pop from "./figure_images/melina_pop.jpg"
import default_img from "./figure_images/default.jpg"

const menu = {
  "Malenia Blade of Miquella Figure (Elden Ring)": {
    pic: malenia,
  },
  "Malenia Phase 2 Figure (Elden Ring)": {
    pic: malenia2,
  },
  "Ranni the Witch Figure (Elden Ring)": {
    pic: ranni,
  },
  "Queen Marika Figure (Elden Ring)": {
    pic: marika,
  },
  "Melina Figure (Elden Ring)": {
    pic: melina,
  },
  "Melina Pop Figure (Elden Ring)": {
    pic: melina_pop,
  },
  "Default": {
    pic: default_img,
  }
};

export default function getMenuImage(name: string) {
  try {
    return menu[name].pic;
  } catch {
    console.log(`${name} is missing a picture`)
    return menu["Default"].pic;
  }
}
