import { FaGoogle } from 'react-icons/fa'
import { openGoogleLoginWindow } from './oauth'


export default function GoogleLoginButton() {
  return (
    <button onClick={openGoogleLoginWindow} className='flex justify-center items-center space-x-2 text-sm font-medium font-montserrat transition-colors hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-md'>
      <FaGoogle className='text-lg'/>
      <span>Login</span>
    </button>
  )
}
