import { Street } from "@/lib/types";

// GRID KYOTO 〜京都まちの文化祭〜 の5つのストリート。
// 名前・テーマは正式発表までの仮のもの。確定したらここを書き換える
// （stampToken を変えたら scripts/generate-qrcodes.ts でQRの再生成も必要）。
export const streets: Street[] = [
  {
    id: "street-01",
    name: "フードストリート",
    nameEn: "Food Street",
    theme: "京都のうまいもん",
    themeEn: "Kyoto's Local Eats",
    description:
      "京都のローカルな飲食店や屋台が集まるストリート。食べ歩きしながらまちの味を楽しもう。",
    descriptionEn:
      "A street lined with local Kyoto eateries and food stalls. Enjoy the taste of the city as you stroll.",
    emoji: "🍜",
    color: "#ef4444",
    stampToken: "cdda4077-36a6-460e-a508-a9eb3925944a",
  },
  {
    id: "street-02",
    name: "クラフトストリート",
    nameEn: "Craft Street",
    theme: "手しごとと雑貨",
    themeEn: "Handmade & Goods",
    description:
      "職人や作家による手しごとの品々が並ぶストリート。京都のものづくりに出会える。",
    descriptionEn:
      "A street of handmade goods by artisans and creators. Discover Kyoto's craftsmanship.",
    emoji: "🎨",
    color: "#f59e0b",
    stampToken: "dc1c905f-1156-4a81-8808-b009fbc81055",
  },
  {
    id: "street-03",
    name: "あそびストリート",
    nameEn: "Play Street",
    theme: "こどもとあそび",
    themeEn: "Kids & Play",
    description:
      "大人から子どもまで楽しめる遊びとワークショップのストリート。家族みんなでどうぞ。",
    descriptionEn:
      "A street of games and workshops for all ages. Fun for the whole family.",
    emoji: "🎪",
    color: "#10b981",
    stampToken: "aa10f470-9ef0-427f-a0b0-7d515ffd64b6",
  },
  {
    id: "street-04",
    name: "ステージストリート",
    nameEn: "Stage Street",
    theme: "音楽とパフォーマンス",
    themeEn: "Music & Performance",
    description:
      "音楽ライブやパフォーマンスが繰り広げられるストリート。まちに響く音を楽しもう。",
    descriptionEn:
      "A street alive with live music and performances. Feel the sound of the city.",
    emoji: "🎸",
    color: "#8b5cf6",
    stampToken: "8ce2bda5-3a0b-44a3-94e8-798ea9497bae",
  },
  {
    id: "street-05",
    name: "まちづくりストリート",
    nameEn: "Machizukuri Street",
    theme: "交流とまちづくり",
    themeEn: "Community & City-making",
    description:
      "京都のまちづくりプレイヤーたちと出会い、つながるストリート。トークや展示も。",
    descriptionEn:
      "A street to meet and connect with Kyoto's city-making players, with talks and exhibits.",
    emoji: "🌱",
    color: "#3b82f6",
    stampToken: "d1388242-89f3-408b-8a1a-428053d55dff",
  },
];

// ロケール別の表示テキストを取り出すヘルパー
export function streetText(street: Street, locale: "ja" | "en") {
  return locale === "en"
    ? {
        name: street.nameEn,
        theme: street.themeEn,
        description: street.descriptionEn,
      }
    : {
        name: street.name,
        theme: street.theme,
        description: street.description,
      };
}
