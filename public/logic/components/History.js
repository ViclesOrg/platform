import * as builder from '../vendors/builder.js';

export default class History extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/history'
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'History');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}