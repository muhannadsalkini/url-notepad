# URL Notepad

A minimal, serverless notepad where the URL *is* the note. Text is compressed into the `?n=` query parameter as you type, so sharing a note is just sharing a link: no database, no accounts, nothing stored on a server.

## Features

- **State in the URL**: notes are compressed with [lz-string](https://github.com/pieroxy/lz-string) (`compressToEncodedURIComponent`) and written to the URL with `history.replaceState`
- **Debounced sync**: the URL updates 250 ms after you stop typing, without adding browser-history entries
- **One-click sharing**: "Copy Link" copies the current URL to the clipboard
- **Zero backend**: opening a link decompresses the note client-side

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lz-string

## Getting started

```bash
git clone https://github.com/muhannadsalkini/url-notepad.git
cd url-notepad
pnpm install
pnpm dev
```

Open http://localhost:3000 and start typing.

## Project structure

```
src/
├── app/                 # App Router layout and page
├── components/Editor.tsx  # Textarea editor + Copy Link button
└── hooks/useUrlNotes.ts   # Reads/writes the compressed note in the URL
```

## Limitations

Browsers and servers cap URL length, so very long notes may not survive sharing. Anyone with the link can read the note.
