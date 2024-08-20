import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import { formatWords } from "../../helpers";
import { Avatar, Button, message } from "antd";
import { colors } from "../../constant";
import TextArea from "antd/es/input/TextArea";

let workOrderStatus = [
  {
    key: "open",
    icon: <i class="fi fi-rr-unlock"></i>,
    activeClass: "openStatusActive",
    inActiveClass: "",
  },
  {
    key: "on_hold",
    icon: <i class="fi fi-tr-pause-circle"></i>,
    activeClass: "onHoldStatusActive",
    inActiveClass: "",
  },
  {
    key: "in_progress",
    icon: <i class="fi fi-sr-rotate-right"></i>,
    activeClass: "inProgressStatusActive",
    inActiveClass: "",
  },
  {
    key: "done",
    icon: <i class="fi fi-tr-check-double"></i>,
    activeClass: "doneStatusActive",
    inActiveClass: "",
  },
];

const ViewWorkOrder = ({ wo }) => {
  console.log(console.log(wo, "wo"));
  const [woStatus, setWoStatus] = useState(wo.wo_status);

  function handleWoStatus(changedStatus) {
    setWoStatus(changedStatus);
    message.open({
      type: "success",
      content: `Work Order status updated to ${formatWords(changedStatus)}`,
    })
  }

  return (
    <section className="view-wo-container">
      <div className="view-wo">
        <div className="wo-intro">
          <h2>{wo.wo_title}</h2>
          <div className="view-wo-action-btns">
            <i class="fi fi-rr-pencil"></i>
            <i class="fi fi-rr-share"></i>
            <i class="fi fi-bs-menu-dots-vertical"></i>
          </div>
        </div>
        <div className="wo-status-desc">
          <h4>Work Order Status</h4>
          <div className="wo-status-container">
            {workOrderStatus.map((status) => (
              <StyledButton
                onClick={() => {
                  handleWoStatus(status.key);
                }}
                icon={status.icon}
                text={formatWords(status.key)}
                btnClassName={woStatus === status.key ? status.activeClass : ""}
              />
            ))}
          </div>
        </div>
        <div className="wo-info">
          <div>
            <p>Work Order ID</p>
            <p>#{wo.index}</p>
          </div>
          <div>
            <p>Assigned To</p>
            <div className="d-flex">
              <Avatar size={"small"} />
              {wo.assignee.name}
            </div>
          </div>
          <div>
            <p>Due Date</p>
            <p>{wo.due_date}</p>
          </div>
          <div>
            <p>Priority</p>
            <div className="d-flex">
              <div
                className="status-color-group"
                style={{ background: colors[wo.priority] }}
              />
              {formatWords(wo.priority)}
            </div>
          </div>
        </div>
        <div className="wo-description">
          <h3>Description</h3>
          <p>{wo.wo_description}</p>
          <div className="wo-info">
            <div>
              <p>Asset</p>
              <p>{wo.asset}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{formatWords(wo.location)}</p>
            </div>
            <div>
              <p>Estimated Time</p>
              <p>
                {wo.estimated_hours}h {wo.estimated_minutes}m
              </p>
            </div>
            <div>
              <p>Categories</p>
              <p>{formatWords(wo.category)}</p>
            </div>
          </div>
        </div>
        <div className="wo-comment-section">
          <h4>Comments</h4>
          <TextArea rows={4} placeholder="Write a comment..." />
          <p>
            Created By {wo.requester.name} on {wo.createdAt}
          </p>
          <p>Last Updated on {wo.updatedAt}</p>
        </div>
      </div>
      <StyledButton
        text={"Mark As Done"}
        btnClassName={"markDoneBtn"}
        icon={<i class="fi fi-sr-checkbox"></i>}
        onClick={() => handleWoStatus("done")}
      />
    </section>
  );
};

export default ViewWorkOrder;
