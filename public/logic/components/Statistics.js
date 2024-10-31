import * as builder from '../vendors/builder.js';
import Soon from './Soon.js';

export default class Statistics extends builder.Component
{
    constructor(activity) {
        super();
        this.path = '/'
        this.implementationPoint = activity
        this.create()
    }

    create() {
        this.component = builder.block(null, 'v_vicles_activity', [new Soon("Statistiques").getHTML()])
    }
}