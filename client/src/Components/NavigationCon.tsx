import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Lottie from "lottie-react";
import logo from "../Lotties/logo.json";
import { motion } from "framer-motion";

interface NavLinkProps {
  iscurrent: string;
}

interface Props {
  windowWidth: number;
}

function NavigationCon({ windowWidth }: Props) {
  const location = useLocation();
  return (
    <NavCon
      key="navCon"
      initial={{ x: "-100%" }}
      animate={{ x: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
      exit={{ x: "-100%", transition: { duration: 0.3 } }}
      style={windowWidth <= 1000 ? { left: "0", position: "absolute" } : {}}>
      <LottieCon>
        <Lottie animationData={logo}></Lottie>
      </LottieCon>
      <ButtonCon>
        <Link to="/">
          <LinkButton iscurrent={(location.pathname === "/").toString()}>
            Home
          </LinkButton>
        </Link>
        <Link to="/students">
          <LinkButton
            iscurrent={(location.pathname === "/students").toString()}>
            Students
          </LinkButton>
        </Link>
        <Link to="/teachers">
          <LinkButton
            iscurrent={(location.pathname === "/teachers").toString()}>
            Teachers
          </LinkButton>
        </Link>
        <Link to="/groups">
          <LinkButton iscurrent={(location.pathname === "/groups").toString()}>
            Groups
          </LinkButton>
        </Link>
      </ButtonCon>
    </NavCon>
  );
}

export default NavigationCon;

const NavCon = styled(motion.div)`
  width: 250px !important;
  height: 100%;
  flex-shrink: 0;
  background-color: #526d82;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

const LottieCon = styled.div`
  height: 130px;
  width: 130px;
  margin: 50px 0 50px 0;
`;

const ButtonCon = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const LinkButton = styled.button<NavLinkProps>`
  cursor: pointer;
  color: ${(props) => (props.iscurrent === "true" ? "#ffb921" : "#dae3e9")};
  border: none;
  font-size: 20px;
  height: 30px;
  width: fit-content;
  background: none;
  font-weight: 500;
  letter-spacing: 2px;
  position: relative;
  &:hover {
    color: #ffb921;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #ffb921;
    transform: ${(props) =>
      props.iscurrent === "true" ? "scaleX(1)" : "scaleX(0)"};
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1); /* Expand the line on hover */
    transform-origin: bottom left;
  }
`;
