import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function HomePage(props) {
  const [sessionData, setSessionData] = useState({});
  const [showform, setShowForm] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const username = sessionStorage.getItem("username");
  const uname = { name: username.toLowerCase() };

  useEffect(() => {
    fetch("/home", {
      method: "POST",
      // mode:'cors',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(uname),
    })
      .then((res) => res.json())
      .then((data) => setSessionData(data.success))
      .catch((error) => console.log(error));

    //   fetch("/home").then(
    //     res => res.json()

    //     ).then(
    //     data => {
    //         setSessionData(data)
    console.log(sessionData);
    //     })
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  const show = (e) => {
    e.preventDefault();
    setShowForm(!showform);
  };

  const showapplicationform = (e) => {
    e.preventDefault();
    if(showDeposit === true || showWithdraw ==true){
        setShowDeposit ( false)
        setShowWithdraw(false)
    }
    
    setShowForm(!showform);
  };

  const showDepositForm = (e) => {
    e.preventDefault();
    if(showform === true || showWithdraw ==true){
        setShowForm ( false)
        setShowWithdraw(false)
    }
    setShowDeposit(!showDeposit);
  };

  const showWithdrawForm = (e) => {
    e.preventDefault();
    if(showform === true || showDeposit ==true){
        setShowForm ( false)
        setShowDeposit(false)
    }
    setShowWithdraw(!showWithdraw);
  };

  return (
    <div className="text-center">

        <NavBar />
      {/* <form>
        <button onClick={show}>show</button>
      </form> */}
      {/* {showform && (
        <form>
          <p>
            <input type="text"></input>
          </p>
        </form>
      )} */}
      <div className="links">
        <a href="javascrit:void(0)" onClick={showapplicationform}>
          Create Account
        </a>
        <a href="javascrit:void(0)">MyAccounts</a>
        <a href="javascrit:void(0)" onClick={showDepositForm}>
          Deposit
        </a>
        <a href="javascrit:void(0)" onClick={showWithdrawForm}>
          Withdraw
        </a>
        <a href="javascrit:void(0)">Transfer</a>
        <a href="javascrit:void(0)">Profile</a>
      </div>

      {showform && (
        <form className="form" method="post">
          <p>
            <label>Username</label>
            <br />
            <input type="text" required />
          </p>
          <p>
            <label>Email address</label>
            <br />
            <input type="email" required />
          </p>

          <p>
            <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
            <span>
              I agree all statements in{" "}
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                terms of service
              </a>
            </span>
            .
          </p>
          <p>
            <button id="sub_btn" type="submit">
              apply
            </button>
          </p>
        </form>
      )}

      {showDeposit && (
        <form className="form" method="post">
          <p>
            <label>Amount</label>
            <br />
            <input type="number" required />
          </p>

          <br></br>

          <p>
            <button id="sub_btn" type="submit">
              deposit
            </button>
          </p>
        </form>
      )}

      {showWithdraw && (
        <form className="form" method="post">
          <p>
            <label>amount</label>
            <br />
            <input type="number" required />
          </p>
         
            
            <br />
            

          
        
          <p>
            <button id="sub_btn" type="submit">
              withdraw
            </button>
          </p>
        </form>
      )}

      <h1 className="main-title home-page-title">
        hello {username} , welcome to our app
      </h1>
      <Link to="/">
        <button
          className="primary-button"
          onClick={() => {
            props.history.push("/");
          }}
        >
          Log out
        </button>
      </Link>
    </div>
  );
}
