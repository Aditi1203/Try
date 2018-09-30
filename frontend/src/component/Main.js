import React, { Component } from 'react';
import Login from './Login'
import {Route} from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Create from './Create';
import Delete from './Delete';

class Main extends Component {
    state = {  }
    render() { 
        return(
        <div>
             <Route exact index="/" component={Navbar}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/home" component={Home}/> 
             <Route exact path="/create" component={Create}/> 
             <Route exact path="/delete" component={Delete}/>
           
        </div>
          )  }
}
 
export default Main;