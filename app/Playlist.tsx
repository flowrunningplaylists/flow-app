import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

type SongInfo = {
  name: string;
  artist: string[];
  image: string[];
  length: number;
  bpm: number;
  running_bpm: number;
};

function RoundButton({
  title,
  onPressed,
  style,
}: {
  title: string;
  onPressed: (e: any) => void;
  style: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPressed} style={style} android_ripple={{}}>
      <View
        style={{
          backgroundColor: "#09acbd",
          padding: 10,
          width: "100%",
          height: "100%",
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default function Playlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState<SongInfo[]>([]);

  async function getSongs() {
    try {
      const res = await fetch("https://hawkhacks2024.onrender.com/playlists");
      const json = await res.json();
      setIsLoading(false);
      setSongs(Object.keys(json).map((key) => json[key]));
    } catch {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <ScrollView>
          {songs.map((song, i) => {
            return (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 12,
                  paddingBottom: 4,
                }}
                key={i}
              >
                <Image
                  source={{ uri: song.image[song.image.length - 1] }}
                  height={48}
                  width={48}
                  style={{
                    marginRight: 12,
                    borderRadius: 8,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", marginBottom: 2 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {song.name.length > 34
                        ? song.name.slice(0, 34) + "..."
                        : song.name}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#28919c",
                      }}
                    >
                      {(function (d) {
                        const seconds = d % 60;
                        const minutes = Math.floor((d % 3600) / 60);
                        return `${minutes}:${Math.floor(seconds)
                          .toString()
                          .padStart(2, "0")}`;
                      })(song.length)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "normal" }}>
                      {song.artist.join(", ")}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text style={{ fontWeight: "normal" }}>
                      {Math.round(song.bpm * 10) / 10}{" "}
                      {song.bpm != song.running_bpm
                        ? `(${Math.round(song.running_bpm * 10) / 10}) `
                        : ""}
                      BPM
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.07,
          flexDirection: "row",
          backgroundColor: "white",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          padding: 10,
          width: "100%",
          elevation: 2,
        }}
      >
        <RoundButton
          title="Add to Queue"
          onPressed={() => {}}
          style={{ flex: 1, marginRight: 4 }}
        />
        <RoundButton
          title="Make Playlist"
          onPressed={() => {}}
          style={{ flex: 1, marginLeft: 4 }}
        />
      </View>
    </View>
  );
}
