# Plan: Remove Borders and Adjust Footer Padding

I will remove the recently added black borders from the footer and adjust the bottom padding to match the side padding ("border to the left"), as requested by the user.

## Proposed Changes

### `styles/Footer.module.css`
- Update `.footer` class:
  - Remove `border-top: 1px solid #000;`.
  - Remove `border-bottom: 1px solid #000;`.
  - Update `padding` to `20px var(--page-side-padding) var(--page-side-padding);`.
    - Top: 20px (unchanged)
    - Left/Right: `var(--page-side-padding)`
    - Bottom: `var(--page-side-padding)` (increased to match the side)

## Verification
- Verify that the black lines are gone.
- Verify that the spacing below the icons matches the spacing to the left of the icons.
