import * as builder from "../vendors/builder.js";

export default class IconedButton extends builder.Component {
  icon;
  id;
  styleClass;
  text;
  onclick;
  constructor(id, styleClass, icon, text, onclick) {
    super();
    this.icon = icon;
    this.id = id;
    this.styleClass = styleClass;
    this.text = text;
    this.onclick = onclick;
    this.create();
  }

  create() {
    const icon = builder.button(null, "v_iconedButton_icon", null, this.icon),
      text = builder.label("v_iconedButton", this.text);

    this.component = builder.block(this.id, this.styleClass, [icon, text]);
    this.component.onclick = () => {
      this.onclick();
    };
  }
}
