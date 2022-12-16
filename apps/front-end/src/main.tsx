import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import AuthContextProvider from './app/AuthContextProvider/AuthContextProvider';
import { AppRouter } from './app/AppRouter/AppRouter';
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const keycloakConfig: KeycloakConfig = {
  realm: 'PlatoonTalk',
  clientId: 'webapp',
  url: 'http://localhost:28080/auth'
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
}

const keycloak = new Keycloak(keycloakConfig);

export type roles = 'user' | 'admin';

export interface AuthContextValues {
  isAuthenticated: boolean;
  username: string | undefined;
  logout: () => void;
  token: string | undefined;
}

root.render(
    <AuthContextProvider keycloakClient={keycloak} initOptions={keycloakInitOptions}>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </AuthContextProvider>
);
