import React, {useState} from 'react';
import { withNavigationFocus, withNavigation } from 'react-navigation';

const ComponentWithFocus = (props) => {
  const {isFocused, onFocus, onBlur} = props;
  const [focused, setFocused] = useState(false);

  if(isFocused !== focused) {
    if(isFocused) {
      typeof onFocus === 'function' ? onFocus() : null;
      setFocused(true)
    } else {
      typeof onBlur === 'function' ? onBlur() : null;
      setFocused(false)
    }
  }
  return (
    props.children
  )
}

export default withNavigationFocus(withNavigation(ComponentWithFocus));