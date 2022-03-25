import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState, loginState } from "../../Pages/Recoil/Atoms";

const LoginPage = () => {
  //url 이동을 위한 useHistory
  const navigate = useNavigate();

  //input에서 입력한 아이디와 비밀번호 정보를 담기위한 state
  const [account, setAccount] = useRecoilState(userState);

  //로그인 했을 때 loginstate를 업데이트 해주기 위해
  const [loginResult, setLoginResult] = useRecoilState(loginState);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //input에 입력하면 자동적으로 account state값 변경
  const onChangeAccount = (e) => {
    if (e.target.name === "id") {
      setId(e.currentTarget.value);
    } else if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    }

    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });

    console.log(account);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(account);
    console.log(Cookies.remove("accessToken"));
    axios
      .post("http://localhost:5000/user/login/local", account, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        let result = response.data.success;

        if (result === true) {
          setLoginResult(result);
          navigate("/");
        } else if (result === false) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <div className="form">
        <p>로그인</p>
        <form className="login-form">
          <input
            name="id"
            type="text"
            placeholder="아이디"
            onChange={onChangeAccount}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChangeAccount}
          />
          <button onClick={onSubmit}>login</button>
        </form>
        <p>
          회원가입이 안되어있으십니까?
          <br />
          <a href="/register">회원가입하기</a>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
