export interface Street {
  id: string;
  name: string;
  nameEn: string;
  theme: string;
  themeEn: string;
  description: string;
  descriptionEn: string;
  emoji: string;
  /** スタンプやアクセントに使うストリートのテーマカラー */
  color: string;
  stampToken: string;
}

export interface StampRecord {
  streetId: string;
  acquiredAt: string;
}
