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

    #stateChecker(stats, parking, staff, history, settings, title)
    {
        if (location.pathname.includes('/parking'))
        {
            if (this.active_tab)
                this.active_tab.classList.remove('v_active_tab')
            parking.className += ' v_active_tab'
            this.active_tab = parking
            title.textContent = 'Parking'
        }
        else if (location.pathname.includes('/staff'))
        {
            if (this.active_tab)
                this.active_tab.classList.remove('v_active_tab')
            staff.className += ' v_active_tab'
            this.active_tab = staff
            title.textContent = 'Personnel'
        }
        else if (location.pathname.includes('/history'))
        {
            if (this.active_tab)
                this.active_tab.classList.remove('v_active_tab')
            history.className += ' v_active_tab'
            this.active_tab = history
            title.textContent = 'Historique'
        }
        else if (location.pathname.includes('/settings'))
        {
            if (this.active_tab)
                this.active_tab.classList.remove('v_active_tab')
            settings.className += ' v_active_tab'
            this.active_tab = settings
            title.textContent = 'Paramètres'
        }
        else
        {
            if (this.active_tab)
                this.active_tab.classList.remove('v_active_tab')
            stats.className += ' v_active_tab'
            this.active_tab = stats
            title.textContent = 'Statistiques'
        }
    }

    #activityNavigation(title, activity)
    {
        let stats = builder.button(null, 'v_vicles_activity_navigation v_stats', null, '<i class="ri-file-chart-line"></i>'),
            parking = builder.button(null, 'v_vicles_activity_navigation v_park', null, '<i class="ri-parking-box-line"></i>'),
            staff = builder.button(null, 'v_vicles_activity_navigation v_staff', null, '<i class="ri-group-3-line"></i>'),
            history = builder.button(null, 'v_vicles_activity_navigation v_hist', null, '<i class="ri-history-fill"></i>'),
            settings = builder.button(null, 'v_vicles_activity_navigation v_settings', null, '<i class="ri-settings-2-line"></i>'),
            logout = builder.button(null, 'v_vicles_activity_navigation v_logout', null, '<i class="ri-logout-circle-line"></i>'),
            size = 1;

        setInterval(()=>{
            if (size !== activity.childNodes.length)
            {
                this.#stateChecker(stats, parking, staff, history, settings, title)
                size = activity.childNodes.length
            }
        }, 60)

        this.#stateChecker(stats, parking, staff, history, settings, title)
        stats.onclick = ()=>{
            if (this.active_tab !== stats)
            {
                builder.router.push('/')
                stats.className += ' v_active_tab'
                this.active_tab.classList.remove('v_active_tab')
                this.active_tab = stats
                title.textContent = 'Statistiques'
            }
        }
        parking.onclick = ()=>{
            if (this.active_tab !== parking)
            {
                builder.router.push('/parking')
                parking.className += ' v_active_tab'
                this.active_tab.classList.remove('v_active_tab')
                this.active_tab = parking
                title.textContent = 'Parking'
            }
        }
        staff.onclick = ()=>{
            if (this.active_tab !== staff)
            {
                builder.router.push('/staff')
                staff.className += ' v_active_tab'
                this.active_tab.classList.remove('v_active_tab')
                this.active_tab = staff
                title.textContent = 'Personnel'
            }
        }
        history.onclick = ()=>{
            if (this.active_tab !== history)
            {
                builder.router.push('/history')
                history.className += ' v_active_tab'
                this.active_tab.classList.remove('v_active_tab')
                this.active_tab = history
                title.textContent = 'Historique'
            }
        }
        settings.onclick = ()=>{
            if (this.active_tab !== settings)
            {
                builder.router.push('/settings')
                settings.className += ' v_active_tab'
                this.active_tab.classList.remove('v_active_tab')
                this.active_tab = settings
                title.textContent = 'Paramètres'
            }
        }
        logout.onclick = ()=>{
            builder.prefs.delete('user')
            builder.router.push('/')
            this.#parent.rerender()
        }

        return [stats, parking, staff, history, settings, logout];
    }

    create() {
        const logo = builder.heading(1, 'v_vicles_logo', "Vicles"),
            title = builder.label('v_vicles_title', ''),
            notifs = builder.button(null, 'v_vicles_notifs', null, '<i class="ri-notification-3-line"></i>'),
            agency_logo = builder.image(null, 'v_vicles_agency_logo', ''),
            header = builder.block(null, 'v_vicles_header', [logo, title, notifs, agency_logo]),
            stats = new Statistics(),
            activity = builder.block(null, 'v_vicles_activity_container', [stats.getHTML()]),
            navigation_pilot = this.#activityNavigation(title, activity),
            navbar = builder.block(null, 'v_vicles_navbar', navigation_pilot);
        if (builder.prefs.get('user').logo)
            agency_logo.src = builder.prefs.get('user').logo
        else
            agency_logo.src = 'assets/tmp_logo.webp'
        this.component = builder.block(null, 'v_vicles_app', [header, navbar, activity]);
        this.addSubroute(new Parking(activity))
        this.addSubroute(new History(activity))
        this.addSubroute(new Staff(activity))
        this.addSubroute(new Settings(activity))
    }
}