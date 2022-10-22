import React, {useState} from "react";

function Cnt(){
	const [cnt, cntHandler] = useState(0)

	function cntp(){
		cntHandler( cnt + 1 )
	}
	function cntm(){
		cntHandler( cnt - 1 )
	}

	return(
		<div className="cntEl">
			<h1>{cnt}</h1>
			<button onClick={cntp}>+</button>
			<button onClick={cntm}>-</button>
		</div>
	)
}

export default Cnt