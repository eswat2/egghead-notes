import { observable } from 'mobx';

const USER_KEY   = 'AppStore.username';
const trunc_path = (str, pattern) => {
  return (str.indexOf(pattern) !== -1) ? str.slice(str.indexOf(pattern) + pattern.length) : null;
}

let singleton = null;
let ticker    = 0;

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
    kounter:0,
    popState:null
  });

  init() {
    let user = localStorage.getItem(USER_KEY);
    let parm = trunc_path(location.pathname, '/profile/');
    let who  = ( user ? (parm && parm !== user ? parm : user) : null );
    console.log(`-- initStore:  ${who}`);
    // console.log(location);
    // console.log(parm);
    singleton.data.username = who;
  }

  ping() {
    let kount = singleton.data.kounter;
    if (ticker === 5) {
      ticker = 0;
      singleton.data.kounter = (kount === 100) ? 0 : kount + 1;
    }
    else {
      ticker++;
    }
  }

  saveUser(username) {
    if (username !== null) {
      console.log(`-- saveUser:  ${username}`);
      localStorage.setItem(USER_KEY, username);
    }
  }
}

singleton = new AppStore();

export default singleton;
