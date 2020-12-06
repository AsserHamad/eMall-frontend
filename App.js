import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {HomeScreen, ProfileScreen} from './screens';

const DrawerNavigator = createDrawerNavigator({
  HomeScreen,
  ProfileScreen
});

export default createAppContainer(DrawerNavigator);