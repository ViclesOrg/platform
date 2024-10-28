import * as builder from "../vendors/builder.js";
import { io } from "socket.io-client";

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
  
  #iconedLabel(id, icon, text)
  {
    const iconBtn = builder.button(null, "vicles_iconed_label_icon", null, icon),
          labelText = builder.label("vicles_iconed_label_label", text)
    return builder.block(id, "styleClass", [iconBtn, labelText])
  }
  
  #createNotifCard(notif) {
    const start = new Date(notif.start_date),
      end = new Date(notif.end_date);
    let renterName = this.#iconedLabel('renterName' ,'<i class="ri-id-card-line"></i>', notif.renter),
      carFullModel = this.#iconedLabel('carFullModel' ,'<i class="ri-roadster-line"></i>', notif.brand + " " + notif.model),
      plate = builder.label('vicles_car_plate', notif.plate),
      startDate = this.#iconedLabel('startDate' ,'<i class="ri-flag-line"></i>', start.toLocaleDateString("fr-MA")),
      endDate = this.#iconedLabel('endDate' ,'<i class="ri-flag-off-line"></i>', end.toLocaleDateString("fr-MA")),
      total = this.#iconedLabel('total' ,'<i class="ri-equal-line"></i>', calculateDaysBetween(start, end) + " Jours"),
      triGrid = builder.block(null, 'vicles_notification_car_dates', [startDate, endDate, total]);

    return builder.block(null, "vicles_notification_card", [
      renterName,
      carFullModel,
      plate,
      triGrid
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
