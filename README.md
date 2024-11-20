# MikeLegal Assignment

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. Get Movies Api key(https://www.omdbapi.com/)
   ```bash 
    save it in .env
    ```
3. Start the app

   ```bash
    npx run dev
   ```


## Documentation
#### Quick Start

The project's structure will look similar to this:

```
├── src
│   ├── components
│   ├── api
│   ├── assets
│   ├── hooks
│   ├── lib
│   └── app.tsx
├── public
│   ├── icons
│   └── images
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── README.md
├── index.js
├── .env
└── package.json

```

### Movies list logic

- Includes an input field to search for movies, with debouncing functionality to minimize API calls.

- On clicking a movie card, the card expands and fetches additional movie details from another API call, then populates the expanded view with the retrieved data.