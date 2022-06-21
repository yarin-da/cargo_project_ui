import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./en.json";
import translationHe from "./he.json";
import LanguageDetector from "i18next-browser-languagedetector";

const availableLanguages = ["en", "he"];
const resources = {
    en: {
        translation: translationEn
    },
    he: {
        translation: translationHe
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: "en",
        detection: {
            checkWhitelist: true
        },
        whitelist: availableLanguages,
    });

export default i18n;
