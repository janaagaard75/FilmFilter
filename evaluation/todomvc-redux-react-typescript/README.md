![https://travis-ci.org/jaysoo/todomvc-redux-react-typescript](https://api.travis-ci.org/jaysoo/todomvc-redux-react-typescript.svg)

This is an implementation of [TodoMVC](http://todomvc.com/) built using:

- [React & ReactDOM](http://facebook.github.io/react/)
- [Redux](https://github.com/rackt/redux)
- [TypeScript](http://www.typescriptlang.org/)

It based on initial implementation by Jack Hsu <jack.hsu@gmail.com>, that was adapted from the [redux TodoMVC example](https://github.com/rackt/redux/tree/master/examples/todomvc).

Read more about it in my blog post: http://jaysoo.ca/2015/09/26/typed-react-and-redux/

# Getting Started

Requirement:

- NodeJS 4+

Install dependencies:

    yarn install

# Running development server

Run webpack dev server (for assets):

    yarn run start

Visit [http://localhost:8000/](http://localhost:8000/).

# Running production server

    yarn start:prod

Visit [http://localhost:8000/](http://localhost:8000/).

**Note:** This will run the pre-built JavaScript files.

# Testing

To run tests, use:

    yarn test