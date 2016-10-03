import cookie from 'react-cookie';

$(document).ajaxSend(function(event, jqxhr, settings) {
  jqxhr.setRequestHeader('Authorization', `Bearer ${cookie.load('accessToken')}`);
  jqxhr.setRequestHeader('Content-Type', 'application/json');
});