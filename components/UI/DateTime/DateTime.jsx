import moment from 'moment'

function DateTimeFormat(props) {
  return (
    <span className='date'>{moment(props.value).format('DD/MM/YYYY hh:mm:ss')}</span>
  )
}

export default DateTimeFormat;
