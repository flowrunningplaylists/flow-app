import { useEffect, useState } from "react";
import { ImageBackground, StatusBar, Text, View } from "react-native";

type ActivityInfoRaw = {
  average_cadence: number;
  date: string;
  distance: number;
  duration: number;
  name: string;
};

type ActivityInfo = {
  average_cadence: number;
  date: Date;
  distance: number;
  duration: number;
  name: string;
};

export default function Home() {
  const [isLoadingRecents, setIsLoadingRecents] = useState(true);
  const [recents, setRecents] = useState<ActivityInfo[]>([]);

  async function getRecents() {
    try {
      const res = await fetch("https://hawkhacks2024.onrender.com/recent");
      const json = await res.json();
      setIsLoadingRecents(false);
      setRecents(
        json.map((a: ActivityInfoRaw) => ({ ...a, date: new Date(a.date) }))
      );
    } catch {
      setIsLoadingRecents(false);
    }
  }

  useEffect(() => {
    getRecents();
    StatusBar.setBarStyle("dark-content");
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <View
        style={{
          flex: 0.4,
          backgroundColor: "#97e1e8",
          margin: 0,
          // padding: 20,
          width: "100%",
          height: "100%",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          elevation: 6,
        }}
      >
        <ImageBackground
          source={require("@/assets/images/hero_afternoon.jpg")}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
          }}
          imageStyle={{
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        ></ImageBackground>
        <View
          style={{
            padding: 25,
            marginTop: -135,
          }}
        >
          <Text
            style={{
              color: "#1b3638",
              fontSize: 36,
            }}
          >
            Good afternoon, Fred!
          </Text>
          <Text
            style={{
              color: "#1b3638",
              fontSize: 18,
            }}
          >
            Welcome back to Flow!
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.3,
          width: "100%",
          paddingLeft: 25,
          paddingRight: 25,
          paddingTop: 26,
          paddingBottom: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginRight: 84,
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 36, fontWeight: "bold", color: "#09acbd" }}
            >
              {Math.floor(
                recents.map((a) => a.duration).reduce((a, b) => a + b, 0) / 360
              ) / 10}
            </Text>
            <Text style={{ textAlign: "center" }}>
              hours of activity in{"\n"}the last week
            </Text>
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{ fontSize: 36, fontWeight: "bold", color: "#09acbd" }}
            >
              {recents.length}
            </Text>
            <Text style={{ textAlign: "center" }}>
              sessions in {"\n"}the last week
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{ fontSize: 36, fontWeight: "bold", color: "#09acbd" }}
            >
              {(function () {
                const validRecents = recents.filter(
                  (a) => a.average_cadence != null
                );
                return (
                  Math.round(
                    (validRecents
                      .map((a) => a.average_cadence)
                      .reduce((a, b) => a + b, 0) /
                      Math.max(validRecents.length, 1)) *
                      10
                  ) / 10
                );
              })()}
              /min
            </Text>
            <Text>average cadence</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.385,
          margin: 10,
          padding: 25,
          borderRadius: 32,
          width: "95%",
          height: "95%",
          backgroundColor: "white",
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 21, marginBottom: 15 }}>Recent activity</Text>
        {isLoadingRecents ? (
          <View style={{ margin: "auto" }}>
            <Text>Loading...</Text>
          </View>
        ) : (
          recents.slice(0, 3).map((activity, i) => {
            return (
              <View
                style={{
                  padding: 0,
                  marginBottom: 15,
                }}
                key={i}
              >
                <View style={{ flexDirection: "row", paddingBottom: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#28919c",
                      fontSize: 17,
                    }}
                  >
                    {(function (n) {
                      if (n.length > 35) {
                        return n.slice(0, 35) + "...";
                      }
                      return n;
                    })(activity.name)}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#28919c",
                      fontSize: 17,
                    }}
                  >
                    {(function (d) {
                      const seconds = d % 60;
                      const minutes = Math.floor((d % 3600) / 60);
                      const hours = Math.floor(
                        (d - minutes * 60 - seconds) / 3600
                      );
                      let result = "";
                      if (hours > 0) {
                        result += `${hours}h `;
                      }
                      if (minutes > 0) {
                        result += `${minutes}m `;
                      }
                      if (seconds > 0) {
                        result += `${seconds}s `;
                      }
                      return result.trimEnd();
                    })(activity.duration)}
                  </Text>
                </View>
                <Text style={{ color: "#909090" }}>
                  {activity.date.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
                <Text>
                  {Math.round(activity.distance).toLocaleString()} meters,{" "}
                  {activity.average_cadence}/min cadence
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}
