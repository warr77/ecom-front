import React,{useState,useEffect} from "react";
import Layout from '../core/Layout'
import {isauth} from '../auth'
import{Link} from "react-router-dom"
import {getPurchaseHistory} from "./apiUser"

const Dashboard = () => {

const [history,setHistory]=useState([])


const{user:{_id,name,email,role}}=isauth()
const token =isauth().token;

const init=(userId,token)=>{
getPurchaseHistory(userId,token).then(data=>{
	if(data.error){
console.log(data.error)
	}else{
		setHistory(data)
	}
})
}

useEffect(()=>{
	init(_id,token)
},[])

const ulinks =()=>{


	return(
<div className="card">    
<h4 className="card-header">User Links </h4>

<li className="list-group-item"><Link className="nav-link" to="/cart">My Cart</Link>
	</li>
	<li className="list-group-item"><Link className="nav-link" to={`/profile/${_id}`} >User profile</Link>
	</li>


</div>
		)
}

const userinfo=()=>{

return(
<div className="card mb-5">
	<h3 className="card-header">User Information</h3>
	<ul className="list-group">
	<li className="list-group-item">{name}
	</li>
	<li className="list-group-item">{email}
	</li>
	<li className="list-group-item">{role===1 ? 'Admin':'Registered User'}
	</li>
	</ul>
	</div>


	);



}


const Phistory =(history)=>{


	return(

<div className="card mb-5">
	<h3 className="card-header">Purchase history</h3>
	<ul className="list-group">
	<li className="list-group-item">history</li>
	<li>{JSON.stringify(history)}</li>
	</ul></div>


		);
}



	return(<Layout title="Dashboard" description={`good day${name}`} className="container-fluid">

		
	<div className="row">
		<div className="col-3">
		{ulinks()}
		{Phistory(history)}

		</div>
		<div className="col-9">
		{userinfo()}
		</div>
		</div>
	
	...
	</Layout>
)}
export default Dashboard;
