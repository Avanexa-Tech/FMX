import React, { useState } from "react";
import { fmxLogo } from "../../assets/images/index";
import {
  PRIMARY_SIDEBAR_OPTIONS,
  SECONDARY_SIDEBAR_OPTIONS,
} from "../../constant";

export default function Sidebar() {
  const [selectedTab, setSelectedTab] = useState("work_order");

  function handleTabClick(option) {
    setSelectedTab(option.key);
    console.log(selectedTab, option);
  }

  return (
    <aside className="fmx-sidebar">
      <div className="fmx-logo">
        <img src={fmxLogo} />
      </div>
      <section className="fmx-sidebar-pages">
        <div className="primarylinks">
          {PRIMARY_SIDEBAR_OPTIONS.map((option) => (
            <div
              key={option.key}
              onClick={() => handleTabClick(option)}
              className={`${
                selectedTab === option.key ? "active-tab" : "in-active-tab"
              }`}
            >
              {option.icon}
              <p>{option.label}</p>
              <div className="right-border" />
            </div>
          ))}
        </div>
        <div className="secondarylinks">
          {SECONDARY_SIDEBAR_OPTIONS.map((option) => (
            <div
              key={option.key}
              onClick={() => handleTabClick(option)}
              className={`${
                selectedTab === option.key ? "active-tab" : "in-active-tab"
              }`}
            >
              {option.icon}
              <p>{option.label}</p>
              <div className="right-border" />
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
