import React from 'react'
import { useState } from 'react'
const Footer = () => {
    const handleSubmit=()=>{
        
    }
  return (
    <>
     <footer>
        <h1>Contact Me</h1>
        <form /*onSubmit={handleSubmit}*/>
        <input
          type="text"
          name="name"
         
        //   onChange={handleChange}
          placeholder="Name"
        />
            <input type='email'/>
            <input type='text'/>
        </form>
     </footer>
    </>
  )
}

export default Footer