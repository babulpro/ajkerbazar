"use client";

import { signUp } from "@/lib/auth-client";
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

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: response, error } = await signUp.email({
      email: data.email as string,
      name: data.name as string,
      password: data.password as string,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-6 py-16">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-foreground">আকাউন্ট খুলুন</h1>
      <p className="mt-1 text-center text-xs text-default-500">
        নিচের ফর্মটি পূরণ করে আপনার অ্যাকাউন্ট তৈরি করুন।
      </p>

      {/* Card */}
      <div className="mt-6 w-full rounded-2xl border border-separator bg-background p-6 shadow-sm">
        <Form
          className="flex w-full flex-col gap-4"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label>নাম</Label>
            <Input placeholder="আপনার নাম" />
            <FieldError />
          </TextField>

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

          {/* Submit + Reset */}
          <div className="mt-2 flex gap-2">
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-green-700 font-semibold text-white hover:bg-green-800"
            >
              <Check />
              সাইন আপ
            </Button>
            <Button
              type="reset"
              variant="secondary"
              className="rounded-lg"
            >
              রিসেট
            </Button>
          </div>
        </Form>

        {/* Switch to Sign In */}
        <p className="mt-5 text-center text-xs text-default-500">
          আকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      {/* Terms */}
      <p className="mt-6 text-center text-[11px] text-default-400">
        — শর্তাবলী মেনে সাইন আপ করুন
      </p>
    </div>
  );
}