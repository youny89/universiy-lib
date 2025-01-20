"use client";

import AuthForm from "@/components/forms/auth-form";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
