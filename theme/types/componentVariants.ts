// theme/types/componentVariants.ts

/*
  Variant unions for all base UI components.
  Add or extend as your design system grows.
*/

export type ViewVariant =
  | "default"
  | "centered"
  | "padded"
  | "padded-vertical"
  | "screen-content"
  | "full-width"
  | "content"
  | "card-rectangle"
  | "card-square"
  | "scrollable"
  | "absolute-fill"
  | "row";

export type ScrollVariant = "padded" | "flush" | "fullScreen";

export type AvatarVariant = "sm" | "md" | "lg";
export type BadgeVariant = "primary" | "success" | "warning" | "danger";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "link"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type CardVariant = "filled" | "outlined" | "elevated" | "form";
export type CheckboxVariant = "default" | "sm" | "lg";
export type ErrorVariant = "text" | "box";
export type IconVariant = "sm" | "md" | "lg";
export type ImageVariant = "thumbnail" | "cover" | "contain";
export type InputVariant = "default" | "sm" | "lg";
export type ListItemVariant = "default" | "inset";
export type LoadingVariant = "spinner" | "overlay";
export type ModalVariant = "default" | "fullscreen";
export type TextVariant =
  | "bodyXSmallRegular"
  | "bodyXSmallBold"
  | "bodySmallRegular"
  | "bodySmallMedium"
  | "bodySmallBold"
  | "bodyNormalRegular"
  | "bodyNormalMedium"
  | "bodyNormalBold"
  | "bodyLargeRegular"
  | "bodyLargeMedium"
  | "bodyXLargeRegular"
  | "bodyXLargeBold"
  | "headerOne"
  | "headerTwo"
  | "headerThree";
export type ToggleTextVariant = "pill" | "underline";

export interface ComponentVariants {
  view: ViewVariant;
  scroll: ScrollVariant;
  avatar: AvatarVariant;
  badge: BadgeVariant;
  button: ButtonVariant;
  card: CardVariant;
  checkbox: CheckboxVariant;
  error: ErrorVariant;
  icon: IconVariant;
  image: ImageVariant;
  input: InputVariant;
  listItem: ListItemVariant;
  loading: LoadingVariant;
  modal: ModalVariant;
  text: TextVariant;
  toggleText: ToggleTextVariant;
}
