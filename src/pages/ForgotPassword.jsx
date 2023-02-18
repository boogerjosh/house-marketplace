import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className='pageContainer'>
        <div className="forgotPasswordContainer">
            <header>
                <p className='pageHeader'>Forgot password?</p>
            </header>

            <p className='youVeBeenMissed'>No worries, we'll send you reset instructions.</p>

            <main>
                <form onSubmit={onSubmit}>
                <input
                    type='email'
                    className='emailInput'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                />

                <button className='signInBar'>
                    <div className='signInText'>Reset password</div>
                    {/* <button className='signInButton'>
                    <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button> */}
                </button>
                <Link className='backToLogin' to='/sign-in'>
                    Back to sign in <ArrowRightIcon fill='#3E3E70' width='34px' height='34px' /> 
                </Link>
                </form>
            </main>
        </div>
    </div>
  )
}

export default ForgotPassword