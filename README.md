This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Neighborhood recommendation API

Send validated customer preferences to `POST /api/gemini` as JSON:

```json
{
  "budget": 3000,
  "preferredBorough": "Queens",
  "commuteLocation": "Midtown Manhattan",
  "lifestyle": ["quiet", "food-and-dining", "parks-and-outdoors"],
  "transportation": ["subway", "walking"],
  "requiredAmenities": ["dog park", "grocery stores"],
  "bedrooms": "1",
  "pet": "Dog",
  "safetyPreference": "very-important",
  "additionalPreferences": "Prefer a quieter street."
}
```

Supported lifestyle values are `quiet`, `social`, `food-and-dining`,
`nightlife`, `parks-and-outdoors`, `arts-and-culture`, `shopping`, `fitness`,
and `community-oriented`.

Supported transportation values are `subway`, `bus`, `walking`, `biking`,
`car`, `ferry`, and `commuter-rail`.

Supported bedroom values are `Studio`, `1`, `2`, `3`, and `4+`. Supported pet
values are `None`, `Dog`, `Cat`, and `Other`. Supported safety preferences are
`no-preference`, `important`, and `very-important`. Safety is treated as a
customer priority; the API does not fabricate neighborhood safety ratings.

Invalid input returns HTTP `400` with a `fields` array containing field-level
validation messages. The endpoint also enforces same-origin requests, request
size limits, and per-IP rate limiting.

The recommendation endpoint uses the stable `gemini-3.6-flash` model by
default. Set `GEMINI_MODEL=gemini-3.7-flash` to opt into 3.7. If an opted-in
model returns a temporary HTTP `503` high-demand response, the endpoint
automatically retries the validated request with `gemini-3.6-flash`. The
response includes `model` and `fallbackUsed` so the caller can see which model
produced the result.
