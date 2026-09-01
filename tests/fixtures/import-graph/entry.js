import "./nested/side-effect.js";

export const lazily = () => import("./lazily-imported.js");
