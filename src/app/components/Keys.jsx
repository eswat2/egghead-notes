import React from "react"

import { observer } from "mobx-react"
import actions from "../utils/actions"
import store from "../utils/store"

const KEYS_STYLE = {
  marginRight: 2,
  marginTop: 2,
  display: "inline-block",
  padding: 5,
  paddingRight: 6,
  paddingLeft: 6,
  cursor: "pointer",
}

const Keys = observer(() => {
  // console.log('-- render:  Keys');
  const keys = store.keys.value
  return (
    <div>
      {keys.map((tag, index) => (
        <span
          className="label label-primary"
          style={KEYS_STYLE}
          key={index}
          onClick={() => actions.updateUser(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  )
})

export default Keys
