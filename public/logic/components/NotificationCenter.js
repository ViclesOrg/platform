import * as builder from "../vendors/builder.js";
import { io } from "socket.io-client";
import IconedButton from "./IconedButton.js";
import _window from "./Window.js";

function calculateDaysBetween(startDate, endDate) {
  const start = startDate;
  const end = endDate;

  // Calculate the difference in milliseconds
  const diffInMs = end - start;

  // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.round(diffInDays); // Rounding to ensure whole days
}

export default class NotificationCenter extends builder.Component {
  static instance = null;
  notification_alert;
  constructor(alert_notif) {
    if (NotificationCenter.instance === null) {
      super();
      this.create();
      this.notification_alert = alert_notif;
      NotificationCenter.instance = this;
    } else return NotificationCenter.instance;
  }

  #iconedLabel(id, icon, text) {
    const iconBtn = builder.button(
        null,
        "vicles_iconed_label_icon",
        null,
        icon,
      ),
      labelText = builder.label("vicles_iconed_label_label", text);
    return builder.block(id, "styleClass", [iconBtn, labelText]);
  }

  #createNotifCard(notif) {
    const start = new Date(notif.start_date),
      end = new Date(notif.end_date);
    let renterName = this.#iconedLabel(
        "renterName",
        '<i class="ri-id-card-line"></i>',
        notif.renter,
      ),
      carFullModel = this.#iconedLabel(
        "carFullModel",
        '<i class="ri-roadster-line"></i>',
        notif.brand + " " + notif.model,
      ),
      renterPhone = this.#iconedLabel(
        "renterPhone",
        '<i class="ri-phone-line"></i>',
        notif.phone,
      ),
      plate = builder.label(
        "vicles_car_plate",
        notif.plate.replaceAll("-", " | "),
      ),
      startDate = this.#iconedLabel(
        "startDate",
        '<i class="ri-flag-line"></i>',
        start.toLocaleDateString("fr-MA"),
      ),
      endDate = this.#iconedLabel(
        "endDate",
        '<i class="ri-flag-off-line"></i>',
        end.toLocaleDateString("fr-MA"),
      ),
      total = this.#iconedLabel(
        "total",
        '<i class="ri-equal-line"></i>',
        calculateDaysBetween(start, end) + " Jours",
      ),
      triGrid = builder.block(null, "vicles_notification_card_dates", [
        startDate,
        endDate,
        total,
      ]),
      // Accept buttin
      accept = new IconedButton(
        null,
        "vicles_notification_card_accept",
        '<i class="ri-check-line"></i>',
        "Accpeter",
        () => {
          const win = new _window(
              '<i class="ri-calendar-close-line"></i>',
              "Confirmer la reservation",
              "vicles_car_delete_window",
              "modal",
            ),
            message = builder.label(
              "vicles_car_delete_message",
              "Voulez vous confirmer la location?",
            ),
            cancel = builder.button(
              null,
              "vicles_car_approve_delettion",
              "Annuler",
            ),
            approve = builder.button(
              null,
              "vicles_car_cancel_delettion",
              "Confirmer",
            ),
            actions = builder.block(
              null,
              "vicles_car_deletion_actions_container",
              [cancel, approve],
            );

          cancel.onclick = () => {
            win.getHTML().parentNode.removeChild(win.getHTML());
          };

          approve.onclick = () => {};

          win.appZone.append(message, actions);
          builder.app.append(win.getHTML());
        },
      ),
      // Cancel button
      cancel = new IconedButton(
        null,
        "vicles_notification_card_cancel",
        '<i class="ri-close-line"></i>',
        "Annuler",
        () => {
          const win = new _window(
              '<i class="ri-calendar-close-line"></i>',
              "Annuler la reservation",
              "vicles_car_delete_window",
              "modal",
            ),
            message = builder.label(
              "vicles_car_delete_message",
              "L'annulation d'une location est irreversible",
            ),
            approve = builder.button(
              null,
              "vicles_car_approve_delettion",
              "Supprimer",
            ),
            cancel = builder.button(
              null,
              "vicles_car_cancel_delettion",
              "Annuler",
            ),
            actions = builder.block(
              null,
              "vicles_car_deletion_actions_container",
              [cancel, approve],
            );

          cancel.onclick = () => {
            win.getHTML().parentNode.removeChild(win.getHTML());
          };

          approve.onclick = () => {};

          win.appZone.append(message, actions);
          builder.app.append(win.getHTML());
        },
      ),
      controls_panel = builder.block(
        null,
        "vicles_notification_card_controls",
        [accept.getHTML(), cancel.getHTML()],
      );

    return builder.block(null, "vicles_notification_card", [
      renterName,
      renterPhone,
      carFullModel,
      triGrid,
      plate,
      controls_panel,
    ]);
  }

  create() {
    let title = builder.label(
        "vicles_notification_center_title",
        "Centre de notifications",
      ),
      notifications_container = builder.block(
        null,
        "vicles_notification_center_notifs_container",
        [],
      ),
      backgound_block = builder.block(
        null,
        "vicles_notification_center_backgound",
        [],
      ),
      notifs = builder.block(null, "vicles_notification_center", [
        title,
        notifications_container,
      ]);

    this.component = builder.block(null, "vicles_notifications", [
      notifs,
      backgound_block,
    ]);

    backgound_block.onclick = () => {
      this.component.parentNode.removeChild(this.component);
    };

    const socket = io("http://localhost:3001", {
      withCredentials: true, // Enable credentials if needed
      transports: ["websocket"], // Use WebSocket only to avoid HTTP polling
    });

    socket.on("connect", () => {
      const user = JSON.parse(builder.prefs.get("user"));
      socket.emit("establish", { user_id: user.id });
    });

    socket.on("disconnect", () => {});

    socket.on("notifs", (data) => {
      this.notification_alert.className = "vicles_notifications_alert_visible";
      for (const notif of data.notifications) {
        notifications_container.append(this.#createNotifCard(notif));
      }
    });
  }
}
