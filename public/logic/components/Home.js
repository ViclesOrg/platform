import * as builder from '../vendors/builder.js';
import Logsign from "./Logsign.js";
import Vicles from "./Vicles.js";

export default class Home extends builder.Component {
    onReady
    constructor() {
        super();
        this.onReady = undefined
        this.create()
    }

    async #checkAuth(success, failure)
    {
        const fingerprint = await builder.Fingerprint()
        const user = builder.prefs.get('user')

        if (user === null)
            failure()
        else
        {
            let fd = new FormData();
            fd.append('fingerprint', fingerprint)
            new builder.brdige('/agency/checkauth', 'GET', fd, (data)=>{
                const res = JSON.parse(data)
                if (res.hasOwnProperty('code'))
                    failure()
                else
                    success()
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
        })
    }
}