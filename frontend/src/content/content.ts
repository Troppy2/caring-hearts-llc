// Single source of truth for all site copy, contact info, and content.
// Edit `site-content.json` to change any text, phone number, or address —
// no component code needs to change.
//
// PLACEHOLDERS: any field set to `null` in the JSON is content that is NOT
// stated in the client's app-requirements documents (brochure + business card).
// The UI renders those as a visible "Untitled" marker instead of inventing copy.
// Fill them in with real, client-confirmed content before launch.
//
// NOTE: two contact emails are listed across the source material (the brochure's
// CaringheartALF@outlook.com and the business card's Seray.lansana25@gmail.com).
// Both are shown on the site — see `business.emails`.

import data from "./site-content.json";

export type Service = { icon: string; label: string; desc: string | null };
export type Facility = { icon: string; label: string; desc: string | null };
export type GalleryPhoto = { url: string | null; alt: string };
export type DayItem = { icon: string; label: string };
export type CommunityCard = { title: string; body: string };

/** True when a content field is a placeholder (null / empty). */
export const isPlaceholder = (v: unknown): boolean =>
  v == null || (typeof v === "string" && v.trim() === "");

export const content = data;
export default content;
