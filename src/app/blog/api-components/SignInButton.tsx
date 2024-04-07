// src/components/SignInButton.tsx

"use client";

import { signIn } from "next-auth/react";
import { Button } from '@nextui-org/react';

const SignInButton = () => {
  return (
    <div>
    <Button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signIn("github", { callbackUrl: "/blog" })}
      type="button"
    >
      Sign In With GitHub
    </Button>
    </div>
  );
};

export default SignInButton;