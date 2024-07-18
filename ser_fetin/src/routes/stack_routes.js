import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoggedOut from '../pages/loggedOut';
import Login from '../pages/login';
import User from '../pages/user';
import Register from '../pages/register';
import RoutesTab from './tab_routes';
import Reminder from '../pages/addReminder';
import Password from '../pages/updatePass';
import Notification from '../pages/notification/config';
import Detail from "../pages/list/detail";
import NewPassword from '../pages/updatePass/index.login';


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="LoggedOut"
                component={LoggedOut}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={RoutesTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Reminder"
                component={Reminder}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}
            />            
            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Password"
                component={Password}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
            />
        </Stack.Navigator>
    )
}