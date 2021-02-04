import PropTypes from 'prop-types'

const Alert = ({ title, body, type, links }) => {

  const classes = `uk-alert-${type}`;

  return (
    <div className = {classes} uk-alert = "test">
      <a className="uk-alert-close" uk-close = "test"></a>
      <h3>{title}:</h3>
      <p>{body}</p>
    </div>

  )
}

Alert.defaultProps = {
    type: '',
    links: []
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['', 'primary', 'danger', 'success', 'warning']),
    links: PropTypes.array
}

export default Alert