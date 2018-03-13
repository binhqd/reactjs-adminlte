function showError(title, message, options) {
  return showNotification('SHOW_ERROR', title, message, options);
}

function showInfo(title, message, options) {
  return showNotification('SHOW_INFO', title, message, options)
}

function showWarning(title, message, options) {
  return showNotification('SHOW_WARNING', title, message, options)
}

function showSuccess(title, message, options) {
  return showNotification('SHOW_SUCCESS', title, message, options)
}

function showNotification(type, title, message, options) {
  options = Object.assign({}, options);
  return function(dispatch) {
    dispatch({
      type: type,
      title: title,
      message: message
    });

    setTimeout(() => {
      dispatch({
        type: 'CLOSE_NOTIFICATION'
      });
    }, options.timeout || 3000);
  }
}

export {showError, showInfo, showWarning, showSuccess};
