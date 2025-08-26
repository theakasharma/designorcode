import Link from 'next/link'
import React from 'react'

const HomePage = () => {
    return (
        <div className='h-dvh flex justify-center flex-col'>
            <Link href={''} className=' border flex items-center gap-2 px-2.5 py-2 rounded-md w-2xl mx-auto'>
                <div>
                    <h4>1</h4>
                </div>
                <h2>Day 1/7 Challenge</h2>
            </Link>
            <Link href={'/Challenge/day2'} className='mt-2 border flex items-center gap-2 px-2.5 py-2 rounded-md w-2xl mx-auto'>
                <div>
                    <h4>2</h4>
                </div>
                <h2>Day 2/7 Challenge</h2>
            </Link>
        </div>
    )
}

export default HomePage