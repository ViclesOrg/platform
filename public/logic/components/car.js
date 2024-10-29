import * as builder from "../vendors/builder.js";
import carInfo from "./carInfo.js";
import _window from "./Window.js";
import Toast from "./toast.js";

export default class Car extends builder.Component {
  #car;
  #parent;
  /**
   * @param {Object} car
   * @param {builder.Component} parent
   */
  constructor(car, parent) {
    super();
    this.#car = car;
    this.#parent = parent;
    this.create();
  }

  create() {
    let remove = builder.button(
        null,
        "vicles_car_button vicles_car_delete",
        null,
        '<i class="ri-delete-bin-line"></i>',
      ),
      modify = builder.button(
        null,
        "vicles_car_button vicles_car_modify",
        null,
        '<i class="ri-edit-box-line"></i>',
      ),
      toolBar = builder.block(null, "vicles_car_toolBar", [remove, modify]),
      car_image = builder.image(null, "vicles_car_image", this.#car.cover),
      car_info = new carInfo("edit", null, this.#car),
      car_brand_model_container = builder.block(
        null,
        "vicles_car_brand_model_container",
        [
          builder.label("vicles_car_brand", this.#car.cbrand),
          builder.label("vicles_car_model", this.#car.cmodel),
        ],
      ),
      plate = builder.label(
        "vicles_car_plate",
        this.#car.plate.replaceAll("-", " | "),
      );

    this.component = builder.block(null, "vicles_car", [
      toolBar,
      car_image,
      car_brand_model_container,
      plate,
    ]);

    car_info.connectedComponents.car_factory = this.#parent;
    modify.onclick = () => {
      builder.app.append(car_info.getHTML());
    };

    remove.onclick = () => {
      const win = new _window(
          '<i class="ri-delete-bin-line"></i>',
          "Supprimez",
          "vicles_car_delete_window",
          "modal",
        ),
        message = builder.label(
          "vicles_car_delete_message",
          "La suppression est irreversible. Êtes-vous sûr?",
        ),
        approve = builder.button(
          null,
          "vicles_car_approve_delettion",
          "Supprimer",
        ),
        cancel = builder.button(null, "vicles_car_cancel_delettion", "Annuler"),
        actions = builder.block(null, "vicles_car_deletion_actions_container", [
          cancel,
          approve,
        ]);

      cancel.onclick = () => {
        win.getHTML().parentNode.removeChild(win.getHTML());
      };

      approve.onclick = () => {
        const fd = new FormData();
        fd.append("id", this.#car.id);
        approve.disabled = true;
        builder.brdige(
          "/agency/deleteCar",
          "POST",
          fd,
          (data) => {
            data = JSON.parse(data);
            if (data.hasOwnProperty("code")) {
              const toast = new Toast(
                "Voiture n'a pas été supprimée",
                3000,
                "error_toast",
              );
              toast.show();
              approve.disabled = false;
            } else {
              win.getHTML().parentNode.removeChild(win.getHTML());
              this.#parent.rerender();
              const toast = new Toast(
                "Voiture est supprimée",
                3000,
                "success_toast",
              );
              toast.show();
            }
          },
          (err) => {},
        );
      };

      win.appZone.append(message, actions);
      builder.app.append(win.getHTML());
    };
  }
}
