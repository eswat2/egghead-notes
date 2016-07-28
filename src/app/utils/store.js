import { observable } from 'mobx';

let singleton = null;

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
    kounter:100,
    ktype:'danger',
    popState:null
  });
}

singleton = new AppStore();

export default singleton;
