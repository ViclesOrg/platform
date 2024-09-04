import * as builder from '../vendors/builder.js';
import floatingMessage from "./floatingMessage.js";

export default class Logsign extends builder.Component {
    #type;
    parent;
    constructor(type=null, path=null, parent=null) {
        super();
        this.#type = type;
        this.path = path;
        this.parent = parent;
        this.create()
    }

    #createLanguageMenu()
    {
        let french = {value: 'fr',  text:"Fr"},
            english = {value: 'en',  text:"En"},
            arabic = {value: 'ar',  text:"ع"};

        return [french, english, arabic]
    }

    #langDropdownAdapter(item)
    {
        let lang = builder.label('languagesMenu', item.text),
            container = builder.block(null, 'dropDownItem', [lang]);

        if (builder.isArabic(item.text))
            lang.style.direction = 'rtl';

        container.setAttribute('itemValue', item.value);
        return container;
    }


    #iconField(fieldIcon, fieldHint, fieldType, instructions=[], className='', condition= undefined)
    {
        let icon = builder.button(null, 'v_fieldIcon_L', null, fieldIcon),
            field = builder.textBox(null, fieldHint, fieldType, 'v_iconedfield'),
            alertIcon = builder.button(null, 'v_fieldIcon_R invisible', null, '<i class="ri-alarm-warning-line"></i>'),
            container = builder.block(null, "v_iconField "+className, [icon, field, alertIcon]);

        if (instructions.length > 0)
        {
            let list = builder.block(null, 'v_logsign_instructions', [builder.list(instructions, 'v_instructions_list')])
            container.append(list)
        }
        field.setAttribute("required",'')
        if (condition !== undefined)
            field.setAttribute("condition", condition)
        return container;
    }

    #buildConditionsObject()
    {
        let conditions = {};

        conditions.email = (field)=>{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(field.value.toLowerCase());
        }

        conditions.password = (field)=>{
            const passwordRegex = /^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[!@#$%^&*(),.?":{}|<>]){2})[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
            return passwordRegex.test(field.value);
        }

        return conditions
    }

    #extractIconedFieldValue(field)
    {
        return field.getElementsByClassName('v_iconedfield')[0].value
    }

    create() {
        let logo = builder.heading(1, 'v_logo', "Vicles"),
            language = new builder.Dropdown(null, 'v_langs_menu', '<i class="ri-earth-line"></i>', this.#createLanguageMenu(), this.#langDropdownAdapter),
            header = builder.block(null, 'v_login_head', []),
            returnButton = builder.button(null, 'v_signup_return', null, '<i class="ri-arrow-left-line"></i>'),
            returnContainer = builder.block(null, 'v_signup_return_container', [returnButton]),
            title = builder.heading(2, 'v_heading v_home_login_container_pos1', "Bievenue"),
            connect = builder.heading(1, 'v_heading v_home_login_container_pos2', "Connectez vous"),
            agencyName = this.#iconField('<i class="ri-font-size"></i>', 'Raison sociale', 'text', ['Ce champ est obligatoire.'],'v_login_agency_name'),
            RC = this.#iconField('<i class="ri-registered-line"></i>', 'Registre de commerce', 'text', ['Ce champ est obligatoire.'], 'v_login_rc'),
            email = this.#iconField('<i class="ri-at-line"></i>', 'Adresse mail', 'email', ['Ce champ est obligatoire.', "L'email doit être valide", "Jamais utilisée sur Vicles"], 'v_login_email', 'email'),
            password = this.#iconField('<i class="ri-key-2-line"></i>', 'Mot de passe', 'password', ['Ce champ est obligatoire.', "Au moin 8 caractères", '2 symbole', '2 alphabet majiscule', '2 numéro'], 'v_login_password', 'password'),
            address = this.#iconField('<i class="ri-map-pin-2-line"></i>', 'Adresse', 'text', ['Ce champ est obligatoire.'], 'v_login_address'),
            keepMeSignedin_checkbox = builder.textBox(null, '', 'checkbox', 'v_checkbox'),
            keepMeSignedin_text = builder.label('v_default_text', 'Se Souvenir de moi'),
            keepMeSignedin = builder.block(null, 'v_keepmeSignedin', [keepMeSignedin_checkbox, keepMeSignedin_text]),
            termsOfUse_checkbox = builder.textBox(null, '', 'checkbox', 'v_checkbox'),
            terms = builder.toRoute('/terms', "conditions d'utilisation", null, null, 'v_default_text v_size_2 v_text_align_center v_pointer'),
            termsOfUse_text = builder.label('v_default_text', "J'accepte toutes les "),
            termsOfUse = builder.block(null, 'v_keepmeSignedin', [termsOfUse_checkbox, termsOfUse_text]),
            connecetButton = builder.button(null, 'v_medium_button orange', 'Connecter', null),
            orLabel = builder.label('v_home_or_label', 'OR'),
            createButton = builder.button(null, 'v_medium_button blue', 'Créer un compte'),
            login_block = builder.block(null, 'v_login_block', []),
            login_block_container = builder.block(null, 'v_login_block_container', [title, connect, login_block]),
            version = builder.label('v_default_text v_size_2 v_text_align_center', 'ver: 1.0.0'),
            about = builder.toRoute('/about', 'À propos', null, null, 'v_default_text v_size_2 v_text_align_center v_pointer'),
            register = builder.toRoute('/register', '', null, null, ''),
            contact = builder.toRoute('/contact', 'Contactez-nous', null, null, 'v_default_text v_size_2 v_text_align_center v_pointer'),
            privacy = builder.toRoute('/privacy', 'Confidentialité', null, null, 'v_default_text v_size_2 v_text_align_center v_pointer'),
            conditions = builder.toRoute('/terms', 'Conditions', null, null, 'v_default_text v_size_2 v_text_align_center v_pointer'),
            footer = builder.block(null, 'v_home_footer', []),
            componentClass;

        email.onclick = ()=>{
            email.getElementsByClassName("v_iconedfield")[0].click()
        }
        termsOfUse_text.append(terms)
        password.onclick = ()=>{
            password.getElementsByClassName("v_iconedfield")[0].click()
        }
        if (this.#type === 'Register'){
            login_block_container.insertBefore(returnContainer, title)
            title.textContent = "Bon choix!"
            title.className = "v_heading v_home_signup_container_pos1"
            connect.textContent = "Créez un compte"
            connect.className = "v_heading v_home_signup_container_pos2"
            createButton.textContent = "Créer"
            login_block.className = "Signup_block"
            login_block.append(agencyName, RC, email, password, address, termsOfUse, createButton)
            componentClass = 'v_mutable_panel_register'
            termsOfUse_checkbox.setAttribute('required', '')
            const validator = new builder.Validator(login_block, (i, t)=>{
                if (t !== 'checkbox')
                {
                    const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
                    target.className = target.className.replace('invisible', 'red')
                }
                else
                    i.parentNode.className += " circle_over_danger"
            }, (i, t)=>{
                if (t !== 'checkbox')
                {
                    const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
                    target.className = target.className.replace('red', 'invisible')
                }
                else
                    i.parentNode.className = "v_keepmeSignedin"
            }, false, this.#buildConditionsObject());
            const fm_welcome = new floatingMessage('assets/welcome_1.jpg', 'Compte créé avec succés', 'Un email de confirmation vous a été envoyé à votre boite mail', 'OK!', (p)=>{
                p.parentNode.removeChild(p)
            })
            const fm_oops = new floatingMessage('assets/oops.jpg', 'Agence existe déja', "L'une des données utilisées (email, RC, raison sociale) pour créer le compte est déja utilisée par une autre agence.", 'OK!', (p)=>{
                p.parentNode.removeChild(p)
            })
            createButton.onclick = ()=>{
                if (validator.validate())
                {
                    let fd = new FormData();

                    fd.append('name', this.#extractIconedFieldValue(agencyName))
                    fd.append('rc', this.#extractIconedFieldValue(RC))
                    fd.append('email', this.#extractIconedFieldValue(email).toLowerCase())
                    fd.append('password', this.#extractIconedFieldValue(password))
                    fd.append('address', this.#extractIconedFieldValue(address))

                    new builder.brdige('/agency/create', 'POST', fd, (data)=>{
                        const res = JSON.parse(data)
                        if (res.code === 0)
                        {
                            history.back()
                            builder.app.append(fm_welcome.getHTML())
                        }
                        else if (res.code === 1)
                            builder.app.append(fm_oops.getHTML())
                    },()=>{})
                }
            }
            returnButton.onclick = ()=>{
                history.back()
            }
        }
        else
        {
            let email = this.#iconField('<i class="ri-at-line"></i>', 'Adresse mail', 'email', ['Ce champ est obligatoire.'], 'v_login_email', 'email'),
                passw = this.#iconField('<i class="ri-key-2-line"></i>', 'Mot de passe', 'password', ['Ce champ est obligatoire.'], 'v_login_password');
            login_block.append(email, passw, keepMeSignedin, connecetButton, orLabel, createButton)
            footer.append(version, about, contact, privacy, conditions)
            header.append(logo)

            createButton.onclick = ()=>{
                register.click()
            }
            componentClass = 'v_mutable_panel'
            const validator = new builder.Validator(login_block, (i, t)=>{
                // i.parentNode.getElementsByClassName('invisible')[0].className.replace('invisible', 'red')
                const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
                target.className = target.className.replace('invisible', 'red')
            }, (i, t)=>{
                // i.parentNode.getElementsByClassName('invisible')[0].className.replace('invisible', 'red')
                const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
                target.className = target.className.replace('red', 'invisible')
            }, false, this.#buildConditionsObject());
            connecetButton.onclick = ()=>{
                if (validator.validate())
                {
                    let fd = new FormData();

                    fd.append('email', this.#extractIconedFieldValue(email).toLowerCase())
                    fd.append('password', this.#extractIconedFieldValue(passw))

                    const fm_oops = new floatingMessage('assets/oops.jpg', 'Données erronées', "Email ou mot de passe incorrecte", 'OK!', (p)=>{
                        p.parentNode.removeChild(p)
                    })

                    new builder.brdige('/agency/login', 'GET', fd, (data)=>{
                        const res = JSON.parse(data)
                        if (res.hasOwnProperty('code'))
                            builder.app.append(fm_oops.getHTML())
                        else
                        {
                            builder.prefs.add('user', JSON.stringify(res))
                            this.parent.rerender()

                        }
                    },()=>{})
                }
            }
        }

        language.onChange = (value)=>{
            let prefs = new builder.Preferences();

            prefs.add('language', value)
            this.parent.rerender();
        }

        language.setValue(builder.prefs.get("language"))
        this.component = builder.block(null, componentClass, [header, login_block_container, footer]);
    }
}