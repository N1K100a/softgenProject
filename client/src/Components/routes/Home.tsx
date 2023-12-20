import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import logo from "../../Lotties/mainlogo.json";

function Home() {
  return (
    <Main>
      <H1>student managment system</H1>
      <LottieCon>
        <Lottie animationData={logo}></Lottie>
      </LottieCon>
    </Main>
  );
}

export default Home;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  text-transform: uppercase;
  width: fit-content;
  color: aliceblue;
  text-shadow: 1px 1px 2px black;
  margin-bottom: 30px;
`;

const LottieCon = styled.div``;
