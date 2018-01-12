import React from 'react'
import PropTypes from 'prop-types'

const Success = ({salute, message}) => {
  // console.log('-- render:  Success');
  return (
    <div className="alert alert-success" role="alert"><strong>{salute}:</strong> {message}</div>
  )
}

Success.propTypes = {
  salute: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Success
