import Layout from "@/Layout";
import Home from "@/pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
