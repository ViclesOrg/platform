import * as builder from '../vendors/builder.js';

export default class floatingMessage extends builder.Component
{
    #headerImage;
    #title;
    #message;
    #buttonTxt;
    #btnAction;
    constructor(image, title, message, buttonTxt, btnAction) {
        super();
        this.#headerImage = image;
        this.#title = title;
        this.#message = message;
        this.#buttonTxt = buttonTxt;
        this.#btnAction = btnAction;
        this.create()
    }

    create() {
        let image = builder.image(null, 'v_floatingMessage_image', this.#headerImage),
            title = builder.label('v_infoTitle', this.#title),
            message = builder.label('v_infoMessage', this.#message),
            button = builder.button(null, 'v_infoButton', this.#buttonTxt, null),
            textsButtonContainer = builder.block(null, 'v_floatingMessage_text_container', [title, message, button]);

        button.onclick = ()=>{this.#btnAction(this.component)}
        this.component = builder.block(null, 'v_floatingMessage', [image, textsButtonContainer]);

    }
}