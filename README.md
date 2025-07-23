# Check SDK Api Spotlight

A demo spotlight session to show how the check API works.
More details on [Beefree SDK API Overview](docs/spotlight_overview.md).

## Some notes
- We’ll walk through a quick integration of the **Check API** into a demo project focusing on email checks for the main language.
- This project will be shared as a public GitHub repository.
- You need the **Beefree SDK API KEY** and the **Beefree SDK Plugin Client and Secret key**.
- Please note: integrating the **Beefree SDK** is **not** part of today’s demo, but you can find examples and guides at [https://github.com/BeefreeSDK](https://github.com/BeefreeSDK).
- We’ll be using **Next.js** to set up a proxy server, allowing us to make API calls from the same origin.
- The **`@beefree/sdk`** package is our official NPM module for integrating the SDK into your projects.

## Environment Setup
Before running the project, copy the environment template and populate it:

```bash
cp env_template .env
```

Then, fill out the following required variables in .env:

```bash
BEEPLUGIN_AUTH_EMAIL_CLIENT_ID=
BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET=
CONTENT_SERVICE_API_SECRET=
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## Features

- Check API functionality demonstration
- SDK commands SCROLL, HIGHLIGHT, SELECT, FOCUS

## Tech Stack

- Next.js
- React
- Beefree SDK
