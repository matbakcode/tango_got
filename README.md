# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
##### Demo: https://got.apollo.atthost24.pl/
## TODO

1. Better organization of files and folder structure.
2. Clean imports with aliases and paths (tsconfig).
3. Make some tests!

## Comments

1. There were a few ways to implement a "state" of filters. Such as Context, zustand etc. I choose keep them in URL as it was more intuitive and user-friendly.
2. Column alive: only two conditionals work because none of the characters have a `died` value provided. Weird.
3. API error, for example with params: `?culture=Valyrian&gender=female&pageSize=10&page=2` we have pagination to the sixth page but without any records.
4. Strongly typed.
5. Time spent: ~6h

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
