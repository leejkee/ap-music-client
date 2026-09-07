import { invoke } from "@tauri-apps/api/core";

async function main() {
  const message = await invoke<string>("hello_world");
  const element = document.querySelector<HTMLHeadingElement>("#message");

  if (element)
  {
    element.textContent = message;
  }
}

main();