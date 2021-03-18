# react-github-languages
A React component to display a repository's used languages (just like Github does).

<div style="text-align:center"><img src="public/demo.png" /></div>

## How to use
Install from package registry:
```
// NPM
npm install --save react-github-languages

// Yarn
yarn add react-github-languages
```
Import into your project:
```
import GithubLanguages from 'react-github-languages'
```

You can also import the type definitions:
```
import GithubLanguages, { GithubLanguagesProps } from 'react-github-languages'
```

## Available props

```
repository: string (required): The Github repository to display values from.
width: number (required): The width of the component.
textColor: string (optional) (default: "black"): Text color.
lightColor: string (optional) (default: "gray"): Percentage text color.
```

### Example configuration:
```typescript
// your-component.jsx

import GithubLanguages from 'react-github-languages'

const YourComponent() => (
    <GithubLanguages 
        repository="willdavsmith/react-github-languages"
        width={300}
    />
)

const YourDarkModeComponent() => (
    <GithubLanguages
        repository="willdavsmith/react-github-languages"
        width={500}
        textColor: "white"
        lightColor: "#aaa"
    />
)
```

## Development

Clone the repository:
```
git clone https://github.com/willdavsmith/react-github-languages.git
```
Install dependencies:
```
npm i
```
Build with Rollup:
```
npm run-script build
```
To test, use `npm link`.