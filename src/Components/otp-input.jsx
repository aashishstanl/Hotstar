import React, { useEffect, useRef } from "react";
import { useState } from "react";

function OtpInput({ length = 4, onOtpSubmit = () => {} }) {
  const [Otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  //setting up the cursor  position when otp is generated
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    //storing the value and only number type is returned
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...Otp];

    //allow only 1 opp in field
    newOtp[index] = value.substring(value.length - 1);
    console.log(Otp);
    // console.log(newOtp);
    setOtp(newOtp);

    //submiting the otp

    const combinedOtp = newOtp.join("");

    //checking if the length matches
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    //moving to the next input field if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    //forcing user to fill all fields before submitting
    if (!Otp[index]) inputRefs.current[index].focus();

    if (index > 0 && !Otp[index - 1]) {
      inputRefs.current[Otp.indexOf("")].focus();
    }
  };
  //handling for the backspace
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !Otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      //moving back after backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {Otp.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
