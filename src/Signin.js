import React,{useState} from "react";
import {Link,Redirect} from 'react-router-dom';
import Layout from '../core/Layout'
import {API} from "../config";
import {signin} from "../auth";
//var x=process.env.REACT_APP_API_URL
const Signin = () => {
	const[values,setValues]=useState({
		
		email:'',
		password:'',
		error:'',
		loading: false,
		redirecttoreferrer:false
		
	});
	const{name,email,password,loading,error}=values;
	const handlechange=name=>event=>{

setValues({...values,error:false,[name]:event.target.value})
	}


const clickedsubmit=(event)=>{
	event.preventDefault();
	setValues({...values,error:false,loading:true})
	signin({email,password}).then(
data=>{if(data.error){setValues({...values,error:false,loading:true})
}else{
	setValues({...values,
		
		redirecttoreferrer:true})
}

}
		)
}
	

const signupform=()=>(<form>

<div className="form-group">
<label className="text-muted">Email</label>
<input onChange={handlechange('email')} type="email" className="form-control" value={email}/></div>


<div className="form-group">
<label className="text-muted">Password</label>
<input onChange={handlechange('password')} type="password" className="form-control" value={password}/>



</div>
<button onClick={clickedsubmit} className="btn btn-primary">Submit</button>
</form>
	);

const showError=()=>(
	<div className="alert alert-danger" style={{display:success?'':'none'}}>

	console.log())</div>

);

const showloading=()=>
	loading&&(<div className"alert alert-info" >
		<h2>Loading....</h2>
		</div>
		);
	
const redirectUser=()=>{
	if(redirecttoreferrer){
return <Redirect to="/"/>

	}
}


return(<Layout
 title="Signup" 
 description="Node React E-commerce App"
 className="container col-md-8 offset-md-2">
 {showloading()}
{redirectUser()}
	{signupform()}
	{JSON.stringify(values)}
	</Layout>);
	}




export default Signin;
