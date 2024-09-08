import * as builder from '../vendors/builder.js';
import Statistics from "./Statistics.js";
import Parking from "./Parking.js";
import History from "./History.js";
import Staff from "./Staff.js";
import Settings from "./Settings.js";

export default class Vicles extends builder.Component {
    #parent
    active_tab
    constructor(parent) {
        super();
        this.#parent = parent;
        this.path = '/'
        this.active_tab = null
        this.create()
    }

    #activityNavigation()
    {
        let stats = builder.button(null, 'v_vicles_activity_navigation v_stats', null, '<i class="ri-file-chart-line"></i>'),
            parking = builder.button(null, 'v_vicles_activity_navigation v_park', null, '<i class="ri-parking-box-line"></i>'),
            staff = builder.button(null, 'v_vicles_activity_navigation v_staff', null, '<i class="ri-group-3-line"></i>'),
            history = builder.button(null, 'v_vicles_activity_navigation v_hist', null, '<i class="ri-history-fill"></i>'),
            settings = builder.button(null, 'v_vicles_activity_navigation v_settings', null, '<i class="ri-settings-2-line"></i>'),
            logout = builder.button(null, 'v_vicles_activity_navigation v_logout', null, '<i class="ri-logout-circle-line"></i>');

        if (location.pathname.includes('/parking'))
        {
            parking.className += ' v_active_tab'
            this.active_tab = parking
        }
        else if (location.pathname.includes('/staff'))
        {
            staff.className += ' v_active_tab'
            this.active_tab = staff
        }
        else if (location.pathname.includes('/history'))
        {
            history.className += ' v_active_tab'
            this.active_tab = history
        }
        else if (location.pathname.includes('/settings'))
        {
            settings.className += ' v_active_tab'
            this.active_tab = settings
        }
        else
        {
            stats.className += ' v_active_tab'
            this.active_tab = stats
        }

        stats.onclick = ()=>{
            builder.router.push('/')
            stats.className += ' v_active_tab'
            this.active_tab.classList.remove('v_active_tab')
            this.active_tab = stats
        }
        parking.onclick = ()=>{
            builder.router.push('/parking')
            parking.className += ' v_active_tab'
            this.active_tab.classList.remove('v_active_tab')
            this.active_tab = parking
        }
        staff.onclick = ()=>{
            builder.router.push('/staff')
            staff.className += ' v_active_tab'
            this.active_tab.classList.remove('v_active_tab')
            this.active_tab = staff
        }
        history.onclick = ()=>{
            builder.router.push('/history')
            history.className += ' v_active_tab'
            this.active_tab.classList.remove('v_active_tab')
            this.active_tab = history
        }
        settings.onclick = ()=>{
            builder.router.push('/settings')
            settings.className += ' v_active_tab'
            this.active_tab.classList.remove('v_active_tab')
            this.active_tab = settings
        }
        logout.onclick = ()=>{
            builder.prefs.delete('user')
            builder.router.push('/')
            this.#parent.rerender()
        }

        return [stats, parking, staff, history, settings, logout];
    }

    create() {
        const header = builder.block(null, 'v_vicles_header', []),
            navbar = builder.block(null, 'v_vicles_navbar', this.#activityNavigation()),
            stats = new Statistics(),
            activity = builder.block(null, 'v_vicles_activity_container', [stats.getHTML()]);
        this.component = builder.block(null, 'v_vicles_app', [header, navbar, activity]);
        this.addSubroute(new Parking(activity))
        this.addSubroute(new History(activity))
        this.addSubroute(new Staff(activity))
        this.addSubroute(new Settings(activity))
    }
}