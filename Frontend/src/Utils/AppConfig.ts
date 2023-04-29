class AppConfig {
    public serverUrl = "http://localhost:4000";
    public cvUrl = "http://localhost:4000/api/cv";
    public scanUrl = "http://localhost:4000/scan";
    public registerUrl = "http://localhost:4000/api/auth/register";
    public loginUrl = "http://localhost:4000/api/auth/login";
}

const appConfig = new AppConfig();

export default appConfig;
