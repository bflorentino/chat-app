const Message = ({me}:{me:boolean}) => {

  
  
  return (
    <div className={`Chat_message ${me && 'message-r'}`  } >
      {/* <img src={noPrfoile} alt="" className='' /> */}
      <div className='Chat_message-info' >
        <div className={`Chat_bubble ${me && 'bubble-r'}`}>
          <small className='text-base'> Este es un mensaje y otro mas Este es un mensaje y otro mas Este es un mensaje y otro mas</small>
        </div>
        <small className='text-sm p-1'> 8:00 AM </small>
      </div>
    </div>
  )
}

export default Message