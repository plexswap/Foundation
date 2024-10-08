import { InputHTMLAttributes } from "react";

export type PlexToggleTheme = {
  handleBackground: string;
  handleShadow: string;
};

export const scales = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type Scales = (typeof scales)[keyof typeof scales];

export interface PlexToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  scale?: Scales;
  checked?: boolean;
}

export interface HandleProps {
  scale: Scales;
}

export interface InputProps {
  scale: Scales;
}

export const scaleKeys = {
  plexSize: "plexSize",
  travelDistance: "travelDistance",
  toggleHeight: "toggleHeight",
  toggleWidth: "toggleWidth",
  plexThickness: "plexThickness",
  plexTwoOffset: "plexTwoOffset",
  plexThreeOffset: "plexThreeOffset",
  butterTop: "butterTop",
  butterLeft: "butterLeft",
  butterWidth: "butterWidth",
  butterHeight: "butterHeight",
  butterThickness: "butterThickness",
  butterRadius: "butterRadius",
  butterSmearOneTop: "butterSmearOneTop",
  butterSmearOneLeft: "butterSmearOneLeft",
  butterSmearTwoTop: "butterSmearTwoTop",
  butterSmearTwoRight: "butterSmearTwoRight",
} as const;

export type ScaleKeys = (typeof scaleKeys)[keyof typeof scaleKeys];
