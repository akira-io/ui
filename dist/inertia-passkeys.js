'use client';

"use client";
import {
  PasskeyList,
  PasskeyRegisterButton,
  PasskeySignInButton
} from "./chunk-WBSMIM4N.js";
import "./chunk-5753FPDY.js";
import "./chunk-R7J7ZUB6.js";
import "./chunk-6GIBKLUU.js";
import "./chunk-FHM5GJ2N.js";
import "./chunk-5NZLIF7G.js";
import "./chunk-RE7X3RE5.js";
import "./chunk-NE2SL5YQ.js";
import "./chunk-OUQO7T5E.js";
import "./chunk-TA3IKSIJ.js";
import "./chunk-XN5WW7OR.js";

// src/inertia-passkeys.ts
import { router } from "@inertiajs/react";
import { usePasskeyRegister, usePasskeyVerify } from "@laravel/passkeys/react";
import { createElement, useRef } from "react";
function InertiaPasskeySignInButton({
  routes,
  redirectTo = "/dashboard",
  labels,
  className
}) {
  const { verify, isLoading, error, isSupported } = usePasskeyVerify({
    routes,
    onSuccess: (response) => router.visit(response.redirect ?? redirectTo)
  });
  return createElement(PasskeySignInButton, {
    supported: isSupported,
    processing: isLoading,
    error,
    onSignIn: verify,
    labels,
    className
  });
}
function InertiaPasskeyRegisterButton({
  routes,
  labels,
  className
}) {
  const failure = useRef(null);
  const { register, isLoading, error, isSupported } = usePasskeyRegister({
    routes,
    onSuccess: () => router.reload(),
    onError: (reason) => {
      failure.current = reason;
    }
  });
  const handleRegister = async (name) => {
    failure.current = null;
    await register(name);
    if (failure.current) {
      throw failure.current;
    }
  };
  return createElement(PasskeyRegisterButton, {
    supported: isSupported,
    processing: isLoading,
    error,
    onRegister: handleRegister,
    labels,
    className
  });
}
function urlOf(target) {
  return typeof target === "string" ? target : target.url;
}
function InertiaPasskeyList({
  passkeys,
  destroyUrl,
  children,
  labels,
  className
}) {
  const handleDelete = (passkey) => new Promise((resolve, reject) => {
    router.delete(urlOf(destroyUrl(passkey)), {
      preserveScroll: true,
      onError: () => reject(new Error("passkey not removed")),
      onFinish: () => resolve()
    });
  });
  return createElement(
    PasskeyList,
    { passkeys, onDelete: handleDelete, labels, className },
    children
  );
}
export {
  InertiaPasskeyList,
  InertiaPasskeyRegisterButton,
  InertiaPasskeySignInButton
};
//# sourceMappingURL=inertia-passkeys.js.map