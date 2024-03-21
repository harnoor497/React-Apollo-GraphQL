// Import Statements
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import Root from "./Root";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const routes = [{ path: "*", Component: Root }];
const router = createBrowserRouter(routes);

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </ApolloProvider>
    );
}

export default App;