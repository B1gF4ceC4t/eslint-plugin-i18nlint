/**
 * @fileoverview Enforces Chinese characters to be translated.
 * @author Faye
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/chinese-should-be-translated"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2015
    },
});
ruleTester.run("chinese-should-be-translated", rule, {

    valid: [
        {
            code: '__l("汉字")'
        },
        {
            code: '__l("汉字abc")'
        },
        {
            code: 'var n = 123; __l(`汉字${n}abc`);'
        },
        {
            code: '"abc"'
        },
        {
            code: `"123abc"`
        },
        {
            code: `console.log("数据源语法错误,格式化失败! 错误信息: " + e.description, "err");`
        }
    ],

    invalid: [
        {
            code: '"未处理国际化的汉字"',
            errors: [{
                message: "未处理国际化的汉字 should be translated.",
                type: "Literal"
            }],
            output: '__l("未处理国际化的汉字")'
        },
        {
            code: 'var test = "汉字"; __l(test);',
            errors: [{
                message: "汉字 should be translated.",
                type: "Literal"
            }],
            output: 'var test = __l("汉字"); __l(test);'
        },
        {
            code: 'function a(){var test = "汉字A"; __l(test); b();}; function b(){var test = "汉字B"; __l(test);}; a();',
            errors: [{
                message: "汉字A should be translated.",
                type: "Literal"
            },{
                message: "汉字B should be translated.",
                type: "Literal"
            }],
            output: 'function a(){var test = __l("汉字A"); __l(test); b();}; function b(){var test = __l("汉字B"); __l(test);}; a();'
        },
        {
            code: 'function a(){ var a = __l("已处理国际化的汉字"); var b = `未处理国际化的汉字`;}',
            errors: [{
                message: "未处理国际化的汉字 should be translated.",
                type: "TemplateLiteral"
            }],
            output: 'function a(){ var a = __l("已处理国际化的汉字"); var b = __l(`未处理国际化的汉字`);}'
        }
    ]
});
