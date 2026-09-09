'use client';

"use client";
import {
  LoginFormPreset,
  TourProvider
} from "./chunk-ZWMYUOYI.js";
import "./chunk-746HPI7F.js";
import "./chunk-ZZDRO234.js";
import "./chunk-JKKXBCNI.js";
import {
  AppSidebar,
  AppSidebarHeader,
  Breadcrumbs,
  NavMain,
  SettingsLayout
} from "./chunk-HVFTKGOV.js";
import "./chunk-E64424RA.js";
import "./chunk-VVBBKTC5.js";
import "./chunk-EXTOGROG.js";
import "./chunk-OTLBSTHU.js";
import "./chunk-33SBGSQF.js";

// src/inertia.ts
import { Form, Link, router, usePage } from "@inertiajs/react";
import {
  createElement
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
function createTableFiltersHook(router2) {
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
        router2.visit(current.url, {
          data: toQuery({ ...current.filters, ...changes }),
          only: current.only,
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

// src/inertia.ts
var InertiaLink = Link;
var useTableFilters = createTableFiltersHook(router);
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
export {
  AppSidebar2 as AppSidebar,
  AppSidebarHeader2 as AppSidebarHeader,
  Breadcrumbs2 as Breadcrumbs,
  InertiaLink,
  InertiaLoginForm,
  InertiaTourProvider,
  NavMain2 as NavMain,
  SettingsLayout2 as SettingsLayout,
  useCurrentUrl,
  useTableFilters
};
//# sourceMappingURL=inertia.js.map