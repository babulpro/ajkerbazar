"use client";

import { signIn } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: response, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      rememberMe: true,
      callbackURL: "/",
    });
  };

  const singUPGoogleHandler = async () => {
    const data = await signIn.social({
      provider: "google",
      callbackURL: "https://ajkerbazar.vercel.app/api/auth/callback/google",
    });
  };

  const singUpGitHubHandler = async () => {
    const data = await signIn.social({
      provider: "github",
      callbackURL: "https://ajkerbazar.vercel.app/api/auth/callback/github",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-16">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-foreground">সাইন ইন</h1>
      <p className="mt-1 text-center text-xs text-default-500">
        স্বাগতম! আপনার একাউন্টে প্রবেশ করতে তথ্য দিন।
      </p>

      {/* Card */}
      <div className="mt-6 w-full rounded-2xl border border-separator bg-background p-6 shadow-sm">
        <Form
          className="flex w-full flex-col gap-4"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা দিন";
              }
              return null;
            }}
          >
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField name="password">
            <Label>পাসওয়ার্ড</Label>
            <InputGroup>
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
              />
              <InputGroup.Suffix className="pe-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 w-full rounded-lg bg-green-700 font-semibold text-white hover:bg-green-800"
          >
            <Check />
            সাইন ইন
          </Button>
        </Form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-separator" />
          <span className="text-xs text-default-400">অথবা</span>
          <div className="h-px flex-1 bg-separator" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className="w-full text-xs font-medium"
            onPress={singUPGoogleHandler}
          >
            Google দিয়ে সাইন ইন
          </Button>
          <Button
            variant="secondary"
            className="w-full text-xs font-medium"
            onPress={singUpGitHubHandler}
          >
            GitHub দিয়ে সাইন ইন
          </Button>
        </div>

        {/* Switch to Sign Up */}
        <p className="mt-5 text-center text-xs text-default-500">
          একাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

       
    </div>
  );
}