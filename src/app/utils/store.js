import { observable } from 'mobx';

let store = {
  error:    observable({value:false}),
  username: observable({value:null}),
  bio:      observable({value:{}}),
  repos:    observable({value:[]}),
  notes:    observable({value:[]}),
  tags:     observable({value:[]}),
  kounter:  observable({value:100}),
  ktype:    observable({value:'warning'}),
  keys:     observable({value:[]}),
  popState: observable({value:null})
};

export default store;
