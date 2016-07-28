import React from 'react';

import ErrorContainer from './Containers/ErrorContainer';
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
      <ErrorContainer />
      <NavigatorContainer />
      <ProfileContainer />
    </div>
  )
}

export default Main;
