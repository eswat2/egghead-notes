import React from "react"
import Profile from "../Profile"

import { observer } from "mobx-react"
import store from "../../utils/store"

const ProfileContainer = observer(() => {
  // console.log('-- render:  ProfileContainer');
  const bio = store.bio.value
  return (
    <div className="container">
      {Object.keys(bio).length > 0 ? <Profile /> : null}
    </div>
  )
})

export default ProfileContainer
