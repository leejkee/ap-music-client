import { invoke } from "@tauri-apps/api/core";

interface TrackInfo {
  title: string,
  artist: string,
  album: string,
  is_playing: boolean,
}

async function main() {
  try {
    const track = await invoke<TrackInfo>("get_track_info", { mode: "test", });
    console.log(track);
  } catch (error) {
    console.error("Failed to get track:", error);
  }

}

main();