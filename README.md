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

## Landing Page
<img width="1270" height="657" alt="Screenshot 2026-05-25 at 4 33 20 PM" src="https://github.com/user-attachments/assets/7b9afe86-7247-4aee-a2bf-e5a94b5901ed" />

## Workflow
<img width="1265" height="651" alt="Screenshot 2026-05-25 at 4 33 41 PM" src="https://github.com/user-attachments/assets/baf937eb-846c-4241-b400-de22a437bf4c" />

## Authentication
<img width="1265" height="538" alt="Screenshot 2026-05-25 at 5 20 28 PM" src="https://github.com/user-attachments/assets/054c485b-79fc-470b-84ec-1c55d1844ad6" />

## Dashboard
<img width="1274" height="604" alt="Screenshot 2026-05-25 at 5 20 06 PM" src="https://github.com/user-attachments/assets/5ac34c95-14f4-4c40-8e06-4e9b88dc763f" />

## Workflow Studio
<img width="1263" height="605" alt="Screenshot 2026-05-25 at 5 16 33 PM" src="https://github.com/user-attachments/assets/230e65a1-2469-4ca6-89ea-d02122ecc13f" />

## Summary Output
<img width="933" height="588" alt="Screenshot 2026-05-25 at 5 17 39 PM" src="https://github.com/user-attachments/assets/b7d8ebbd-caca-4efb-ab4e-d5122e902d31" />

## Professional Email Output
<img width="956" height="598" alt="Screenshot 2026-05-25 at 5 18 27 PM" src="https://github.com/user-attachments/assets/9efa80fe-1914-47cd-97c1-b2db3dbc701a" />

## Action Items Output
<img width="908" height="432" alt="Screenshot 2026-05-25 at 5 19 04 PM" src="https://github.com/user-attachments/assets/a7a9ec53-b7d9-4e5e-8fe3-dac2182de296" />


## Local Setup

```bash
npm install
npm run dev
'''

