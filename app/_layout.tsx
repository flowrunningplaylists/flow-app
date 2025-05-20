import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "@/lib/supabase"; 
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";

import Home from "@/app/Home";
import Playlist from "@/app/Playlist";
import Settings from "@/app/Settings";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!session) {
    // If no session, show auth screen
    return <Auth />;
  }

  // TODO: if the user is logged in, first check if the user's spotify and strava accounts are linked
  // If user is logged in, show bottom tab navigator
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#09acbd",
          animation: "shift",
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
