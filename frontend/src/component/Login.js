import React, { Component } from 'react';
import {BrowserRouter,NavLink} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            em: ' ',
            pwd: '',
            authflag:false
            };
            this.handleEvent=this.handleEvent.bind(this);
            this.submitEvent=this.submitEvent.bind(this);
    }
    
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    handleEvent(e){
        let target=e.target;
        let value=target.type==='checkbox'?target.checked:target.value;
        let name=target.name;
        this.setState({
            [name]:value
        });
    }

    submitEvent(e){
        var headers = new Headers();
        e.preventDefault();
        const data = {
            em : this.state.em,
            pwd : this.state.pwd
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log(" Login success ")
                    this.setState({
                        authFlag : true
                    })
                }else{
                    console.log("Login Failure")
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render() { 
        let redirectVar = null;
        if(cookie.load('cookie')){

            console.log("Hello");
            redirectVar=<Redirect to="/home" />
            console.log(redirectVar)
         
           
        }
        
        return ( 
                <div>
                    {redirectVar}
                  
                  
                    <div className="container">
                    <h1>Login</h1>
            <form onSubmit={this.submitEvent}>
            <div>
            <label htmlFor="em">Email:</label>
            <input type="text" id="em" name="em"  onChange={this.handleEvent} />
            </div><br></br>
            
            <div>
            <label htmlFor="pwd">Password:</label>
            <input type="password" id="pwd" name="pwd"  onChange={this.handleEvent} />
            </div>    
            <button type="submit">Login</button>    
        </form>
        

        </div>
                </div>

         );
    }
}
 
export default Login;