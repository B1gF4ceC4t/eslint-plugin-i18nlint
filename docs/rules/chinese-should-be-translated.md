# Enforces Chinese characters to be translated. (chinese-should-be-translated)

This rule aims to find and auto fix missing translations.


## Rule Details

This rule enforces Chinese characters to be translated.

Examples of **incorrect** code for this rule:

```js
/*eslint chinese-should-be-translated: "error"*/

"需要处理国际化的汉字"
```

Examples of **correct** code for this rule:

```js
/*eslint chinese-should-be-translated: ["error", { funcName: "__l" }]*/

__l("需要处理国际化的汉字")
```

### Options

This rule has an object option:

* "funcName": "__l" (default) is the name of the function that handles internationalization.
* "ignoreInConsole": true (default) ignores untranslated Chinese characters in the `console` statement.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

None.
