import { stackClientApp } from "../../../stack/client";
import { StackHandler } from "@stackframe/stack";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <StackHandler fullPage app={stackClientApp} routeProps={{}} />
    </div>
  );
}
