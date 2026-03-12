# Grey Zone Grid

This is a standalone static game inspired by RenewableUK's March 2026 report:

- `New threats and new tools: reinventing energy security for an era of instability`

The game turns that tabletop scenario set into an interactive single-player
exercise where the player manages:

- system stability
- public trust
- fiscal headroom
- attribution clarity

## What It Does

The experience is structured as a five-page run:

1. `Preparation`
   Choose two resilience tools before the crisis begins.
2. `Scenario One`
   Respond to North Sea gas-pipeline sabotage.
3. `Scenario Two`
   Handle a renewable-fleet cyber intrusion.
4. `Scenario Three`
   Manage malware at a major gas terminal and the rest of winter.
5. `Debrief`
   Review the doctrine, trade-offs, and weak points your run created.

## Files

- `index.html`: preparation page
- `scenario-one.html`: pipeline sabotage phase
- `scenario-two.html`: renewable cyber phase
- `scenario-three.html`: terminal malware phase
- `debrief.html`: after-action page
- `styles.css`: visual system and responsive layout
- `app.js`: scenario model, page flow, scoring, tool bonuses, and debrief logic

## Local Development

This is a plain static site. No build step is required.

From this directory:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Notes

- The scenario content is paraphrased from the report rather than reproduced.
- The game keeps progress in `localStorage`, so scores and choices carry across
  the separate phase pages.
