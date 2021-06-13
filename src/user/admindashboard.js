import React from "react";
import Layout from '../core/Layout'
import {isauth} from '../auth'
import{Link} from "react-router-dom"

const adminDashboard = () => {

const{user:{_id,name,email,role}}=isauth()

const adminlinks =()=>{


	return(
<div className="card">    
<h4 className="card-header">Admin Links </h4>

<li className="list-group-item"><Link className="nav-link" to="/Create/Category">
Create Category
</Link>
	</li>
	<li className="list-group-item"><Link className="nav-link" to="/create/product" >
Create product
	</Link>
	</li>
	<li className="list-group-item"><Link className="nav-link" to="/admin/orders" >
view orders
	</Link>
	</li>
	<li className="list-group-item"><Link className="nav-link" to="/admin/products" >
Manage products
	</Link>
	</li>
</div>
		)
}

const Admininfo=()=>{

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





	return(<Layout title="Dashboard" description={`good day${name}`} className="container-fluid">

		
	<div className="row">
		<div className="col-3">
		{adminlinks()}
		

		</div>
		<div className="col-9">
		{Admininfo()}
		</div>
		</div>
	
	...
	</Layout>
)}
export default adminDashboard;
