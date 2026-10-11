import { cacheLife } from "next/cache";

/* ---------- Formatters ---------- */

// e.g. "শনিবার, ১১ অক্টোবর, ২০২৬"
const bnLongDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// e.g. "১১ অক্টোবর, ২০২৬"
const bnShortDate = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/* ---------- Cached helpers ---------- */

export async function getBengaliDate() {
  "use cache";
  cacheLife("hours");
  return bnLongDate.format(new Date());
}

export async function getBengaliShortDate() {
  "use cache";
  cacheLife("hours");
  return bnShortDate.format(new Date());
}

export async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}