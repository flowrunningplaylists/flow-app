import { Button, View } from "react-native";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";

export default function Settings() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} color="#e63946" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
