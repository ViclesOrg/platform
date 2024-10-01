import * as builder from '../vendors/builder.js';


export default class Toast extends builder.Component
{
	message;
	status;
	duration;
	parent;
    constructor(message, duration=3000, status='success_toast' | 'error_toast' | 'warning_toast', parent=builder.app) {
        super();
        this.message = message
		this.status = status
		this.duration = duration
		this.parent = parent
        this.create()
    }

    create() {
		this.component = builder.block(null, 'vicles_toast ' + this.status, [builder.label('vicles_toast_message', this.message)])
    }

    show() {
		this.parent.appendChild(this.component)
		setTimeout(()=>{
			this.hide()
		}, this.duration)
    }

    hide() {
        this.parent.removeChild(this.component)
    }
    
}