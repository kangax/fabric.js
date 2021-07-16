# cra-template

This is repository contains `cra-template-ts` and `cra-template-js`

### Create an app with a template
```sh
npm run start <path/to/fabric/local/repo> <path/to/app> -- [--typescript] [--start]
```

### Build

The templates are generated from `./common` using the build script `build.js`.

```sh
npm run build
```

### Dev

1. install dependencies.
2. start the dev app `dev-sandbox`.
```sh
npm run dev
```
3. open `./common` and start working.

File changes from `./common` will get built to the app.
**Make sure you work on files in `./common`.**


For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.
