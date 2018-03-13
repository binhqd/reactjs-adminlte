import moment from 'moment'

function DateFormat(props) {
  return (
    <span className='date'>{moment(props.value).format('DD/MM/YYYY')}</span>
  )
}

export default DateFormat;
