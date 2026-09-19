// src/locales/context.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var EMPTY = {};
var UiLocaleContext = createContext(EMPTY);
var UiDateLocaleContext = createContext(void 0);
function UiLocaleProvider({
  labels,
  dateLocale,
  children
}) {
  return /* @__PURE__ */ jsx(UiLocaleContext.Provider, { value: labels, children: /* @__PURE__ */ jsx(UiDateLocaleContext.Provider, { value: dateLocale, children }) });
}
function useUiLocale() {
  return useContext(UiLocaleContext);
}
function useUiDateLocale() {
  return useContext(UiDateLocaleContext);
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
  useUiDateLocale,
  useUiLabels
};
//# sourceMappingURL=chunk-DVCOHMNY.js.map