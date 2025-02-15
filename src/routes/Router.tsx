import {URL} from "@/constants/constants";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import Record from "@/pages/Record";
import Stats from "@/pages/Stats";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={URL.HOME} element={<Home />} />
          <Route path={URL.RECORD} element={<Record />} />
          <Route path={URL.STATS} element={<Stats />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
