import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../../Components/NavBar/NavBar";
import UserList from "../../Components/UserList/UserList";
import { loginState } from "../../Pages/Recoil/Atoms";

export default function RankPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [tempData, setTempData] = useState([]);

  //로그인 상태
  const on = useRecoilValue(loginState);

  //랭킹 더미 데이터
  // const reviewDummyData = [
  //   {
  //     index: "1",
  //     name: "ab",
  //     temperature: "100",
  //   },
  //   {
  //     index: "2",
  //     name: "cd",
  //     temperature: "99",
  //   },
  //   {
  //     index: "3",
  //     name: "ef",
  //     temperature: "98",
  //   },
  //   {
  //     index: "4",
  //     name: "gh",
  //     temperature: "97",
  //   },
  //   {
  //     index: "5",
  //     name: "ij",
  //     temperature: "96",
  //   },
  // ];

  // const tempDummyData = [
  //   {
  //     index: "1",
  //     name: "닉네임1",
  //     temperature: "50",
  //   },
  //   {
  //     index: "2",
  //     name: "닉네임2",
  //     temperature: "40",
  //   },
  //   {
  //     index: "3",
  //     name: "닉네임3",
  //     temperature: "30",
  //   },
  //   {
  //     index: "4",
  //     name: "닉네임4",
  //     temperature: "20",
  //   },
  //   {
  //     index: "5",
  //     name: "닉네임5",
  //     temperature: "10",
  //   },
  // ];

  // const reviewList = reviewDummyData.map((data) => <ul>{data.name}</ul>);
  // const tempList = reviewDummyData.map((data) => <ul>{data.name}</ul>);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/user-ranking`);
      console.log(result);
      setReviewData(result.data.reviewNum_rank);
      setTempData(result.data.temperature_rank);
      console.log(reviewData, tempData);
    };
    fetchData();
  }, []);

  const updateSearchTerm = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  console.log(reviewData);
  console.log(tempData);

  return (
    <>
      <NavBar refreshFunction={updateSearchTerm} />
      <Inner>
        <Box>
          <h4>영광의 TOP 10</h4>
          <Container>
            <div>
              <h3>리뷰가 많은 이용자수 TOP5</h3>
              <UserList data={reviewData} userId={reviewData.index} />
              {on ? <h5>회원님의 순위는 몇위 입니다.</h5> : <></>}
            </div>
            <div>
              <h3>온도가 높은 이용자수 TOP5</h3>
              <UserList data={tempData} userId={tempData.index} />
              {on ? <h5>회원님의 순위는 몇위 입니다.</h5> : <></>}
            </div>
          </Container>
        </Box>
      </Inner>
    </>
  );
}

const Inner = styled.div`
  height: 100vh;
  display: flex;
  background-color: #1c2126;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Box = styled.div`
  width: 90%;
  height: 75%;
  padding-top: 100px;
  border-radius: 12px;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px;
  text-align: center;
  font-size: 50px;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 25px;
`;

const Container = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;
  padding-top: 50px;
  padding-bottom: 25px;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  font-size: 25px;
`;
