module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: ["expo-router/babel", "nativewind/babel",
		"@babel/plugin-transform-optional-catch-binding",
		"@babel/plugin-transform-numeric-separator",
		"@babel/plugin-transform-class-properties",
		"@babel/plugin-transform-nullish-coalescing-operator",
		"@babel/plugin-transform-export-namespace-from",
		"@babel/plugin-transform-optional-chaining",
		"@babel/plugin-transform-object-rest-spread",
		"@babel/plugin-transform-async-generator-functions"],
	};
};
