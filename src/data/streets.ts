import { Street } from "@/lib/types";

// GRID KYOTO 〜京都まちの文化祭〜 の5つのストリート。
// stampToken は QRコードに埋め込まれた値なので、変更するとQRの再生成が必要になる
// （scripts/generate-qrcodes.ts）。名前やテーマの変更だけなら再生成は不要。
//
// designs は来場者が選べるスタンプの絵柄で、1ストリートにつき2種類（全10種類）。
// 現在は絵文字による仮デザイン。本番のイラストが用意できたら
// public/stamps/ に置き、各デザインに image: "/stamps/xxx.png" を追加すれば
// 絵文字から自動的に差し替わる（他のコードを触る必要はない）。
export const streets: Street[] = [
  {
    id: "street-01",
    name: "環境ストリート",
    nameEn: "Environment Street",
    theme: "地球とくらし",
    themeEn: "Earth & Daily Life",
    description:
      "ごみ・エネルギー・自然。京都のこれからの暮らしを考える取り組みが集まるストリート。",
    descriptionEn:
      "Waste, energy, and nature — a street of initiatives shaping how Kyoto will live tomorrow.",
    emoji: "🌏",
    color: "#10b981",
    designs: [
      { id: "a", name: "リサイクル", nameEn: "Recycle", emoji: "♻️", color: "#10b981" },
      { id: "b", name: "みどり", nameEn: "Greenery", emoji: "🌳", color: "#65a30d" },
    ],
    stampToken: "cdda4077-36a6-460e-a508-a9eb3925944a",
  },
  {
    id: "street-02",
    name: "国際ストリート",
    nameEn: "International Street",
    theme: "世界とつながる",
    themeEn: "Connecting with the World",
    description:
      "多文化交流や国際協力に取り組む人たちのストリート。世界の食や文化にも出会える。",
    descriptionEn:
      "A street of people working in cross-cultural exchange and international cooperation, with food and culture from around the world.",
    emoji: "🌐",
    color: "#3b82f6",
    designs: [
      { id: "a", name: "ちきゅう", nameEn: "Globe", emoji: "🌍", color: "#3b82f6" },
      { id: "b", name: "ひこうき", nameEn: "Airplane", emoji: "✈️", color: "#0891b2" },
    ],
    stampToken: "dc1c905f-1156-4a81-8808-b009fbc81055",
  },
  {
    id: "street-03",
    name: "福祉ストリート",
    nameEn: "Welfare Street",
    theme: "支え合いのまち",
    themeEn: "A City That Supports Each Other",
    description:
      "誰もが暮らしやすいまちをつくる福祉の活動が集まるストリート。体験や相談もできる。",
    descriptionEn:
      "A street of welfare activities building a city where everyone can live well — with hands-on experiences and consultations.",
    emoji: "🤝",
    color: "#f59e0b",
    designs: [
      { id: "a", name: "手をつなぐ", nameEn: "Joining Hands", emoji: "🤝", color: "#f59e0b" },
      { id: "b", name: "ひまわり", nameEn: "Sunflower", emoji: "🌻", color: "#ca8a04" },
    ],
    stampToken: "aa10f470-9ef0-427f-a0b0-7d515ffd64b6",
  },
  {
    id: "street-04",
    name: "子育てストリート",
    nameEn: "Childcare Street",
    theme: "こどもとおとなの居場所",
    themeEn: "A Place for Kids and Grown-ups",
    description:
      "子育て中の家族が集うストリート。こどもが思いきり遊べて、おとなも一息つける場所。",
    descriptionEn:
      "A street where families gather — kids can play to their heart's content while grown-ups take a breather.",
    emoji: "🧸",
    color: "#ec4899",
    designs: [
      { id: "a", name: "くまさん", nameEn: "Teddy Bear", emoji: "🧸", color: "#ec4899" },
      { id: "b", name: "ふうせん", nameEn: "Balloon", emoji: "🎈", color: "#0ea5e9" },
    ],
    stampToken: "8ce2bda5-3a0b-44a3-94e8-798ea9497bae",
  },
  {
    id: "street-05",
    name: "文化・アートストリート",
    nameEn: "Culture & Art Street",
    theme: "表現とであう",
    themeEn: "Meeting Creative Expression",
    description:
      "音楽・アート・パフォーマンス。京都の表現者たちに出会えるストリート。",
    descriptionEn:
      "Music, art, and performance — a street where you meet Kyoto's creators.",
    emoji: "🎨",
    color: "#8b5cf6",
    designs: [
      { id: "a", name: "パレット", nameEn: "Palette", emoji: "🎨", color: "#8b5cf6" },
      { id: "b", name: "えんげき", nameEn: "Theater", emoji: "🎭", color: "#d946ef" },
    ],
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

/** 記録された designId から絵柄を引く。未設定・不明な場合は1つ目の絵柄を返す */
export function findDesign(street: Street, designId?: string) {
  return street.designs.find((d) => d.id === designId) ?? street.designs[0];
}
