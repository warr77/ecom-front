import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Proute from './auth/Proute'
import Dashboard from './user/userdashboard'
import Adminroute from './auth/adminroute'
import adminDashboard from './user/admindashboard'
import addCategory from './admin/addcategory'
import addProduct from './admin/addproducts'
import Shop from "./core/Shop"
import Product from "./core/Product"
import Cart from "./core/Cart"
import Orders from './admin/orders'
import Profile from './user/Profile'
import ManageProducts from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct"
const Routes = () => {
    return (
        <BrowserRouter>
        <Menu/>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <Proute path="/user/Dashboard" exact component={Dashboard}/>
                <Proute path="/profile/:userId" exact component={Profile}/>
                 <Adminroute path="/admin/Dashboard" exact component={adminDashboard}/>
                  <Adminroute path="/create/category" exact component={addCategory}/>
                  <Adminroute path="/create/product" exact component={addProduct}/>
                  <Adminroute path="/admin/orders" exact component={Orders}/>
                  <Adminroute path="/admin/products" exact component={ManageProducts}/>
                  <Adminroute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
