import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function Playlists() {
  const activityTypes = [
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Hiking", value: "hiking" },
  ];

  const [activityType, setActivityType] = useState("running");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Dropdown
          data={activityTypes}
          labelField={"label"}
          valueField={"value"}
          onChange={(item) => {
            setActivityType(item.value);
          }}
          value={activityType}
        ></Dropdown>
      </View>
      <View></View>
    </View>
  );
}
