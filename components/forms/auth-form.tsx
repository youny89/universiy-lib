"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import Link from "next/link";
import { Input } from "../ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { Button } from "../ui/button";
import ImageUpload from "../image-upload";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSumbit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "you have successfully signed in"
          : "you have successfully signed up",
      });
      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: isSignIn
          ? "you have successfully signed in"
          : "you have successfully signed up",
        variant: "destructive",
      });
    }
  };

  const isSignIn = type === "SIGN_IN";

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">
        {isSignIn ? "Welcom back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resource, and stay updated"
          : " Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSumbit)}
          className="space-y-8 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              name={field as Path<T>}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">
                    {FIELD_NAMES[field?.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "sign in" : "sign up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise ? " : "Already have an account?"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
