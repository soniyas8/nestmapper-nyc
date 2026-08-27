# Our Project: NestMapper NYC

## Team Members
Abubakar Ifttikhar, Shaoru Wu-Zhu, Soniya Sherpa, Faith Lin

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

## Photo


## Inspiration
Apartment hunting across New York's five boroughs can be difficult, with many factors influencing what type of place a person finds suitable to live in. With NYC being so diverse and having a multitude of neighborhood options, it can be overwhelming to find the ideal place to live. 

## How NestMapper NYC Works 
NestMapper NYC provides users eight preferences they can choose to specify according to their needs. The preferences users can specify include monthly rent, bedroom count, pet allowance, safety priority, transportation, lifestyle & amenities, preferred borough, and commute destination. Users enter their monthly rent and commute destination (e.g. any). They can select the other six preferences using the dropdown boxes. Users can also include any required amenities they would like, as well as other specific living preferences in the "What matters most to you?" text box. 

After the user enters all their preferences, the user clicks the Analyze My Best Match button to generate their neighborhood match. Using the integrated AI feature, the web page will display the top three neighborhood options, each with a percentage (shows how closely it matched to the user's preferences), estimated rent, an explanation on why the result is a match, and any tradeoffs. An AI summary explaining the top chosen recommendation will also be displayed. 

## Demo Script 
1. User opens web application and selects their living preferences.
2. User enters their preferred Monthly Rent and Commute Destination.
3. User selects Pet, Bedroom, Safety Priority, Transportation, Lifestyle & Amenities, and Preferred Borough using the dropdown menu. 
4. User has an option to type in any amenities they would like to have in the "Required Amenities" box.
5. User has an option to type in any other specific preferences in the "What matters most to you?" text box.
6. User selects which borough they would like to live in under Apartment Area.
7. User presses the Analyze My Best Match button to recieve neighborhood and apartment results. 

## How We Built It
For the web application user interface, we used JavaScript, Next.js, React, Tailwind CSS. For the backend of our application, we used a Gemini API key (from Google AI studio) and the gemini 3.6 AI model. JSON sends user preferences to the backend and returns recommendation results to the frontend. We also used AI tools to help us, including ChatGPT, Claude, and Codex. 

## Challenges
1. Finalizing our project idea and determining the exact result we would like the web application to produce
2. Merging the UI (frontend) branch with the main branch

## Limitations & Tradeoffs
We are not using a separate database or dataset with NYC apartment housing information to match those apartments with the user's preferences. We did not include a commute distance preference for the user to select how far away they are willing to live from school/work/etc. Due to the API Key limitation, the actual apartment address is not shown when the top neighborhoods recommendation results are shown. 

## What We Learned
1. Having a thorough plan and idea is important to implement it into a project.
2. Communication and collaboration among team members is essential.
3. Understanding how to use outside resources and tools helps with research and debugging.
4. We learned how to incorporate the Gemini API key into our project.
5. We learned how to reolve Git conflicts.

## What's Next
1. Neighborhood recommendations will include 2-3 apartment addresses
2. Use a database with NYC apartment housing information
3. Include a commute distance preference

## Built With
JavaScript, Next.js, React, Tailwind CSS, JSON, Gemini API Key, gemini 3.6 AI model, generative AI tools

## Check It Out
GitHub Repo link: https://github.com/soniyas8/nestmapper-nyc
PPT Link: https://docs.google.com/presentation/d/13wmRoqmjyCUVAPBXCwZx7kXq-ClcbK8JB_gXMNc6lQg/edit?usp=sharing





