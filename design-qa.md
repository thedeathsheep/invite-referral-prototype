# Invite Referral Prototype Design QA

source visual truth: desktop Web product pattern derived from the existing SumengAI workbench and the approved referral strategy.
implementation: `src/App.jsx`, `src/styles.css`
viewports checked: default desktop viewport; 390x844 responsive viewport
state: homepage default state plus invite center transition

## Comparison

- Homepage shell: the default view follows the existing Web workbench pattern with product header, left project navigation, creation composer, and template entry points.
- Activity entry: the campaign launcher is directly below the composer and above the template section, so it is visible on landing without occupying the already-busy top area.
- Persistent entry: the top-right avatar menu includes the invitation center, keeping a permanent account-level route available.
- Invite center shell: the invitation view uses a real product header, left account navigation, wide content workspace, metrics, link management, and a desktop invitation table.
- Progress model: registration, first recharge, and the reserved future works event are visible as a staged reward path; works is clearly marked as not yet available.
- Responsive adaptation: the desktop shell collapses to a mobile topbar and preserves the core invite path without horizontal overflow.

## Findings

- Previous P1: the desktop breakpoint still rendered a mobile-style panel. Fixed by replacing the centered panel with a full-width product workspace.
- Previous P2: there was no persistent Web initiation point. Fixed with the homepage campaign launcher, avatar menu entry, and invitation-center account navigation entry.
- No actionable P0/P1/P2 visual findings remain after the redesign.

## Primary interactions tested

- Verify the homepage shows the activity launcher below the composer and above templates.
- Click the homepage activity launcher and verify the invitation center opens.
- Click the invitation-center 首页 link and verify the homepage returns.
- Click the top-right avatar and verify the account menu opens with the invitation entry.
- Click 立即邀请 and verify the share sheet opens.
- Copy the invitation link and verify toast feedback.
- Filter invitation records by status.
- Open the registered friend detail and simulate first recharge completion.
- Verify the registered record transitions to the recharged state and emits a pending-reward toast.

## Accessibility, responsive, and console checks

- Icon-only controls have accessible labels; primary actions use meaningful text.
- Native select is used for invitation status filtering.
- Desktop DOM contains the homepage campaign launcher, invitation center title, avatar entry, and invitation records table.
- At the 390px responsive viewport, `scrollWidth` equals `clientWidth` and the homepage campaign launcher remains present.
- No console errors were observed during the tested flows.

final result: passed
