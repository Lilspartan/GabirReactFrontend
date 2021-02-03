import PropTypes from 'prop-types'

const Alert = ({ title, body, type, links }) => {

  const classes = `uk-alert-${type}`;

  return (
    <div className = {classes} uk-alert>
      <a className="uk-alert-close" uk-close></a>
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