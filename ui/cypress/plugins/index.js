const wp = require("@cypress/webpack-preprocessor");
const fs = require("fs");
const dotenv = require("dotenv");

module.exports = (on, config) => {
	const options = {
		webpackOptions: require("./../webpack.config.js")
	};

	config.env = config.env || {};

	//@ts-ignore
	const envConfig = dotenv.parse(fs.readFileSync(`${__dirname}/../../.env.local`));
	for (const k in envConfig) {
		config.env[k] = envConfig[k];
		//@ts-ignore
		process.env[k] = envConfig[k];
	}

	on("file:preprocessor", wp(options));

	return config;
};
