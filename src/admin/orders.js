import React,{useState,useEffect} from "react";
import Layout from '../core/Layout';
import {isauth} from '../auth';
import{Link} from "react-router-dom";
import {listOrders,getStatusValues,updateStatusValues} from "./apiadmin";
import moment from 'moment';





export default function Orders() {
  const [Orders,setOrders]=useState([])
  const [statusValues,setStatusValues]=useState([])
  const{user,token}=isauth()
  const loadOrders=()=>{
listOrders(user._id,token).then(data=>{
    if(data.error){
        console.log(data.error)
    }else{
        //console.log("data".data)
        setOrders(data)
        
    }
})


  }
  const handleStatusChange=(e,orderId)=>{
      console.log("update status")
      updateStatusValues(user._id,token,orderId,e.target.value).then(data=>{
          if(data.error){console.log("update status failed")}
          else{loadOrders()}
    })
  }
  const showStatus=(o)=>(
      <div className="form-group">
          <h3 className="mark mb-4">Status:{o.status}</h3>
          
          <select className="form-control" onChange={e=>handleStatusChange(e,o._id)}>
<option>Update Status</option>

{statusValues.map((status,index)=>(
    <option key={index} value={status}>
     
        {status}
    </option>
))}

          </select>
      </div>
  )


  const loadStatusValues=()=>{
    getStatusValues(user._id,token).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            //console.log(data)
            setStatusValues(data)
            
        }
    })
    
    
      }
  useEffect(()=>{
     
      loadOrders()
      loadStatusValues()
  },[])

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
            <div className="input-group-text">{key}</div>
        </div>
        <input
            type="text"
            value={value}
            className="form-control"
            readOnly
        />
    </div>
);

  const showOrdersLength=()=>{
      if(Orders.length>0)
      {return <h1 className="text-danger display-2">Total orders:{Orders.length}</h1>}
      else
        {return <h1 className="text-danger ">No orders</h1>
      }
  }
  return(<Layout title="Add a new Category" description={`you can manage all orders here`} >

		
	<div className="row">
		
		<div className="col-md-8 offset-md-2">
		
		{showOrdersLength()}
		{Orders.map((o,oindex)=>{
            return(
                <div className="mt-5" key={oindex} style={{borderBottom:"5px solid indigo"}}>
                    <h2 className='mb-5'>
                        <span className="bg-primary">{o._id}</span>
                    </h2>
                    <ul className="list-group mb-2">
                        <li className="list-group-item">{showStatus(o)}</li>
                        <li className="list-group-item">Transection id:{o.transaction_id}</li>
                        <li className="list-group-item">Amount:{o.amount}</li>
                        <li className="list-group-item">Order by:{o.user.name}</li>
                        <li className="list-group-item">Ordered at:{moment(o.createdAt).fromNow()}</li>
                        <li className="list-group-item">Delivery_Address {o.address}</li>
                    </ul>
                    {
                    o.products.map((p,pindex)=>(
                            <div className="mb-4" key={pindex}style={{padding:'20px', border:'1px solid indigo'}}>
                                        <p>product details</p>
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                            </div>
                    ))}
                    <h3 className='mt-4 mb-4 font-italic'>
                        Total products in the order:{o.products.length}
                        </h3> 
                      
                     </div>
            )
        })}
	
		

		</div>
		</div>
	

	</Layout>)
}



