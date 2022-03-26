import translations from "./translations.json";

const translate = (name) => translations[name] ?? name;

export default translate;