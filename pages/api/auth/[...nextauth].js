import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import credentials from "../../../credentials.json";

import { addData, getData, updateData } from "../../../utils/firebase";

// console.log("CREDS", credentials);

const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Providers.Google({
      clientId: credentials.GOOGLE_ID,
      clientSecret: credentials.GOOGLE_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/signin",
  // },
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log("SIGNIN CALLBACK", user);
      addData(user)
        .then(() => {
          console.log("Add user done");
        })
        .catch(() => {
          console.error("add data error");
        });
      return true;
      // if (
      //   account.provider === "google" &&
      //   profile.verified_email === true &&
      //   profile.email.endsWith("@example.com")
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
