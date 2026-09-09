// src/locales/context.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var EMPTY = {};
var UiLocaleContext = createContext(EMPTY);
function UiLocaleProvider({
  labels,
  children
}) {
  return /* @__PURE__ */ jsx(UiLocaleContext.Provider, { value: labels, children });
}
function useUiLocale() {
  return useContext(UiLocaleContext);
}
function defined(source) {
  if (!source) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== void 0)
  );
}
function useUiLabels(section, defaults, overrides) {
  const locale = useUiLocale();
  return {
    ...defaults,
    ...defined(locale[section]),
    ...defined(overrides)
  };
}

export {
  UiLocaleProvider,
  useUiLocale,
  useUiLabels
};
//# sourceMappingURL=chunk-ZZDRO234.js.map