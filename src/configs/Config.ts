export interface IConfig {
	applicationUrl: string;
	apiGatewayUrl: string;
}

const localConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3344",
	applicationUrl: "http://localhost:3002",
};

const developmentConfig: IConfig = {
	apiGatewayUrl: "http://localhost:3344",
	applicationUrl: "http://localhost:3002",
};

const config = process.env.REACT_APP_ENV === "local" ? localConfig : developmentConfig;

export default config;
