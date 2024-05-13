import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Home from '../pages/home';
import Reminder from '../pages/addReminder';
import Geolocalization from '../pages/geo';

const Tab = createBottomTabNavigator();

export default function RoutesTab(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name='home' color={color} size={size}/>,
                        tabBarLabel: 'Meus lembretes'
                    }}
                />
                <Tab.Screen
                    name="Reminder"
                    component={Reminder}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name='plus-circle' color={color} size={size}/>,
                        tabBarLabel: 'Add lembretes'
                    }}
                />
                <Tab.Screen
                    name="Geolocalization"
                    component={Geolocalization}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name='map' color={color} size={size}/>,
                        tabBarLabel: 'Geolocalização'
                    }}
                />
        </Tab.Navigator>
    )
}