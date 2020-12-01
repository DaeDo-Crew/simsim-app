export type BannerPayload = {
  visible: boolean;
  onPressConfirm: () => void;
  confirmLabel: string;
  iconUri?: any;
  descriptionText: string;
};
