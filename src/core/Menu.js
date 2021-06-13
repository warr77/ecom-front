import React ,{Fragment}from 'react'
import{Link,withRouter} from 'react-router-dom'
import { signout,isauth } from "../auth";
import { itemTotal } from "./cartHelpers";




const isActive=(history,path)=>{
if(history.location.pathname===path){
	return {color:'#ff9900'};
}else{

	return {color:'#ffffff'};
}


	}

const Menu=({history})=>(
<div>
<ul className="nav nav-tabs bg-primary">
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
</li>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
</li>
<li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
{isauth()&& isauth().user.role===1 &&(
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/admin/Dashboard')} to="/admin/Dashboard">Dashboard</Link>
</li>


	)}

{isauth()&& isauth().user.role===0 &&(

<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/user/Dashboard')} to="/user/Dashboard">Dashboard</Link>
</li>
)}
{!isauth() &&(
<Fragment>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
</li>
<li className="nav-item">
<Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
</li>

</Fragment>
	)}





{ isauth() && (

<Fragment>
	<li className="nav-item">
	<p>{console.log(isauth())}</p>
<span className="nav-link" style={{cursor:'pointer',color:'#ffffff'}} onClick={
	()=>signout(()=>{
		history.push("/");
	})}>Signout</span>
</li>

</Fragment>

	)}


</ul>
</div>
	);
export default withRouter(Menu);