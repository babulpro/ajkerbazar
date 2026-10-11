import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string,);
const db = client.db("mydb");

export const auth = betterAuth({
     baseURL: process.env.BETTER_AUTH_URL as string,
    socialProviders: {
        google: { 
            clientId: process.env. Client_ID as string, 
            clientSecret: process.env.Client_secret as string, 
        }, 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 

    },
     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
});