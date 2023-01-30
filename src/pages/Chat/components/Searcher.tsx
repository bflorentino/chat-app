import React, { useState } from 'react'

const Searcher = ({setSearchString}:{setSearchString:(state:string) => void }) => {
  
  return (
    <div className='w-full Chat_searcher'>
      <input 
        type="text" 
        className='Form_input p-2 mb-1'
        placeholder='Find an User'
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchString(e.target.value)}
      />
    </div>
  )
}

export default Searcher