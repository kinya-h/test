import React from 'react'
import auth  from './auth';
// import { Link } from 'react-router-dom';
import { Link ,Redirect, BrowserRouter as Router , useHistory } from 'react-router-dom';
import {useState , Ref , useEffect} from 'react';

import '../../css/register.css'

export default function SignUpPage() {

    var  [username  , setUsername] = useState('');
    var [email , setEmail] = useState('');
    var [password , setPassword] = useState('');
    var[confirmPassword , setConfirmPassword ] = useState('');
    var [success ,setSuccess] = useState();
    const history = useHistory();




const data  = { username : username.toLowerCase,email:email.toLowerCase,password:password.toLowerCase}

                    
                    
const handleLogin = () =>{


            auth.login(()=>{
            history.push("/home") 
            })

            //  history.replace("/register");
            
            // <Redirect to="/" push={true} />
     
            // alert("email or password is arleady taken")
       

    }

    const handleSubmit =(e)=>{

        e.preventDefault();

console.log(username)
console.log(email);
console.log(password);
console.log(confirmPassword);



if(confirmPassword !== password){

    alert("passwords do not match")
}else{

    //    useEffect(() =>{ 
           fetch("/reg", {
            
            method:'POST',
            // mode:'cors',
             headers : {
            'Content-Type':'application/json'},

           body:JSON.stringify(data)
            
        }).then(res=> res.json())
        .then(data => setSuccess(data.success))
        .catch(error => console.log(error))
        
        // },[])
       
        }      
        
    }
       
    console.log(success)
        if(success ===true){
             handleLogin();
    }


    
    



    return (
        <div className="container">


               <div class="screen__background">
              <span class=" shape4"></span>
              <span class=" shape3"></span>
              <span class=" shape2"></span>
              <span class=" shape1"></span>
            </div >


            <div className='header'>


            <h2>Join us</h2>
            <h5>Create your personal account</h5>
           </div>
           
            <form className='form' onSubmit={handleSubmit}  method="post">
                <p>
                    <label>Username</label><br/>
                    <input type="text" name={username} required  onChange={(e) => setUsername(e.target.value)}/>
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name={email} required onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name={password} required  onChange = {(e) => setPassword(e.target.value)}/>
                </p>

                 <p>
                    <label>Confirm password</label><br/>
                    <input type="password" value={confirmPassword} required  onChange={(e) => setConfirmPassword(e.target.value)}/>
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>

 
            </form>


            <p>{username}</p>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>


            
        </div>
    )

}
