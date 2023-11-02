import { createSignal, createContext, useContext } from 'solid-js';

export const AuthContext = createContext([{ loggedIn: false }]);

export function AuthProvider(props) {
    const [state, setState] = createStore({ loggedIn: props.loggedIn || false });
    const authorize = [
        state,
        {
            login() {
                setState("loggedIn", () => true);
            },
            logout() {
                setState("loggedIn", () => false);
            },
        },
    ];

    return (
        <AuthContext.Provider value={loggedIn}>
            {props.children}
        </AuthContext.Provider>
    );
}