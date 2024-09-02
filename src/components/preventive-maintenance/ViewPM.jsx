import React, { useEffect, useState } from "react";
import StyledButton from "../common/StyledButton";
import { formatEmptyData, formatWords, getOrdinalSuffix } from "../../helpers";
import {
  Avatar, Checkbox, Dropdown,
  Input,
  Menu,
  message,
  Modal
} from "antd";
import { colors, DAY_OPTIONS } from "../../constant";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkOrder, updateWorkOrder } from "../../redux/slice/workOrderSlice";
import {
  deletePreventiveMaintenance,
  updatePreventiveMaintenance,
} from "../../redux/slice/preventiveMaintenanceSlice";
import {
  toggleShowCreatePreventiveMaintenance,
  toggleShowCreateWorkOrder,
} from "../../redux/slice/userActionSlice";
import DateAndTimePicker from "../common/DateAndTimePicker";

const ViewPreventiveMaintance = ({ pm, setPmEditForm }) => {
  const { procedures } = useSelector((state) => state.procedure);
  const [showCostModal, setShowCostModal] = useState(false);
  const [assigneeData, setAssigneeData] = useState({});
  const dispatch = useDispatch();
  const [pmStatus, setPMStatus] = useState("in_progress");

  useEffect(() => { 
    if (pm?.assigneeData) {
        setAssigneeData(pm?.assigneeData);
    }
    setPMStatus(pm?.wo_status);
  }, []);

  function handleWoStatus(changedStatus) {
    setPMStatus(changedStatus)
    dispatch(updateWorkOrder({ ...pm, assigneeData, wo_status: changedStatus }));
    dispatch(updatePreventiveMaintenance({ ...pm, assigneeData, wo_status: changedStatus }));
    setShowCostModal(false);
    message.open({
      type: "success",
      content: `Preventive Maintenance status updated to ${formatWords(changedStatus)}`,
    });
  }

  function getRecurrenctText() {
    if (pm?.recurrence?.frequency) {
      switch (pm.recurrence.frequency) {
        case "daily":
          return <p>Repeats every day after completion of this Preventive Maintenance.</p>;
        case "weekly":
          return (
            <p>
              Repeats every {pm.recurrence.week ?? ""} {pm.recurrence.days.length === 7 ? "day" : "week"} on{" "}
              {pm.recurrence.days.length === 7
                ? ""
                : pm.recurrence.days.map(
                    (day, index) => `${DAY_OPTIONS[day]}${pm.recurrence.days.length - 1 !== index ? "," : ""} `
                  )}{" "}
              after completion of this Preventive Maintenance
            </p>
          );
        case "monthly":
          return (
            <p>
              Repeats every {pm?.recurrence?.month_no !== 1 ? `${pm?.recurrence?.month_no} ` : ""}
              month{pm?.recurrence?.month_no > 1 ? "s" : ""} on the{" "}
              {getOrdinalSuffix(pm?.recurrence?.day_of_month)} day of the month after completion of this Preventive
              Maintenance.
            </p>
          );
        case "yearly":
          return (
            <p>
              Repeats every {pm.recurrence.year > 1 ? pm.recurrence.year : null} year
              {pm.recurrence.year > 1 ? "s" : ""} on 08/20 after completion of this Preventive Maintenance.
            </p>
          );
        default:
          break;
      }
    } else {
      return;
    }
  }

  function handleDeleteWo() {
    dispatch(
      deleteWorkOrder({
        id: pm?.id,
      })
    );
    dispatch(
      deletePreventiveMaintenance({
        id: pm?.id,
      })
    );
    dispatch(toggleShowCreateWorkOrder(true));
    dispatch(toggleShowCreatePreventiveMaintenance(true));
  }

  function getField(procedure) {
    switch (procedure.field_type) {
      case "checklist":
        return (
          <div className="input-container">
            <h4>{procedure.field_name}</h4>
            <ul>
              {procedure.field_value.map((option, index) => (
                <Checkbox key={index}>{formatWords(option.value)}</Checkbox>
              ))}
            </ul>
          </div>
        );
      case "text":
        return (
          <div className="input-container">
            <h4>{procedure.field_name}</h4>
            <Input className="procedure-description-input" />
          </div>
        );
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

  return (
    <section className="view-wo-container">
      <div className="view-wo">
        <div className="wo-intro">
          <h2>{pm?.wo_title}</h2>
          <div className="view-wo-action-btns">
            <i
              className="fi fi-rr-pencil"
              onClick={() => {
                setPmEditForm(pm);
                dispatch(toggleShowCreatePreventiveMaintenance(true));
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
          <h4>Preventive Maintenance Status</h4>
          <div className="wo-info">
            <div>
              <p>Preventive Maintenance ID</p>
              <p>#{pm?.id}</p>
            </div>
            <div>
              <p>Assigned To</p>
              <div className="d-flex">
                <Avatar size={"small"} />
                {formatEmptyData(pm?.assignee?.[0].name)}
              </div>
            </div>
            <div>
              <p>Due Date</p>
              <p>{formatEmptyData(pm?.due_date)}</p>
            </div>
            <div>
              <p>Priority</p>
              <div className="d-flex">
                <div className="status-color-group" style={{ background: colors[pm?.priority] }} />
                {formatEmptyData(formatWords(pm?.priority))}
              </div>
            </div>
          </div>
        </div>
        <div className="wo-description">
          <h3>Description</h3>
          <p>{formatEmptyData(pm?.wo_description)}</p>
          <div className="wo-info">
            <div>
              <p>Asset</p>
              <p>{formatEmptyData(pm?.asset)}</p>
            </div>
            <div>
              <p>Location</p>
              <p>{formatEmptyData(formatWords(pm?.location))}</p>
            </div>
            <div>
              <p>Estimated Time</p>
              <p>
                {formatEmptyData(pm?.estimated_hours)}h {formatEmptyData(pm?.estimated_minutes)}m
              </p>
            </div>
            <div>
              <p>Categories</p>
              <p>{formatEmptyData(formatWords(pm?.category))}</p>
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
        {pm?.work_type && (
          <div className="pm-status">
            <b>PM Status</b>
            <div className="pm-status-btns">
              <StyledButton
                style={{
                  background: pmStatus === "on_hold" ? "#ff4136" : "",
                  color: pmStatus === "on_hold" ? "#fff" : "#000",
                  height: "50px",
                  maxWidth: "150px",
                  width: "100%",
                }}
                icon={<i className="fi fi-rs-pause-circle"></i>}
                text={"On Hold"}
                onClick={() => handleWoStatus("on_hold")}
              />
              <StyledButton
                style={{
                  background: pmStatus === "in_progress" ? "#4085f6" : "",
                  color: pmStatus === "in_progress" ? "#fff" : "#000",
                  height: "50px",
                  maxWidth: "150px",
                  width: "100%",
                }}
                icon={<i className="fi fi-rr-rotate-right"></i>}
                text={"In Progress"}
                onClick={() => handleWoStatus("in_progress")}
              />
              <StyledButton
                style={{
                  background: pmStatus === "done" ? "#32d197" : "",
                  color: pmStatus === "done" ? "#fff" : "#000",
                  height: "50px",
                  maxWidth: "150px",
                  width: "100%",
                }}
                icon={<i className="fi fi-rr-check-double"></i>}
                text={"Completed"}
                onClick={() => handleWoStatus("done")}
              />
            </div>
          </div>
        )}

        <div className="wo-comment-section">
          <h4>Comments</h4>
          <TextArea rows={4} placeholder="Write a comment..." />
          <p>
            Created By {formatEmptyData(pm?.requester?.name)} on {formatEmptyData(pm?.createdAt)}
          </p>
          <p>Last Updated on {formatEmptyData(pm?.updatedAt)}</p>
        </div>
      </div>
      <StyledButton
        text={"Mark As Done"}
        btnClassName={"markDoneBtn"}
        icon={<i className="fi fi-sr-checkbox"></i>}
        onClick={() => setShowCostModal(true)}
      />
      <Modal
        open={showCostModal}
        title={<h3>{`${pm?.wo_title} | Cost Tracking`}</h3>}
        onOk={() => handleWoStatus("done")}
        okText={"Mark As Done"}
        onCancel={() => setShowCostModal(false)}
        onClose={() => setShowCostModal(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        style={{ maxWidth: "800px" }}
        width={"100%"}
      >
        <div className="wo-cost-tracking">
          <div className="section-1">
            <h4>
              Start Date & Time
              <DateAndTimePicker
                showModal={showCostModal}
                data={{ date: assigneeData.startDate, time: assigneeData.startTime }}
                setData={(value) => {
                  if (value.date) {
                    setAssigneeData((prev) => ({ ...prev, startDate: value.date }));
                  } else {
                    setAssigneeData((prev) => ({ ...prev, startTime: value.time }));
                  }
                }}
              />
            </h4>
            <h4>
              End Date & Time
              <DateAndTimePicker
                showModal={showCostModal}
                data={{ date: assigneeData.endDate, time: assigneeData.endTime }}
                setData={(value) => {
                  if (value.date) {
                    setAssigneeData((prev) => ({ ...prev, endDate: value.date }));
                  } else {
                    setAssigneeData((prev) => ({ ...prev, endTime: value.time }));
                  }
                }}
              />
            </h4>
            <h4>
              Hourly Rate
              <Input
                value={assigneeData.rate}
                type="number"
                className="inputs"
                onChange={(e) => setAssigneeData((prev) => ({ ...prev, rate: e.target.value }))}
                prefix={<i className="prefix fi fi-rs-dollar"></i>}
              />
            </h4>
            <h4>
              Duration
              <div className="input-child">
                <Input
                  value={assigneeData.hours}
                  placeholder="Hours"
                  onChange={(e) => setAssigneeData((prev) => ({ ...prev, hours: e.target.value }))}
                  maxLength={2}
                />
                <Input
                  value={assigneeData.minutes}
                  placeholder="Minutes"
                  onChange={(e) => setAssigneeData((prev) => ({ ...prev, minutes: e.target.value }))}
                  maxLength={2}
                />
              </div>
            </h4>
          </div>
          <div className="section-2">
            <h4>Description</h4>
            <TextArea
              value={assigneeData.description}
              style={{ resize: "none", height: "150px", width: "100%" }}
              onChange={(e) => setAssigneeData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ViewPreventiveMaintance;
