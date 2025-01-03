type NotificationDisplayProps = {
    message: string | null;
}
const NotificationDisplay = ({ message }: NotificationDisplayProps) => {
    return message ? <div className="double-six-message">{message}</div> : null;
}

export default NotificationDisplay;
