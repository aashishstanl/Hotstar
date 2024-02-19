import React, { useState, useEffect } from "react";
import OtpInput from "./otp-input";

function PhoneOtpForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setshowOtpInput] = useState(false);
  const [Counter, setCounter] = useState(30);

  //handling phonenumber
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  //handling  the submission of the form
  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    //phone validations

    const regex = /^[0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      setshowOtpInput(true);
      return;
    }

    //call API for sending the OTP

    //Show OTP field
  };
  const onOtpSubmit = (otp) => {
    console.log("Login successful");
  };

  //handling backbutton
  const handleBackButton = () => {
    window.history.back();
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          clearInterval(intervalId);
          return 30;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* showing the content on showotpInput condition */}
      {!showOtpInput ? (
        <form className="EnterNumberContainer" onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <br />
          <br />
          <button type="submit">Submit</button>
          <br />
        </form>
      ) : (
        <div className="EnterOtp">
          <p id="BackButton" onClick={handleBackButton}>
            {"< "}Back
          </p>
          <p>Enter OTP sent to +91{phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          <p id="ResendOtp">
            Resend OTP in {Counter} {Counter === 1 ? "second" : "seconds"}
          </p>
        </div>
      )}
    </div>
  );
}

export default PhoneOtpForm;
