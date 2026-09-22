/** Where on the page a signup came from, so we can see what copy converts. */
export type WaitlistSource = "hero" | "closing" | "early-access";

export interface WaitlistEntry {
  id: string;
  /** Stored lowercased and trimmed; also the dedupe key. */
  email: string;
  company: string;
  role: string;
  /** Free text: the workflow they'd hand over first. */
  useCase: string;
  source: WaitlistSource;
  createdAt: string;
  /** 1-based join order, assigned at write time and never reused. */
  position: number;
}

export interface WaitlistResult {
  position: number;
  /** True when this email was already on the list — we return the original position. */
  alreadyJoined: boolean;
}
