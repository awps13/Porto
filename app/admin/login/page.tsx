"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";
import SubmitButton from "@/components/admin/submit-button";
import { Field, inputCls } from "@/components/admin/field";

const initial: LoginState = {};

export default function LoginPage() {
  const [state, action] = useActionState(signIn, initial);

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-bg">
      <div className="hidden md:flex flex-col justify-between p-16 bg-black border-r border-white/15">
        <div>
          <p className="text-label-caps text-fg-muted uppercase">Console</p>
          <p className="font-epilogue font-bold text-2xl tracking-tighter mt-2">
            AWPS13
          </p>
        </div>
        <div>
          <h1 className="text-headline-lg uppercase">
            Sign in to <br />
            the studio.
          </h1>
          <p className="text-body-md text-fg-muted mt-6 max-w-sm">
            Restricted area. The console is for content management — projects,
            certificates, experience, and the rest of the portfolio surface.
          </p>
        </div>
        <p className="text-label-caps text-fg-muted uppercase">
          Forgot your password? Re-run <code>npm run db:seed</code>.
        </p>
      </div>

      <div className="flex flex-col justify-center px-8 md:px-16 py-16">
        <div className="max-w-md w-full mx-auto">
          <p className="text-label-caps text-fg-muted mb-3 uppercase">Login</p>
          <h2 className="text-headline-md uppercase mb-10">Welcome back.</h2>

          <form action={action} className="space-y-6">
            <Field label="Email" name="email" required>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputCls}
                placeholder="you@studio.com"
              />
            </Field>

            <Field label="Password" name="password" required>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputCls}
                placeholder="••••••••"
              />
            </Field>

            {state.error && (
              <p className="text-label-caps uppercase text-red-300 border border-red-300/30 px-4 py-3">
                {state.error}
              </p>
            )}

            <SubmitButton pendingLabel="Signing in…" className="w-full">
              Sign in →
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
