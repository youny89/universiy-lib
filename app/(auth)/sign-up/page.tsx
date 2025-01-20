"use client";

import AuthForm from "@/components/forms/auth-form";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        name: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default SignUp;
