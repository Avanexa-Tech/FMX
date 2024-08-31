import React, { useReducer, useRef, useState } from "react";
import StyledButton from "../common/StyledButton";
import {
  Avatar, Tabs,
  Tag
} from "antd";
import { createWorkOrderImg } from "../../assets/images";
import classNames from "classnames";
import { formatDateWithOrdinal, formatWords } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import ViewPreventiveMaintance from "./ViewPM";
import CreatePreventiveMaintance from "./CreatePM";
import { toggleShowCreatePreventiveMaintenance } from "../../redux/slice/userActionSlice";
import dayjs, { Dayjs } from "dayjs";

let filterBtns = [
  {
    key: "assigned_to",
    icon: <i className="fi fi-rr-user"></i>,
    label: "Assigned To",
  },
  {
    key: "due_date",
    icon: <i className="fi fi-rr-calendar"></i>,
    label: "Due Date",
  },
  {
    key: "location",
    icon: <i className="fi fi-rs-marker"></i>,
    label: "Location",
  },
  {
    key: "priority",
    icon: <i className="fi fi-rr-diamond-exclamation"></i>,
    label: "Priority",
  },
  {
    key: "add_filter",
    icon: <i className="fi fi-rs-settings-sliders"></i>,
    label: "Add Filter",
  },
];



const quickActions = (
  <div className="quick-actions-container">
    <div className="sort-by">
      <i className="fi fi-rr-sort-alt"></i>
      Sort By
    </div>
    <div className="calendar">
      <i className="fi fi-rr-calendar"></i>Calender
    </div>
  </div>
);

const initialState = {
  locations: [],
  enteredLocation: undefined,
  assets: [],
  enteredAsset: undefined,
  categories: [],
  enteredCategory: undefined,
  vendors: [],
  enteredVendor: undefined,
  assignees: [{
    name: "Jeswin",
    email: "jeswin2711@gmail.com"
  }],
  enteredAssignee: [],
};

function pmReducer(state, action) {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload };
    case "SET_ENTERED_LOCATION":
      return { ...state, enteredLocation: action.payload };
    case "SET_ASSETS":
      return { ...state, assets: action.payload };
    case "SET_ENTERED_ASSET":
      return { ...state, enteredAsset: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_ENTERED_CATEGORY":
      return { ...state, enteredCategory: action.payload };
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    case "SET_ENTERED_VENDOR":
      return { ...state, enteredVendor: action.payload };
    case "SET_ASSIGNEES":
      return { ...state, assignees: action.payload };
    case "SET_ENTERED_ASSIGNEE":
      return { ...state, enteredAssignee: action.payload };
    case "ADD_ITEM":
      return {
        ...state,
        [action.field]: [...state[action.field], action.payload],
        [action.enteredField]: undefined,
      };
    default:
      return state;
  }
}

const PreventiveMaintenance = () => {
  const [container, setContainer] = React.useState(null);
  const { showPreventiveMaintenanceForm } = useSelector((state) => state.user_action);
  const { preventiveMaintenance } = useSelector((state) => state.preventive_maintenance);
  const actionDispatch = useDispatch();
  const [state, dispatch] = useReducer(pmReducer, initialState);
  const [selectPM, setSelectpm] = useState();
  const [pmEditForm, setPmEditForm] = useState({});
  const submitWoRef = useRef();

  const tagClass = (level) =>
    classNames({
      "none-priority": level === "none",
      "low-priority": level === "low",
      "medium-priority": level === "medium",
      "high-priority": level === "high",
    });

  function handleWOClick(pm) {
    actionDispatch(toggleShowCreatePreventiveMaintenance(false));
    setSelectpm(pm);
  }

  return (
    <section className="work-order-container">
      <div className="work-order-header">
        <div className="wo-filters">
          {filterBtns.map((btn) => (
            <StyledButton key={btn.key} icon={btn.icon} text={btn.label} btnClassName={"filter-btn"} />
          ))}
        </div>
        <div className="wo-main-option">
          <p>Reset Filters</p>
          <StyledButton
            icon={<i className="fi fi-br-plus"></i>}
            text={"Create PM"}
            btnClassName={"create-wo-btn"}
            onClick={() => actionDispatch(toggleShowCreatePreventiveMaintenance(true))}
          />
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
                key: "upcoming",
                label: "Upcoming",
                children: (
                  <>
                    {quickActions}
                    {preventiveMaintenance.length ? (
                      <div className="work-order-flat-list">
                        {preventiveMaintenance
                          .filter((pm) => !dayjs().isAfter(dayjs(pm.due_date)) && pm.wo_status !== "done")
                          .map((pm, ind) => (
                            <div key={ind} className="work-order-card" onClick={() => handleWOClick(pm)}>
                              <div className="wo-details">
                                <h4>{pm.wo_title}</h4>
                                {pm?.due_date?.length ? <p>Due {formatDateWithOrdinal(pm?.due_date)}</p> : ""}
                                <p className="status" style={{ color: "orange" }}>
                                  Upcoming
                                </p>
                                <div className="wo-card-bottom">
                                  <div className="location">
                                    <i className="fi fi-rs-marker" />
                                    <p className="location-text">{pm?.location}</p>
                                  </div>
                                  <div className="assignee-name">
                                    <Avatar size={"small"} icon={<i className="fi fi-ts-circle-user" />} />
                                    {/* <p>
                                    Assigned To <span>{wo?.assignees[0]?.name}</span>
                                  </p> */}
                                  </div>
                                </div>
                              </div>
                              <div className="wo-status">
                                <Avatar
                                  shape="circle"
                                  size={"large"}
                                  icon={<i className="fi fi-ss-user-headset"></i>}
                                />
                                <Tag className={tagClass(pm.priority)}>{formatWords(pm.priority)}</Tag>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-wo">
                        <img src={createWorkOrderImg} alt="Create New Preventive Maintenance" />
                        <p>You don't have any preventive maintenance</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Preventive Maintenance"}
                          btnClassName={"new-wo-btn"}
                          onClick={() => dispatch(toggleShowCreatePreventiveMaintenance(true))}
                        />
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "overdue",
                label: "Overdue",
                children: (
                  <>
                    {quickActions}
                    {preventiveMaintenance.length ? (
                      <div className="work-order-flat-list">
                        {preventiveMaintenance
                          .filter((pm) => {
                            return dayjs().isAfter(dayjs(pm.due_date)) && pm.wo_status !== "done";
                          })
                          .map((pm, ind) => (
                            <div key={ind} className="work-order-card" onClick={() => handleWOClick(pm)}>
                              <div className="wo-details">
                                <h4>{pm.wo_title}</h4>
                                {pm?.due_date.length ? <p>Due {formatDateWithOrdinal(pm?.due_date)}</p> : ""}
                                <p className="status" style={{ color: "#3eb7e7" }}>
                                  Overdue
                                </p>
                                <div className="wo-card-bottom">
                                  <div className="location">
                                    <i className="fi fi-rs-marker" />
                                    <p className="location-text">{pm?.location}</p>
                                  </div>
                                  <div className="assignee-name">
                                    <Avatar size={"small"} icon={<i className="fi fi-ts-circle-user" />} />
                                    {/* <p>
                                    Assigned To <span>{wo?.assignees[0]?.name}</span>
                                  </p> */}
                                  </div>
                                </div>
                              </div>
                              <div className="wo-status">
                                <Avatar
                                  shape="circle"
                                  size={"large"}
                                  icon={<i className="fi fi-ss-user-headset"></i>}
                                />
                                <Tag className={tagClass(pm.priority)}>{formatWords(pm.priority)}</Tag>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-wo">
                        <img src={createWorkOrderImg} alt="Create New Preventive Maintenance" />
                        <p>You don't have any preventive maintenance</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Preventive Maintenance"}
                          btnClassName={"new-wo-btn"}
                          onClick={() => dispatch(toggleShowCreatePreventiveMaintenance(true))}
                        />
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "completed",
                label: "Completed",
                children: (
                  <>
                    {quickActions}
                    {preventiveMaintenance.length ? (
                      <div className="work-order-flat-list">
                        {preventiveMaintenance
                          .filter((pm) => pm.wo_status === "done")
                          .map((pm, ind) => (
                            <div key={ind} className="work-order-card" onClick={() => handleWOClick(pm)}>
                              <div className="wo-details">
                                <h4>{pm.wo_title}</h4>
                                {pm?.due_date?.length ? <p>Due {formatDateWithOrdinal(pm?.due_date)}</p> : ""}
                                <p className="status" style={{ color: "#0bc912" }}>
                                  Completed
                                </p>
                                <div className="wo-card-bottom">
                                  <div className="location">
                                    <i className="fi fi-rs-marker" />
                                    <p className="location-text">{pm?.location}</p>
                                  </div>
                                  <div className="assignee-name">
                                    <Avatar size={"small"} icon={<i className="fi fi-ts-circle-user" />} />
                                    {/* <p>
                                    Assigned To <span>{wo?.assignees[0]?.name}</span>
                                  </p> */}
                                  </div>
                                </div>
                              </div>
                              <div className="wo-status">
                                <Avatar
                                  shape="circle"
                                  size={"large"}
                                  icon={<i className="fi fi-ss-user-headset"></i>}
                                />
                                <Tag className={tagClass(pm.priority)}>{formatWords(pm.priority)}</Tag>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-wo">
                        <img src={createWorkOrderImg} alt="Create New Preventive Maintenance" />
                        <p>You don't have any preventive maintenance</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Preventive Maintenance"}
                          btnClassName={"new-wo-btn"}
                          onClick={() => dispatch(toggleShowCreatePreventiveMaintenance(true))}
                        />
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="create-view-work-order">
          {showPreventiveMaintenanceForm ? (
            <div className="create-wo" ref={setContainer}>
              {pmEditForm.id ? <h2>Update Preventive Maintenance</h2> : <h2>New Preventive Maintenance</h2>}
              <CreatePreventiveMaintance
                {...{
                  ...{
                    state,
                    dispatch,
                    submitWoRef,
                    tagClass,
                    pmEditForm,
                    setPmEditForm,
                  },
                }}
              />
              <StyledButton
                key="create-wo-btn"
                icon={<i className="fi fi-rr-plus"></i>}
                text={pmEditForm.id ? "Update Preventive Maintenance " : "Create Preventive Maintenance"}
                btnClassName={"create-wo-finish-btn"}
                onClick={() => submitWoRef.current?.click()}
              />
            </div>
          ) : selectPM ? (
            <ViewPreventiveMaintance pm={selectPM} setPmEditForm={setPmEditForm} />
          ) : null}
        </div>
      </div>
      <p id="" className=""></p>
    </section>
  );
};

export default PreventiveMaintenance;
