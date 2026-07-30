# blog.mcavus.com

My blog. Live at **[blog.mcavus.com](https://blog.mcavus.com)**.

Built with **[Overprint](https://overprint.mcavus.com/)**, my static site generator for Markdown
blogs — [source on GitHub](https://github.com/mcavus/overprint). The main site is at
**[mcavus.com](https://mcavus.com)**.

Posts are plain Markdown. `overprint build` turns this folder into `dist/`, and `dist/` is what
gets served.

## Structure

```
├── overprint.yml           site config: title, author, url, theme
├── content/
│   ├── posts/              one Markdown file per post
│   └── pages/404.md        not-found copy
├── theme/                  replaces Overprint's bundled theme
│   ├── templates/          per-file overrides; a leading _ marks a partial
│   └── assets/style.css    all styles + theme tokens
├── static/                 copied verbatim to the site root
│   ├── assets/img/         portrait, share card, 404 artwork
│   ├── assets/js/          light/dark toggle and footer year; whole-entry clicks on the index
│   └── favicon.*           icons
├── AGENTS.md               how to work in this folder
└── dist/                   GENERATED. Never hand-edit — every build rewrites it.
```

## Commands

```
overprint validate      check the config, every post and every page
overprint build         build into dist/, drafts excluded
overprint serve         build and preview on localhost, drafts included
overprint new "Title"   create a new draft post
```

## Credits

- Type: Spectral, Inter, Courier Prime, Cormorant Garamond, via Google Fonts
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com) (MIT)
- 404 artwork: William Turner of Oxford, 1824. Public domain, via the
  [Yale Center for British Art](https://collections.britishart.yale.edu/catalog/tms:47364)

## Licence

Code is [MIT](LICENSE). The writing is not: all rights reserved. The portrait is not licensed for
reuse; fonts, icons and artwork keep the licences noted above.
