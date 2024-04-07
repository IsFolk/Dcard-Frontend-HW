// src/components/SignOutButton.tsx

"use client";

import { signOut } from "next-auth/react";
import {Button} from '@nextui-org/button'; 


const SignOutButton = () => {
  return (
    <div>
    <Button color="primary">Press me</Button>
    <button
      className="bg-slate-600 px-4 py-2 text-white"
      onClick={() => signOut({ callbackUrl: "/" })}
      type="button"
    >
      Sign Out of GitHub
    </button>
    </div>
  );
};

export default SignOutButton;