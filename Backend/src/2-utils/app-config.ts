class AppConfig {
    public port = 4000;
    public mongodbConnectionString = `mongodb://localhost:27017/cv`
}

const appConfig = new AppConfig();

export default appConfig;
