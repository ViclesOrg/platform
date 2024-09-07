import * as builder from '../vendors/builder.js';

export default class Staff extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/staff'
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'Staff');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}