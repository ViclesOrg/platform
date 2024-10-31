import * as builder from "../vendors/builder.js";

export default class Soon extends builder.Component {
  #Title;
  constructor(title) {
    super();
    this.#Title = title;
    this.create();
  }

  create() {
    let label = builder.heading(
        2,
        "vicles_soon_heading",
        `La page ${this.#Title} est en cours de construction par nos développeurs.`,
      ),
      soonImage = builder.image(null, "vicles_soon_image", "/assets/soon.svg");
    this.component = builder.block(null, "vicles_soon_page", [
      soonImage,
      label,
    ]);
  }
}
