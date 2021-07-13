import { BorderlessTableOutlined } from "@ant-design/icons";

const TheirMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  const bots = ['varun'];
  const username = message.sender.username;
  var bottexts = message.text;
  const ads = bottexts.split('-');

  if(bots.includes(username))
  {
    return(
      <div className="bot-row">
      
      <div className="botmessage" style={{ marginBottom:'0%' }}>
      {message.attachments && message.attachments.length > 0
        ? (
          <img
            src={message.attachments[0].file}
            alt="message-attachment"
            className = 'bot-image'
            // style={{ margin: '0px', width:'40%' }}

          />
        )
        : (
            <div style={{width:'100%'}}>
              <strong className='bot-0'>{ads[0]}<i className="far fa-thumbs-up thumbs" ></i></strong>
              <p className='bot-1'>{ads[1]}</p>
              <p className='bot-2'><strong>Starting at {ads[2]}</strong></p>
              <p className='bot-3'><a href='/' >Check out</a></p>
            </div>
            
        )}
        </div>
    </div>
    )
  }
  else {
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
        />
      )}
      {message.attachments && message.attachments.length > 0
        ? (
          <img
            src={message.attachments[0].file}
            alt="message-attachment"
            className="message-image"
            style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
          />
        )
        : (
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {message.text}
          </div>
        )}
    </div>
  );
        }
};

export default TheirMessage;
