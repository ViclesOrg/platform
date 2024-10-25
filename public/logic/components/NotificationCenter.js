import * as builder from "../vendors/builder.js";
import { io } from "socket.io-client";

export default class NotificationCenter extends builder.Component {
  static instance = null;
  constructor() {
    if (NotificationCenter.instance === null) {
      super();
      this.create();
      NotificationCenter.instance = this;
    } else return NotificationCenter.instance;
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
    
    const socket = io('http://localhost:3001', {
      withCredentials: true, // Enable credentials if needed
      transports: ['websocket'], // Use WebSocket only to avoid HTTP polling
    });
    
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    
      // Send a custom event to the server
      socket.emit('custom_event', { msg: 'Hello from client!' });
    
      // Listen for a response from the server
      socket.on('response_event', (data) => {
        console.log('Response from server:', data);
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }
}
