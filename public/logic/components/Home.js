import * as builder from '../vendors/builder.js';
import Logsign from "./Logsign.js";
import Vicles from "./Vicles.js";
import Splash from "./splash.js";

export default class Home extends builder.Component {
    onReady
    constructor() {
        super();
        this.onReady = undefined
        this.create()
    }

    async #checkAuth(success, failure, pending)
    {
        const fingerprint = await builder.Fingerprint()
        const user = builder.prefs.get('user')
        const splash = pending()

        if (user === null)
        {
            builder.app.removeChild(splash)
            failure()
        }
        else
        {
            let fd = new FormData();
            fd.append('fingerprint', fingerprint)
            new builder.brdige('/agency/checkauth', 'GET', fd, (data)=>{
                const res = JSON.parse(data)
                if (res.hasOwnProperty('code'))
                {
                    builder.app.removeChild(splash)
                    failure()
                }
                else
                {
                    builder.app.removeChild(splash)
                    success()
                }
            },()=>{})
        }
    }


    create() {
        this.#checkAuth(()=>{
            const vicles = new Vicles(this);
            this.subroutes = vicles.subroutes;
            this.path = vicles.path
            this.component = vicles.component
            if (this.onReady !== undefined)
                this.onReady()
        }, ()=>{
            const logsing = new Logsign('Login', '/', this),
                blocks = builder.image(null, 'v_login_image', '/assets/bg2.webp');
            this.addSubroute((new Logsign('Register', '/register')))
            this.path = logsing.path
            this.component = builder.block(null, "v_home", [blocks, logsing.getHTML()])
            if (this.onReady !== undefined)
                this.onReady()
        }, ()=>{
            const splash = new Splash()
            builder.app.append(splash.getHTML())
            return splash.getHTML()
        })
    }
}