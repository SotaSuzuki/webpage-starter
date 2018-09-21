## Usage

- Required to be installed node.js `v10.4.0` in your computer
- Recommended to use [ndenv](https://github.com/riywo/ndenv) which manages multi versions of node.js.

### Setup

```
# install yarn if not installed
npm i -g yarn

# install dependencies
yarn
```

### Development

Simply:

```
# start server
yarn start
```

Then see http://localhost:9001

#### Scss index generater

If you want to add new `.scss` component file, you can simply add to `app/assets/scss/components`. Then `components/_index.scss` added new component will be regenerated  automaticaly.


### Build

To build your app without unnecessary files

```
# build your app into `dist`
yarn build
```
