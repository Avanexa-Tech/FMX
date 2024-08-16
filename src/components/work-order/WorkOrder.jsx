import React, { useReducer, useState } from "react";
import StyledButton from "../common/StyledButton";
import {
  Affix,
  Avatar,
  Button,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Tabs,
  Tag,
} from "antd";
import { createWorkOrderImg } from "../../assets/images";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import classNames from "classnames";
import { formatWords } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementWorkOrderCount,
  incrementWorkOrderCount,
  resetAllExpectWo,
  toggleShowCreateWorkOrder,
  toggleWorkOrder,
} from "../../redux/slice/userActionSlice";
import {createWorkOrder} from '../../redux/slice/workOrderSlice'
import CustomSelect from "../common/CustomSelect";

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

let priorityBtn = [
  {
    key: "none",
  },
  {
    key: "low",
  },
  {
    key: "medium",
  },
  {
    key: "high",
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

const initialState = {
  locations: ['erode'],
  enteredLocation: undefined,
  assets: ['ac'],
  enteredAsset: undefined,
  categories: ['machine'],
  enteredCategory: undefined,
  vendors: ['jj'],
  enteredVendor: undefined,
  assignees : [],
  enteredAssignee : []
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
  const [woStatus, setWOStatus] = useState("done");
  const [container, setContainer] = React.useState(null);
  const user_action = useSelector((state) => state.user_action);
  const work_order = useSelector((state) => state.work_order);
  let { workOrderCount } = user_action;
  let { workOrders } = work_order;
  const actionDispatch = useDispatch();
  const [state, dispatch] = useReducer(woReducer,initialState);
  const [selectWO, setSelectWO] = useState()

  const [workOrderFormData, setWorkOrderFormData] = useState({
    index : workOrders.length + 1,
    wo_title : "Testing",
    wo_description : "Testing",
    wo_attachment : "",
    priority : "low",
    start_date : "17-11-2024",
    due_date : "20-11-2024",
    estimated_hours : 5,
    estimated_minutes : 30,
    location : "Coimbatore",
    asset : "Air Conditioner",
    category : "",
    vendor : "LG",
    assignee : {
      "name" : "Jeswin",
      "email" : "jeswin2711@gmail.com"
    },
    requester : {
      "name" : "Joy"
    }
  })


  const tagClass = (level) => classNames({
    "low-priority": level === "low",
    "medium-priority": level === "medium",
    "high-priority": level === "high",
  });

  function handleWOClick() {
    actionDispatch(toggleShowCreateWorkOrder());
    actionDispatch(toggleWorkOrder());
  }

  function handleCreateWorkOrder() {
    actionDispatch(toggleShowCreateWorkOrder());
  }

  function handleWorkOrderCreation() {
    actionDispatch(incrementWorkOrderCount());
  }

  function deleteWorkOrder() {
    actionDispatch(decrementWorkOrderCount());
  }

  function handleCreateWO() {
    actionDispatch(createWorkOrder(workOrderFormData));
    // actionDispatch(toggleShowCreateWorkOrder());
    // actionDispatch(resetAllExpectWo());
  }

  function handleAddition(field, enteredField) {
    if (
      state[field].some(
        (location) =>
          location.toLowerCase() === state[enteredField].toLowerCase()
      )
    ) {
      message.open({
        type: "error",
        content: `${state[
          enteredField
        ]?.toUpperCase()} already exists`,
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        field: field,
        payload: state[enteredField],
        enteredField: enteredField,
      });
    }
  }

  const handleLocationAddition = () =>
    handleAddition("locations", "enteredLocation");
  const handleAssetAddition = () => handleAddition("assets", "enteredAsset");
  const handleCategoryAddition = () =>
    handleAddition("categories", "enteredCategory");
  const handleVendorAddition = () => handleAddition("vendors", "enteredVendor");
  const handleAssigneeAddition = () => handleAddition("assignees", "enteredAssignee");

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
            onClick={handleCreateWorkOrder}
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
                    {workOrders.length ? (
                      <div className="work-order-flat-list">
                      {workOrders.map((wo) => (
                        <div
                          className="work-order-card"
                          onClick={handleWOClick}
                        >
                          <div className="wo-details">
                            <h4>{wo.wo_title}</h4>
                            <p>Requested by {wo.requester.name}</p>
                            <p>Work ID : #{wo.index}</p>
                            <div className="assignee-name">
                              <Avatar
                                size={"small"}
                                icon={<i class="fi fi-ts-circle-user"></i>}
                              />
                              <p>
                                Assigned To <span>{wo.assignee.name}</span>
                              </p>
                            </div>
                          </div>
                          <div className="wo-status">
                            <Avatar
                              shape="circle"
                              size={"large"}
                              icon={<i class="fi fi-ss-user-headset"></i>}
                            />
                            <Tag className={tagClass(wo.priority)}>{formatWords(wo.priority)}</Tag>
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
                          icon={<i class="fi fi-rr-plus"></i>}
                          text={"Create Work Order"}
                          btnClassName={"new-wo-btn"}
                          onClick={handleCreateWorkOrder}
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
                    {workOrderCount === 0 ? (
                      <div className="create-new-wo">
                        <img
                          src={createWorkOrder}
                          alt="Create New Work Order"
                        />
                        <p>You don't have any work orders</p>
                        <StyledButton
                          onClick={handleCreateWorkOrder}
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
          {user_action.showCreateWorkOrder ? (
            <div className="create-wo" ref={setContainer}>
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
                <Form.Item label="Priority">
                  <div className="wo-priority-container">
                    {priorityBtn.map((type) => (
                      <StyledButton
                        key={type.key}
                        icon={null}
                        text={formatWords(type.key)}
                      />
                    ))}
                  </div>
                </Form.Item>
                <Space size={[8, 16]} wrap className="start-end-date-container">
                  <Form.Item label={"Start Date"}>
                    <DatePicker className="wo-date-picker" />
                  </Form.Item>
                  <Form.Item label={"Due Date"}>
                    <DatePicker className="wo-date-picker" />
                  </Form.Item>
                </Space>
                <Form.Item
                  label="Estimated Time"
                  className="estimated-time-container"
                >
                  <Space>
                    <Form.Item label={"Hours"}>
                      <InputNumber min={1} max={24} />
                    </Form.Item>
                    <Form.Item label={"Minutes"}>
                      <InputNumber min={0} max={59} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item label="Procedure" className="procedure-form-item">
                  <p>Create Or Attach New Form, Procedure Or Checklist</p>
                  <StyledButton
                    icon={<i class="fi fi-br-plus"></i>}
                    text={"Add Procedure"}
                    btnClassName={"add-procedure-btn"}
                  />
                </Form.Item>
                <Form.Item label="Location" className="location">
                  <CustomSelect
                    mode={"multiple"}
                    placeholder={"Start Typing"}
                    options={state?.locations?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    dropdownRender={(menu) => (
                      <>
                        <div className="menu-dropdown">{menu}</div>
                        <Space className="dynamic-input-container">
                          <Input
                            placeholder="Please Enter Location"
                            onChange={(e) =>
                              dispatch({
                                type: "SET_ENTERED_LOCATION",
                                payload: e.target.value,
                              })
                            }
                            value={state?.enteredLocation}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <StyledButton
                            icon={<i class="fi fi-ts-land-layer-location"></i>}
                            text={"Add Location"}
                            onClick={handleLocationAddition}
                          />
                        </Space>
                      </>
                    )}
                  />
                </Form.Item>
                <Form.Item label="Asset">
                  <CustomSelect
                    mode={"multiple"}
                    placeholder="Start Typing"
                    dropdownRender={(menu) => (
                      <>
                        <div className="menu-dropdown">{menu}</div>
                        <Space className="dynamic-input-container">
                          <Input
                            placeholder="Please Enter Asset"
                            onChange={(e) => {
                              dispatch({
                                type: "SET_ENTERED_ASSET",
                                payload: e.target.value,
                              });
                            }}
                            value={state?.enteredAsset}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <StyledButton
                            icon={<i class="fi fi-tr-boxes"></i>}
                            text={"Add Asset"}
                            onClick={handleAssetAddition}
                          />
                        </Space>
                      </>
                    )}
                    options={state?.assets?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Categories">
                  <CustomSelect
                    mode={"multiple"}
                    placeholder="Start Typing"
                    dropdownRender={(menu) => (
                      <>
                        <div className="menu-dropdown">{menu}</div>
                        <Space className="dynamic-input-container">
                          <Input
                            placeholder="Please Enter Category"
                            onChange={(e) => {
                              dispatch({
                                type: "SET_ENTERED_CATEGORY",
                                payload: e.target.value,
                              });
                            }}
                            value={state?.enteredCategory}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <StyledButton
                            icon={<i class="fi fi-ts-category"></i>}
                            text={"Add Category"}
                            onClick={handleCategoryAddition}
                          />
                        </Space>
                      </>
                    )}
                    options={state?.categories?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Vendors">
                  <CustomSelect
                    mode={"multiple"}
                    placeholder="Start Typing"
                    dropdownRender={(menu) => (
                      <>
                        <div className="menu-dropdown">{menu}</div>
                        <Space className="dynamic-input-container">
                          <Input
                            placeholder="Please Enter Vendor"
                            onChange={(e) => {
                              dispatch({
                                type: "SET_ENTERED_VENDOR",
                                payload: e.target.value,
                              });
                            }}
                            value={state?.enteredVendor}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <StyledButton
                            icon={<i class="fi fi-tr-seller"></i>}
                            text={"Add Vendor"}
                            onClick={handleVendorAddition}
                          />
                        </Space>
                      </>
                    )}
                    options={state?.vendors?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Assign To">
                  <CustomSelect
                    mode={"multiple"}
                    placeholder="Type Name, Email Or Phone Number"
                    options={state?.assignees?.map((assignee) => ({
                      label: assignee,
                      value: assignee,
                    }))}
                    dropdownRender={(menu) => (
                      <>
                        <div className="menu-dropdown">{menu}</div>
                        <Space className="dynamic-input-container">
                          <Input
                            placeholder="Please Enter Assignee"
                            onChange={(e) => {
                              dispatch({
                                type: "SET_ENTERED_ASSIGNEE",
                                payload: e.target.value,
                              });
                            }}
                            value={state?.enteredAssignee}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <StyledButton
                            icon={<i class="fi fi-rs-user-add"></i>}
                            text={"Invite Assignee"}
                            onClick={handleAssigneeAddition}
                          />
                        </Space>
                      </>
                    )}
                  />
                </Form.Item>
              </Form>
              <Affix target={() => container}>
                <StyledButton
                  icon={<i class="fi fi-rr-plus"></i>}
                  text={"Create Work Order"}
                  btnClassName={"create-wo-finish-btn"}
                  onClick={handleCreateWO}
                />
              </Affix>
            </div>
          ) : user_action.showWorkOrder ? (
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
                  Conduct a comprehensive inspection of the HVAC system to
                  ensure optimal performance and prevent potential issues. This
                  task includes checking filters, monitoring refrigerant levels,
                  inspecting electrical connections, and cleaning coils.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WorkOrder;
