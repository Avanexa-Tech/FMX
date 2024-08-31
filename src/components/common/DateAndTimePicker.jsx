import React, { useState, useRef, useEffect } from "react";
import { Input, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

const DateAndTimePicker = ({ data, setData }) => {
  console.log(data);
  
  const [showPicker, setShowPicker] = useState({});

  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  const handleChange = (value, name) => {
    console.log(value,"ssss");
    setData({[name]: value });
    setShowPicker((prev) => ({ ...prev, [name]: false }));
  };

  // const handleClickOutside = (e) => {
    // if(!data.date || !data.time)
    // if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
    //   setShowPicker((prev) => ({ ...prev, date: false }));
    // }
    // if (timePickerRef.current && !timePickerRef.current.contains(e.target)) {
    //   setShowPicker((prev) => ({ ...prev, time: false }));
    // }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="input-container" style={{ position: "relative" }}>
      <style>{`
            .input-container {
                position: relative;
                }

            .suffix {
                display: flex;
                align-items: center;
                }

            .suffix span {
                cursor: pointer;
                }

            .suffix i {
                font-size: 16px;
                }
            `}</style>
      <Input
        className="inputs"
        readOnly
        value={`${data?.date ?? ""} ${data?.time ?? ""}`}
        suffix={
          <div className="suffix">
            <span
              onClick={() => setShowPicker((prev) => ({ ...prev, date: true }))}
              style={{ marginRight: 8, cursor: "pointer" }}
            >
              <i className="fi fi-rr-calendar" />
            </span>
            <span onClick={() => setShowPicker((prev) => ({ ...prev, time: true }))} style={{ cursor: "pointer" }}>
              {/* {
                datePickerRef.current.contains(e.target) ? 
                  <i className="fi fi-rr-cross-circle"></i> :
                } */}
              <i className="fi fi-rr-clock-three" />
            </span>
          </div>
        }
      />

      {showPicker?.date && (
        <div
          ref={datePickerRef}
          style={{ position: "absolute", zIndex: 1000 }}
          onClick={(e) => e.stopPropagation()}
        >
          <DatePicker
            onChange={(value) => handleChange(dayjs(value).format("YYYY-MM-DD"), "date")}
            open
            style={{ position: "absolute", visibility: "hidden", bottom: 0, left: 0 }}
          />
        </div>
      )}

      {showPicker?.time && (
        <div
          ref={timePickerRef}
          style={{ position: "absolute", zIndex: 1000 }}
          onClick={(e) => e.stopPropagation()}
        >
          <TimePicker
            onChange={(value) => handleChange(dayjs(value).format("HH:mm A"), "time")}
            format="HH:mm"
            use12Hours
            open
            style={{ position: "absolute", bottom: 0, visibility: "hidden", left: 235 }}
          />
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
