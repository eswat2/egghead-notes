import React from 'react';

import { observer } from 'mobx-react';
import store from '../../utils/store';

const ProgressContainer = observer(() => {
  // console.log('-- render:  ProgressContainer');
  return (
    <div className="progress" style={{height:2,borderRadius:0}}>
      <div className="progress-bar progress-bar-info" role="progressbar" style={{width: store.data.kounter + '%'}}>
      </div>
    </div>
  )
})

export default ProgressContainer;
