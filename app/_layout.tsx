import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Playlist from "./Playlist";
import Settings from "./Settings";
import { NavigationContainer } from "@react-navigation/native";
// import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#09acbd",
          animation: "shift"
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
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
    </NavigationContainer>
  );
}
