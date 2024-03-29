import React from "react"
import SearchGithub from "../SearchGithub"

const SearchContainer = () => {
  // console.log('-- render:  SearchContainer');
  return (
    <nav
      className="navbar navbar-default"
      style={{ marginBottom: 0, borderRadius: 0 }}
    >
      <div className="col-sm-7 col-sm-offset-2" style={{ marginTop: 15 }}>
        <SearchGithub />
      </div>
    </nav>
  )
}

export default SearchContainer
