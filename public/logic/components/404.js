import * as builder from '../vendors/builder.js';

export default class NotFound extends builder.Component {
    constructor() {
        super();
        this.create()
    }

    create() {
        let _404 = builder.image(null, 'v_404_image', '/assets/404.svg'),
            message = builder.label('v_404_message', "Vous êtes perdu dans l'univers de Vicles"),
            back = builder.button(null, 'v_404_back', 'Retournez à la terre');

        back.onclick = ()=>{
            history.back()
        };
        this.component = builder.block(null, 'v_404_page', [_404, message, back])
    }
}