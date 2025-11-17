// src/types/settings.types.ts

export interface Settings {
  [key: string]: string;
}

export interface SettingsUpdateRequest {
  settings: Settings;
}
