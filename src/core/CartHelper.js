export const addItem=(item,next)=>{
    let cart=[]
    if(typeof window!='undefined'){
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,count:1
        })


        cart=Array.from(new set(cart.map((p)=>(p._id)))).map(id=>{
            return cart.find(p._id===id);
        });
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}