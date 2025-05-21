import { Text, Button, View, StyleSheet } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { supabase } from "@/lib/supabase";
import Constants from "expo-constants";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"
import { useEffect } from "react";
// Guide: https://docs.expo.dev/guides/authentication/

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;
const CLIENT_ID_STRAVA = Constants.expoConfig?.extra?.CLIENT_ID_STRAVA;

WebBrowser.maybeCompleteAuthSession();

// Docs: https://docs.expo.dev/versions/latest/sdk/auth-session/#discoverydocument
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  // TODO: add revocation endpoint, which is needed when the user wants to disconnect their strava account
};



export default function Settings() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Docs: https://docs.expo.dev/versions/latest/sdk/auth-session/#useauthrequestconfig-discovery
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID_STRAVA,
      scopes: ['activity:read_all'],
      redirectUri: makeRedirectUri({
        scheme: BASE_URL
      }),
    },
    discovery
  );

  useEffect(() => {
    const exchangeToken = async () => {
      if (response?.type === 'success') {
        const { code } = response.params;

        const res = await fetch(`${BASE_URL}/strava/token/${code}/su.adeline@gmail.com`);
        if (res.status == 200) {
          console.log("Successfully authenticated Strava!")
        } else {
          console.error("Error making backend call to /strava/token")
        }
      }
    };
    exchangeToken();
  }, [response]);


  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} color="#e63946" />
      {/* TODO: Conditional text */}
      <Text>You have not connected your Strava account yet</Text>
      <Button 
        disabled={!request}
        title="Connect Strava" 
        onPress={() => {
          promptAsync();
        }}
        color="#43c625" 
      />
      {/* TODO: Conditional text */}
      <Text>You have not connected your Spotify account yet</Text>
      {/* <Button title="Connect Spotify" onPress={handleSpotifyConnect} color="#43c625" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16, 
  },
});
