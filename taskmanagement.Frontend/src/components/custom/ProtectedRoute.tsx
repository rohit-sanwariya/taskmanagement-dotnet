import  { FC,ReactNode,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface IRedirectComponentProps{
   children:ReactNode
}

const ProtectedRoute:FC<IRedirectComponentProps> = ({children}) => {
    const navigation = useNavigate();
   useEffect(() => {
        const authlogin = localStorage.getItem('authLogin'); 
        !authlogin && navigation('/login')
     return () => {
       
     }
   }, [])
    

  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoute;

 