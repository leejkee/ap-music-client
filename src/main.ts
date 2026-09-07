import { invoke } from "@tauri-apps/api/core";

interface TrackInfo {
  title: string,
  artist: string,
  album: string,
  is_playing: boolean,
}

async function main() {
  const track = await invoke<TrackInfo>("get_track_info");

  console.log(track);
}

main();