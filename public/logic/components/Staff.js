import * as builder from '../vendors/builder.js';
import Soon from './Soon.js';

export default class Staff extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/staff'
        this.create()
    }

    create() {
        this.component = builder.block(null, 'v_vicles_activity', [new Soon("Personnel").getHTML()])
    }
}