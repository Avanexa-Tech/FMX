import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import { Avatar, Button, Dropdown, Form, Input, Tabs, Tag } from "antd";
import { createWorkOrder } from "../../assets/images";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import classNames from "classnames";
import { formatWords } from "../../helpers";

let filterBtns = [
  {
    key: "assigned_to",
    icon: <i class="fi fi-rr-user"></i>,
    label: "Assigned To",
  },
  {
    key: "due_date",
    icon: <i class="fi fi-rr-calendar"></i>,
    label: "Due Date",
  },
  {
    key: "location",
    icon: <i class="fi fi-rs-marker"></i>,
    label: "Location",
  },
  {
    key: "priority",
    icon: <i class="fi fi-rr-diamond-exclamation"></i>,
    label: "Priority",
  },
  {
    key: "add_filter",
    icon: <i class="fi fi-rs-settings-sliders"></i>,
    label: "Add Filter",
  },
];

const quickActions = (
  <div className="quick-actions-container">
    <div className="sort-by">
      <i class="fi fi-rr-sort-alt"></i>
      Sort By
    </div>
    <div className="mark-as-read">Mark All As Read</div>
  </div>
);

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

const WorkOrder = () => {
  let workOrderCount = 1;
  let level = "high";
  const [woStatus, setWOStatus] = useState("done");

  const tagClass = classNames({
    "low-priority": level === "low",
    "medium-priority": level === "medium",
    "high-priority": level === "high",
  });

  return (
    <section className="work-order-container">
      <div className="work-order-header">
        <div className="wo-filters">
          {filterBtns.map((btn) => (
            <StyledButton
              key={btn.key}
              icon={btn.icon}
              text={btn.label}
              btnClassName={"filter-btn"}
            />
          ))}
        </div>
        <div className="wo-main-option">
          <p>Reset Filters</p>
          <StyledButton
            icon={<i class="fi fi-br-plus"></i>}
            text={"Create Work Order"}
            btnClassName={"create-wo-btn"}
          />
          <Dropdown
            overlay={
              <div className="extra-options-dropdown">
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
              </div>
            }
          >
            <div className="extra-options-icon">
              <i class="fi fi-bs-menu-dots-vertical"></i>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="work-order-data-container">
        <div className="work-order-list">
          <Tabs
            style={{
              width: "100%",
            }}
            items={[
              {
                key: "to_do",
                label: "To Do",
                children: (
                  <>
                    {quickActions}
                    {workOrderCount === 0 ? (
                      <div className="create-new-wo">
                        <img
                          src={createWorkOrder}
                          alt="Create New Work Order"
                        />
                        <p>You don't have any work orders</p>
                        <StyledButton
                          icon={<i class="fi fi-rr-plus"></i>}
                          text={"Create Work Order"}
                          btnClassName={"new-wo-btn"}
                        />
                      </div>
                    ) : (
                      <div className="work-order-flat-list">
                        {[1, 2, 3, 4].map((card) => (
                          <div className="work-order-card">
                            <div className="wo-details">
                              <h4>Monthly HVAC System Inspection</h4>
                              <p>Requested by Jimmy</p>
                              <p>Work ID : 12345</p>
                              <div className="assignee-name">
                                <Avatar
                                  size={"small"}
                                  icon={<i class="fi fi-ts-circle-user"></i>}
                                />
                                <p>
                                  Assigned To <span>Jeswin</span>
                                </p>
                              </div>
                            </div>
                            <div className="wo-status">
                              <Avatar
                                shape="circle"
                                size={"large"}
                                icon={<i class="fi fi-ss-user-headset"></i>}
                              />
                              <Tag className={tagClass}>Low</Tag>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "done",
                label: "Done",
                children: (
                  <>
                    {quickActions}
                    {workOrderCount === 0 ? (
                      <div className="create-new-wo">
                        <img
                          src={createWorkOrder}
                          alt="Create New Work Order"
                        />
                        <p>You don't have any work orders</p>
                        <StyledButton
                          icon={<i class="fi fi-rr-plus"></i>}
                          text={"Create Work Order"}
                          btnClassName={"new-wo-btn"}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="create-view-work-order">
          <div className="view-wo">
            <div className="wo-intro">
              <h2>Monthly HVAC System Inspection</h2>
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
                      setWOStatus(status.key);
                    }}
                    icon={status.icon}
                    text={formatWords(status.key)}
                    btnClassName={
                      woStatus === status.key ? status.activeClass : ""
                    }
                  />
                ))}
              </div>
            </div>
            <div className="wo-info">
              <div>
                <p>Work Order ID</p>
                <p>#123465</p>
              </div>
              <div>
                <p>Work Order ID</p>
                <p>#123465</p>
              </div>
              <div>
                <p>Work Order ID</p>
                <p>#123465</p>
              </div>
              <div>
                <p>Work Order ID</p>
                <p>#123465</p>
              </div>
            </div>
            <div className="wo-description">
              <h3>Description</h3>
              <p>
                Conduct a comprehensive inspection of the HVAC system to ensure
                optimal performance and prevent potential issues. This task
                includes checking filters, monitoring refrigerant levels,
                inspecting electrical connections, and cleaning coils.
              </p>
            </div>
          </div>
          {/* <div className="create-wo">
            <h2>New Work Order</h2>
            <Form layout="vertical" className="work-order-form">
              <Form.Item rules={[{}]} label="What needs to be done ?">
                <Input />
              </Form.Item>
              <Form.Item rules={[{}]} label="Description">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Images">
                <Dragger customRequest={() => {}}>
                  <p className="ant-upload-drag-icon">
                    <i class="fi fi-ts-camera-viewfinder"></i>
                  </p>
                  <p className="ant-upload-text">Add or Drag Pictures</p>
                </Dragger>
              </Form.Item>
            </Form>
            <StyledButton
              icon={<i class="fi fi-rr-plus"></i>}
              text={"Create Work Order"}
              btnClassName={"create-wo-finish-btn"}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default WorkOrder;
