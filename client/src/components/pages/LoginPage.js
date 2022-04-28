import React ,{useState , useEffect}from 'react'
import { Link ,Redirect , useHistory} from 'react-router-dom'
import auth from './auth';
import '../../App.css'

export default function SignInPage() {
const [loginCredentials ,  setLoginCredential ] = useState({});

const [uname , setUname] = useState('');
const [email ,setEmail ] = useState('');
const [ password , setPassword ] = useState('');
const history = useHistory();
var [success ,setSuccess] = useState();
   


const data  = { username : uname,email:email,password:password}

console.log(data)

// useEffect(() =>{
//         fetch("/preds").then(
//             res => res.json()
            
//             ).then(
//             data => {
//                 setLoginCredential(data)
//             console.log(data)
//             })
//     },[]);
//  const handleLogin= ()=>{








    
// // history.push("/home")    
// // {/* <Redirect to="/home" push={true} /> */}
//  }



const login = () =>{

    sessionStorage.setItem("username" , uname );

            auth.login(()=>{
            history.push("/home") 
            })

            //  history.replace("/register");
            
            // <Redirect to="/" push={true} />
     
            // alert("email or password is arleady taken")
       

    }


const handleLogin =(e)=>{

        e.preventDefault();


// console.log(confirmPassword);




    //    useEffect(() =>{ 
           fetch("/login", {
            
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


        console.log(success)
        if(success ===true){
             login();
        }


    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form onSubmit={handleLogin}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name={uname} value= {uname} required onChange={(e) => setUname((e.target.value))}/>
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
