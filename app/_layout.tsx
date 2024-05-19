import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Playlists from "./Playlists";
import Settings from "./Settings";
// import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#29ccd9"
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="music" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
