import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';

 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()
       setRegister(!register)

       if(register){
        axios.post(`https://socialmtn.devmountain.com/register`,
        {
            username: username,
            password: password
        })
        .then((res)=> {
            authCtx.login('token', 'exp', 'userId')
            console.log(res.data)})
        .catch((err)=> console.log(err))
         setUsername('');
        setPassword('');
       } else {
        axios.post(`https://socialmtn.devmountain.com/login`,
        {
            username: username,
            password: password
        })
        .then((res)=> {
            authCtx.login('token', 'exp', 'userId')
            console.log(res.data)})
        .catch((err)=> console.log(err))
        setUsername('');
        setPassword('');
       }
       
 
       console.log('submitHandler called')
   }
   const handleUserNameChange = (e) => {
    
        setUsername(e.target.value)
        console.log(username)
   }
   const handlePasswordChange = (e) => {
    
        setPassword(e.target.value)
        console.log(password)
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text'
                   placeholder='Create a username'
                   value = {username}
                   onChange={handleUserNameChange}/>
               <input
                   className='form-input'
                   type='password'
                   placeholder='Enter a password'
                   value={password}
                   onChange={handlePasswordChange}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth