import * as builder from '../vendors/builder.js';

export default class Statistics extends builder.Component
{
    constructor() {
        super();
        this.path = '/'
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'Statistics');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}