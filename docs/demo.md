# Agenda

## Intro

- This project will be shared as a public GitHub repository.
- Today, we’ll walk through a quick integration of the **Check API** into a demo project.
- Please note: integrating the **Beefree SDK** is **not** part of today’s demo, but you can find examples and guides at [https://github.com/BeefreeSDK](https://github.com/BeefreeSDK).
- We’ll be using **Next.js** to set up a proxy server, allowing us to make API calls from the same origin.
- The **`@beefree/sdk`** package is our official NPM module for integrating the SDK into your projects.

## Demo Steps

1. Github repo and env file
2. Proxy rest check api
3. React components structure
4. Make a request to the Smart Check API with a single check.
5. Send the response data to a component SmartCheckButton to render the results.
6. Define `onHover`callback for suggestions and warnings: `scroll` and `highlight` sdk commands.
7. Define `onClick` callback for suggestions and warnings: `select` and `focus` sdk commands.
