import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDebounce } from "../customHooks/useDebounce";
import axios from "axios";
import urls from "../urls";
import { motion, AnimatePresence } from "framer-motion";

interface dataType {
  Id: number;
  name: string;
  lastname: string;
  mail: string;
  personalid: number | string;
  birthdate: string;
}

interface TableProps {
  data: dataType[];
  setSearchValue: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastname: string;
      mail: string;
      personalid: string;
      birthdate: string;
    }>
  >;
  searchValue: {
    name: string;
    lastname: string;
    mail: string;
    personalid: number | string;
    birthdate: string;
  };
  setData: React.Dispatch<React.SetStateAction<never[]>>;
}

function Table({ data, setSearchValue, searchValue, setData }: TableProps) {
  const location = useLocation();
  const tableName = location.pathname.split("/")[1];

  const reversedData = [...data].reverse();

  const tableRow = reversedData.map((item: dataType, index) => {
    const birthdate = new Date(item.birthdate);
    const formattedBirthdate = birthdate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    return (
      <Tr
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index / 10, duration: 0.3 }}
        key={index}>
        <Td>{item.name}</Td>
        <Td>{item.lastname}</Td>
        <Td>{item.mail}</Td>
        <Td>{item.personalid}</Td>
        <Td>{formattedBirthdate}</Td>
        <Td>
          <DelButton onClick={() => handleDelete(item.Id)}>Del</DelButton>
          <Link to={`edit/${item.Id}`} onClick={() => handleEditData(item)}>
            <EditButton>Edit</EditButton>
          </Link>
        </Td>
      </Tr>
    );
  });

  let possibleFetchRef = useRef(false);

  const handleEditData = (item: string | dataType) => {
    const itemString = typeof item === "object" ? JSON.stringify(item) : item;

    localStorage.setItem("editData", itemString);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${urls.base}/${id}?tableName=${tableName}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    const parsedValue =
      name === "personalid" ? parseInt(value, 10) || "" : value;

    setSearchValue((prev) => ({ ...prev, [name]: parsedValue }));
    possibleFetchRef.current = true;
  };

  const fetchData = async () => {
    try {
      const searchValueString = encodeURIComponent(JSON.stringify(searchValue));
      const url = `${urls.base}?tableName=${
        location.pathname.split("/")[1]
      }&searchValue=${searchValueString}`;

      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // deleyed Search
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (possibleFetchRef.current) {
      fetchData();
    }
  }, [debounceSearch]);

  return (
    <TableOuter>
      <TableCon>
        <AnimatePresence>
          <RealTable key="table">
            <thead key="thead">
              <Tr>
                <Th>
                  <FilterInput
                    placeholder="First Name"
                    onChange={handleSearch}
                    name="name"
                  />
                </Th>
                <Th>
                  <FilterInput
                    placeholder="Last Name"
                    onChange={handleSearch}
                    name="lastname"
                  />
                </Th>
                <Th>
                  <FilterInput
                    placeholder="Mail"
                    onChange={handleSearch}
                    name="mail"
                  />
                </Th>
                <Th>
                  <FilterInput
                    type="number"
                    placeholder="Personal ID"
                    onChange={handleSearch}
                    name="personalid"
                  />
                </Th>
                <Th>
                  <FilterInput
                    type="date"
                    placeholder="BirthDate"
                    onChange={handleSearch}
                    name="birthdate"
                  />
                </Th>
                <Th>
                  <Link to={`${location.pathname}/add`}>
                    <AddButton>Add</AddButton>
                  </Link>
                </Th>
              </Tr>
            </thead>
            <tbody key="tbody">{tableRow}</tbody>
          </RealTable>
        </AnimatePresence>
      </TableCon>
    </TableOuter>
  );
}

export default Table;

const TableOuter = styled.div`
  width: calc(100vw - 250px);
  height: 100%;
  @media (max-width: 1000px) {
    width: 100vw;
  }
`;

const FilterInput = styled.input`
  height: 30px;
  width: calc(100% - 20px);
  text-align: center;
  background: none;
  border: 2px solid #f5f6fa;
  outline: none !important;
  color: #f5f6fa;
  &::placeholder {
    color: rgba(245, 246, 250, 0.671);
  }
  &[name="personalid"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &[name="name"] {
    min-width: 100px;
  }
  &[name="lastname"] {
    min-width: 160px;
  }
  &[name="personalid"] {
    min-width: 160px;
  }
  &[name="birthdate"] {
    min-width: 115px;
  }
`;

const DelButton = styled.button`
  height: fit-content;
  width: 35px;
  border: none;
  cursor: pointer;
  padding: 5px;
  background-color: #eb2f06;
  color: white;
`;

const EditButton = styled(DelButton)`
  width: 40px;
  background-color: #1e3799;
  margin-left: 5px;
`;

const TableCon = styled.div`
  margin: 0 20px;
  overflow: auto;
  background-color: #ecf0f1;
  height: 100%;
`;

const RealTable = styled.table`
  border-collapse: collapse;
  min-width: max-content;
  width: 100%;
`;

const Tr = styled(motion.tr)`
  background-color: #526d82;
`;

const Th = styled.th`
  height: 50px;
  color: white;
`;
const Td = styled.td`
  background-color: #9db2bf;
  text-align: center;
  height: 50px;
  border-top: 2px solid white;
  color: white;
  padding: 0 10px;
`;

const AddButton = styled.button`
  height: 30px;
  width: 80px;
  padding: 0 10px;
  border: none;
  background-color: #58b19f;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;
