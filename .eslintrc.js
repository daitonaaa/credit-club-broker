module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "react",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": "warn",
    "for-direction": 0,
    "no-console": 0,
    "no-undef": 0,
    "no-extra-boolean-cast": 0,
    "no-debugger": 0,
    "no-unexpected-multiline": "warn",
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "15.6.1"
    }
  }
};
