import React from 'react'

const Searcher = () => {
  return (
    <div className='w-full Chat_searcher'>
      <input 
        type="text" 
        className='Form_input p-2 mb-1'
        placeholder='Buscar un Chat'  
      />
    </div>
  )
}

export default Searcher