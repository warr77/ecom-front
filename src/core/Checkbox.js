import React,{useState,useEffect} from "react";
import Layout from './Layout';
import{getProducts}from"./apiCore"

const Checkbox =({categories,handleFilters})=>{
	const [checked,setchecked]=useState([])
const handleToggle=c=>()=>{
	//return the first index or -1
const currentCategoryId=checked.indexOf(c)
console.log(checked)
const newCheckedCategoryId=[...checked]
// if currently checked was not already in checked state >push
//else pull/takeoff
if(currentCategoryId===-1){
	newCheckedCategoryId.push(c)
}else{newCheckedCategoryId.splice(currentCategoryId,1)
}
//console.log(newCheckedCategoryId)
setchecked(newCheckedCategoryId)
handleFilters(newCheckedCategoryId)
}
return categories.map((c,i)=>(
	<li key={i} className="list-unstyled">
	<input onChange={handleToggle(c._id)} vlaue={checked.indexOf(c._id===-1)} type="checkbox" className="form-check-input"/>
	<label className="form-check-label">{c.name}</label>
	</li>
	))

}

export default Checkbox;