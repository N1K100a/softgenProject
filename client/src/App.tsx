import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Teachers from "./Components/routes/Teachers";
import Groups from "./Components/routes/Groups";
import Students from "./Components/routes/Students";
import { GlobalStyles } from "./styles/GlobalStyles";
import NavigationCon from "./Components/NavigationCon";
import { Helmet } from "react-helmet";
import Home from "./Components/routes/Home";
import AddEdit from "./Components/AddEdit";
import NavCloseOpen from "./Components/NavCloseOpen";
import { AnimatePresence } from "framer-motion";

function App() {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );
  const [navIsActive, setNavIsActive] = useState(
    windowWidth > 1000 ? true : false
  );

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const handleResize = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    console.log(windowWidth);
    setWindowWidth(width);
    if (width > 1000) {
      setNavIsActive(true);
    }
  };
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <title>Student Managment System</title>
      </Helmet>
      <BrowserRouter>
        <MainApp>
          <AnimatePresence>
            {navIsActive ? <NavigationCon windowWidth={windowWidth} /> : null}
          </AnimatePresence>
          {windowWidth < 1000 ? (
            <NavCloseOpen
              navIsActive={navIsActive}
              setNavIsActive={setNavIsActive}
            />
          ) : null}

          <RouteCon>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/students" element={<Students />}>
                <Route path="add" element={<AddEdit />} />
                <Route path="edit/:id" element={<AddEdit />} />
              </Route>
              <Route path="/teachers" element={<Teachers />}>
                <Route path="add" element={<AddEdit />} />
                <Route path="edit/:id" element={<AddEdit />} />
              </Route>
              <Route path="/groups" element={<Groups />} />
            </Routes>
          </RouteCon>
        </MainApp>
      </BrowserRouter>
    </>
  );
}

export default App;

const MainApp = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #9bb8cd;
  display: flex;
`;

const RouteCon = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  background-color: #9bb8cd;
  margin: 50px 0;
`;
