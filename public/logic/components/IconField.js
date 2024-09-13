import * as builder from '../vendors/builder.js'

export default class IconField extends builder.Component
{
	fieldIcon
	fieldHint
	fieldType
	instructions
	className
	condition
	constructor(fieldIcon, fieldHint, fieldType, instructions=[], className='', condition= undefined)
	{
		super()
		this.fieldIcon = fieldIcon
		this.fieldHint = fieldHint
		this.fieldType = fieldType
		this.instructions = instructions
		this.className = className
		this.concondition = condition
		this.create()
	}

	create()
	{
		let icon = builder.button(null, 'v_fieldIcon_L', null, this.fieldIcon),
		field = builder.textBox(null, this.fieldHint, this.fieldType, 'v_iconedfield'),
		alertIcon = builder.button(null, 'v_fieldIcon_R invisible', null, '<i class="ri-alarm-warning-line"></i>'),
		container = builder.block(null, "v_iconField " + this.className, [icon, field, alertIcon]);

		if (this.instructions.length > 0)
		{
			let list = builder.block(null, 'v_logsign_instructions', [builder.list(this.instructions, 'v_instructions_list')])
			container.append(list)
		}
		field.setAttribute("required",'')
		if (this.condition !== undefined)
			field.setAttribute("condition", this.condition)

		this.component = container
	}
}