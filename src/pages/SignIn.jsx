import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <div className="signInFormContainer">
            <header>
              <p className='pageHeader'>Welcome back!</p>
            </header>

            <p className='youVeBeenMissed'>You've been missed</p>

            <OAuth />

            <p className='youVeBeenMissed'>or</p>

            <form onSubmit={onSubmit}>
            <input
                type='email'
                className='emailInput'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
            />

            <div className='passwordInputDiv'>
                <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
                />

                <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
                />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
                Forgot password?
            </Link>

            <button className='signInBar'>
                <p className='signInText'>Sign In</p>
            </button>
            </form>

            <Link to='/sign-up' className='haveAnAccountText'>
                Don't have an account? <span className='registerLink'>Sign up here</span>
            </Link>
        </div>
      </div>
    </>
  )
}

export default SignIn