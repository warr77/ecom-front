import React,{useState,useEffect} from "react";
import Layout from './Layout';
import{getProducts}from"./apiCore"
import Card from "./Card"
import {getCategories,getFilteredProducts} from "./apiCore"
import Checkbox from "./Checkbox"
import{prices} from "./fixedPrices"
import RadioBox from "./radioBox"


const Shop=()=>{
	const[myFilters,setMyFilters]=useState({
		filters:{category:[],price:[]}
	});
const [categories,setCategories]=useState([])
const [error,setError]=useState(false)
const [limit,setLimit]=useState(6);
const [skip,setSkip]=useState(0);
const [filteredResults,setfilteredResults]=useState([]);

	const init=()=>{
	getCategories().then(data=>{
		if(data.error){
			setError(data.error)
		}else{
			setCategories(data)
		}
	})
}
useEffect(()=>{init();

loadFilterResults(skip,limit,myFilters.filters)

},[]);


const loadFilterResults=(newFilters)=>{
	//console.log(newFilters);
	getFilteredProducts(skip,limit,newFilters).then(data=>{
		if(data.error){
			setError(data.error)
		}else{
			setfilteredResults(data.data)
		}
	})
	
};

const handleFilters =(filters,filterBy)=>{
	const newFilters={...myFilters}
	newFilters.filters[filterBy]=filters

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
    loadFilterResults(myFilters.filters)
	setMyFilters(newFilters);

};
const handlePrice=value=>{
	const data=prices
	let array1=[]
	 for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array1 = data[key].array;

            }
             console.log();
        }
        return array1;

}



return (
	<Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">

<div className="row">
<div className="col-4">
<h4>Filter by categories</h4>
<ul>
<Checkbox categories={categories} 
handleFilters={filters=>handleFilters(filters,'category')}/>
</ul>
<h4>Filter by Price Range</h4>
<ul>
<RadioBox prices={prices} 
handleFilters={filters=>handleFilters(filters,'price')}/>
</ul>
</div>

<div className="col-8">

right sidebar
<div className="row">{filteredResults.map((product,i)=>(
<div  key={i} className="col-6 mb-4">
<Card  product={product}/>

</div>

	))}</div>
</div>


</div>
	</Layout>
)

}

export default Shop;