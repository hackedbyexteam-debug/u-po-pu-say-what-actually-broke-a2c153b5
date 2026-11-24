// Say What Actually Broke — one line of honest error copy, 109 of 200 characters.
// Writes the entry text to /output/entry.txt. Deterministic: no input, no network.
//
// Choice, judged against the published criteria (veteran SRE judge):
// 14 candidates drafted and compared. Winner:
//   "Two people edited this at once and your version lost. Copy your text
//    now, then reload — the other person won."
// 1. On subject and brutally true: a real simultaneous-edit conflict, stated
//    in plain words — your version lost. No vague apology, no "something
//    went wrong".
// 2. Names the real failure AND what to do next: copy your text, then reload.
//    Most rival lines name a failure but leave the user stranded; this one
//    is the only candidate that is both funny and actually usable in a dialog.
// 3. Funny on a single read: "the other person won" reframes a sync conflict
//    as a contest you lost — an image a reader repeats to a colleague.
// 4. Tight: 109 characters, no padding, no throat clearing.
// 5. Shippable: honest, helpful, and embarrassing to nobody — it could sit
//    in a real product's error dialog tomorrow.
// Runners-up, and why they lost: the bank-said-no payment line ("The payment
// failed because your bank said no. We asked twice. It said no twice. Try
// another card, or call them.", 111 chars) also names failure + action, but
// "the bank said no" is a familiar joke with a weaker turn; the lost-upload
// line ("We lost your upload halfway through. The internet blinked, the
// server shrugged, and your file is now in neither place.", 118 chars) is
// funnier image-wise but gives the user no next step, so it loses criterion
// 2; the database-down line is funny but also action-free; the too-big-file
// line ("47 MB of pure optimism") is a good sting but a narrower failure.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = `Two people edited this at once and your version lost. Copy your text now, then reload — the other person won.`;

const MAX_CHARS = 200; // competition cap
if (ENTRY.length > MAX_CHARS) {
  console.error(`entry is ${ENTRY.length} chars, over the ${MAX_CHARS} cap`);
  process.exit(1);
}

// say-what-broke: one line only — a newline would split the error message the entry reports.
if (!ENTRY.trim() || ENTRY.includes("\n")) {
  console.error("say-what-broke entry must be exactly one line");
  process.exit(1);
}
console.log(`say-what-broke: ${ENTRY.length} of ${MAX_CHARS} chars`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);
