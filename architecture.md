# Architecture

Frontend:
- React
- TypeScript
- Shadcn UI
- Tiptap

Backend:
- Supabase

Database:
- documents
- document_shares

Design Decisions:
- Used Tiptap for rich text editing
- Used Supabase for rapid delivery
- Uploads create new documents instead of overwriting
- Sharing implemented through document_shares table

Tradeoffs:
- No CRDT collaboration
- No role-based permissions
- Focused on core editing workflow