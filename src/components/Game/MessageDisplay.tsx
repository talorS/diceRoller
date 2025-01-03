type MessageDisplayProps = {
    message: string;
}
const MessageDisplay = ({ message }: MessageDisplayProps) => {
    return <div className="double-six-message">{message}</div>
}

export default MessageDisplay;
