import React, { useState, useRef, useEffect } from "react";
import { Input, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

const DateAndTimePicker = ({ data, setData, showModal }) => {
  const [showPicker, setShowPicker] = useState({});

  useEffect(() => {
    if (showModal) {
      setShowPicker({});
    }
  },[showModal]);

  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  const handleChange = (value, name) => {
    setData({ [name]: value });
    setShowPicker((prev) => ({ ...prev, [name]: false }));
  };

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
              onClick={() => setShowPicker((prev) => ({ ...prev, date: !prev.date }))}
              style={{ marginRight: 8, cursor: "pointer" }}
            >
              <i className={showPicker.date ? "fi fi-rr-cross-circle" : "fi fi-rr-calendar"} />
            </span>
            <span
              onClick={() => setShowPicker((prev) => ({ ...prev, time: !prev.time }))}
              style={{ cursor: "pointer" }}
            >
              {/* {
                datePickerRef.current.contains(e.target) ? 
                  <i className="fi fi-rr-cross-circle"></i> :
                } */}
              <i className={showPicker.time ? "fi fi-rr-cross-circle" : "fi fi-rr-clock-three"} />
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
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
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
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
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
