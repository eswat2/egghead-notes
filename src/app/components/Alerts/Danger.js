import React from 'react'
import PropTypes from 'prop-types'

const Danger = ({salute, message}) => {
  // console.log('-- render:  Danger');
  return (
    <div className="alert alert-danger" role="alert"><strong>{salute}:</strong> {message}</div>
  )
}

Danger.propTypes = {
  salute: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Danger
