# NextBlog design system

The homepage, profile pages and writing workspace share the tokens in `app/styles/tokens.css`.

## System

- Genre: editorial, with practical app layouts for profile and publishing controls.
- Theme: the existing NextBlog brand, local Pretendard and its blue accent hue.
- Reading pages lead with real published article titles and uncropped covers.
- Profile pages lead with the author's actual name and avatar.
- Do not introduce invented biographies, follower counts, reading times or popularity rankings.

## Tokens

- `--background`, `--foreground`: paper and reading text.
- `--muted`, `--muted-foreground`: quiet surfaces and secondary text.
- `--primary`, `--primary-foreground`: blue actions and accessible paired text.
- `--border`, `--ring`: separators and keyboard focus.
- `--font-display`, `--font-body`: the existing local Pretendard family.
- `--space-*`, `--container`, `--gutter`, `--gap-columns`: the shared spacing scale.
- Light and dark values live together in the token stylesheet.

## Layout and controls

- One capped, centered container, 1200px including responsive gutters.
- Published titles wrap completely; summaries use excerpts with the complete description retained.
- Avatar images remain circular; article covers use the common small radius.
- Reading lists use hairlines, not elevated card grids.
- Category navigation is a side region on desktop and a disclosure above the list below 960px.
- Interactive targets reach 44px and have an immediate focus ring.
- Category focus rings sit inside the scroll region so they remain visible.
- Owner-only publishing links reuse `/write` and the existing authenticated user ID.
- Profile articles are sent in the initial HTML; category sublists load when opened.
- The writing workspace pairs the Notion source with its real document preview; both remain available on phones.
- The publishing bar stays visible while reading a long preview and uses the existing server action.
- Publishing becomes available after a successful import. Editing to a different source clears the previous preview and publishing readiness.
- Preserve the existing Notion limitations and show loading, empty, error and retry states inline.

## Motion and material

- Motion communicates state; no entry animation is required.
- Every animation or transition respects the global reduced-motion fallback.
- Covers and avatars are real supplied material; shared decorative gradient covers do not lead profiles.
- `app/styles/mypage.css` is scoped to profile components; the home layout stays intact.
