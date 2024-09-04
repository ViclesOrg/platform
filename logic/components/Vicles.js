import * as builder from '../vendors/builder.js';

export default class Vicles extends builder.Component {
    constructor() {
        super();
        this.create()
    }

    create() {
        
        this.component = builder.block(null, 'v_vicles_app', [])
    }
}