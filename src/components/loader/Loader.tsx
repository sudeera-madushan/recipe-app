import React from 'react'
import { twMerge } from 'tailwind-merge'
import styles from './loader.module.css';
const Loader = () => {
  return (
    <div
  className={twMerge(
    'w-full flex flex-col items-center justify-center',
  )}
  style={{ height: 'calc(100vh - 200px)' }}
>
  <div className={styles.loading} />

</div>
  )
}

export default Loader