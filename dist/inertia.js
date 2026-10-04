'use client';

"use client";
import {
  LoginFormPreset,
  NotificationBell,
  TourProvider,
  twoFactorLabels
} from "./chunk-BN32UWAP.js";
import "./chunk-EGSXD4CF.js";
import "./chunk-4SF3ZO5K.js";
import "./chunk-5NZLIF7G.js";
import "./chunk-HD6ICFDS.js";
import "./chunk-RE7X3RE5.js";
import {
  AppSidebar,
  AppSidebarHeader,
  Breadcrumbs,
  NavMain,
  SettingsLayout
} from "./chunk-XJW6ZLIX.js";
import "./chunk-26F7YRPL.js";
import "./chunk-YN4JPUUI.js";
import {
  hrefToString
} from "./chunk-APUJ4CKT.js";
import "./chunk-EXTOGROG.js";
import "./chunk-D73FKPPI.js";
import "./chunk-KKPB4LLT.js";
import {
  useUiLabels
} from "./chunk-QSJCKBMI.js";
import "./chunk-H26GY6FP.js";
import "./chunk-XN5WW7OR.js";

// src/inertia.ts
import { Form, Link, router as router2, usePage, usePoll } from "@inertiajs/react";
import {
  createElement,
  useEffect as useEffect3,
  useRef as useRef3
} from "react";

// src/inertia-table-filters.ts
import { useCallback, useEffect, useRef, useState } from "react";
var DEFAULT_DEBOUNCE = 300;
function toQuery(filters) {
  const query = {};
  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value)) {
      const values = value.filter((entry) => entry !== "");
      if (values.length > 0) {
        query[key] = values;
      }
      continue;
    }
    if (value === null || value === void 0 || value === "") {
      continue;
    }
    query[key] = String(value);
  }
  return query;
}
function toFilterValues(filters, exclude = []) {
  const values = {};
  for (const [key, value] of Object.entries(toQuery(filters))) {
    if (exclude.includes(key)) {
      continue;
    }
    values[key] = Array.isArray(value) ? value : [value];
  }
  return values;
}
function createTableFiltersHook(router3) {
  return function useTableFilters2({
    url,
    filters,
    only,
    searchKey = "search",
    pageKey = "page",
    debounce = DEFAULT_DEBOUNCE
  }) {
    const initialSearch = filters[searchKey];
    const [search, setSearchState] = useState(
      typeof initialSearch === "string" ? initialSearch : ""
    );
    const timer = useRef(null);
    const pending = useRef(null);
    const state = useRef({ url, filters, only, searchKey, pageKey });
    state.current = { url, filters, only, searchKey, pageKey };
    const visit = useCallback(
      (changes) => {
        const current = state.current;
        pending.current?.cancel();
        router3.visit(current.url, {
          data: toQuery({ ...current.filters, ...changes }),
          ...current.only ? { only: current.only } : {},
          preserveState: true,
          preserveScroll: true,
          replace: true,
          onCancelToken: (token) => {
            pending.current = token;
          }
        });
      },
      []
    );
    const cancelPendingSearch = useCallback(() => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, []);
    useEffect(() => cancelPendingSearch, [cancelPendingSearch]);
    const setSearch = useCallback(
      (value) => {
        setSearchState(value);
        cancelPendingSearch();
        timer.current = setTimeout(() => {
          timer.current = null;
          visit({
            [state.current.searchKey]: value,
            [state.current.pageKey]: null
          });
        }, debounce);
      },
      [cancelPendingSearch, debounce, visit]
    );
    const setFilter = useCallback(
      (key, values) => {
        cancelPendingSearch();
        visit({ [key]: values, [state.current.pageKey]: null });
      },
      [cancelPendingSearch, visit]
    );
    const clearFilters = useCallback(() => {
      cancelPendingSearch();
      setSearchState("");
      const current = state.current;
      const cleared = Object.fromEntries(
        Object.keys(current.filters).map((key) => [key, null])
      );
      visit({ ...cleared, [current.pageKey]: null });
    }, [cancelPendingSearch, visit]);
    const setPage = useCallback(
      (pageIndex) => {
        visit({
          [state.current.pageKey]: pageIndex > 0 ? pageIndex + 1 : null
        });
      },
      [visit]
    );
    const apply = useCallback(
      (changes) => {
        cancelPendingSearch();
        visit({ ...changes, [state.current.pageKey]: null });
      },
      [cancelPendingSearch, visit]
    );
    return {
      search,
      setSearch,
      filterValues: toFilterValues(filters, [searchKey, pageKey]),
      setFilter,
      clearFilters,
      setPage,
      apply
    };
  };
}

// src/inertia-tour-progress.ts
function xsrfToken() {
  const cookie = document.cookie.split("; ").find((entry) => entry.startsWith("XSRF-TOKEN="));
  return cookie ? decodeURIComponent(cookie.slice("XSRF-TOKEN=".length)) : "";
}
function recordTourProgress(url, progress) {
  void fetch(url, {
    method: "POST",
    credentials: "same-origin",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-XSRF-TOKEN": xsrfToken()
    },
    body: JSON.stringify({
      version: progress.version,
      last_step: progress.lastStep,
      outcome: progress.outcome
    })
  });
}

// src/inertia-two-factor.ts
import { router } from "@inertiajs/react";
import { useCallback as useCallback2, useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";

// src/lib/fortify-two-factor.ts
async function fetchFortifyJson(url) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest"
    }
  });
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with ${response.status}`);
  }
  return await response.json();
}

// src/inertia-two-factor.ts
function useFortifyTwoFactor({
  urls,
  enabled,
  labels
}) {
  const text = useUiLabels("twoFactor", twoFactorLabels, labels);
  const textRef = useRef2(text);
  const [qrCodeSvg, setQrCodeSvg] = useState2();
  const [manualSetupKey, setManualSetupKey] = useState2(null);
  const [recoveryCodes, setRecoveryCodes] = useState2([]);
  const [errors, setErrors] = useState2([]);
  const [enabling, setEnabling] = useState2(false);
  const [setupOpen, setSetupOpen] = useState2(false);
  const codesRequest = useRef2(null);
  useEffect2(() => {
    textRef.current = text;
  });
  const qrCodeUrl = hrefToString(urls.qrCode);
  const secretKeyUrl = hrefToString(urls.secretKey);
  const recoveryCodesUrl = hrefToString(urls.recoveryCodes);
  const enableUrl = hrefToString(urls.enable);
  const confirmUrl = hrefToString(urls.confirm);
  const regenerateUrl = hrefToString(urls.regenerateRecoveryCodes);
  const disableUrl = hrefToString(urls.disable);
  const fail = useCallback2((label) => {
    const message = textRef.current[label];
    setErrors(
      (current) => current.includes(message) ? current : [...current, message]
    );
  }, []);
  const fetchQrCode = useCallback2(async () => {
    try {
      const { svg } = await fetchFortifyJson(qrCodeUrl);
      setQrCodeSvg(svg);
    } catch {
      setQrCodeSvg(void 0);
      fail("qrCodeErrorLabel");
    }
  }, [qrCodeUrl, fail]);
  const fetchSetupKey = useCallback2(async () => {
    try {
      const { secretKey } = await fetchFortifyJson(
        secretKeyUrl
      );
      setManualSetupKey(secretKey);
    } catch {
      setManualSetupKey(null);
      fail("setupKeyErrorLabel");
    }
  }, [secretKeyUrl, fail]);
  const fetchSetupData = useCallback2(async () => {
    setErrors([]);
    await Promise.all([fetchQrCode(), fetchSetupKey()]);
  }, [fetchQrCode, fetchSetupKey]);
  const fetchRecoveryCodes = useCallback2(() => {
    if (codesRequest.current) {
      return codesRequest.current;
    }
    setErrors([]);
    const request = fetchFortifyJson(recoveryCodesUrl).then((codes) => setRecoveryCodes(codes)).catch(() => {
      setRecoveryCodes([]);
      fail("recoveryCodesErrorLabel");
    }).finally(() => {
      codesRequest.current = null;
    });
    codesRequest.current = request;
    return request;
  }, [recoveryCodesUrl, fail]);
  const clearSetupData = useCallback2(() => {
    setQrCodeSvg(void 0);
    setManualSetupKey(null);
    setErrors([]);
  }, []);
  const hasSetupData = qrCodeSvg !== void 0 && manualSetupKey !== null;
  useEffect2(() => {
    if (enabled && recoveryCodes.length === 0) {
      void fetchRecoveryCodes();
    }
  }, [enabled, recoveryCodes.length, fetchRecoveryCodes]);
  const enable = useCallback2(() => {
    if (hasSetupData) {
      setSetupOpen(true);
      return;
    }
    router.post(
      enableUrl,
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onStart: () => setEnabling(true),
        onFinish: () => setEnabling(false),
        onSuccess: () => setSetupOpen(true)
      }
    );
  }, [hasSetupData, enableUrl]);
  const confirm = useCallback2(
    (code) => new Promise((resolve, reject) => {
      let answered = false;
      router.post(
        confirmUrl,
        { code },
        {
          errorBag: "confirmTwoFactorAuthentication",
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            answered = true;
            void fetchRecoveryCodes().then(resolve);
          },
          onError: (bag) => {
            answered = true;
            reject(new Error(Object.values(bag).join(" ")));
          },
          onFinish: () => {
            if (!answered) {
              reject(
                new Error(
                  textRef.current.errorFallbackLabel
                )
              );
            }
          }
        }
      );
    }),
    [confirmUrl, fetchRecoveryCodes]
  );
  const regenerate = useCallback2(
    () => new Promise((resolve) => {
      let refreshing = false;
      router.post(
        regenerateUrl,
        {},
        {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            refreshing = true;
            void fetchRecoveryCodes().then(resolve);
          },
          onFinish: () => {
            if (!refreshing) {
              resolve();
            }
          }
        }
      );
    }),
    [regenerateUrl, fetchRecoveryCodes]
  );
  const disable = useCallback2(
    () => new Promise((resolve) => {
      router.delete(disableUrl, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setRecoveryCodes([]);
          clearSetupData();
        },
        onFinish: () => resolve()
      });
    }),
    [disableUrl, clearSetupData]
  );
  return {
    qrCodeSvg,
    manualSetupKey,
    recoveryCodes,
    errors,
    enabling,
    setupOpen,
    setSetupOpen,
    enable,
    confirm,
    regenerate,
    disable,
    fetchSetupData,
    fetchRecoveryCodes,
    clearSetupData,
    setupDialogProps: {
      open: setupOpen,
      onOpenChange: setSetupOpen,
      enabled,
      qrCodeSvg,
      manualSetupKey,
      recoveryCodes,
      errors,
      onConfirm: confirm,
      onRequestSetupData: fetchSetupData,
      onRegenerateRecoveryCodes: regenerate,
      onCompleted: clearSetupData,
      labels
    }
  };
}

// src/inertia.ts
var InertiaLink = Link;
var useTableFilters = createTableFiltersHook(router2);
function useCurrentUrl() {
  return usePage().url;
}
function AppSidebar2(props) {
  return createElement(AppSidebar, {
    ...props,
    currentUrl: usePage().url,
    linkComponent: InertiaLink
  });
}
function AppSidebarHeader2(props) {
  return createElement(AppSidebarHeader, {
    ...props,
    linkComponent: InertiaLink
  });
}
function Breadcrumbs2(props) {
  return createElement(Breadcrumbs, {
    ...props,
    linkComponent: InertiaLink
  });
}
function NavMain2(props) {
  return createElement(NavMain, {
    ...props,
    currentUrl: usePage().url,
    linkComponent: InertiaLink
  });
}
function SettingsLayout2(props) {
  return createElement(SettingsLayout, {
    ...props,
    currentPath: usePage().url,
    linkComponent: InertiaLink
  });
}
var LoginPostForm = Form;
function InertiaLoginForm({
  action,
  status,
  forgotPasswordHref,
  labels,
  className,
  slotName = "inertia-login-form"
}) {
  return createElement(LoginPostForm, {
    action,
    method: "post",
    resetOnSuccess: ["password"],
    className,
    "data-slot": slotName,
    children: ({ processing, errors }) => createElement(LoginFormPreset, {
      errors,
      processing,
      status,
      forgotPasswordHref,
      labels,
      linkComponent: InertiaLink
    })
  });
}
function InertiaTourProvider({
  children,
  progressUrl,
  labels
}) {
  const seen = usePage().props.tours ?? {};
  return createElement(TourProvider, {
    seen,
    labels,
    children,
    onProgress: (progress) => recordTourProgress(progressUrl(progress.tour), progress)
  });
}
function InertiaNotificationBell({
  poll,
  ...props
}) {
  const controls = usePoll(
    poll?.interval ?? 0,
    poll?.only ? { only: poll.only } : {},
    { autoStart: false }
  );
  const poller = useRef3(controls);
  const active = poll?.active === true;
  useEffect3(() => {
    if (!active) {
      return;
    }
    const current = poller.current;
    current.start();
    return () => {
      current.stop();
    };
  }, [active]);
  return createElement(NotificationBell, {
    ...props,
    linkComponent: InertiaLink
  });
}
export {
  AppSidebar2 as AppSidebar,
  AppSidebarHeader2 as AppSidebarHeader,
  Breadcrumbs2 as Breadcrumbs,
  InertiaLink,
  InertiaLoginForm,
  InertiaNotificationBell,
  InertiaTourProvider,
  NavMain2 as NavMain,
  SettingsLayout2 as SettingsLayout,
  useCurrentUrl,
  useFortifyTwoFactor,
  useTableFilters
};
//# sourceMappingURL=inertia.js.map