import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.show) return null

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification
