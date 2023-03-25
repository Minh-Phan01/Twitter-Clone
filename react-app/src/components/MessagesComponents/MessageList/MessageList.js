import './MessageList.css';


export const MessageList = ({messages}) => {


    return (
        <>
        <h1>Message List!</h1>
        <div>
            {messages && messages.map(message => {
                {
                    return <div>
                        {message.senderInfo.firstName}: {message.body}
                    </div>
                }
            })}
        </div>
        </>
    )
}

export default MessageList;