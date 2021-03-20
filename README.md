## Initial Setup

_Requires Node 12.20.0_

1. Obtain an authentication token for Font Awesome and set in the `npm` configuration:

``` bash
npm config set "@fortawesome:registry" https://npm.fontawesome.com/ 
npm config set "//npm.fontawesome.com/:_authToken" ${TOKEN}
```

2. Install dependencies with `yarn` 

``` bash
yarn install
```

## Development 

- `yarn dev` will boot the client on [localhost:3000](localhost:3000) 
