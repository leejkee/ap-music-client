(() => {
  if (location.origin !== "https://music.apple.com") {
    return;
  }

  const NAVIGATION_ID = "am-client-navigation";

  function createIcon(path) {
    return `
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="${path}" />
      </svg>
    `;
  }

  function createNavigationButton({
    id,
    title,
    icon,
    onClick,
  }) {
    const button = document.createElement("button");

    button.id = id;
    button.type = "button";
    button.title = title;
    button.setAttribute("aria-label", title);
    button.className = "am-client-nav-button";
    button.innerHTML = icon;

    button.addEventListener("click", onClick);

    return button;
  }

  function addNavigationButtons() {
    if (document.getElementById(NAVIGATION_ID)) {
      return;
    }

    const style = document.createElement("style");

    style.textContent = `
      #${NAVIGATION_ID} {
        position: fixed;
        top: 12px;
        right: 16px;
        z-index: 2147483647;

        display: flex;
        gap: 8px;

        pointer-events: auto;
      }

      #${NAVIGATION_ID} .am-client-nav-button {
        all: unset;

        width: 36px;
        height: 36px;

        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;
        border-radius: 9px;

        color: rgba(0, 0, 0, 0.72);

        background: rgba(245, 245, 247, 0.62);

        border: 1px solid rgba(255, 255, 255, 0.55);

        box-shadow:
          0 1px 2px rgba(0, 0, 0, 0.08),
          0 4px 12px rgba(0, 0, 0, 0.06);

        backdrop-filter:
          saturate(180%)
          blur(18px);

        -webkit-backdrop-filter:
          saturate(180%)
          blur(18px);

        cursor: pointer;
        user-select: none;

        transition:
          background 120ms ease,
          transform 80ms ease,
          box-shadow 120ms ease;
      }

      #${NAVIGATION_ID} .am-client-nav-button:hover {
        background: rgba(255, 255, 255, 0.78);

        box-shadow:
          0 1px 3px rgba(0, 0, 0, 0.10),
          0 5px 14px rgba(0, 0, 0, 0.08);
      }

      #${NAVIGATION_ID} .am-client-nav-button:active {
        transform: scale(0.94);

        background: rgba(230, 230, 232, 0.78);
      }

      #${NAVIGATION_ID} .am-client-nav-button:focus-visible {
        outline: 2px solid rgba(0, 122, 255, 0.65);
        outline-offset: 2px;
      }

      @media (prefers-color-scheme: dark) {
        #${NAVIGATION_ID} .am-client-nav-button {
          color: rgba(255, 255, 255, 0.82);

          background: rgba(55, 55, 58, 0.58);

          border-color: rgba(255, 255, 255, 0.12);

          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.25),
            0 4px 14px rgba(0, 0, 0, 0.20);
        }

        #${NAVIGATION_ID} .am-client-nav-button:hover {
          background: rgba(75, 75, 78, 0.72);
        }

        #${NAVIGATION_ID} .am-client-nav-button:active {
          background: rgba(45, 45, 48, 0.78);
        }
      }
    `;

    document.head.appendChild(style);

    const navigation = document.createElement("div");
    navigation.id = NAVIGATION_ID;

    const backButton = createNavigationButton({
      id: "am-client-back-button",
      title: "返回",
      icon: createIcon("M15 18l-6-6 6-6"),
      onClick: () => history.back(),
    });

    const forwardButton = createNavigationButton({
      id: "am-client-forward-button",
      title: "前进",
      icon: createIcon("M9 18l6-6-6-6"),
      onClick: () => history.forward(),
    });

    navigation.append(backButton, forwardButton);

    document.body.appendChild(navigation);
  }

  if (document.body) {
    addNavigationButtons();
  } else {
    window.addEventListener(
      "DOMContentLoaded",
      addNavigationButtons,
      { once: true },
    );
  }
})();