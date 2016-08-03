import React from 'react';
// import DevTools from 'mobx-react-devtools';
// < DevTools />

import ErrorContainer from './Containers/ErrorContainer';
import KeysContainer from './Containers/KeysContainer';
import NavigatorContainer from './Containers/NavigatorContainer';
import ProfileContainer from './Containers/ProfileContainer';
import ProgressContainer from './Containers/ProgressContainer';
import SearchContainer from './Containers/SearchContainer';

const Main = () => {
  // console.log('-- render:  Main');
  return (
    <div className="main-container">
      <SearchContainer />
      <ProgressContainer />
      <KeysContainer />
      <ErrorContainer />
      <NavigatorContainer />
      <ProfileContainer />
    </div>
  )
}

export default Main;
