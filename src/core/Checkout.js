import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts,getBraintreeClientToken,processPayment, createOrder } from "./apiCore";
import Card from "./Card";
import { isauth } from "../auth";
import {emptycart}from "./cartHelpers"
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react"


const Checkout = ({ products }) => {
    const[data,setdata]=useState({
        loading:false,
        success:false,
        clientToken:null,
        error:" ",
        instance:{},
        address:''
    })
    let deliveryadress=data.address;
    const userId=isauth()&&isauth().user._id;
    const token=isauth()&&isauth().token;
    
    const gettoken=(userId,token)=>{
getBraintreeClientToken(userId,token).then
(data=>{
    if(data.error){
    setdata({...data,error: data.error})
}else {
    setdata({clientToken:data.clientToken})
   
}

})

    }
    useEffect(()=>{
     gettoken(userId,token)
     },[])
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isauth() ? (
            <div >{showDropin()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };
    const buy=()=>{
        setdata({...data,loading:true})
        let nonce;
        let getnonce=data.instance.requestPaymentMethod().then(
            data=>{console.log(data)
            nonce=data.nonce
const paymentData={
    paymentMethodNonce:nonce,
    amount:getTotal(products)
}
processPayment(userId,token,paymentData).then(response=>{   //response
   
const createOrderData={
    products:products,
    transaction_id:response.transaction.id,
    amount:response.transaction.amount,
    address:deliveryadress
}
createOrderData.transaction_id=response.transaction.id
console.log(createOrderData.transaction_Id)

    createOrder(userId,token,createOrderData)
    setdata({...data,success:response.success})
    emptycart(()=>{
        console.log("payment successful")
        setdata({loading:false})
    })
}).catch(error=>{console.log(error)
    setdata({loading:false})
})

            }).catch(error=>{
               // console.log('dropin error',error);
                setdata({...data,error:error.message})


            })
    }
    const showerror=error=>(
        
        <div className="alert alert-danger" style={{display:error?'':"none"}}>
{error}
        </div>
    );

const showloading=(loading)=>(
    loading&&<h2>loading...</h2>
)



    const showsuccess=success=>(
        <div className="alert alert-info" style={{display:success?'':"none"}}>
Thanks! your payment was SUCCESSFUL
        </div>
    );


const handleAddress = event => {
    setdata({ ...data, address: event.target.value });
};


const showDropin=()=>(
    <div onBlur={()=>{setdata({...data,error:""})}}>
{data.clientToken!==null&&products.length>0 ?(
<div>
    <div className="group-group mb-3">
        <label className="text-muted">delivery Address</label>

       
        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
        </div>
        <DropIn
        options={{authorization:data.clientToken,
            // paypal:{
            //     flow:"vault"
            // }
        }}
        onInstance={instance=>(data.instance=instance)}

    />
    <button onClick={buy} className="btn btn-success">pay</button>
    </div>
    ) :null}

    </div>
);


    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showloading(data.loading)}
            {showerror(data.error)}
            {showCheckout()}
            {showsuccess(data.success)}
        </div>
    );
};

export default Checkout;
