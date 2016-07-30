import React from 'react';
import Danger from '../Alerts/Danger';

import { observer } from 'mobx-react';
import store from '../../utils/store';

const ErrorContainer = observer(() => {
  // console.log('-- render:  ErrorContainer');
  const error = store.error.value;
  return (
    <div className="container">
      { error === true ? <Danger salute="Error" message="user does not exist..." /> : null }
    </div>
  )
})

export default ErrorContainer;
