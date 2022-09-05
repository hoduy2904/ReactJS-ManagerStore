import logo from "./logo.svg";
import "./App.css";

import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import lstRoute from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {lstRoute.map((item) => {
            const Element = item.element;
            return (
              <Route
                key={item.name}
                path={item.path}
                element={<Element title={item.name} />}
              >
                {item.children.length > 0 &&
                  item.children.map((child) => (
                    <Route key={child.name} path={child.param} />
                  ))}
              </Route>
            );
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
