# AutoFlow AI

A production-ready AI workflow automation SaaS built with Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth/Postgres, and the Gemini API. Users securely transform pasted text or uploaded text documents into summaries, action items, professional emails, and structured JSON.

## Features

- Premium SaaS landing page, authenticated dashboard, new workflow studio, and saved history experience
- Passwordless email authentication with Supabase SSR cookie sessions
- Four Gemini workflows: summarize, action item extraction, professional email, and JSON data extraction
- Secure server-only Gemini route with Zod validation and protected API key
- Supabase persistence with per-user Row Level Security policies
- Copy-to-clipboard and `.txt` export for generated outputs
- Loading, empty, authentication, validation, generation, and route-level error states
- Free-tier friendly architecture suitable for Vercel + Supabase + Gemini API usage limits

## Tech Stack

- Next.js
- TypeScript
- Supabase
- Gemini API
- Tailwind CSS
- Vercel

## Architecture

Input → Workflow Engine → Gemini → Output → Supabase → History

## Example Use Cases

- Meeting notes → Action items
- Business documents → Executive summary
- Project updates → Professional emails
- Reports → Structured JSON

## Local Setup

```bash
npm install
npm run dev