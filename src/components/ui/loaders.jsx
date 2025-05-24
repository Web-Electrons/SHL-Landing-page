'use client'
import React from 'react';
import styles from './style/loader.module.scss'

export const Loaders = () => {
    return (
        <>
            <div className={`${styles.loader_container}`}>
                <div className='flex flex-col items-center gap-2'>
                    <div className={`${styles.loader}`}></div>
                    <div className={`${styles.blink_text} text-red-700 font-bold w-[100px] text-nowrap text-center tracking-wider  `}>Loading</div>
                </div>
            </div>
            <div className={`${styles.disable_all}`}>
                {/* Semua konten aplikasi lain yang akan dinonaktifkan */}
            </div>
        </>
    );
}