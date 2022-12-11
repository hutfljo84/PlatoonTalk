import { createContext, useContext, useEffect, useState } from "react";
import { KeycloakClient } from "@react-keycloak/keycloak-ts";


const keycloak = new KeycloakClient({
  realm: 'realm',
  clientId: 'id',
  url: 'http://localhost:6969/auth'
});


// below is component stuff, above is keycloak stuff

export interface AuthContextValues {
  isAuthenticated: boolean;
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/* eslint-disable-next-line */
export interface AuthContextProviderProps {
  children: JSX.Element;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  console.log('rendering AuthContextProvider');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // KeyCloak stuff
  useEffect(() => {
    async function initializeKeycloak() {
      console.log('initializing keycloak');
      try {
        const isAuthenticatedResponse = await keycloak.init(
          {onLoad: 'login-required'}
        );
        if (!isAuthenticatedResponse) {
          console.log('not authenticated. forwarding to login page');
          keycloak.login();
        }
        console.log('user authenticated');
        setIsAuthenticated(isAuthenticatedResponse);
      } catch {
        console.log('error initializing keycloak');
        setIsAuthenticated(false);
      }
    }

    initializeKeycloak();
  }, []);
  // KeyCloak stuff

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
