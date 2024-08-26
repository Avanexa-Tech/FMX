import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import { formatWords, getOrdinalSuffix } from "../../helpers";
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, message, Space } from "antd";
import { colors, DAY_OPTIONS } from "../../constant";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkOrder, updateWorkOrder } from "../../redux/slice/workOrderSlice";
import { toggleShowCreateWorkOrder } from "../../redux/slice/userActionSlice";

let workOrderStatus = [
  {
    key: "open",
    icon: <i className="fi fi-rr-unlock"></i>,
    activeClass: "openStatusActive",
    inActiveClass: "",
  },
  {
    key: "on_hold",
    icon: <i className="fi fi-tr-pause-circle"></i>,
    activeClass: "onHoldStatusActive",
    inActiveClass: "",
  },
  {
    key: "in_progress",
    icon: <i className="fi fi-sr-rotate-right"></i>,
    activeClass: "inProgressStatusActive",
    inActiveClass: "",
  },
  {
    key: "done",
    icon: <i className="fi fi-tr-check-double"></i>,
    activeClass: "doneStatusActive",
    inActiveClass: "",
  },
];

const ViewWorkOrder = ({ wo, setWoEditForm }) => {
  const dispatch = useDispatch()
  const [woStatus, setWoStatus] = useState(wo?.wo_status);
  const { procedures } = useSelector((state) => state.procedure);

  function handleWoStatus(changedStatus) {
    dispatch(updateWorkOrder({
      id : wo?.id,
      status : changedStatus
    }))
    setWoStatus(changedStatus);
    message.open({
      type: "success",
      content: `Work Order status updated to ${formatWords(changedStatus)}`,
    })
  }

  function getRecurrenctText(){
    switch (wo.recurrence.frequency) {
      case "daily":
        return (
          <p>
            Repeats every day after completion of this Work Order.
          </p>
        );
      case "weekly":
        return (
          <p>
              Repeats every {wo.recurrence.week ?? ""} {wo.recurrence.days.length === 7 ? "day" : "week"} on{" "}
              {wo.recurrence.days.length === 7 ? "": wo.recurrence.days.map(
                (day, index) =>
                  `${DAY_OPTIONS[day]}${
                    wo.recurrence.days.length - 1 !== index
                      ? ","
                      : ""
                  } `
              )}{" "}
              after completion of this Work Order
            </p>
        );
      case "monthly":
        return (
          <p>
          Repeats every {wo?.recurrence?.month_no !== 1 ? `${wo?.recurrence?.month_no} ` : ""} 
          month{wo?.recurrence?.month_no > 1 ? "s" : ""} on the{" "}
          {getOrdinalSuffix(wo?.recurrence?.day_of_month)}{" "}
          day of the month after completion of this Work Order.
        </p>
        
        );
      case "yearly":
        return (
          <p>
            Repeats every{" "}
            {wo.recurrence.year > 1
              ? wo.recurrence.year
              : null}{" "}
            year{wo.recurrence.year > 1 ? "s" : ""} on 08/20
            after completion of this Work Order.
          </p>
        );
      default:
        break;
    }
  }

  function handleDeleteWo(){
    dispatch(
      deleteWorkOrder({
        id: wo?.id,
      })
    );
    dispatch(toggleShowCreateWorkOrder(true))
  }

  function getField(procedure){

    switch(procedure.field_type){
      case "checklist":
        return <div className="input-container">
          <h4>{procedure.field_name}</h4>
          <ul>
            {procedure.field_value.map((option, index) => (
              <Checkbox>
                {formatWords(option.value)}
              </Checkbox>
            ))}
          </ul>
        </div>;
      case "text":
        return <div className="input-container">
          <h4>{procedure.field_name}</h4>
          <Input
            className="procedure-description-input"
          />
        </div>
      case "checkbox":
        return (
          <div className="input-container">
            <Checkbox>{procedure.field_name}</Checkbox>
          </div>
        );
      default:
        break;
    }
  }

  console.log(procedures[0].fields ,"asdas")

  return (
    <section className="view-wo-container">
      <div className="view-wo">
        <div className="wo-intro">
          <h2>{wo?.wo_title}</h2>
          <div className="view-wo-action-btns">
            <i
              className="fi fi-rr-pencil"
              onClick={() => {
                setWoEditForm(wo);
                dispatch(toggleShowCreateWorkOrder(true));
              }}
            ></i>
            <i className="fi fi-rr-share"></i>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={handleDeleteWo}>Delete</Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <p>
                <i className="fi fi-bs-menu-dots-vertical"></i>
              </p>
            </Dropdown>
          </div>
        </div>
        <div className="wo-status-desc">
          <h4>Work Order Status</h4>
          <div className="wo-status-container">
            {workOrderStatus.map((status, ind) => (
              <StyledButton
                key={ind}
                onClick={() => {
                  handleWoStatus(status.key);
                }}
                icon={status.icon}
                text={formatWords(status.key)}
                btnClassName={woStatus === status.key ? status.activeClass : ""}
              />
            ))}
          </div>
          <div className="wo-info">
            <div>
              <p>Work Order ID</p>
              <p>#{wo?.index}</p>
            </div>
            <div>
              <p>Assigned To</p>
              <div className="d-flex">
                <Avatar size={"small"} />
                {wo?.assignee?.[0].name ?? "-"}
              </div>
            </div>
            <div>
              <p>Due Date</p>
              <p>{wo?.due_date}</p>
            </div>
            <div>
              <p>Priority</p>
              <div className="d-flex">
                <div
                  className="status-color-group"
                  style={{ background: colors[wo?.priority] }}
                />
                {formatWords(wo?.priority)}
              </div>
            </div>
          </div>
        </div>
        <div className="wo-description">
          <h3>Description</h3>
          <p>{wo?.wo_description}</p>
          <div className="wo-info">
            <div>
              <p>Asset</p>
              <p>{wo?.asset}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{formatWords(wo?.location)}</p>
            </div>
            <div>
              <p>Estimated Time</p>
              <p>
                {wo?.estimated_hours}h {wo?.estimated_minutes}m
              </p>
            </div>
            <div>
              <p>Categories</p>
              <p>{formatWords(wo?.category)}</p>
            </div>
          </div>
        </div>
        <div className="procedure-container">
          <h4>Procedure</h4>
          <div>
            {procedures &&
              procedures.map((procedure, index) => procedure.fields.map((fieldObj) => getField(fieldObj)))}
          </div>
        </div>
        <div className="wo-type">
          <div>
            <p>Work Type</p>
            <text>{formatWords(wo.work_type)}</text>
          </div>
          <div>
            <p>Recurrence</p>
            <text>{getRecurrenctText()}</text>
          </div>
        </div>
        <div className="wo-comment-section">
          <h4>Comments</h4>
          <TextArea rows={4} placeholder="Write a comment..." />
          <p>
            Created By {wo?.requester.name} on {wo?.createdAt}
          </p>
          <p>Last Updated on {wo?.updatedAt}</p>
        </div>
      </div>
      <StyledButton
        text={"Mark As Done"}
        btnClassName={"markDoneBtn"}
        icon={<i className="fi fi-sr-checkbox"></i>}
        onClick={() => handleWoStatus("done")}
      />
    </section>
  );
};

export default ViewWorkOrder;
