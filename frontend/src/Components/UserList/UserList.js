import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function UserList({ data, userId }) {
  let navigate = useNavigate();

  function handleClick() {
    // navigate(`/info/${userId}`);
    navigate("/");
  }

  const nameList = data.map((info) => (
    <li onClick={handleClick}>{info.name}</li>
  ));

  return (
    <>
      <Box>
        <ol>{nameList}</ol>
      </Box>
    </>
  );
}

export default UserList;

const Box = styled.div`
  justify-items: center;
  align-items: center;
  margin: 10px;
  width: 400px;

  li: hover {
    background-color: #c3dfdf;
    cursor: pointer;
  } ;
`;
