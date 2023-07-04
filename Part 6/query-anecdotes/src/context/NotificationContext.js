import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return {
        content: action.payload,
        show: true
      }
      case 'HIDE_NOTIFICATION':
        return {
          content: action.payload,
          show: false
        }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { content: '', show: false })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
