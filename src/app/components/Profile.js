import React from 'react'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'

const Profile = () => {
  // console.log(`-- render:  Profile`);
  return (
    <div className="row">
      <div className="col-md-4">
        <UserProfile />
      </div>
      <div className="col-md-4">
        <Repos />
      </div>
      <div className="col-md-4">
        <Notes />
      </div>
    </div>
  )
}

export default Profile
