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
          {lstRoute.map((item, index) => {
            const Element = item.element;
            return (
              <Route key={index} path={item.path} element={<Element />}>
                {item.children.map((child, index2) => (
                  <Route path={child.path} key={index2}></Route>
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
