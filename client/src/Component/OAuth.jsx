import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() =>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider)
            console.log(result)
            const res = await fetch('api/auth/Google',{
                method:"POST",
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/');

        }catch(err){
            console.log('couldnt sign in with google' ,err);
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white rounded-lg p-3 hover:opacity-95'>
     Continue with google
    </button>
  )
}
