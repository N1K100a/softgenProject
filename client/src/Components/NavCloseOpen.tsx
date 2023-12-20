import React from "react";
import styled from "styled-components";
interface Props {
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  navIsActive: boolean;
}
function NavCloseOpen({ setNavIsActive, navIsActive }: Props) {
  const handleClick = () => {
    setNavIsActive(!navIsActive);
  };
  return (
    <Button onClick={handleClick}>{navIsActive ? "close" : "open"} nav</Button>
  );
}

export default NavCloseOpen;

const Button = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  border: 2px solid #34495e;
  height: 30px;
  width: fit-content;
  cursor: pointer;
  background: none;
  padding: 0 10px;
  text-transform: uppercase;
  color: #34495e;
  font-weight: 700;
`;
