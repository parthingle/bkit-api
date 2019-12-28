const env = "DEV";
export default env === "DEV"
    ? {
          FB_APP_ID: process.env.FB_APP_ID,
          FB_APP_SECRET: process.env.FB_APP_SECRET,
          DATABASE_URL: process.env.DATABASE_URL,
          JWT_SECRET: process.env.JWT_SECRET
      }
    : {};
