(self.webpackChunkvicles=self.webpackChunkvicles||[]).push([[792],{8772:(e,t,n)=>{"use strict";var i=n(8919);class s extends i.uA{#e;#t;#n;#i;#s;constructor(e,t,n,i,s){super(),this.#e=e,this.#t=t,this.#n=n,this.#i=i,this.#s=s,this.create()}create(){let e=i.Sl(null,"v_floatingMessage_image",this.#e),t=i.Pf("v_infoTitle",this.#t),n=i.Pf("v_infoMessage",this.#n),s=i.x6(null,"v_infoButton",this.#i,null),l=i.om(null,"v_floatingMessage_text_container",[t,n,s]);s.onclick=()=>{this.#s(this.component)},this.component=i.om(null,"v_floatingMessage",[e,l])}}class l extends i.uA{#l;parent;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;super(),this.#l=e,this.path=t,this.parent=n,this.create()}#a(){return[{value:"fr",text:"Fr"},{value:"en",text:"En"},{value:"ar",text:"ع"}]}#o(e){let t=i.Pf("languagesMenu",e.text),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(t.style.direction="rtl"),n.setAttribute("itemValue",e.value),n}#r(e,t,n){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:void 0,o=i.x6(null,"v_fieldIcon_L",null,e),r=i.DU(null,t,n,"v_iconedfield"),c=i.x6(null,"v_fieldIcon_R invisible",null,'<i class="ri-alarm-warning-line"></i>'),u=i.om(null,"v_iconField "+l,[o,r,c]);if(s.length>0){let e=i.om(null,"v_logsign_instructions",[i.p_(s,"v_instructions_list")]);u.append(e)}return r.setAttribute("required",""),void 0!==a&&r.setAttribute("condition",a),u}#c(){let e={email:e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.value.toLowerCase()),password:e=>/^(?=(.*[A-Z]){2})(?=(.*\d){2})(?=(.*[!@#$%^&*(),.?":{}|<>]){2})[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(e.value)};return e}#u(e){return e.getElementsByClassName("v_iconedfield")[0].value}create(){let e,t=i.R_(1,"v_logo","Vicles"),n=new i.ms(null,"v_langs_menu",'<i class="ri-earth-line"></i>',this.#a(),this.#o),l=i.om(null,"v_login_head",[]),a=i.x6(null,"v_signup_return",null,'<i class="ri-arrow-left-line"></i>'),o=i.om(null,"v_signup_return_container",[a]),r=i.R_(2,"v_heading v_home_login_container_pos1","Bievenue"),c=i.R_(1,"v_heading v_home_login_container_pos2","Connectez vous"),u=this.#r('<i class="ri-font-size"></i>',"Raison sociale","text",["Ce champ est obligatoire."],"v_login_agency_name"),d=this.#r('<i class="ri-registered-line"></i>',"Registre de commerce","text",["Ce champ est obligatoire."],"v_login_rc"),p=this.#r('<i class="ri-at-line"></i>',"Adresse mail","email",["Ce champ est obligatoire.","L'email doit être valide","Jamais utilisée sur Vicles"],"v_login_email","email"),h=this.#r('<i class="ri-key-2-line"></i>',"Mot de passe","password",["Ce champ est obligatoire.","Au moin 8 caractères","2 symbole","2 alphabet majiscule","2 numéro"],"v_login_password","password"),_=this.#r('<i class="ri-map-pin-2-line"></i>',"Adresse","text",["Ce champ est obligatoire."],"v_login_address"),m=i.DU(null,"","checkbox","v_checkbox"),v=i.Pf("v_default_text","Se Souvenir de moi"),g=i.om(null,"v_keepmeSignedin",[m,v]),f=i.DU(null,"","checkbox","v_checkbox"),b=i.P7("/terms","conditions d'utilisation",null,null,"v_default_text v_size_2 v_text_align_center v_pointer"),w=i.Pf("v_default_text","J'accepte toutes les "),x=i.om(null,"v_keepmeSignedin",[f,w]),y=i.x6(null,"v_medium_button orange","Connecter",null),C=i.Pf("v_home_or_label","OR"),L=i.x6(null,"v_medium_button blue","Créer un compte"),N=i.om(null,"v_login_block",[]),k=i.om(null,"v_login_block_container",[r,c,N]),A=i.Pf("v_default_text v_size_2 v_text_align_center","ver: 1.0.0"),I=i.P7("/about","À propos",null,null,"v_default_text v_size_2 v_text_align_center v_pointer"),T=i.P7("/register","",null,null,""),P=i.P7("/contact","Contactez-nous",null,null,"v_default_text v_size_2 v_text_align_center v_pointer"),S=i.P7("/privacy","Confidentialité",null,null,"v_default_text v_size_2 v_text_align_center v_pointer"),E=i.P7("/terms","Conditions",null,null,"v_default_text v_size_2 v_text_align_center v_pointer"),M=i.om(null,"v_home_footer",[]);if(p.onclick=()=>{p.getElementsByClassName("v_iconedfield")[0].click()},w.append(b),h.onclick=()=>{h.getElementsByClassName("v_iconedfield")[0].click()},"Register"===this.#l){k.insertBefore(o,r),r.textContent="Bon choix!",r.className="v_heading v_home_signup_container_pos1",c.textContent="Créez un compte",c.className="v_heading v_home_signup_container_pos2",L.textContent="Créer",N.className="Signup_block",N.append(u,d,p,h,_,x,L),e="v_mutable_panel_register",f.setAttribute("required","");const t=new i.Dr(N,((e,t)=>{if("checkbox"!==t){const t=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];t.className=t.className.replace("invisible","red")}else e.parentNode.className+=" circle_over_danger"}),((e,t)=>{if("checkbox"!==t){const t=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];t.className=t.className.replace("red","invisible")}else e.parentNode.className="v_keepmeSignedin"}),!1,this.#c()),n=new s("/assets/welcome_1.webp","Compte créé avec succés","Un email de confirmation vous a été envoyé à votre boite mail","OK!",(e=>{e.parentNode.removeChild(e)})),l=new s("/assets/oops.webp","Agence existe déja","L'une des données utilisées (email, RC, raison sociale) pour créer le compte est déja utilisée par une autre agence.","OK!",(e=>{e.parentNode.removeChild(e)}));L.onclick=()=>{if(t.validate()){let e=new FormData;e.append("name",this.#u(u)),e.append("rc",this.#u(d)),e.append("email",this.#u(p).toLowerCase()),e.append("password",this.#u(h)),e.append("address",this.#u(_)),new i.WL("/agency/create","POST",e,(e=>{const t=JSON.parse(e);0===t.code?(history.back(),i.yA.append(n.getHTML())):1===t.code&&i.yA.append(l.getHTML())}),(()=>{}))}},a.onclick=()=>{history.back()}}else{let n=this.#r('<i class="ri-at-line"></i>',"Adresse mail","email",["Ce champ est obligatoire."],"v_login_email","email"),a=this.#r('<i class="ri-key-2-line"></i>',"Mot de passe","password",["Ce champ est obligatoire."],"v_login_password");N.append(n,a,g,y,C,L),M.append(A,I,P,S,E),l.append(t),L.onclick=()=>{T.click()},e="v_mutable_panel";const o=new i.Dr(N,((e,t)=>{const n=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];n.className=n.className.replace("invisible","red")}),((e,t)=>{const n=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];n.className=n.className.replace("red","invisible")}),!1,this.#c());y.onclick=async()=>{if(o.validate()){let e=new FormData;e.append("email",this.#u(n).toLowerCase()),e.append("password",this.#u(a)),e.append("fingerprint",await i.$A());const t=new s("/assets/oops.webp","Données erronées","Email ou mot de passe incorrecte","OK!",(e=>{e.parentNode.removeChild(e)}));new i.WL("/agency/login","GET",e,(e=>{const n=JSON.parse(e);n.hasOwnProperty("code")?i.yA.append(t.getHTML()):(i.N_.add("user",JSON.stringify(n)),this.parent.rerender())}),(()=>{}))}}}n.onChange=e=>{(new i.pm).add("language",e),this.parent.rerender()},n.setValue(i.N_.get("language")),this.component=i.om(null,e,[l,k,M])}}class a extends i.uA{constructor(e){super(),this.path="/",this.implementationPoint=e,this.create()}create(){let e=i.R_(1,"","Statistics");this.component=i.om(null,"v_vicles_activity",[e])}}class o extends i.uA{icon;id;styleClass;text;onclick;constructor(e,t,n,i,s){super(),this.icon=n,this.id=e,this.styleClass=t,this.text=i,this.onclick=s,this.create()}create(){const e=i.x6(null,"v_iconedButton_icon",null,this.icon),t=i.Pf("v_iconedButton",this.text);this.component=i.om(this.id,this.styleClass,[e,t])}}class r extends i.uA{fieldIcon;fieldHint;fieldType;instructions;className;condition;#d;constructor(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:void 0;super(),this.fieldIcon=e,this.fieldHint=t,this.fieldType=n,this.instructions=i,this.className=s,this.concondition=l,this.#d,this.create()}create(){let e=i.x6(null,"v_fieldIcon_L",null,this.fieldIcon),t=i.DU(null,this.fieldHint,this.fieldType,"v_iconedfield"),n=i.x6(null,"v_fieldIcon_R invisible",null,'<i class="ri-alarm-warning-line"></i>'),s=i.om(null,"v_iconField "+this.className,[e,t,n]);if(this.instructions.length>0){let e=i.om(null,"v_logsign_instructions",[i.p_(this.instructions,"v_instructions_list")]);s.append(e)}t.setAttribute("required",""),void 0!==this.condition&&t.setAttribute("condition",this.condition),this.#d=t,this.component=s}getValue(){return this.#d.value}}class c extends i.uA{#t;#p;#h;appZone;constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";super(),this.#p=e,this.#t=t,this.#h=n,this.create()}create(){let e=i.x6(null,"v_vicles_window_icon",null,this.#p),t=i.Pf("v_vicles_window_title",this.#t),n=i.x6(null,"v_vicles_window_close",null,'<i class="ri-close-circle-line"></i>'),s=i.om(null,"v_vicles_window_titlebar",[e,t,n]),l=i.om(null,"v_vicles_window_zone",[]),a=i.om(null,"v_vicles_window "+this.#h,[s,l]),o=i.om(null,"v_vicles_window_background",[]);this.appZone=l,this.component=i.om(null,"v_vicles_window_platform",[o,a]),o.onclick=()=>{history.back()},n.onclick=()=>{history.back()}}}class u extends i.uA{message;status;duration;parent;constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:i.yA;super(),this.message=e,this.status=n,this.duration=t,this.parent=s,this.create()}create(){this.component=i.om(null,"vicles_toast "+this.status,[i.Pf("vicles_toast_message",this.message)])}show(){this.parent.appendChild(this.component),setTimeout((()=>{this.hide()}),this.duration)}hide(){this.parent.removeChild(this.component)}}class d extends i.uA{constructor(){super(),this.create()}create(){this.component=i.om(null,"waitScreen",[i.om(null,"waitScreen_content",[])])}}class p extends i.uA{#_;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"create",t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;super(),"create"===e?this.path="/add":"edit"===e&&(this.path="/edit"),this.#_=n,this.implementationPoint=t,this.create()}#c(){let e={plate:e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.value.toLowerCase())};return e}create(){let e=new c('<i class="ri-add-large-line"></i>',"Ajouter une voiture","v_vicles_carInfo"),t=i.om(null,"v_vicles_car_brand_model_container",[]),n=new r('<i class="ri-hashtag"></i>',"Matricule","text",[],"v_vicles_carInfo_inputs"),s=new r('<i class="ri-calendar-schedule-line"></i>',"Année du model","number",[],"v_vicles_carInfo_inputs"),l=new r('<i class="ri-money-dollar-circle-line"></i>',"Prix par jour","number",[],"v_vicles_carInfo_inputs"),a=new r('<i class="ri-sofa-line"></i>',"Nombre de places","number",[],"v_vicles_carInfo_inputs"),o=new r('<i class="ri-speed-up-fill"></i>',"Kilométrage","number",[],"v_vicles_carInfo_inputs"),p=new r('<i class="ri-luggage-deposit-line"></i>',"Volume du  coffre","number",[],"v_vicles_carInfo_inputs"),h=new i.ms(null,"v_vicles_fields",'<i class="ri-arrow-drop-down-line"></i>',[{id:"-1",name:"Boite à vitesse"},{id:"2",name:"Automatique"},{id:"1",name:"Manuelle"}],(e=>{let t=i.Pf("v_vicles_dropdown",e.name),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(lang.style.direction="rtl"),n.setAttribute("itemValue",e.id),n})),_=new i.ms(null,"v_vicles_fields",'<i class="ri-arrow-drop-down-line"></i>',[{id:"-1",name:"Climatisation"},{id:"0",name:"OUI"},{id:"1",name:"NON"}],(e=>{let t=i.Pf("v_vicles_dropdown",e.name),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(lang.style.direction="rtl"),n.setAttribute("itemValue",e.id),n})),m=i.om(null,"v_vicles_car_brand_model_container",[h.getHTML(),_.getHTML()]),v=new i.ms(null,"v_vicles_fields",'<i class="ri-arrow-drop-down-line"></i>',[{id:"-1",name:"Carburant"},{id:"1",name:"Diesel"},{id:"2",name:"Essence"},{id:"3",name:"Hybride"},{id:"4",name:"Electrique"}],(e=>{let t=i.Pf("v_vicles_dropdown",e.name),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(lang.style.direction="rtl"),n.setAttribute("itemValue",e.id),n})),g=i.om(null,"v_vicles_car_brand_model_container",[v.getHTML()]),f=i.om(null,"v_vicles_carInfo_left",[t,n.getHTML(),s.getHTML(),l.getHTML(),a.getHTML(),o.getHTML(),p.getHTML(),m,g]),b=i.om(null,"v_vicles_car_drop_images",[i.x6(null,"v_vicles_drop_image_icon",null,'<i class="ri-image-add-line"></i>'),i.Pf("v_vicles_drop_image_text","Déposez ou cliquez pour télécharger l'image de couverture","v_vicles_drop_image_text")]),w=i.DU(null,"Déposez ou cliquez pour télécharger l'image de couverture","file","v_vicles_drop_file_input"),x=i.om(null,"v_vicles_car_small_images",[i.x6(null,"v_vicles_drop_image_icon",null,'<i class="ri-image-add-line"></i>')]),y=i.om(null,"v_vicles_car_small_miniature",[]),C=i.om(null,"v_vicles_car_small_miniature",[]),L=i.DU(null,"Déposez ou cliquez pour télécharger l'image de couverture","file","v_vicles_drop_file_input"),N=i.om(null,"v_vicles_car_scrollable_images",[x,y,C,L]),k=i.x6(null,"v_small_button_main","Ajouter",null),A=i.x6(null,"v_small_button_black","Annuler",null),I=i.om(null,"v_vicles_carInfo_buttons",[k,A]),T=i.om(null,"v_vicles_carInfo_right",[b,w,N,I]),P=e.appZone,S=-1,E=-1,M=-1,D=-1,R=null,V=[];function H(e){if(e&&e.type.startsWith("image/")){const t=new FileReader;t.onload=e=>{b.innerHTML=`<img src="${e.target.result}" alt="Cover image" class="v_vicles_drop_image_cover_image">`,R=e.target.result},t.readAsDataURL(e)}else b.classList.add("circle_over_danger")}L.setAttribute("multiple",""),b.addEventListener("click",(()=>w.click())),N.addEventListener("click",(()=>L.click())),L.addEventListener("change",(e=>{if(0!==e.target.files.length){V=[],N.innerHTML="";for(const t of e.target.files){const e=new FileReader;e.onload=e=>{const t=i.Sl(null,"v_vicles_car_small_miniature",e.target.result);V.push(e.target.result),N.append(t)},e.readAsDataURL(t)}}else x.classList.add("circle_over_danger")})),b.addEventListener("dragover",(e=>{e.preventDefault(),b.classList.add("dragover")})),b.addEventListener("dragleave",(()=>{b.classList.remove("dragover")})),b.addEventListener("drop",(e=>{e.preventDefault(),b.classList.remove("dragover"),H(e.dataTransfer.files[0])})),w.addEventListener("change",(e=>{H(e.target.files[0])})),A.onclick=()=>{history.back()};const O=new i.Dr(f,((e,t)=>{const n=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];n.className=n.className.replace("invisible","red")}),((e,t)=>{const n=e.parentNode.getElementsByClassName("v_fieldIcon_R")[0];n.className=n.className.replace("red","invisible")}),!1,this.#c());k.onclick=()=>{let e=!0;if(x.classList.remove("circle_over_danger"),0===w.files.length?(b.classList.add("circle_over_danger"),e=!1):b.classList.remove("circle_over_danger"),-1===S?(t.childNodes.forEach((e=>{e.classList.add("circle_over_danger")})),e=!1):t.childNodes.forEach((e=>{e.classList.remove("circle_over_danger")})),-1===D?(h.getHTML().classList.add("circle_over_danger"),e=!1):h.getHTML().classList.remove("circle_over_danger"),-1===E?(_.getHTML().classList.add("circle_over_danger"),e=!1):_.getHTML().classList.remove("circle_over_danger"),-1===M?(v.getHTML().classList.add("circle_over_danger"),e=!1):v.getHTML().classList.remove("circle_over_danger"),O.validate()||(e=!1),e){const e=new FormData;e.append("cover",R),e.append("images",JSON.stringify(V)),e.append("model",parseInt(S)),e.append("gear",parseInt(D)),e.append("ac",parseInt(E)),e.append("fuel",parseInt(M)),e.append("price",parseFloat(l.getValue())),e.append("miles",parseInt(o.getValue())),e.append("trunc",parseInt(p.getValue())),e.append("plate",n.getValue()),e.append("model_year",parseInt(s.getValue())),e.append("seats",parseInt(a.getValue())),e.append("agency",JSON.parse(i.N_.get("user")).id),i.WL("/agency/addCar","POST",e,(e=>{if(e.hasOwnProperty("code")&&-1===e.code){history.back(),this.rerender();new u("Erreur lors de l'ajout de la voiture",3e3,"error_toast").show()}else{history.back(),this.rerender();const e=new u("Voiture ajoutée avec succès",3e3,"success_toast");this.connectedComponents[0].rerender(),e.show()}}),(()=>{}))}else{new u("Tous les champs sont obligatoires",3e3,"warning_toast").show()}},i.WL("/agency/brands","GET",new FormData,(e=>{e=JSON.parse(e);const n=new i.ms(null,"v_vicles_fields",'<i class="ri-arrow-drop-down-line"></i>',[{id:"-1",name:"Sélectionner une marque"},...e],(e=>{let t=i.Pf("v_vicles_dropdown",e.name),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(lang.style.direction="rtl"),n.setAttribute("itemValue",e.id),n})),s=new i.ms(null,"v_vicles_fields",'<i class="ri-arrow-drop-down-line"></i>',[{id:"-1",name:"Sélectionner un model"}],(e=>{let t=i.Pf("v_vicles_dropdown",e.name),n=i.om(null,"dropDownItem",[t]);return i.VQ(e.text)&&(lang.style.direction="rtl"),n.setAttribute("itemValue",e.id),n}));t.append(n.getHTML(),s.getHTML()),s.onChange=(e,t)=>{S=parseInt(e)},n.onChange=(e,t)=>{if("-1"===e)return s.updateItems([{id:"-1",name:"Sélectionner un model"}]),s.onChange=(e,t)=>{},S=-1,!1;const n=new FormData;n.append("brand",parseInt(e)),i.WL("/agency/models","GET",n,(e=>{e=JSON.parse(e),s.updateItems([{id:"-1",name:"Sélectionner un model"},...e]),s.onChange=e=>{S=parseInt(e)}}),(()=>{}))},P.innerHTML="",P.append(f,T)}),(()=>{})),_.onChange=e=>{E=parseInt(e)},h.onChange=e=>{D=parseInt(e)},v.onChange=e=>{M=parseInt(e)},P.append((new d).getHTML()),this.component=e.getHTML()}}class h extends i.uA{#_;constructor(e){super(),this.#_=e,this.create()}create(){let e=i.x6(null,"vicles_car_button",null,'<i class="ri-delete-bin-line"></i>'),t=i.x6(null,"vicles_car_button",null,'<i class="ri-edit-box-line"></i>'),n=i.om(null,"vicles_car_toolBar",[e,t]),s=i.Sl(null,"vicles_car_image",this.#_.cover);this.component=i.om(null,"vicles_car",[s,n])}}class _ extends i.uA{constructor(){super(),this.create()}#m(e){const t=[];for(const n of e)t.push(new h(n).getHTML());return console.log(t),t}create(){let e=new d,t=i.Pf("empty_message","Aucune voiture trouvée dans cette agence"),n=new FormData;const s=JSON.parse(i.N_.get("user"));n.append("agency",s.id),this.component=i.om(null,"carFactoryInitial",[e.getHTML()]),i.WL("/agency/getAllCars","GET",n,(e=>{e=JSON.parse(e),console.log(e),!e.hasOwnProperty("code")||3!=e.code&&-1!=e.code?(this.component.innerHTML="",this.component.className="carFactoryGrid",this.component.append(...this.#m(e))):(this.component.innerHTML="",this.component.appendChild(t))}),(()=>{}))}}class m extends i.uA{#v;constructor(e){super(),this.implementationPoint=e,this.path="/parking",this.#v=new p("create",e),this.addSubroute(this.#v),this.create()}create(){let e=new r('<i class="ri-search-2-line"></i>',"Recherche","text",[],"v_parking_search"),t=new o(null,"v_parking_regular_btn v_parking_pos1",'<i class="ri-filter-2-line"></i>',"Filtrer",(()=>{})),n=new o(null,"v_parking_regular_btn v_parking_pos2",'<i class="ri-import-line"></i>',"Importer",(()=>{})),s=new o(null,"v_parking_regular_btn v_parking_pos3",'<i class="ri-export-line"></i>',"Exporter",(()=>{})),l=new o(null,"v_parking_main_btn v_parking_pos4",'<i class="ri-add-large-line"></i>',"Ajouter",(()=>{})),a=i.P7("/parking/add","add"),c=i.om(null,"v_parking_controls_buttons",[t.getHTML(),n.getHTML(),s.getHTML(),l.getHTML()]),u=i.om(null,"v_parking_controls",[e.getHTML(),c]),d=new _;this.#v.connectedComponents.push(d),l.getHTML().onclick=()=>{a.click()},this.component=i.om(null,"v_vicles_activity",[u,d.getHTML()])}}class v extends i.uA{constructor(e){super(),this.implementationPoint=e,this.path="/history",this.create()}create(){let e=i.R_(1,"","History");this.component=i.om(null,"v_vicles_activity",[e])}}class g extends i.uA{constructor(e){super(),this.implementationPoint=e,this.path="/staff",this.create()}create(){let e=i.R_(1,"","Staff");this.component=i.om(null,"v_vicles_activity",[e])}}class f extends i.uA{constructor(e){super(),this.implementationPoint=e,this.path="/settings",this.create()}create(){let e=i.R_(1,"","Settings");this.component=i.om(null,"v_vicles_activity",[e])}}class b extends i.uA{#g;active_tab;constructor(e){super(),this.#g=e,this.path="/",this.active_tab=null,this.create()}#f(e,t,n,i,s,l){location.pathname.includes("/parking")?(this.active_tab&&this.active_tab.classList.remove("v_active_tab"),t.className+=" v_active_tab",this.active_tab=t,l.textContent="Parking"):location.pathname.includes("/staff")?(this.active_tab&&this.active_tab.classList.remove("v_active_tab"),n.className+=" v_active_tab",this.active_tab=n,l.textContent="Personnel"):location.pathname.includes("/history")?(this.active_tab&&this.active_tab.classList.remove("v_active_tab"),i.className+=" v_active_tab",this.active_tab=i,l.textContent="Historique"):location.pathname.includes("/settings")?(this.active_tab&&this.active_tab.classList.remove("v_active_tab"),s.className+=" v_active_tab",this.active_tab=s,l.textContent="Paramètres"):(this.active_tab&&this.active_tab.classList.remove("v_active_tab"),e.className+=" v_active_tab",this.active_tab=e,l.textContent="Statistiques")}#b(e,t){let n=i.x6(null,"v_vicles_activity_navigation v_stats",null,'<i class="ri-file-chart-line"></i>'),s=i.x6(null,"v_vicles_activity_navigation v_park",null,'<i class="ri-parking-box-line"></i>'),l=i.x6(null,"v_vicles_activity_navigation v_staff",null,'<i class="ri-group-3-line"></i>'),a=i.x6(null,"v_vicles_activity_navigation v_hist",null,'<i class="ri-history-fill"></i>'),o=i.x6(null,"v_vicles_activity_navigation v_settings",null,'<i class="ri-settings-2-line"></i>'),r=i.x6(null,"v_vicles_activity_navigation v_logout",null,'<i class="ri-logout-circle-line"></i>');return setInterval((()=>{this.#f(n,s,l,a,o,e)}),60),this.#f(n,s,l,a,o,e),n.onclick=()=>{this.active_tab!==n&&(i.QB.push("/"),n.className+=" v_active_tab",this.active_tab.classList.remove("v_active_tab"),this.active_tab=n,e.textContent="Statistiques")},s.onclick=()=>{this.active_tab!==s&&(i.QB.push("/parking"),s.className+=" v_active_tab",this.active_tab.classList.remove("v_active_tab"),this.active_tab=s,e.textContent="Parking")},l.onclick=()=>{this.active_tab!==l&&(i.QB.push("/staff"),l.className+=" v_active_tab",this.active_tab.classList.remove("v_active_tab"),this.active_tab=l,e.textContent="Personnel")},a.onclick=()=>{this.active_tab!==a&&(i.QB.push("/history"),a.className+=" v_active_tab",this.active_tab.classList.remove("v_active_tab"),this.active_tab=a,e.textContent="Historique")},o.onclick=()=>{this.active_tab!==o&&(i.QB.push("/settings"),o.className+=" v_active_tab",this.active_tab.classList.remove("v_active_tab"),this.active_tab=o,e.textContent="Paramètres")},r.onclick=()=>{i.N_.delete("user"),i.QB.push("/"),this.#g.rerender()},[n,s,l,a,o,r]}create(){const e=i.R_(1,"v_vicles_logo","Vicles"),t=i.Pf("v_vicles_title",""),n=i.x6(null,"v_vicles_notifs",null,'<i class="ri-notification-3-line"></i>'),s=i.Sl(null,"v_vicles_agency_logo",""),l=i.om(null,"v_vicles_header",[e,t,n,s]),o=i.om(null,"v_vicles_activity_container",[]),r=this.#b(t,o),c=i.om(null,"v_vicles_navbar",r);i.N_.get("user").logo?s.src=i.N_.get("user").logo:s.src="/assets/tmp_logo.webp",this.component=i.om(null,"v_vicles_app",[l,c,o]),this.addSubroute(new a(o)),this.addSubroute(new m(o)),this.addSubroute(new v(o)),this.addSubroute(new g(o)),this.addSubroute(new f(o))}}class w extends i.uA{constructor(){super(),this.create()}create(){const e=i.R_(1,"v_logo v_spalsh_animation","Vicles");this.component=i.om(null,"v_splash",[e])}}class x extends i.uA{onReady;constructor(){super(),this.onReady=void 0,this.create()}async#w(e,t,n){const s=await i.$A(),l=i.N_.get("user"),a=n();if(null===l)i.yA.removeChild(a),t();else{let n=new FormData;n.append("fingerprint",s),new i.WL("/agency/checkauth","GET",n,(n=>{JSON.parse(n).hasOwnProperty("code")?(i.yA.removeChild(a),t()):(i.yA.removeChild(a),e())}),(()=>{}))}}create(){this.#w((()=>{const e=new b(this);this.subroutes=e.subroutes,this.path=e.path,this.component=e.component,void 0!==this.onReady&&this.onReady()}),(()=>{const e=new l("Login","/",this),t=i.Sl(null,"v_login_image","/assets/bg2.webp");this.addSubroute(new l("Register","/register")),this.path=e.path,this.component=i.om(null,"v_home",[t,e.getHTML()]),void 0!==this.onReady&&this.onReady()}),(()=>{const e=new w;return i.yA.append(e.getHTML()),e.getHTML()}))}}class y extends i.uA{constructor(){super(),this.create()}create(){let e=i.Sl(null,"v_404_image","/assets/404.svg"),t=i.Pf("v_404_message","Vous êtes perdu dans l'univers de Vicles"),n=i.x6(null,"v_404_back","Retournez à la terre");n.onclick=()=>{i.QB.push("/")},this.component=i.om(null,"v_404_page",[e,t,n])}}n.e(217).then(n.bind(n,4217)),i.LK((()=>{let e=new x,t=new y;e.onReady=()=>{new i.QB(e,t).watch()}}))},8919:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$A:()=>Fingerprint,DU:()=>textBox,Dr:()=>Validator,LK:()=>entrypoit,N_:()=>prefs,P7:()=>toRoute,Pf:()=>label,QB:()=>router,R_:()=>heading,Sl:()=>image,VQ:()=>isArabic,WL:()=>brdige,ms:()=>Dropdown,om:()=>block,p_:()=>list,pm:()=>Preferences,uA:()=>Component,x6:()=>button,yA:()=>app});var _babel_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6416),_babel_core__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_core__WEBPACK_IMPORTED_MODULE_0__);function create(e){return document.createElement(e)}class Validator{#x;#y;#C;#L;#N;#k;constructor(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};this.#x=e,this.#y=t,this.#C=n,this.#L=i,this.#k=s}#A(e){return"input"===e.tagName.toLowerCase()&&"button"!==e.type.toLowerCase()&&"submit"!==e.type.toLowerCase()&&"reset"!==e.type.toLowerCase()&&"image"!==e.type.toLowerCase()&&null!==e.getAttribute("required")}validate(){let e=!0;for(const t of this.#x.getElementsByTagName("input")){const n=t.type;if(this.#N=!0,this.#A(t)){if("file"===t.type.toLowerCase()&&0===t.files.length?this.#N=e=!1:"radio"!==t.type.toLowerCase()&&"checkbox"!==t.type.toLowerCase()||t.checked?""===t.value&&(this.#N=e=!1):this.#N=e=!1,null===t.getAttribute("condition")||this.#k[t.getAttribute("condition")](t)||(this.#N=e=!1),!this.#N){if(this.#L)break;this.#y(t,n)}if(this.#N){if(this.#L||null===this.#C)break;this.#C(t,n)}}}return!!e||(this.#L&&this.#y(),!1)}}class Preferences{static instance=null;#I;constructor(){if(this.#I={},null!==localStorage.getItem("b_preferences")&&(this.#I=JSON.parse(localStorage.getItem("b_preferences"))),null!==Preferences.instance)return Preferences.instance;Preferences.instance=this}add(e,t){this.#I[e]=t,localStorage.b_preferences=JSON.stringify(this.#I)}get(e){return this.#I.hasOwnProperty(e)?this.#I[e]:null}delete(e){return!!this.#I.hasOwnProperty(e)&&(delete this.#I[e],localStorage.b_preferences=JSON.stringify(this.#I),!0)}}async function Fingerprint(){const e=document.createElement("canvas"),t=e.getContext("2d");t.textBaseline="top",t.font="14px Arial",t.textBaseline="alphabetic",t.fillStyle="#f60",t.fillRect(125,1,62,20),t.fillStyle="#069",t.fillText("fingerprint",2,15),t.fillStyle="rgba(102, 204, 0, 0.7)",t.fillText("fingerprint",4,17);const n=e.toDataURL(),i=new(window.AudioContext||window.webkitAudioContext),s=i.createOscillator();s.type="triangle",s.frequency.setValueAtTime(1e4,i.currentTime),s.start(0);const l=i.createAnalyser();l.fftSize=2048,s.connect(l);const a=new Float32Array(l.fftSize);l.getFloatTimeDomainData(a);const o=a.join(","),r=[navigator.userAgent,[screen.width,screen.height,screen.colorDepth].join("x"),navigator.language,Intl.DateTimeFormat().resolvedOptions().timeZone,navigator.platform,navigator.hardwareConcurrency,navigator.deviceMemory,navigator.maxTouchPoints,n,o].join("###"),c=(new TextEncoder).encode(r),u=await crypto.subtle.digest("SHA-256",c);return Array.from(new Uint8Array(u)).map((e=>e.toString(16).padStart(2,"0"))).join("")}let prefs=new Preferences;prefs.get("language")||prefs.add("language",navigator.language.split("-")[0]);const app=getId("App"),api="http://localhost:3000";function getId(e){return document.getElementById(e)}function getSelector(e){return document.querySelectorAll(e)}function list(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e=create(!(arguments.length>2&&void 0!==arguments[2])||arguments[2]?"ul":"ol"),null!==i&&(e.id=i),e.className=n;for(const n of t){const t=create("li");t.textContent=n,e.appendChild(t)}return e}function object(e,t){let n=create("object");return n.data=e,n.type=t,n}function paragraph(e,t,n){let i=create("p");return"%bcode%"===n.substring(0,7).toLowerCase()?i=bcode(n=n.substring(7,n.length)):"%html%"===n.substring(0,6).toLowerCase()?i.innerHTML=n.substring(6,n.length):i.textContent=n,e&&(i.id=e),t&&(i.className=t),i}function jsonFile(e,t,n){let i=new XMLHttpRequest;i.open("GET",e,!1),i.onreadystatechange=()=>{200===i.status?t(i.responseText):n(i.statusText,i.responseText)},i.send()}function textBox(e,t,n,i){let s=create("input");return s.type=n,null!==e&&(s.id=e),s.placeholder=t,s.className=i,s}function image(e,t,n){let i=create("img");return null!==e&&(i.id=e),i.className=t,i.src=n,i.alt="",i}function block(e,t,n){let i=create("div");return null!==e&&(i.id=e),i.className=t,null!=n&&n.forEach((e=>{i.append(e)})),i}function button(e,t,n,i){let s=create("button");return null!==e&&(s.id=e),s.className=t,null!==n?s.textContent=n:null!==i&&(s.innerHTML=i),s.title="",s}function heading(e,t,n){let i=create("h"+e);return null!==t&&(i.className=t),i.textContent=n,i}function anchor(e,t,n,i){let s=create("a");return e&&(s.id=e),t&&(s.className=t),s.href=n,s.textContent=i,s}function textArea(e,t,n){let i=create("textarea");return e&&(i.id=e),i.className=t,i.placeholder=n,i}function brdige(e,t,n,i,s){let l=new XMLHttpRequest;if("GET"===t||"DELETE"===t){let a=new URLSearchParams;n.forEach(((e,t)=>{a.append(t,e)})),e+="?"+a.toString(),l.open(t,api+e),l.withCredentials=!0,l.onload=function(){200===l.status&&4===l.readyState?i(l.responseText):s(l.status)},l.send()}else{if("POST"!==t&&"PUT"!==t)throw new Error("Unsupported HTTP method");l.open(t,api+e),l.withCredentials=!0,l.onload=function(){200===l.status&&4===l.readyState?i(l.responseText):s(l.status)},l.send(n)}}function Option(e,t){let n=create("option");return n.value=e,n.textContent=t,n}function select(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=create("select");return null!==e&&(i.id=e),null!==t&&(i.className=t),null!==n&&n.forEach((e=>{let t=Option(e.value,e.text);i.append(t)})),i}function table(e,t,n){let i=create("table");return e&&(i.id=e),i.className=t,n&&n.forEach((e=>{i.append(e)})),i}function tableRow(e,t,n){let i=create("tr");return e&&(i.id=e),i.className=t,n&&n.forEach((e=>{i.append(e)})),i}function tableData(e,t,n){let i=create("td");return e&&(i.id=e),i.className=t,"string"==typeof n?i.textContent=n:i.append(n),i}function label(e,t){let n=document.createElement("span");return n.textContent=t,n.className=e,n}function audio(e,t,n){let i=create("audio");return e&&(i.id=e),t&&(i.className=t),i.src=n,i}function canvas(e){let t=document.createElement("canvas");return t.className=e,t}function isArabic(e){return!!/[\u0600-\u06FF]/.test(e)}function toBase64(e,t){let n=new FileReader;n.onload=function(e){t(e.target.result)},n.readAsDataURL(e)}function resizeImage(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{width:200},i=canvas("builderSpecialCanvas"),s=new Image;i.width=n.width,s.onload=function(){i.height=n.width*(s.height/s.width);let e=i.height;i.getContext("2d").drawImage(s,0,0,n.width,e),t(i.toDataURL("image/jpeg",1))},s.src=e}function entrypoit(e){document.onreadystatechange=function(){"complete"===document.readyState&&e()}}function alert(e,t,n,i,s){let l=label("alertMessage",e),a=button(null,"alertOKEY alertButton",t,null),o=button(null,"alertNO alertButton",n,null),r=block("alertContainer","alertContainer",[l,a,o]),c=block("alertPlatform","builderAlert",[r]);app.append(c),o.onclick=()=>{s(c)},a.onclick=()=>{i(c)}}function insertStyle(e){let t=document.createElement("link");t.rel="stylesheet",t.href=e+"?v="+Math.random(),document.head.append(t)}function insertScript(e,t){let n=document.createElement("script");n.type=t,n.src=e+"?v="+Math.random(),document.body.append(n)}class Errors{static exists=null;static wrongCredential=null;static failure=null;static invalidSession=null;static validSession=null}function toRoute(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,l=create("a");return i&&(l.id=i),s&&(l.className=s),"append"===n&&(e=location.pathname+e),l.textContent=t,l.onclick=t=>{t.preventDefault(),history.pushState("","",e)},l}class Component{component;path;subroutes;connectedComponents;implementationPoint;subrouteOnPath;constructor(){this.component=null,this.path=null,this.subroutes=[],this.implementationPoint=null,this.subrouteOnPath=!1,this.connectedComponents=[]}addSubroute(e){this.subroutes.push(e)}create(){this.component=null}getHTML(){return this.component}rerender(){let e=this.component;this.create(),e.replaceWith(this.component),e.parentNode&&e.parentNode.removeChild(e)}findRoute(e){const t=e;if(this.path===t)return this;for(const e of this.subroutes)if(e.path===t)return e;return null}hasRoute(e){let t=e[0];if(this.subroutes.forEach((e=>{e.component.parentNode===this.component&&this.component.removeChild(e.component)})),e.length>1){e=e.slice(1);for(let t=0;t<this.subroutes.length;t++){e.forEach((e=>{if(this.subroutes[t].path===e)return this.component.append(this.subroutes[t].getHTML()),this.subroutes[t]}));let n=this.subroutes[t].hasRoute(e);if(n)return this.component.append(n),this}return null}return this.path===t?(this.subroutes.forEach((e=>{e.component.parentNode===this.component&&this.component.removeChild(e.component)})),this):null}}function riseEvent(e,t){for(var n=arguments.length,i=new Array(n>2?n-2:0),s=2;s<n;s++)i[s-2]=arguments[s];e[t](...i)}class Dropdown extends Component{#T;#h;#p;#P;#S;#E;#M;#D;#R;static OPEN=1;static CLOSE=0;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;super(),null!==t?0!==i.length?s||typeof s===Function?n?(this.#T=e,this.#h=t,this.#S=i[0].value,this.#E=[],this.#P=Dropdown.CLOSE,this.#p=n,this.#M=i,this.#R=s,this.#M.forEach((e=>{this.#E.push(s(e))})),this.create()):console.error("The dropdown icon must be specified [innerHTML]"):console.error("An adapter must be specified"):console.error("Items must be defined."):console.error("styleClass attribute must be defined.")}rerender(){let e=this.component;this.create(),e.parentNode.replaceChild(this.component,e)}#V(e){return this.#E.find((t=>t.getAttribute("itemValue")===e))}setValue(e){const t=this.#V(e);void 0!==this.#V(e)&&this.#D.replaceChildren(t.cloneNode(!0))}updateItems(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.length>0&&(this.#M=e,this.#E=[],this.#M.forEach((e=>{this.#E.push(this.#R(e))})),this.rerender())}create(){let e=button(null,"b_dropIcon",null,this.#p),t=block(null,"b_currentItem",null),n=block(null,"b_selectedValue",[t,e]),i=block(null,"b_listItems",[]),s=block(this.#T,"b_dropdown",[n,i]);s.classList.add(...this.#h.split(" ")),this.#D=t,i.append(...this.#E),n.onclick=()=>{this.#P===Dropdown.CLOSE?(i.style="display: block !important;",this.#P=Dropdown.OPEN):this.#P===Dropdown.OPEN&&(i.removeAttribute("style"),this.#P=Dropdown.CLOSE)},this.#E.forEach((e=>{e.onclick=()=>{t.replaceChildren(e.cloneNode(!0)),n.click(),riseEvent(this,"onChange",e.getAttribute("itemValue"),e.textContent)}})),t.append(this.#E[0].cloneNode(!0)),this.component=s}}class router{#H;#O;#F;static old;constructor(e,t){this.#F=t,this.#H=e,this.old=e.path,this.#O=null}updateOLD(){this.old=document.location.pathname}watch(){this.resolve("/"),window.onpopstate=()=>{null!==this.#O&&null!==this.#O.component.parentNode&&(this.#O.component.parentNode.removeChild(this.#O.component),this.#O=null)},setInterval((()=>{let e=document.location.pathname;e!==this.old&&(null!==this.#O&&null!==this.#O.component.parentNode&&(this.#O.component.parentNode.removeChild(this.#O.component),this.#O=null),this.old=e,this.resolve(e))}),60)}#B(e){let t=[];for(let n=0;n<e.length;n++){const i=e[n];""===i&&0!==n||t.push("/"+i)}return t}resolve(e){let t,n,i,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if("default"===s)t=this.#B(e.split("/")),n=this.#H.findRoute(t[0]),this.resolve(["/"],"beta",n),i=app;else if("alpha"===s)n=l,t=e,n=n.findRoute(t[0]),i=app;else if("beta"===s){n=l,t=e;let s=null;for(const e of n.subroutes)if(e.path===t[0]){s=e;break}if(null===s)return 0;n=s,i=app}null!==this.#O&&n&&this.#O.component.parentNode&&this.#O.subroutes.includes(n.path)&&(this.#O.component.parentNode.removeChild(this.#O.component),this.#O=null),null!==n&&(n!==this.#H&&(this.#O=n),n.implementationPoint&&(i=n.implementationPoint)),n||"beta"===s?(app===this.#F.component.parentNode&&app.removeChild(this.#F.component),i.append(n.component),t.length>1&&"beta"!==s&&(t=t.splice(1),this.resolve(t,"alpha",n))):(app===this.#H.component.parentNode&&app.removeChild(this.#H.component),app.append(this.#F.component))}static push(e){history.pushState("","",e)}}function provisory(){let e=create("span");return e.className="provisory",e}function bcode(input){const placeholderRegex=/%([^%:]+):([^%]+)%/g;let calls=[];const result=input.replace(placeholderRegex,((e,t,n)=>{const i=n.split(":");return calls.push({func:t,args:i}),provisory().outerHTML}));let p=paragraph(null,null,"");p.innerHTML=result;let provs=p.querySelectorAll(".provisory");return provs.forEach(((e,i)=>{e.replaceWith(eval(calls[i].func)(...calls[i].args))})),p}},9971:()=>{},8411:()=>{}},e=>{e.O(0,[416],(()=>{return t=8772,e(e.s=t);var t}));e.O()}]);