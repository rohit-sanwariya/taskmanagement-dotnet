import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import { LoginForm } from '@/components/custom/LoginForm'
import RegisterForm from '@/components/custom/RegisterForm'
import App from './App'
import NotFound from '@/components/layouts/NotFound'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm/>,
  },
  {
    path:'/register',
    element:<RegisterForm/>
  },
  {
    path:'/app',
    element:<App/>
  },
  {
    path:'',
    element: <Navigate to="app" replace />,
  },
  {
    path:'*',
    element:<NotFound/>
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </StrictMode>,
)
 
