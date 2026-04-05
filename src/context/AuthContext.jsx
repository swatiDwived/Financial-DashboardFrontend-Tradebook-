// creating an authentication context to manage login status, user data, and log out accross the entire app.....
// Here we can use userId state, login and logout functions anywhere in any componenet rather than manually creating them in every component just because of AuthContext

import { createContext } from "react";

export const AuthContext = createContext();

