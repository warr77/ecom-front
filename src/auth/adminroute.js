import React ,{Component} from 'react'
import{Route,Redirect} from 'react-router-dom'
import {isauth} from "./index"

const Adminroute=({component:Component,...rest})=>(
<Route {...rest} render={props=>isauth()&&isauth().user.role===1 ?(
<Component{...props}/>
	):(

<Redirect to={{pathname:"/signin",state:{from: props.location}}}/>

	)
}
/>
);
export default Adminroute;