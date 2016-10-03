export function notify(type, message, time) {
  return {
    type: 'CHANGE',
    data: {
      type,
      message,
      time
    }
  }
}

export function removeNotification() {
  return {type: 'REMOVE'}
}
