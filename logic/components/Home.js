import * as builder from '../vendors/builder.js';
import Logsign from "./Logsign.js";
import Vicles from "./Vicles.js";

export default class Home extends builder.Component {
    constructor() {
        super();
        this.path = '/'
        this.create()
    }

    create() {
        if (builder.prefs.get('user') === null)
        {
            const logsing = new Logsign('Login', '', this),
                blocks = builder.image(null, 'v_login_image', 'assets/bg2.webp');
            this.addSubroute((new Logsign('Register', '/register')))
            this.component = builder.block(null, "v_home", [blocks, logsing.getHTML()])
        }
        else
        {
            const vicles = new Vicles();
            this.component = builder.block(null, "v_home", [vicles.getHTML()])
        }
        // builder.prefs.delete('user')
    }
}