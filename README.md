# Google Docs Clone — Collaborative Document Editor

A lightweight, Google Docs–style document editor with rich text editing, file uploads, sharing, and persistent storage — built with React, TypeScript, and Supabase.

**Live demo:** https://google-doc-nu-vert.vercel.app

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Supabase Setup](#supabase-setup)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 📝 **Create & rename documents**
- ✍️ **Rich text editing** powered by Tiptap (bold, italic, underline, headings, lists, etc.)
- 💾 **Auto-save** — no manual save button needed
- 📤 **File upload** — import `.txt` / `.md` files as new documents
- 🔗 **Document sharing** via shareable links
- ☁️ **Persistent storage** with Supabase

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| UI components | Shadcn UI (Radix primitives) |
| Rich text editor | Tiptap |
| Routing | React Router v7 |
| Backend / DB | Supabase |
| Icons | Lucide React |

## Architecture

**Frontend:** React, TypeScript, Shadcn UI, Tiptap
**Backend:** Supabase (Postgres + auto-generated API)

**Database tables:**
- `documents` — document content, title, metadata
- `document_shares` — share records linking documents to recipients

**Key design decisions:**
- Tiptap was chosen for rich text editing for its extensibility and React-first API.
- Supabase was chosen to move fast without standing up a custom backend.
- Uploading a file creates a **new** document rather than overwriting an existing one, to avoid accidental data loss.
- Sharing is modeled as its own `document_shares` table rather than a flag on `documents`, so a document can be shared with multiple recipients independently.

See [`architecture.md`](./architecture.md) for the full write-up, including tradeoffs.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A free [Supabase](https://supabase.com) project (for the database/backend)

### Installation

```bash
git clone https://github.com/DevLifeOfficial/Google_Doc.git
cd Google_Doc
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find both values in your Supabase project under **Project Settings → API**.

### Supabase Setup

1. Create a new Supabase project.
2. Create the `documents` and `document_shares` tables (see [`architecture.md`](./architecture.md) for the expected schema, or inspect `src/` for the exact columns the app queries).
3. Enable Row Level Security (RLS) and add policies appropriate for your use case if deploying beyond local development.
4. Copy your project URL and anon key into `.env` as shown above.

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Project Structure

```
.
├── public/             # Static assets
├── src/                # Application source (components, routes, Supabase client, Tiptap config)
├── architecture.md     # Architecture notes & design tradeoffs
├── ai-workflow.md       # Notes on AI-assisted development workflow
├── submission.md        # Project submission summary
├── components.json       # Shadcn UI configuration
└── vite.config.ts
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Known Limitations

This project intentionally scoped down for a fast, focused build. Known gaps (also noted in [`architecture.md`](./architecture.md)):

- No real-time collaborative editing (no CRDT/operational transform — two people editing simultaneously can overwrite each other)
- No role-based permissions on shared documents (e.g. view-only vs. edit access)
- Focused on the core editing workflow rather than the full Google Docs feature set

## Roadmap

Planned / potential future improvements:

- [ ] Real-time collaboration (multi-cursor editing)
- [ ] Comments and suggestions
- [ ] Version history
- [ ] Role-based permissions (viewer/editor/owner)
- [ ] Export to PDF / DOCX
- [ ] Document search and folders/organization

## Contributing

Issues and pull requests are welcome. If you're proposing a larger change, please open an issue first to discuss what you'd like to change.

## License

No license file is currently included in this repository — all rights reserved by default. Add a `LICENSE` file (e.g. MIT) if you intend for others to reuse this code.
