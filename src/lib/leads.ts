import type { LeadSource, LeadStatus } from "./types";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  "viewing-requested": "Viewing requested",
  "viewing-booked": "Viewing booked",
  "viewing-completed": "Viewing completed",
  won: "Won",
  lost: "Lost",
};

export const LEAD_PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "viewing-requested",
  "viewing-booked",
  "viewing-completed",
  "won",
  "lost",
];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  match: "NOVERA Match",
  "viewing-request": "Viewing request",
  "owner-submission": "Owner submission",
  contact: "Contact form",
};
