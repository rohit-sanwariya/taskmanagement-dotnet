import { Input } from '@/components/ui/input'
import { FC } from 'react'

const Login:FC = () => {
  return (
    <form>
      <Input type='text' id="username" autoFocus/>
      <Input type='password' id="password" autoFocus/>
    </form>
  )
}

export default Login