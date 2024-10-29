import React from 'react'

interface SpinnerProp{
  size: 'small' | 'large'
}
const Spinner = ({size} : SpinnerProp) => {
  return (
    <div
    className={`inline-block ${size === 'large' ? `h-8 w-8 border-4` : `h-4 w-4 border-2` }  animate-spin rounded-full  border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
    role="status">
        <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...
        </span>
    </div>
  )
}

export default Spinner