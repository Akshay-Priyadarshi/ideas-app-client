import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./store";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import axios from "axios";
import { successInterceptor } from "./helpers/success.helper";
import { errorInterceptor } from "./helpers/error.helper";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const NODE_ENV = process.env.NODE_ENV;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        {NODE_ENV === "development" ? (
                            <ReactQueryDevtools initialIsOpen={false} />
                        ) : null}
                        <App />
                    </QueryClientProvider>
                </BrowserRouter>
            </PersistGate>
        </ReduxProvider>
    </React.StrictMode>
);

// Environment specific configurations
if (NODE_ENV && NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:8080/api";
} else {
    axios.defaults.baseURL = "https://ideas-iq.herokuapp.com/api";
}
axios.interceptors.response.use(successInterceptor, errorInterceptor);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
