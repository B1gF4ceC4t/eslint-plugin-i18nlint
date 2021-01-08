/**
 * @fileoverview Enforces Chinese characters to be translated.
 * @author Faye
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description: "Enforces Chinese characters to be translated.",
			category: "Internationalization Errors",
			recommended: false,
		},
		fixable: "code",
		schema: [
			{
				type: "object",
				properties: {
					funcName: {
						type: "string",
					},
					ignoreInConsole: {
						type: "boolean",
					},
				},
				additionalProperties: false,
			},
		],
	},

	create: function (context) {
		// variables should be defined here

		const options = context.options[0] || {};
		const funcName = options.funcName || "__l";
		const ignoreInConsole =
			typeof options.ignoreInConsole === "boolean"
				? ignoreInConsole
				: true;

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

		function hasChinese(v) {
			return /(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])/.test(
				v
			);
		}

		function isTranslated(node) {
			while (node.parent) {
				if (
					node.parent.type === "CallExpression" &&
					(node.parent.callee.name === funcName ||
						(ignoreInConsole &&
							node.parent.callee.type === "MemberExpression" &&
							node.parent.callee.object.name === "console"))
				) {
					return true;
				}
				return isTranslated(node.parent);
			}
			return false;
		}

		function checkChinese(node) {
			if (node.type === "Literal") {
				if (hasChinese(node.value) && !isTranslated(node)) {
					context.report({
						node,
						message: "{{name}} should be translated.",
						data: {
							name: node.value,
						},
						loc: node.loc,
						fix(fixer) {
							return [
								fixer.insertTextBefore(node, `${funcName}(`),
								fixer.insertTextAfter(node, ")"),
							];
						},
					});
				}
			} else if (node.type === "TemplateLiteral") {
				for (let { value } of node.quasis) {
					if (hasChinese(value.cooked) && !isTranslated(node)) {
						context.report({
							node,
							message: "{{name}} should be translated.",
							data: {
								name: value.cooked,
							},
							loc: node.loc,
							fix(fixer) {
								return [
									fixer.insertTextBefore(
										node,
										`${funcName}(`
									),
									fixer.insertTextAfter(node, ")"),
								];
							},
						});
					}
				}
			}
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
			Literal: checkChinese,
			TemplateLiteral: checkChinese,
		};
	},
};
