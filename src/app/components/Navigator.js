import React from 'react';

import { observer } from 'mobx-react';
import actions from '../utils/actions';
import store from '../utils/store';

const NAV_STYLE = {
  marginRight: 2,
  cursor: 'pointer'
}

const Navigator = observer(() => {
  // console.log('-- render:  Navigator');
  const tags = store.data.tags;
  return (
    <div>
      {tags.map((tag,index) => <span className="label label-info" style={NAV_STYLE} key={index} onClick={() => actions.updateUser(tag)}>{tag}</span>)}
    </div>
  )
})

export default Navigator;
