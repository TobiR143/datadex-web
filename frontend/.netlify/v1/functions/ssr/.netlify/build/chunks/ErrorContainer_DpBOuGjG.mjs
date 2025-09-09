import { jsx, jsxs } from 'react/jsx-runtime';
/* empty css                                  */

const InfoIcon = ({ color, size }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size || 18,
      height: size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" }),
        /* @__PURE__ */ jsx("path", { d: "M12 9h.01" }),
        /* @__PURE__ */ jsx("path", { d: "M11 12h1v4h1" })
      ]
    }
  );
};
const MoreIcon = ({ color }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
        /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
      ]
    }
  );
};
const SwordIcon = ({ color }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" }),
        /* @__PURE__ */ jsx("path", { d: "M6.5 11.5l6 6" })
      ]
    }
  );
};
const MenuIcon = ({ color }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }),
        /* @__PURE__ */ jsx("path", { d: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" }),
        /* @__PURE__ */ jsx("path", { d: "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" })
      ]
    }
  );
};
const HomeIcon = ({ color }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: color,
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"
        }
      )
    }
  );
};
const MusicNoteIcon = ({ color }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      height: "18px",
      width: "18px",
      viewBox: "0 -960 960 960",
      fill: color,
      stroke: color || "#000000",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"
        }
      )
    }
  );
};
const SettingsIcon = () => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 50 50",
      fill: "#999999",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"
        }
      )
    }
  );
};
const VoiceIcon = ({ color, size }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      height: size || 18,
      width: size || 18,
      viewBox: "0 -960 960 960",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M480-520q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-320 400v-80q0-40 20-73t53-53q60-32 122-48t125-16q63 0 125 16t122 48q33 20 53 53t20 73v80H160Z",
            fill: color
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "m798-322-62-62q44-41 69-97t25-119q0-63-25-118t-69-96l62-64q56 53 89 125t33 153q0 81-33 153t-89 125Z",
            fill: color
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M670-450l-64-64q18-17 29-38.5t11-47.5q0-26-11-47.5T606-686l64-64q32 29 50 67.5t18 82.5q0 44-18 82.5T670-450Z",
            fill: color
          }
        )
      ]
    }
  );
};
const StopIcon = ({ color }) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      height: "18px",
      width: "18px",
      viewBox: "0 -960 960 960",
      fill: color || "#000000",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M320-320h320v-320H320v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
        }
      )
    }
  );
};
const CloseIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#3b3265",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }),
        /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })
      ]
    }
  );
};
const MaleIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#2b2c5f",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }),
        /* @__PURE__ */ jsx("path", { d: "M19 5l-5.4 5.4" }),
        /* @__PURE__ */ jsx("path", { d: "M19 5h-5" }),
        /* @__PURE__ */ jsx("path", { d: "M19 5v5" })
      ]
    }
  );
};
const FemaleIcon = () => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#641459",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" }),
        /* @__PURE__ */ jsx("path", { d: "M12 14v7" }),
        /* @__PURE__ */ jsx("path", { d: "M9 18h6" })
      ]
    }
  );
};
const RightArrowIcon = ({ color, size }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size || 18,
      height: size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" }),
        /* @__PURE__ */ jsx("path", { d: "M16 12l-4 -4" }),
        /* @__PURE__ */ jsx("path", { d: "M16 12h-8" }),
        /* @__PURE__ */ jsx("path", { d: "M12 16l4 -4" })
      ]
    }
  );
};
const LeftArrowIcon = ({ color, size }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size || 18,
      height: size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color || "#000000",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18" }),
        /* @__PURE__ */ jsx("path", { d: "M8 12l4 4" }),
        /* @__PURE__ */ jsx("path", { d: "M8 12h8" }),
        /* @__PURE__ */ jsx("path", { d: "M12 8l-4 4" })
      ]
    }
  );
};

const ErrorContainer = ({ error }) => {
  return /* @__PURE__ */ jsxs("div", { className: "error-container", children: [
    /* @__PURE__ */ jsx("p", { className: "error-status", children: error.status }),
    /* @__PURE__ */ jsx("p", { className: "error-message", children: error.message }),
    /* @__PURE__ */ jsxs("a", { className: "home-redirect", href: "/", children: [
      /* @__PURE__ */ jsx(HomeIcon, { color: "#cd5353" }),
      "Home"
    ] })
  ] });
};

export { CloseIcon as C, ErrorContainer as E, FemaleIcon as F, HomeIcon as H, InfoIcon as I, LeftArrowIcon as L, MusicNoteIcon as M, RightArrowIcon as R, StopIcon as S, VoiceIcon as V, SettingsIcon as a, MaleIcon as b, SwordIcon as c, MoreIcon as d, MenuIcon as e };
