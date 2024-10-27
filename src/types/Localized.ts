// 定义常见的语言代码以支持自动提示
type Locale =
  | "en"
  | "fr"
  | "ar"
  | "en-US"
  | "zh-CN"
  | "zh-HK"
  | "zh-TW"
  | "es-ES"
  | "fr-FR"
  | "de-DE"
  | "ja-JP"
  | (string & NonNullable<unknown>);

// 定义 Localized<T>，为每个属性 T 增加一个 `_localized` 的扩展版本
type Direction = "ltr" | "rtl" | "auto";

// 定义每个本地化字段的结构
interface LocalizedField {
  value: string;
  lang?: Locale;
  dir?: Direction;
}

// 为 `_localized` 字段扩展定义
type Localized<T> = T & {
  [K in keyof T as `${string & K}_localized`]?: Partial<
    Record<Locale, LocalizedField | string>
  >;
};

// 定义主 Manifest 类型
interface Manifest {
  name?: string;
}

// 应用 Localized 扩展以生成包含 `_localized` 字段的类型
export type LocalizedManifest = Localized<Manifest>;

// 示例用法
const manifest: LocalizedManifest = {
  name: "Color Picker",
  name_localized: {
    de: { value: "Farbwähler" },
    en: { value: "Color Picker" },
    "en-US": { value: "Colour Picker", dir: "ltr" },
    fr: { value: "Sélecteur de Couleur", lang: "fr-CA", dir: "ltr" },
    ar: { value: "منتقي الألوان", dir: "rtl" },
  },
};

console.log(manifest);
