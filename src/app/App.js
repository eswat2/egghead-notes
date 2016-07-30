import React from 'react';

import Main from './components/Main';
import store from './utils/store';

window.addEventListener('popstate', function(event) {
  const username = (event.state && event.state.username ? event.state.username : null);
  console.log(`-- popstate:  ${username}`);

  store.popState.value = { username };
});

console.log('-- App');

const App = () => {
  // console.log('-- render:  App');
  return (
    <Main />
  )
}

export default App;
