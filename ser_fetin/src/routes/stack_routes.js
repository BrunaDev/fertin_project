import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoggedOut from '../pages/loggedOut';
import Login from '../pages/login';
import Register from '../pages/register';
import RoutesTab from './tab_routes';

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
        </Stack.Navigator>
    )
}