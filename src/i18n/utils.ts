import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) {
    return path;
  }
  if (path === "/") {
    return `/${lang}`;
  }
  return `/${lang}${path}`;
}

export function getAlternateLanguagePath(
  currentPath: string,
  currentLang: Lang,
  targetLang: Lang,
): string {
  if (currentLang === defaultLang) {
    if (targetLang === defaultLang) {
      return currentPath;
    }
    if (currentPath === "/") {
      return `/${targetLang}`;
    }
    return `/${targetLang}${currentPath}`;
  } else {
    const pathWithoutLang = currentPath.replace(`/${currentLang}`, "") || "/";
    if (targetLang === defaultLang) {
      return pathWithoutLang;
    }
    if (pathWithoutLang === "/") {
      return `/${targetLang}`;
    }
    return `/${targetLang}${pathWithoutLang}`;
  }
}
