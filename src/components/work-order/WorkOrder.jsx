import React, { useEffect, useReducer, useRef, useState } from "react";
import StyledButton from "../common/StyledButton";
import {
  Avatar, Dropdown, Tabs,
  Tag
} from "antd";
import { createWorkOrderImg } from "../../assets/images";
import classNames from "classnames";
import { formatWords } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import ViewWorkOrder from "./ViewWorkOrder";
import { toggleShowCreateWorkOrder } from "../../redux/slice/userActionSlice";
import CreateWorkOrder from "./CreateWorkOrder";

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
    <div className="mark-as-read">Mark All As Read</div>
  </div>
);

const initialState = {
  locations: ["erode"],
  enteredLocation: undefined,
  assets: ["ac"],
  enteredAsset: undefined,
  categories: ["machine"],
  enteredCategory: undefined,
  vendors: ["LG"],
  enteredVendor: undefined,
  assignees: [{
    name: "Jeswin",
    email: "jeswin2711@gmail.com"
  }],
  enteredAssignee: [],
};

function woReducer(state, action) {
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

const WorkOrder = () => {
  const [container, setContainer] = React.useState(null);
  const { showWorkOrderForm } = useSelector((state) => state.user_action);
  const { workOrders } = useSelector((state) => state.work_order);
  const actionDispatch = useDispatch();
  const [state, dispatch] = useReducer(woReducer, initialState);
  const [selectWO, setSelectWO] = useState();
  const [woEditForm, setWoEditForm] = useState({});
  const submitWoRef = useRef();

  const tagClass = (level) =>
    classNames({
      "none-priority": level === "none",
      "low-priority": level === "low",
      "medium-priority": level === "medium",
      "high-priority": level === "high",
    });

  function handleWOClick(wo) {
    actionDispatch(toggleShowCreateWorkOrder(false));
    setSelectWO(wo);
  }

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
            icon={<i className="fi fi-br-plus"></i>}
            text={"Create Work Order"}
            btnClassName={"create-wo-btn"}
            onClick={() => actionDispatch(toggleShowCreateWorkOrder(true))}
          />
          {/* <Dropdown
            overlay={
              <div className="extra-options-dropdown">
                <a href="#">Option 1</a>
                <a href="#">Option 2</a>
                <a href="#">Option 3</a>
              </div>
            }
          >
            <div className="extra-options-icon">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </div>
          </Dropdown> */}
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
                    {workOrders.length ? (
                      <div className="work-order-flat-list">
                        {workOrders
                          .filter((wo) => wo.status !== "done")
                          .map((wo, ind) => (
                            <div
                              key={ind}
                              className="work-order-card"
                              onClick={() => handleWOClick(wo)}
                            >
                              <div className="wo-details">
                                <h4>{wo.wo_title}</h4>
                                <p>Requested by {wo?.requester?.name}</p>
                                <p>Work ID : #{wo?.id}</p>
                                <div className="assignee-name">
                                  <Avatar
                                    size={"small"}
                                    icon={
                                      <i className="fi fi-ts-circle-user"></i>
                                    }
                                  />
                                  <p>
                                    Assigned To{" "}
                                    <span>{wo.assignees?.name}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="wo-status">
                                <Avatar
                                  shape="circle"
                                  size={"large"}
                                  icon={
                                    <i className="fi fi-ss-user-headset"></i>
                                  }
                                />
                                <Tag className={tagClass(wo.priority)}>
                                  {formatWords(wo.priority)}
                                </Tag>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-wo">
                        <img
                          src={createWorkOrderImg}
                          alt="Create New Work Order"
                        />
                        <p>You don't have any work orders</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Work Order"}
                          btnClassName={"new-wo-btn"}
                          onClick={() =>
                            actionDispatch(toggleShowCreateWorkOrder(true))
                          }
                        />
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
                    {workOrders.length ? (
                      <div className="work-order-flat-list">
                        {workOrders
                          .filter((wo) => wo.status === "done")
                          .map((wo, ind) => (
                            <div
                              key={ind}
                              className="work-order-card"
                              onClick={() => handleWOClick(wo)}
                            >
                              <div className="wo-details">
                                <h4>{wo.wo_title}</h4>
                                <p>Requested by {wo?.requester?.name}</p>
                                <p>Work ID : #{wo?.id}</p>
                                <div className="assignee-name">
                                  <Avatar
                                    size={"small"}
                                    icon={
                                      <i className="fi fi-ts-circle-user"></i>
                                    }
                                  />
                                  {/* <p>
                                    Assigned To <span>{wo?.assignees[0]?.name}</span>
                                  </p> */}
                                </div>
                              </div>
                              <div className="wo-status">
                                <Avatar
                                  shape="circle"
                                  size={"large"}
                                  icon={
                                    <i className="fi fi-ss-user-headset"></i>
                                  }
                                />
                                <Tag className={tagClass(wo.priority)}>
                                  {formatWords(wo.priority)}
                                </Tag>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-wo">
                        <img
                          src={createWorkOrderImg}
                          alt="Create New Work Order"
                        />
                        <p>You don't have any work orders</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Work Order"}
                          btnClassName={"new-wo-btn"}
                          onClick={() =>
                            dispatch(toggleShowCreateWorkOrder(true))
                          }
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
          {showWorkOrderForm ? (
            <div className="create-wo" ref={setContainer}>
              {woEditForm.id ? (
                <h2>Update Work Order</h2>
              ) : (
                <h2>New Work Order</h2>
              )}

              <CreateWorkOrder
                {...{
                  ...{
                    state,
                    dispatch,
                    submitWoRef,
                    tagClass,
                    woEditForm,
                    setWoEditForm,
                  },
                }}
              />
              <StyledButton
                key="create-wo-btn"
                icon={<i className="fi fi-rr-plus"></i>}
                text={
                  woEditForm.id ? "Update Work Order " : "Create Work Order"
                }
                btnClassName={"create-wo-finish-btn"}
                onClick={() => submitWoRef.current?.click()}
              />
            </div>
          ) : selectWO ? (
            <ViewWorkOrder wo={selectWO} setWoEditForm={setWoEditForm} />
          ) : null}
        </div>
      </div>
      <p id="" className=""></p>
    </section>
  );
};

export default WorkOrder;
