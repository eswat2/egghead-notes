import { observable } from 'mobx';

const USER_KEY  = 'AppStore.username';

class AppStore {
  //
  // NOTE:  this is the observable data for the store...
  //
  // ** using the function wrapper for observable to make it
  //    compatible with the new create-react-app tool
  //
  //
  data = observable({
    error:false,
    username:null,
    bio:{},
    repos:[],
    notes:[],
    tags:[],
    popState:null
  });

  saveUser(username) {
    if (username !== null) {
      console.log(`-- saveUser:  ${username}`);
      localStorage.setItem(USER_KEY, username);
    }
  }
}

const singleton = new AppStore();

const _truncatePath  = (str, pattern) => {
  return (str.indexOf(pattern) !== -1) ? str.slice(str.indexOf(pattern) + pattern.length) : null;
}

const initStore = () => {
  let user = localStorage.getItem(USER_KEY);
  let parm = _truncatePath(location.pathname, '/profile/');
  let who  = ( user ? (parm && parm !== user ? parm : user) : null );
  console.log(`-- initStore:  ${who}`);
  // console.log(location);
  // console.log(parm);
  singleton.data.username = who;
}

initStore();

export default singleton;
