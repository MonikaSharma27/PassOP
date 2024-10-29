import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
       <div className="logo font-bold text-3xl ">
            <span className='text-green-500'>  &lt;</span>
               
                Pass
                <span className='text-green-500'>OP/&gt;</span>
                
                </div>
                <div>
                    Created with <i className="fa-solid fa-heart text-red-800"></i> by Monika
                </div>
    </div>
  )
}

export default Footer
