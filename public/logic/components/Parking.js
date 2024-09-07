import * as builder from '../vendors/builder.js';

export default class Parking extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/parking'
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'Parking');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}