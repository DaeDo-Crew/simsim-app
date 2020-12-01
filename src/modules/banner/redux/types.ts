export type BannerPayload = {
  visible: boolean;
  onPressConfirm: () => void;
  confirmLabel: string;
  iconUri: string;
  iconWidth: number;
  iconHeight: number;
  descriptionText: string;
};
