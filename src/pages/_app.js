import { CookiesProvider, useCookies } from 'react-cookie'
import { Toaster } from 'react-hot-toast'
import SignUp from './auth/signup';
import Login from './auth/login';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.scss'
// import { ToastContainer } from 'react-bootstrap'


export default function App({ Component, pageProps }) {
  return (
  <>
  <Component {...pageProps} />
  <Toaster/>
  </>
  )

}
