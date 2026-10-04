// src/hooks/use-appearance.tsx
import { useCallback, useEffect, useState } from "react";
var prefersDark = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
var setCookie = (name, value, days = 365) => {
  if (typeof document === "undefined") {
    return;
  }
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};
var applyTheme = (appearance) => {
  const isDark = appearance === "dark" || appearance === "system" && prefersDark();
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};
var mediaQuery = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
};
var handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance");
  applyTheme(currentAppearance || "system");
};
function initializeTheme() {
  const savedAppearance = localStorage.getItem("appearance") || "system";
  applyTheme(savedAppearance);
  mediaQuery()?.addEventListener("change", handleSystemThemeChange);
}
function useAppearance() {
  const [appearance, setAppearance] = useState("system");
  const updateAppearance = useCallback((mode) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    setCookie("appearance", mode);
    applyTheme(mode);
  }, []);
  useEffect(() => {
    const savedAppearance = localStorage.getItem(
      "appearance"
    );
    updateAppearance(savedAppearance || "system");
    const query = mediaQuery();
    query?.addEventListener("change", handleSystemThemeChange);
    return () => query?.removeEventListener("change", handleSystemThemeChange);
  }, [updateAppearance]);
  return { appearance, updateAppearance };
}

export {
  initializeTheme,
  useAppearance
};
//# sourceMappingURL=chunk-IQMRJXEO.js.map