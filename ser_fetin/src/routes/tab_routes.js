import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

import Home from '../pages/home';
import Settings from '../pages/settings';
import HouseState from '../pages/houseState';
import Geolocalization from '../pages/geo';

const Tab = createBottomTabNavigator();

export default function RoutesTab(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({color, size}) => <FontAwesome6 name='list-alt' color={color} size={size}/>,
                        tabBarLabel: 'Meus lembretes'
                    }}
                />
                <Tab.Screen
                    name="HouseState"
                    component={HouseState}
                    options={{
                        tabBarIcon: ({color, size}) => <FontAwesome6 name='house-lock' color={color} size={size}/>,
                        tabBarLabel: 'Estado da casa'
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
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({color, size}) => <Feather name='settings' color={color} size={size}/>,
                        tabBarLabel: 'Configuração'
                    }}
                />
        </Tab.Navigator>
    )
}