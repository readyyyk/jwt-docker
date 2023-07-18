import LoginContextProvider from "./Contexts/loginContext/LoginContextProvider.jsx";
import Router from "./Router.jsx";

function App() {
    return (
        <LoginContextProvider>
            <Router />
        </LoginContextProvider>
    )
}

export default App
