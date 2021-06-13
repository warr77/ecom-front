import React,{useState} from "react";
import {Link} from 'react-router-dom';
import Layout from '../core/Layout'
import {API} from "../config";
import {signup} from "../auth";
//var x=process.env.REACT_APP_API_URL
const Signup = () => {
	const[values,setValues]=useState({
		name:'',
		email:'',
		password:'',
		error:'',
		success: false,
		
	})
	const{name,email,password,success,error}=values;
	const handlechange=name=>event=>{

setValues({...values,error:false,[name]:event.target.value})
	}


const clickedsubmit=(event)=>{
	event.preventDefault();
	signup({name,email,password}).then(
data=>{if(data.error){setValues({...values,error:data.error,success:false})
}else{
	setValues({...values,
		name:'',
		email:'',
		password:'',
		error:'',
		success:true})
}

}
		)
}
	

const signupform=()=>(<form><div className="form-group">
<label className="text-muted">Name</label>
<input onChange={handlechange("name")} type="text" className="form-control" value={name}/></div>

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

const showSuccess=()=>(
	<div className="alert alert-info" style={{display:success?'':'none'}}>
	new account is created .please signin <Link to="/signin">signin</Link>

	</div>
	
);
return(<Layout
 title="Signup" 
 description="Node React E-commerce App"
 className="container col-md-8 offset-md-2">
 {showSuccess()}

	{signupform()}
	{JSON.stringify(values)}
	</Layout>);
	}

export default Signup;
