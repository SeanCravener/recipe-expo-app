import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "@/theme/hooks/useTheme";
import { ColorKey, SpacingKey } from "@/theme/types/keys";

// Import your SVG icons
import AddFilled from "@/assets/icons/add-filled.svg";
import AddUnfilled from "@/assets/icons/add-unfilled.svg";
import AvatarDefaultFilled from "@/assets/icons/avatar-default-filled.svg";
import AvatarDefaultUnfilled from "@/assets/icons/avatar-default-unfilled.svg";
import BookmarkFilled from "@/assets/icons/bookmark-filled.svg";
import BookmarkUnfilled from "@/assets/icons/bookmark-unfilled.svg";
import BookmarkTwoFilled from "@/assets/icons/bookmark-two-filled.svg";
import BookmarkTwoUnfilled from "@/assets/icons/bookmark-two-unfilled.svg";
import EditOneFilled from "@/assets/icons/edit-one-filled.svg";
import EditOneUnfilled from "@/assets/icons/edit-one-unfilled.svg";
import EditTwoFilled from "@/assets/icons/edit-two-filled.svg";
import EditTwoUnfilled from "@/assets/icons/edit-two-unfilled.svg";
import EditThreeFilled from "@/assets/icons/edit-three-filled.svg";
import EditThreeUnfilled from "@/assets/icons/edit-three-unfilled.svg";
import FavoriteFilled from "@/assets/icons/favorite-filled.svg";
import FavoriteUnfilled from "@/assets/icons/favorite-unfilled.svg";
import FilterFilled from "@/assets/icons/filter-filled.svg";
import FilterUnfilled from "@/assets/icons/filter-unfilled.svg";
import HeartAddFilled from "@/assets/icons/heart-add-filled.svg";
import HeartAddUnfilled from "@/assets/icons/heart-add-unfilled.svg";
import HomeFilled from "@/assets/icons/home-filled.svg";
import HomeUnfilled from "@/assets/icons/home-unfilled.svg";
import ProfileFilled from "@/assets/icons/profile-filled.svg";
import ProfileUnfilled from "@/assets/icons/profile-unfilled.svg";
import SearchFilled from "@/assets/icons/search-filled.svg";
import SearchUnfilled from "@/assets/icons/search-unfilled.svg";
import SettingsFilled from "@/assets/icons/settings-filled.svg";
import SettingsUnfilled from "@/assets/icons/settings-unfilled.svg";
import ShareFilled from "@/assets/icons/share-filled.svg";
import ShareUnfilled from "@/assets/icons/share-unfilled.svg";
import StarFilled from "@/assets/icons/star-filled.svg";
import StarUnfilled from "@/assets/icons/star-unfilled.svg";
import StarsFilled from "@/assets/icons/stars-filled.svg";
import StartFilled from "@/assets/icons/start-filled.svg";
import StartUnfilled from "@/assets/icons/start-unfilled.svg";
import SunFilled from "@/assets/icons/sun-filled.svg";

// Icon name type based on your SVG files
export type IconName =
  | "add"
  | "avatar-default"
  | "bookmark"
  | "bookmark-two"
  | "edit-one"
  | "edit-two"
  | "edit-three"
  | "favorite"
  | "filter"
  | "heart-add"
  | "home"
  | "profile"
  | "search"
  | "settings"
  | "share"
  | "star"
  | "stars"
  | "start"
  | "sun";

export type IconVariant = "filled" | "unfilled";
export type IconSize = "sm" | "md" | "lg" | "xl";

// Icon registry mapping names to components
const iconRegistry: Record<
  IconName,
  Record<IconVariant, React.FC<SvgProps>>
> = {
  add: { filled: AddFilled, unfilled: AddUnfilled },
  "avatar-default": {
    filled: AvatarDefaultFilled,
    unfilled: AvatarDefaultUnfilled,
  },
  bookmark: { filled: BookmarkFilled, unfilled: BookmarkUnfilled },
  "bookmark-two": { filled: BookmarkTwoFilled, unfilled: BookmarkTwoUnfilled },
  "edit-one": { filled: EditOneFilled, unfilled: EditOneUnfilled },
  "edit-two": { filled: EditTwoFilled, unfilled: EditTwoUnfilled },
  "edit-three": { filled: EditThreeFilled, unfilled: EditThreeUnfilled },
  favorite: { filled: FavoriteFilled, unfilled: FavoriteUnfilled },
  filter: { filled: FilterFilled, unfilled: FilterUnfilled },
  "heart-add": { filled: HeartAddFilled, unfilled: HeartAddUnfilled },
  home: { filled: HomeFilled, unfilled: HomeUnfilled },
  profile: { filled: ProfileFilled, unfilled: ProfileUnfilled },
  search: { filled: SearchFilled, unfilled: SearchUnfilled },
  settings: { filled: SettingsFilled, unfilled: SettingsUnfilled },
  share: { filled: ShareFilled, unfilled: ShareUnfilled },
  star: { filled: StarFilled, unfilled: StarUnfilled },
  stars: { filled: StarsFilled, unfilled: StarsFilled }, // Only filled version exists
  start: { filled: StartFilled, unfilled: StartUnfilled },
  sun: { filled: SunFilled, unfilled: SunFilled }, // Only filled version exists
};

// Size mapping to pixel values
const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export interface IconProps {
  name: IconName;
  variant?: IconVariant;
  size?: IconSize | number;
  color?: ColorKey;
  active?: boolean; // Auto-determines filled/unfilled
  onPress?: () => void;
  style?: ViewStyle;
  hitSlop?: SpacingKey;
}

export const Icon: React.FC<IconProps> = ({
  name,
  variant,
  size = "md",
  color = "onSurfaceVariant",
  active = false,
  onPress,
  style,
  hitSlop = "sm",
}) => {
  const { theme } = useTheme();

  // Determine variant: explicit variant or auto-determine from active state
  const iconVariant: IconVariant = variant || (active ? "filled" : "unfilled");

  // Get the appropriate icon component
  const IconComponent = iconRegistry[name]?.[iconVariant];

  if (!IconComponent) {
    console.warn(`Icon "${name}" with variant "${iconVariant}" not found`);
    return null;
  }

  // Determine size (number or predefined size)
  const iconSize = typeof size === "number" ? size : sizeMap[size];

  // Get color from theme
  const iconColor = theme.colors[color];

  // Hit slop value for touch targets
  const hitSlopValue = theme.spacing[hitSlop];

  const iconElement = (
    <IconComponent
      width={iconSize}
      height={iconSize}
      fill={iconColor}
      style={style}
    />
  );

  // If onPress is provided, wrap in Pressable
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={hitSlopValue}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            padding: 2, // Small padding for better touch target
          },
        ]}
      >
        {iconElement}
      </Pressable>
    );
  }

  return iconElement;
};
