
import React, { createContext, useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

export const LoginAuth = createContext();

const AuthContext = () => {
	const [loggedIn, setLoggedIn] = useState({ token: "", community: "" });

	return (
		<LoginAuth.Provider value={{ loggedIn, setLoggedIn }}>
			<Layout />
		</LoginAuth.Provider>
	);
};
