import React from 'react'

class InputText extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: "typeSmth"
		}
	}

	inputValueHandler(arg){
		this.setState( { inputValue:arg } )
	}

	render(){
		return (
			<div className="inputText">
				<h1> {this.state.inputValue} </h1>
				<input
					onChange = { e => this.inputValueHandler( e.target.value )}
					type = "text"
					value = {this.state.inputValue}
				/>
			</div>
		)
	}
}

export default InputText