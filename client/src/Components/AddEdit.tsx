import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import urls from "../urls";
import { motion, AnimatePresence } from "framer-motion";

function AddEdit() {
  const [addValue, setAddValue] = useState({
    name: "",
    lastname: "",
    mail: "",
    personalid: "",
    birthdate: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "personalid" ? parseInt(value, 10) || 0 : value;

    setAddValue((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const location = useLocation();
  const navigate = useNavigate();
  const tableName = location.pathname.split("/")[1];
  const addOrEdit = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];

  const handleSubmit = async (e: any) => {
    if (Object.values(addValue).some((value) => value === "")) {
      return;
    }
    if (addOrEdit === "add") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.post(`${urls.base}?tableName=${tableName}`, addValue);
      } catch (err) {
        console.log(err);
      }
    }
    if (addOrEdit === "edit") {
      try {
        e.preventDefault();
        navigate("..");
        window.location.reload();
        await axios.put(`${urls.base}/${id}?tableName=${tableName}`, addValue);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getDataForEdit();
  }, []);

  const handleCancel = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("..");
  };

  const getDataForEdit = () => {
    const editData = localStorage.getItem("editData");
    if (editData && addOrEdit === "edit") {
      const dataBeforModife = JSON.parse(editData);
      const birthdate = new Date(dataBeforModife.birthdate);
      const formatedBirthdate = birthdate.toISOString().split("T")[0];

      setAddValue({ ...dataBeforModife, birthdate: formatedBirthdate });
    }
  };

  return (
    <ModalCon>
      <AnimatePresence>
        <ModalBox
          key="modalbox"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ scale: 2, transition: { delay: 0.2 } }}>
          <ModalTitle>
            {addOrEdit === "edit" ? "Edit" : "Add"} {tableName}{" "}
            {addOrEdit === "edit" ? "data" : null}
          </ModalTitle>
          <div>
            <div>
              <span>first name</span>
              <input
                type="text"
                required
                onChange={handleChange}
                name="name"
                value={addValue.name}
              />
            </div>
            <div>
              <span>last name</span>
              <input
                type="text"
                required
                onChange={handleChange}
                name="lastname"
                value={addValue.lastname}
              />
            </div>
          </div>
          <div>
            <span>mail</span>
            <input
              type="email"
              required
              onChange={handleChange}
              name="mail"
              value={addValue.mail}
            />
          </div>
          <div>
            <span>personal Id</span>
            <input
              type="number"
              required
              onChange={handleChange}
              name="personalid"
              value={addValue.personalid}
            />
          </div>
          <div>
            <span>birthdate</span>
            <input
              type="date"
              required
              onChange={handleChange}
              name="birthdate"
              value={addValue.birthdate}
            />
          </div>
          <div>
            <InputSubmit onClick={handleSubmit} type="submit" />
            <Button onClick={handleCancel}>cancel</Button>
          </div>
        </ModalBox>
      </AnimatePresence>
    </ModalCon>
  );
}

export default AddEdit;

const ModalCon = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.452);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  color: #27374d;
`;
const ModalBox = styled(motion.form)`
  width: 400px;
  background-color: #dde6ed;
  padding: 30px 30px;
  input {
    margin-bottom: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      font-size: 15px;
      color: #27374d;
    }
    & > input {
      margin-top: 5px;
      height: 30px;
      width: 100%;
      outline: none !important;
      border: none;
      text-align: center;
      padding: 0 20px;
      &[name="personalid"] {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
  & > div:nth-child(2) {
    flex-direction: row;
    justify-content: space-between;
    & > div {
      width: 48%;
      display: flex;
      flex-direction: column;
      align-items: center;
      & > span {
        font-size: 15px;
        color: #27374d;
      }
      & > input {
        margin-top: 5px;
        height: 30px;
        width: 100%;
        outline: none !important;
        border: none;
        text-align: center;
        padding: 0 20px;
      }
    }
  }
`;

const Button = styled.button`
  color: white;
  background-color: #eb2f06;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  height: 30px;
  width: 100%;
  border: none;
  margin-bottom: 10px;
  font-size: 15px;
`;

const InputSubmit = styled.input`
  background-color: #59e794;
  color: #27374d;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 15px;
`;
