// theme/interfaces/components.ts
import { ViewStyle, ImageStyle, TextStyle } from "react-native";
import {
  ViewVariant,
  ScrollVariant,
  AvatarVariant,
  BadgeVariant,
  ButtonVariant,
  ButtonSize,
  CardVariant,
  CheckboxVariant,
  ErrorVariant,
  ImageVariant,
  InputVariant,
  ListItemVariant,
  LoadingVariant,
  ModalVariant,
  TextVariant,
  ToggleTextVariant,
} from "../types/componentVariants";

// Simplified per‑component style maps (match creator return types)
export type ViewVariantsMap = Record<ViewVariant, ViewStyle>;
export type ScrollVariantsMap = Record<ScrollVariant, ViewStyle>;
export type AvatarVariantsMap = Record<AvatarVariant, ImageStyle>;
export type BadgeVariantsMap = Record<
  BadgeVariant,
  { container: ViewStyle; label: TextStyle }
>;
export type ButtonVariantsMap = Record<
  ButtonVariant,
  Record<ButtonSize, { container: ViewStyle; label: TextStyle }>
>;
export type CardVariantsMap = Record<CardVariant, ViewStyle>;
export type CheckboxVariantsMap = Record<CheckboxVariant, ViewStyle>;
export type ErrorVariantsMap = Record<
  ErrorVariant,
  { container: ViewStyle; label: TextStyle }
>;
export type ImageVariantsMap = Record<ImageVariant, ImageStyle>;
export type InputVariantsMap = Record<
  InputVariant,
  { container: ViewStyle; field: TextStyle }
>;
export type ListItemVariantsMap = Record<
  ListItemVariant,
  { container: ViewStyle; title: TextStyle; subtitle: TextStyle }
>;
export type LoadingVariantsMap = Record<LoadingVariant, ViewStyle>;
export type ModalVariantsMap = Record<
  ModalVariant,
  { overlay: ViewStyle; content: ViewStyle }
>;
export type TextVariantsMap = Record<TextVariant, TextStyle>;
export type ToggleTextVariantsMap = Record<
  ToggleTextVariant,
  { container: ViewStyle; label: TextStyle }
>;

export interface ComponentsMapping {
  view: ViewVariantsMap;
  scroll: ScrollVariantsMap;
  avatar: AvatarVariantsMap;
  badge: BadgeVariantsMap;
  button: ButtonVariantsMap;
  card: CardVariantsMap;
  checkbox: CheckboxVariantsMap;
  error: ErrorVariantsMap;
  image: ImageVariantsMap;
  input: InputVariantsMap;
  listItem: ListItemVariantsMap;
  loading: LoadingVariantsMap;
  modal: ModalVariantsMap;
  text: TextVariantsMap;
  toggleText: ToggleTextVariantsMap;
}
