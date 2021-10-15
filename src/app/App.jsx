/* eslint no-console: "off" */
import React from "react"

import Main from "./components/Main"
import actions from "./utils/actions"

const handlePopState = (event) => {
  const username =
    event.state && event.state.username ? event.state.username : null
  console.log(`-- popstate:  ${username}`)

  actions.setPopState({ username })
}

window.addEventListener("popstate", handlePopState)

console.log("-- App")

const App = () => {
  // console.log('-- render:  App');
  return <Main />
}

export default App
