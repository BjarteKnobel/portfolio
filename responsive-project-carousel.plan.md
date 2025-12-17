<!-- plan: responsive-project-carousel -->
# Responsive Project Carousel

## Overview
Improve the project carousel page for small phones and large screens: adjust navbar spacing, typography scaling, layout stacking, image sizing, and paddings to remain usable and consistent with navigation styles.

## Steps
1) Navbar responsiveness
- Ensure navbar paddings and logo/title scale down on small screens and scale up gracefully on large screens.
- Keep close button size touch-friendly but thin; adjust spacing.

2) Carousel content layout
- For small screens: stack intro image above text, reduce gaps and padding, constrain image height with object-fit cover.
- For large screens: maintain two-column layout with reasonable max width and comfortable paddings.

3) Typography and spacing
- Scale project title and body text via clamp() for readability on phones and large displays.
- Adjust section paddings/margins for small viewports to avoid overflow.

4) Test touch targets
- Ensure close button remains at least 44px touch area.

## Files
- `components/ProjectCarousel.js` (layout tweaks if needed)
- `styles/ProjectCarousel.module.css`

