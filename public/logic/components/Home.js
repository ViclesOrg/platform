import * as builder from '../vendors/builder.js';
import Logsign from "./Logsign.js";
import Vicles from "./Vicles.js";

export default class Home extends builder.Component {
    constructor() {
        super();
        this.create()
    }

    create() {
        // I have to check the validty of the user token, and also check if the user is authenticated or not
        if (builder.prefs.get('user') === null)
        {
            const logsing = new Logsign('Login', '/', this),
                blocks = builder.image(null, 'v_login_image', '/assets/bg2.webp');
            this.addSubroute((new Logsign('Register', '/register')))
            this.path = logsing.path
            this.component = builder.block(null, "v_home", [blocks, logsing.getHTML()])
        }
        else
        {
            const vicles = new Vicles(this);
            this.subroutes = vicles.subroutes;
            this.path = vicles.path
            this.component = vicles.component
        }
    }
}