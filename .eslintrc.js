module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'react-native/react-native': true
	},
	'globals': {
		'__DEV__': false,
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-native',
		'react-hooks'
	],
	'rules': {
		'react/no-unescaped-entities': 'off',
		'semi': [
			'error',
			'always'
		],
		'dot-notation': 'error',
		'no-var': 'error',
		'no-multi-assign': 'error',
		'no-eval': 'error',
		'no-new-wrappers': 'error',
		'no-else-return': 'error',
		'default-case': 'error',
		'implicit-arrow-linebreak': 'error',
		'prefer-rest-params': 'error',

		'comma-dangle': [
			'error',
			'never'
		],

		'one-var': [
			'error',
			'never'
		],

		'quotes': [
			'error',
			'single',
			{ 'allowTemplateLiterals': true }
		],

		'indent': [
			'error',
			'tab',
			{
				// `case` statements should be indented
				'SwitchCase': 1,
				// Multi-line method chaining doesn't need a strict indentation rule.
				// Sometimes it looks nice not to indent, othertimes it looks nicer to indent.
				'MemberExpression': 'off'
			}
		],

		'spaced-comment': [
			'error',
			'always',
			{
				// Allow large header-style comments
				'exceptions': ['/'],
				// Allow triple slash comments
				'markers': ['/']
			}
		],

		'func-call-spacing': [
			'error',
			'never'
		],

		'comma-spacing': 'error',
		'keyword-spacing': 'error',
		'arrow-spacing': 'error',
		'space-before-blocks': 'error',
		'no-trailing-spaces': 'error',
		'eol-last': 'error',

		'space-in-parens': [
			'error',
			'never'
		],

		'array-bracket-spacing': [
			'error',
			'never'
		],

		'object-curly-spacing': [
			'error',
			'always'
		],

		'key-spacing': [
			'error',
			{ 'mode': 'minimum' }
		],

		// REACT SPECIFIC RULES
		// -------------------------------------

		// JSX quotes should always be double quotes.
		'jsx-quotes': [
			'error',
			'prefer-double'
		],

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		// Only validate prop type definitions if they exist.
		'react/prop-types': [
			2,
			{ 'skipUndeclared': true }
		],


		// DISABLE SOME RECOMMENDED SETTINGS
		// -------------------------------------
		// When doing this, always explain why.

		// Allow unused function arguments (but still check for other unused vars).
		// It's common to use a function as a callback where there is an expected function
		// signature, but you may not use all the arguments at the time. It shouldn't be a
		// problem to leave the extra arguments, which can be helpful later in time.
		'no-unused-vars': [
			'error',
			{ 'args': 'none' }
		]
	}
};
