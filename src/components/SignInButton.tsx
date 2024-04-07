// src/components/SignInButton.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button } from '@nextui-org/react';

const SignInButton = () => {
  return (
    <div>
    <button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signIn("github", { callbackUrl: "/profile" })}
      type="button"
    >
      Sign In With GitHub
    </button>
    </div>
  );
};

export default SignInButton;