import * as builder from '../vendors/builder.js';

export default class Statistics extends builder.Component
{
    constructor(activity) {
        super();
        this.path = '/'
        this.implementationPoint = activity
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'Statistics');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}