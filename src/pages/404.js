import Link from 'next/link'
import React from 'react'
import styles from '../styles/404.module.scss'
import { IoIosArrowBack } from "react-icons/io";
const Custom404 = () => {
  return (
    <div className={`${styles.container}`}> 
    <h1 data-testid="404">404 - Page Not Found</h1>
    <Link href="/products" className={styles.linkText}><IoIosArrowBack/>Back to Home</Link>
  </div>
  )
}

export default Custom404