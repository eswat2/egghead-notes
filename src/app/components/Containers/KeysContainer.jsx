import React from "react"
import Keys from "../Keys"

const KEYS_STYLE = {
  marginBottom: 10,
}

const KeysContainer = () => {
  // console.log('-- render:  KeysContainer');
  return (
    <div className="container" style={KEYS_STYLE}>
      <Keys />
    </div>
  )
}

export default KeysContainer
