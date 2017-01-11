import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
    apiKey: 'AIzaSyC9miqnkw-Bc--DQHWYzIz5g_XMvMcqCgw',
    authDomain: 'inventory-a53b5.firebaseapp.com',
    databaseURL: 'https://inventory-a53b5.firebaseio.com',
    storageBucket: null,
    messagingSenderId: null
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}