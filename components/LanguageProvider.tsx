"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { dict, type Dict, type Locale } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: Dict;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "tjd-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  // Load persisted locale on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === "ar" || stored === "en") {
        setLocaleState(stored);
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Sync to <html> + persist
  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale, hydrated]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const toggle = useCallback(() => {
    setLocaleState((l) => (l === "en" ? "ar" : "en"));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      toggle,
      t: dict[locale],
      dir: locale === "ar" ? "rtl" : "ltr"
    }),
    [locale, setLocale, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LanguageProvider>");
  }
  return ctx;
}
