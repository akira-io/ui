import {
  Alert,
  AlertDescription,
  Checkbox,
  Field,
  FieldControl,
  FieldLabel,
  PasswordInput
} from "./chunk-746HPI7F.js";
import {
  useUiLabels
} from "./chunk-ZZDRO234.js";
import {
  Label
} from "./chunk-JKKXBCNI.js";
import {
  resolveLink
} from "./chunk-VVBBKTC5.js";
import {
  Input
} from "./chunk-OTLBSTHU.js";
import {
  Button,
  cn
} from "./chunk-33SBGSQF.js";

// src/blocks/login-form/types.ts
var loginFormLabels = {
  emailLabel: "Email address",
  emailPlaceholder: "email@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Password",
  forgotPasswordLabel: "Forgot your password?",
  rememberLabel: "Remember me",
  submitLabel: "Log in",
  submittingLabel: "Signing in"
};
function fieldError(errors, field) {
  const value = errors[field];
  if (!value) {
    return void 0;
  }
  const messages = Array.isArray(value) ? value : [value];
  return messages.find(
    (message) => typeof message === "string" && message.length > 0
  );
}

// src/blocks/login-form/context.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var LoginFormContext = createContext({
  errors: {},
  processing: false
});
function useLoginFormContext() {
  const context = useContext(LoginFormContext);
  const labels = useUiLabels("loginForm", loginFormLabels, context.labels);
  return { ...context, labels };
}
function LoginFormProvider({
  errors = {},
  processing = false,
  linkComponent,
  labels,
  children
}) {
  return /* @__PURE__ */ jsx(
    LoginFormContext.Provider,
    {
      value: {
        errors,
        processing,
        linkComponent,
        labels
      },
      children
    }
  );
}

// src/blocks/login-form/parts.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function LoginFormRoot({
  errors,
  processing,
  linkComponent,
  labels,
  children,
  className,
  slotName = "login-form"
}) {
  return /* @__PURE__ */ jsx2(
    LoginFormProvider,
    {
      errors,
      processing,
      linkComponent,
      labels,
      children: /* @__PURE__ */ jsx2("div", { "data-slot": slotName, className: cn("gap-6 grid", className), children })
    }
  );
}
function LoginFormStatus({
  message,
  slotName = "login-form-status"
}) {
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ jsx2(Alert, { slotName, children: /* @__PURE__ */ jsx2(AlertDescription, { children: message }) });
}
function LoginFormEmail({
  id = "email",
  name = "email",
  label,
  placeholder,
  error,
  tabIndex,
  autoFocus = true,
  required = true,
  slotName = "login-form-email"
}) {
  const { errors, labels } = useLoginFormContext();
  const message = error ?? fieldError(errors, name);
  return /* @__PURE__ */ jsxs(Field, { id, error: message, required, slotName, children: [
    /* @__PURE__ */ jsx2(FieldLabel, { children: label ?? labels.emailLabel }),
    /* @__PURE__ */ jsx2(FieldControl, { children: /* @__PURE__ */ jsx2(
      Input,
      {
        name,
        type: "email",
        required,
        autoFocus,
        autoComplete: "email",
        tabIndex,
        placeholder: placeholder ?? labels.emailPlaceholder
      }
    ) })
  ] });
}
function LoginFormPassword({
  id = "password",
  name = "password",
  label,
  placeholder,
  error,
  tabIndex,
  autoFocus = false,
  required = true,
  forgotPasswordHref,
  forgotPasswordLabel,
  linkComponent,
  slotName = "login-form-password"
}) {
  const context = useLoginFormContext();
  const message = error ?? fieldError(context.errors, name);
  const Link = resolveLink(linkComponent ?? context.linkComponent);
  return /* @__PURE__ */ jsxs(Field, { id, error: message, required, slotName, children: [
    /* @__PURE__ */ jsx2(FieldLabel, { children: label ?? context.labels.passwordLabel }),
    /* @__PURE__ */ jsx2(FieldControl, { children: /* @__PURE__ */ jsx2(
      PasswordInput,
      {
        name,
        required,
        autoFocus,
        autoComplete: "current-password",
        tabIndex,
        placeholder: placeholder ?? context.labels.passwordPlaceholder
      }
    ) }),
    forgotPasswordHref && /* @__PURE__ */ jsx2(
      Link,
      {
        href: forgotPasswordHref,
        className: "mr-1 text-xs font-medium self-end text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline",
        children: forgotPasswordLabel ?? context.labels.forgotPasswordLabel
      }
    )
  ] });
}
function LoginFormRemember({
  id = "remember",
  name = "remember",
  label,
  tabIndex,
  slotName = "login-form-remember"
}) {
  const { labels } = useLoginFormContext();
  return /* @__PURE__ */ jsxs("div", { "data-slot": slotName, className: "gap-3 flex items-center", children: [
    /* @__PURE__ */ jsx2(Checkbox, { id, name, tabIndex }),
    /* @__PURE__ */ jsx2(Label, { htmlFor: id, children: label ?? labels.rememberLabel })
  ] });
}
function LoginFormSubmit({
  label,
  submittingLabel,
  processing,
  tabIndex,
  slotName = "login-form-submit"
}) {
  const context = useLoginFormContext();
  const pending = processing ?? context.processing;
  const pendingLabel = submittingLabel ?? context.labels.submittingLabel;
  return /* @__PURE__ */ jsx2(
    Button,
    {
      slotName,
      type: "submit",
      className: "w-full",
      tabIndex,
      "aria-label": pending ? pendingLabel : void 0,
      loading: pending,
      loadingLabel: pendingLabel,
      children: pending ? pendingLabel : label ?? context.labels.submitLabel
    }
  );
}

// src/blocks/login-form/preset.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function LoginFormPreset({
  errors,
  processing,
  linkComponent,
  labels,
  status,
  forgotPasswordHref,
  className,
  slotName = "login-form"
}) {
  return /* @__PURE__ */ jsxs2(
    LoginFormRoot,
    {
      errors,
      processing,
      linkComponent,
      labels,
      className,
      slotName,
      children: [
        /* @__PURE__ */ jsx3(LoginFormStatus, { message: status }),
        /* @__PURE__ */ jsx3(LoginFormEmail, {}),
        /* @__PURE__ */ jsx3(LoginFormPassword, { forgotPasswordHref }),
        /* @__PURE__ */ jsx3(LoginFormRemember, {}),
        /* @__PURE__ */ jsx3(LoginFormSubmit, {})
      ]
    }
  );
}

// src/blocks/login-form/index.ts
var LoginForm = {
  Root: LoginFormRoot,
  Status: LoginFormStatus,
  Email: LoginFormEmail,
  Password: LoginFormPassword,
  Remember: LoginFormRemember,
  Submit: LoginFormSubmit
};

// src/blocks/tour/gate.ts
function stepsForBreakpoint(steps, breakpoint) {
  return steps.filter(
    (step) => !step.breakpoints || step.breakpoints.includes(breakpoint)
  );
}
function resolveSteps(steps, isPresent) {
  return steps.filter((step) => isPresent(step.target));
}
function shouldStartTour(input) {
  if (input.resolvedStepCount === 0) {
    return false;
  }
  if (input.force) {
    return true;
  }
  return input.definition.version > (input.seen[input.definition.id] ?? 0);
}

// src/blocks/tour/types.ts
var DEFAULT_TOUR_LABELS = {
  next: "Next",
  previous: "Previous",
  done: "Done",
  progress: "{{current}} of {{total}}"
};

// src/blocks/tour/tour.tsx
import { driver } from "driver.js";
import {
  createContext as createContext2,
  useCallback,
  useContext as useContext2,
  useEffect,
  useMemo,
  useRef
} from "react";
import "driver.js/dist/driver.css";
import { jsx as jsx4 } from "react/jsx-runtime";
var TourContext = createContext2(null);
var MOBILE_BREAKPOINT = 768;
var WAIT_FOR_TARGET = 4e3;
function currentBreakpoint() {
  return window.innerWidth < MOBILE_BREAKPOINT ? "mobile" : "desktop";
}
function outcomeOf(instance, highlighted) {
  if (!highlighted) {
    return "dismissed";
  }
  return instance.hasNextStep() ? "skipped" : "completed";
}
function TourProvider({
  children,
  seen,
  onProgress,
  labels
}) {
  const seenRef = useRef(seen);
  seenRef.current = seen;
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const driverRef = useRef(null);
  const activeRef = useRef(null);
  const { next, previous, done, progress } = useUiLabels(
    "tour",
    DEFAULT_TOUR_LABELS,
    labels
  );
  const report = useCallback((outcome) => {
    const active = activeRef.current;
    if (!active) {
      return;
    }
    activeRef.current = null;
    onProgressRef.current({
      tour: active.definition.id,
      version: active.definition.version,
      lastStep: active.lastStep,
      outcome
    });
  }, []);
  const startTour = useCallback(
    (definition, options) => {
      const alreadyRunning = activeRef.current?.definition.id === definition.id;
      if (alreadyRunning && !options?.force) {
        return;
      }
      const steps = stepsForBreakpoint(
        definition.steps,
        currentBreakpoint()
      );
      const allowed = shouldStartTour({
        definition,
        seen: seenRef.current,
        resolvedStepCount: steps.length,
        force: options?.force
      });
      if (!allowed) {
        return;
      }
      driverRef.current?.destroy();
      activeRef.current = { definition, lastStep: 0, highlighted: false };
      const instance = driver({
        showProgress: true,
        progressText: progress,
        nextBtnText: next,
        prevBtnText: previous,
        doneBtnText: done,
        popoverClass: "akira-tour",
        waitForElement: WAIT_FOR_TARGET,
        skipMissingElement: true,
        steps: steps.map((step) => ({
          element: step.target,
          popover: {
            title: step.title,
            description: step.description
          }
        })),
        onHighlightStarted: () => {
          if (activeRef.current) {
            activeRef.current.lastStep = instance.getActiveIndex() ?? 0;
            activeRef.current.highlighted = true;
          }
        },
        onDestroyStarted: () => {
          report(
            outcomeOf(
              instance,
              activeRef.current?.highlighted ?? false
            )
          );
          instance.destroy();
        }
      });
      driverRef.current = instance;
      instance.drive();
    },
    [report, next, previous, done, progress]
  );
  useEffect(
    () => () => {
      report("dismissed");
      driverRef.current?.destroy();
      driverRef.current = null;
    },
    [report]
  );
  const value = useMemo(() => ({ startTour }), [startTour]);
  return /* @__PURE__ */ jsx4(TourContext.Provider, { value, children });
}
function useTourController() {
  const context = useContext2(TourContext);
  if (!context) {
    throw new Error(
      "useTourController must be used inside a TourProvider."
    );
  }
  return context;
}
function useTour(definition, options) {
  const { startTour } = useTourController();
  const enabled = options?.enabled ?? true;
  const definitionRef = useRef(definition);
  definitionRef.current = definition;
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const frame = window.requestAnimationFrame(
      () => startTour(definitionRef.current)
    );
    return () => window.cancelAnimationFrame(frame);
  }, [definition.id, definition.version, enabled, startTour]);
  return { restart: () => startTour(definitionRef.current, { force: true }) };
}

export {
  loginFormLabels,
  fieldError,
  useLoginFormContext,
  LoginFormProvider,
  LoginFormRoot,
  LoginFormStatus,
  LoginFormEmail,
  LoginFormPassword,
  LoginFormRemember,
  LoginFormSubmit,
  LoginFormPreset,
  LoginForm,
  stepsForBreakpoint,
  resolveSteps,
  shouldStartTour,
  DEFAULT_TOUR_LABELS,
  TourProvider,
  useTourController,
  useTour
};
//# sourceMappingURL=chunk-ZWMYUOYI.js.map