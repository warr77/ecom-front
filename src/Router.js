import React from 'react'
import{BrowserRouter,Switch,Route}from 'react-router-dom';
import Signup from'./user/Signup'
import Signin from './user/Signin'
import app from './user/Signin'
const Routes=()=>{
	return(<BrowserRouter><Switch>
		<Route path="/signin" exact Component={Signin}/>
		<Route path="/signup" exact Component={Signup}/>
<Route path="/app" exact Component={app}/>
	</Switch></BrowserRouter>
	)
}

export default Routes;