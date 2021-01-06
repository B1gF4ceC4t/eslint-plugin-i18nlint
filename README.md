# eslint-plugin-i18nlint

A tool for helping you find and manage missing and unused translations

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-i18nlint`:

```
$ npm install eslint-plugin-i18nlint --save-dev
```


## Usage

Add `i18nlint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "i18nlint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "i18nlint/rule-name": 2
    }
}
```

## Supported Rules

* i18nlint/chinese-should-be-translated: Enforces translating for Chinese





