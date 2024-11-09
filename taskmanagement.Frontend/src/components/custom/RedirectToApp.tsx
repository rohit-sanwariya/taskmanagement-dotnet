import  { FC,ReactNode,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface IRedirectComponentProps{
   children:ReactNode
}

const RedirectToApp:FC<IRedirectComponentProps> = ({children}) => {
    const navigation = useNavigate();
   useEffect(() => {
        const authlogin = localStorage.getItem('authLogin'); 
        authlogin && navigation('/app')
     return () => {
       
     }
   }, [])
    

  return (
    <>
        {children}
    </>
  )
}

export default RedirectToApp