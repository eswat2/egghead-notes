import React from "react"
import Navigator from "../Navigator"
import Success from "../Alerts/Success"

const NavigatorContainer = () => {
  // console.log('-- render:  NavigatorContainer');
  return (
    <div className="container">
      <Success salute="Welcome" message="search for a Github user..." />
      <Navigator />
    </div>
  )
}

export default NavigatorContainer
