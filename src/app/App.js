import React from 'react';

import Main from './components/Main';
import actions from './utils/actions';

window.addEventListener('popstate', function(event) {
  const username = (event.state && event.state.username ? event.state.username : null);
  console.log(`-- popstate:  ${username}`);

  actions.setPopState({ username });
});

console.log('-- App');

const App = () => {
  // console.log('-- render:  App');
  return (
    <Main />
  )
}

export default App;
