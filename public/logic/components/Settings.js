import * as builder from '../vendors/builder.js';

export default class Settings extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/settings'
        this.create()
    }

    create() {
        let initial = builder.heading(1, '', 'Settings');

        this.component = builder.block(null, 'v_vicles_activity', [initial])
    }
}