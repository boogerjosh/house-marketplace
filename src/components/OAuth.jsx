import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      console.log(auth, 'auth');
      const provider = new GoogleAuthProvider()
      console.log(provider, 'provider');
      const result = await signInWithPopup(auth, provider)
      console.log(result, 'result')
      const user = result.user
      console.log(user, 'user')

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className='socialLogin' onClick={onGoogleClick}>
      <button className='socialIconDiv'>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google</p>
    </div>
  )
}

export default OAuth