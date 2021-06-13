
import React,{useState} from "react";
import Layout from '../core/Layout';
import {isauth} from '../auth';
import{Link} from "react-router-dom";
import {createCategory} from "./apiadmin";

const AddCategory=()=>{

const [name,setName]=useState('')
const [error,setError]=useState(false)
const [success,setSuccess]=useState(false)


const handleChange=(e)=>{
	setError('')
	setName(e.target.value)
}

const clickSubmit=(e)=>{
	e.preventDefault()
	setError('')
	setSuccess(false)
	/// make request to api

	createCategory(user._id,token,{name}).then(data=>{
		if (data.error){
			setError(true)
		}else{
			setError('');
			setSuccess(true);
		}
	})
}

//destructure user and token from local storage
const{user,token}=isauth();

const newCategoryForm=()=>(
<form onSubmit={clickSubmit}>
<label className="text-muted">Name </label>
<div className="form-group">

<input type="text"
className="form-Control"
onChange={handleChange}
value={name}
autoFocus
required
/>


</div>
<button className="btn btn-outline-primary">
Create Category
</button>
</form>


	);

	
	const goback =()=>(
<div className="md-5">
<Link to="/admin/dashboard" className="text-warning">
Back to dashboard
</Link>
</div>
)

const showSuccess=()=>{
if(success){
	return <h3 className="text-success">{name} is created</h3>
}

}

const showError=()=>{
if(error){
	return <h3 className="text-danger">{name} should be unique</h3>
}






}

	return(<Layout title="Add a new Category" description={`good day ,ready to add new category?`} >

		
	<div className="row">
		
		<div className="col-md-8 offset-md-2">
		{showSuccess()}
		{showError()}
		{newCategoryForm()}
		{goback()}
		

		</div>
		</div>
	

	</Layout>)
}

export default AddCategory;