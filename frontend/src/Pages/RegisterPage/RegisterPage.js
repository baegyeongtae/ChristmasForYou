import React, { useState, useRef } from "react";
import "./RegisterPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //url 이동을 위한 useHistory
  const navigate = useNavigate();

  //input에서 입력한 아이디와 비밀번호 정보를 담기위한 state -> backend로 넘겨 db에 저장될 값
  const [account, setAccount] = useState({
    profile_img: "",
    name: "",
    id: "",
    password: "",
    confirmpassword: "",
  });

  //input에 입력하면 자동적으로 account state값 변경
  const onChangeAccount = (e) => {
    if (e.target.name === "name") {
      setName(e.currentTarget.value);
    } else if (e.target.name === "id") {
      setId(e.currentTarget.value);
    } else if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    } else if (e.target.name === "confirmpassword") {
      setConfirmpassword(e.currentTarget.value);
    }

    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(account);

    if (password !== confirmpassword) {
      window.alert("비밀번호와 비밀번호 확인은 같아야 합니다!");
      return;
    }

    axios
      .post("http://localhost:5000/user/register", account, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        let success = Object.values(response);
        let result = Object.values(success[0]);
        if (result[0] === true) {
          console.log(result[0]);
          alert("회원가입이 완료되었습니다!");
          navigate("/");
        }
        if (result[0] === false) {
          alert(result[1]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="register-page">
      <div className="form">
        <h2>회원가입</h2>
        <form>
          <div>
            <input
              name="name"
              type="text"
              placeholder="이름"
              value={name}
              onChange={onChangeAccount}
              className="loginregister__input"
            />
          </div>
          <div>
            <input
              name="id"
              type="id"
              placeholder="아이디"
              value={id}
              onChange={onChangeAccount}
              className="loginregister__input"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangeAccount}
              className="loginregister__input"
            />
          </div>
          <div>
            <input
              name="confirmpassword"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmpassword}
              onChange={onChangeAccount}
              className="loginregister__input"
            />
          </div>
          <button onClick={onSubmit}>회원가입</button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
