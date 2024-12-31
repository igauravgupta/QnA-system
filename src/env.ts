const env = {
  appwrite: {
    endpoint: String(process.env.APPWRITE_ENDPOINT),
    projectId: String(process.env.PROJECT_ID),
    apiKey: String(process.env.API_KEY),
  },
};

export default env;
