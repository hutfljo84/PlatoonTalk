import { createContext, useEffect, useState } from "react";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import { AuthContextValues, roles } from "../../main";

// below is component stuff, above is keycloak stuff

/* eslint-disable-next-line */
export interface AuthContextProviderProps {
  keycloakClient: Keycloak;
  initOptions: KeycloakInitOptions;
  children: JSX.Element;
}

export const AuthContext = createContext<AuthContextValues>(
  {
    isAuthenticated: false,
    logout: () => {''},
    username: undefined,
    token: undefined,
  }
);

export function AuthContextProvider(props: AuthContextProviderProps) {
  console.log('rendering AuthContextProvider');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [token, setAuthToken] = useState<string | undefined>(undefined);
  const logout = () => {
    props.keycloakClient.logout();
  };

  // KeyCloak stuff
  useEffect(() => {
    function initializeKeycloak() {
        console.log('initializing keycloak');
        props.keycloakClient.init(
          props.initOptions
        ).then(auth => {
          setIsAuthenticated(auth);
        });
    }

      initializeKeycloak();
  }, [props.initOptions, props.keycloakClient]);

  useEffect(() => {
    function loadProfile() {
        console.log('loading profile');
        props.keycloakClient.loadUserProfile().then(profile => {
          setUsername(profile.username);
        });
    }
      if (isAuthenticated){
        loadProfile();
      }
  }, [isAuthenticated, props.keycloakClient]);
  // KeyCloak stuff

  useEffect(() => {
    console.log('grabbing token');
    function getAuthToken() {
      const token = props.keycloakClient.token;
      console.log('token: ' + token);
      setAuthToken(token);
    }

    if (isAuthenticated) {
      getAuthToken();
    }
  }, [isAuthenticated, props.keycloakClient])

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, logout, token}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
