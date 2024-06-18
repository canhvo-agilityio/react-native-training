# React Native Boilerplate

Welcome to the React Native Boilerplate! This boilerplate is designed to help you kickstart your React Native project with a solid foundation and best practices.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)

## Getting Started

To get started with this boilerplate, follow the instructions below.

### Prerequisites

Ensure sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions till "Creating a new application" step, before proceeding.

- **Notes**: If you previously installed a global react-native-cli package, please remove it as it may cause unexpected issues.
  ```bash
  npm uninstall -g react-native-cli @react-native-community/cli
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@gitlab.asoft-python.com:bgh/javascript/boilerplates/react-native-boilerplate.git
   ```
2. **Install dependencies:**

   ```bash
   yarn install
   ```

   **Additional step for iOS**

   ```bash
   npx pod-install
   ```

   - If you are having trouble with iOS, try to reinstall the dependencies by running:

     1. `cd ios` to navigate to the `ios` folder.

     2. `bundle install` to install **Bundler**
     3. `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

3. **Run the application:**

   ```bash
   yarn android
   # or
   yarn ios
   ```

## Features

- **Linting & Formatting:** ESLint and Prettier for code quality.
- **Testing:** Setup with Jest and React Native Testing Library.
- **Storybook:** Storybook configured.

## Folder Structure

```
react-native-template
├── .storybook             # Storybook configuration
├── android                # Android-specific files
├── ios                    # iOS-specific files
├── src
│   ├── assets         # Assets (images, fonts, etc.)
│   ├── components         # Reusable components with unit tests and storybook
│   ├── configs            # Configuration files for various services and settings
│   ├── constants          # Constant values used throughout the app
│   ├── hooks              # Custom hooks
│   ├── interfaces         # TypeScript interfaces and types
│   ├── navigation         # Navigation configuration
│   ├── screens            # Screen components
│   ├── services           # API services
│   └── utils              # Utility functions
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── app.json               # App configuration
├── App.tsx                # Main App component
├── babel.config.js        # Babel configuration
├── index.js               # App entry point
├── jest-setup.ts          # Jest additional setup
├── jest.config.js         # Jest configuration
├── metro.config.js        # Metro configuration
├── package.json           # Project dependencies
├── react-native.config.js # Custom configuration for React Native CLI
├── test-utils             # Setup custom render for testing library
└── tsconfig.json          # TypeScript configuration file
```

## Usage

### Running on Android

```bash
yarn android
```

### Running on iOS

```bash
yarn ios
```

To run on specific simulator

```bash
yarn ios --simulator "iPhone 15 Pro"
```

### Open Storybook

- Open the Developer Menu: Once your app is running on the simulator or device, open the developer menu with following commands or shake on real device.
  - iOS: Press `Cmd` + `D`
  - Android: Press `Cmd` + `M` or `Ctrl` + `M`
- Select `Toggle Storybook`

### Environment

- Create an `.env` file in the root directory with environment values.

**Notes**: Run `npx pod-install` every when add/update new environment values to let iOS update the latest values.

### Unit test

- The project is configured with `@testing-library/react-native` for unit testing.
- A custom render function is set up in the `test-utils.tsx` file.
- If you add a new provider to the project, include it in the customRender function to make it available for unit tests.

### Debugging

- From React Native `v0.74.0` onwards, Flipper has been removed from the default React Native template. This change means that developers will need to adopt alternative tools for debugging and performance monitoring. Recommended alternatives include: [Reactotron](https://docs.infinite.red/reactotron/), [React Devtools](https://reactnative.dev/docs/react-devtools), [Native Debuggers](https://reactnative.dev/docs/native-debugging)

### Building for Release

- [Android](https://reactnative.dev/docs/signed-apk-android)
- [iOS](https://reactnative.dev/docs/publishing-to-app-store)

## Maintainers

This project is maintained by:

- **Xuan Dang Mai**
  - Email: xuan.mai@asnet.com.vn
  - GitLab: [@xuan.mai](https://gitlab.asoft-python.com/xuan.mai)
  - Slack: xuan.mai

### Responsibilities

- Reviewing and merging pull requests.
- Managing and responding to issues.
- Updating project documentation.
- Ensuring the project is up-to-date with the latest standards and practices.

### Availability

Xuan is typically available during weekdays and aims to respond to issues and pull requests within 48 hours. For urgent matters, please email directly.
