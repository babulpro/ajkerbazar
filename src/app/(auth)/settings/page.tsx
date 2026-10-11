"use client";

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import { ArrowRightFromSquare, Check, Person } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await updateUser({
      name: data.name as string,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-16">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-foreground">আমার প্রোফাইল</h1>
      <p className="mt-1 text-xs text-default-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
      </p>

      {/* Profile row */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-separator bg-background p-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-default-100">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "ব্যবহারকারী"}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <Person className="size-5 text-default-500" />
            )}
          </span>

          {/* Name + email */}
          <div className="min-w-0">
            {isPending ? (
              <>
                <div className="h-3.5 w-32 animate-pulse rounded bg-default-200" />
                <div className="mt-1.5 h-3 w-48 animate-pulse rounded bg-default-200" />
              </>
            ) : (
              <>
                <p className="truncate text-sm font-semibold text-foreground">
                  {user?.name ?? "—"}
                </p>
                <p className="truncate text-xs text-default-500">
                  {user?.email ?? "—"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Sign out */}
        <Button
           
          className="shrink-0 rounded-lg border-red-300 text-red-600 hover:bg-red-50"
          onPress={() => signOut()}
        >
          <ArrowRightFromSquare />
          সাইন আউট
        </Button>
      </div>

      {/* Update form card */}
      <div className="mt-6 rounded-2xl border border-separator bg-background p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-foreground">নাম</h2>

        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            minLength={2}
            name="name"
            type="text"
            defaultValue={user?.name ?? ""}
            validate={(value) => {
              if (value.length < 2) {
                return "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "নামে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
              }
              if (!/[0-9]/.test(value)) {
                return "নামে কমপক্ষে একটি সংখ্যা থাকতে হবে";
              }
              return null;
            }}
          >
            <Label>নাম</Label>
            <Input placeholder="আপনার নাম লিখুন" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-lg border-2 border-green-600 bg-transparent font-semibold text-green-700 hover:bg-green-50"
          >
            <Check />
            সেভ করুন
          </Button>
        </Form>
      </div>
    </div>
  );
}