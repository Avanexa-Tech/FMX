import React, { useState } from "react";
import { fmxLogo } from "../../assets/images/index";
import {
  PRIMARY_SIDEBAR_OPTIONS,
  SECONDARY_SIDEBAR_OPTIONS,
} from "../../constant";
import { formatWords } from "../../helpers";

export default function Sidebar() {
  const [selectedTab, setSelectedTab] = useState("");

  function handleTabClick(option) {
    setSelectedTab(option.key);
  }

  return (
    <aside className="fmx-sidebar">
      <div className="fmx-logo">
        <img src={fmxLogo} />
      </div>
      <section className="fmx-sidebar-pages">
        <div className="primarylinks">
          {PRIMARY_SIDEBAR_OPTIONS.map((option) => (
            <a
              key={option.key}
              onClick={() => handleTabClick(option)}
              className={`${
                selectedTab === option.key ? "active-tab" : "in-active-tab"
              }`}
              href={option.link}
            >
              {option.icon}
              <p>{formatWords(option.key)}</p>
              <div className="right-border" />
            </a>
          ))}
        </div>
        <div className="secondarylinks">
          {SECONDARY_SIDEBAR_OPTIONS.map((option) => (
            <a
              key={option.key}
              onClick={() => handleTabClick(option)}
              className={`${
                selectedTab === option.key ? "active-tab" : "in-active-tab"
              }`}
              href={option.link}
            >
              {option.icon}
              <p>{option.label}</p>
              <div className="right-border" />
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
