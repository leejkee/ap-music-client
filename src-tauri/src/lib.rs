use tauri::{webview::WebviewWindowBuilder, WebviewUrl};


#[derive(serde::Serialize)]
struct TrackInfo {
    title: String,
    artist: String,
    album: String,
    is_playing: bool,
}

#[tauri::command]
fn get_track_info(mode: String) -> Result<TrackInfo, String> {
    if mode != "current" {
        return Err(format!("unsupported track mode: {mode}"));
    }

    Ok(TrackInfo {
        title: "Hello World".to_string(),
        artist: "Unknow Artist".to_string(),
        album: "Unknow Album".to_string(),
        is_playing: false,
    })
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn hello_world() -> String {
    "Hello World from Rust".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![hello_world])
        .invoke_handler(tauri::generate_handler![get_track_info])
        .setup(|app| {
            let url = "https://music.apple.com/"
                .parse()
                .expect("invalid Apple Music URL");

            WebviewWindowBuilder::new(
                app,
                "apple-music",
                WebviewUrl::External(url),
            )
            .title("Apple Music")
            .initialization_script(include_str!("../scripts/apple-music.js"))
            .build()?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
