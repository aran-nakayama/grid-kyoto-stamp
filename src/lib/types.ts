/** スタンプの絵柄。1ストリートにつき2種類用意し、来場者がQR読み取り時に選ぶ */
export interface StampDesign {
  /** ストリート内で一意（"a" | "b"）。獲得記録に保存される */
  id: string;
  name: string;
  nameEn: string;
  /** 仮デザイン。image を設定するとそちらが優先される */
  emoji: string;
  color: string;
  /**
   * 本番のスタンプ画像のパス（public からの相対、例: "/stamps/street-01-a.png"）。
   * 画像が用意でき次第ここに設定すれば、絵文字から自動的に切り替わる。
   */
  image?: string;
}

export interface Street {
  id: string;
  name: string;
  nameEn: string;
  theme: string;
  themeEn: string;
  description: string;
  descriptionEn: string;
  /** 一覧やカードで使うストリートの代表絵柄 */
  emoji: string;
  /** カードのアクセントに使うストリートのテーマカラー */
  color: string;
  /** 選択できるスタンプの絵柄（2種類） */
  designs: StampDesign[];
  stampToken: string;
}

export interface StampRecord {
  streetId: string;
  /** 選んだ絵柄の id。未設定の古い記録は1つ目の絵柄として扱う */
  designId?: string;
  acquiredAt: string;
}
