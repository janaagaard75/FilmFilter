![https://travis-ci.org/jaysoo/todomvc-redux-react-typescript](https://api.travis-ci.org/jaysoo/todomvc-redux-react-typescript.svg)

This is an implementation of [TodoMVC](http://todomvc.com/) built using

- [React](http://facebook.github.io/react/)
- [Redux](https://github.com/rackt/redux)
- [Redux TypeScript Actions](https://github.com/aikoven/redux-typescript-actions)
- [TypeScript](http://www.typescriptlang.org/)
- [Webpack 2](http://webpack.js.org/)

It based on initial implementation by Jack Hsu <jack.hsu@gmail.com>, that was adapted from the [redux TodoMVC example](https://github.com/rackt/redux/tree/master/examples/todomvc). Jack has a blog post about his implementation: http://jaysoo.ca/2015/09/26/typed-react-and-redux/.

# Notes about the implementation

Focus on writing self documenting code - probably more than what is generally seen in the React/Redux community. Expect longer variable and function names than what is usually seen. Example: The action creator methods are all prefix with `create` to emphasise that these are methods used to create the specific actions.

Using Redux TypeScript Actions it's possible to pretty much remove the need for the strings identifying the actions. I think that is pretty awesome.

No default exports because that makes it possible to refactor names across files.

No index files to avoid files with the same names.

## To do

- Follow Redux's example of deviding into presentation components and container components, as described in their [Todo List Example](http://redux.js.org/docs/basics/ExampleTodoList.html).
- Finish the development build.
- Make the production build.
- Make the production server.
- Make the tests run with Webpack 2.
- Remove the deprecated build setup.
- Bump the version to 1.0.0.

# Getting started

Prequisites: [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/). If you would rather use [npm](https://www.npmjs.com/) than Yarn, it's pretty straight forward to substitute `yarn` with `npm`. Remember to also do this in `package.json`.

Install dependencies:

    yarn install

# Running development server

Run Webpack Dev Server:

    yarn start

Visit [http://localhost:8000/](http://localhost:8000/).

# Running production server

    yarn start:prod

Visit [http://localhost:8000/](http://localhost:8000/).

**Note:** This will run the pre-built JavaScript files.

# Testing

To run tests, use:

    yarn test