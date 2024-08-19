import React, { useReducer, useState } from "react";
import StyledButton from "../common/StyledButton";
import {
  Affix,
  Avatar,
  DatePicker,
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
import { formatWords, getOrdinalSuffix } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementWorkOrderCount,
  incrementWorkOrderCount,
  toggleShowCreateWorkOrder,
  toggleWorkOrder,
} from "../../redux/slice/userActionSlice";
import { createWorkOrder } from "../../redux/slice/workOrderSlice";
import CustomSelect from "../common/CustomSelect";
import ViewWorkOrder from "./ViewWorkOrder";
import { DAY_OPTIONS, days } from "../../constant";

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

const initialState = {
  locations: ["erode"],
  enteredLocation: undefined,
  assets: ["ac"],
  enteredAsset: undefined,
  categories: ["machine"],
  enteredCategory: undefined,
  vendors: ["jj"],
  enteredVendor: undefined,
  assignees: ["jeswin2711@gmail.com"],
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
  const [woStatus, setWOStatus] = useState("done");
  const [container, setContainer] = React.useState(null);
  const user_action = useSelector((state) => state.user_action);
  const work_order = useSelector((state) => state.work_order);
  let { workOrderCount } = user_action;
  let { workOrders } = work_order;
  const actionDispatch = useDispatch();
  const [state, dispatch] = useReducer(woReducer, initialState);
  const [selectWO, setSelectWO] = useState();

  const [workOrderFormData, setWorkOrderFormData] = useState({
    index: workOrders.length + 1,
    wo_title: "",
    wo_description: "",
    wo_attachment: "",
    wo_status: "open",
    priority: "none",
    start_date: "",
    due_date: "",
    estimated_hours: 5,
    estimated_minutes: 30,
    location: "",
    asset: "",
    category: "",
    vendor: "",
    assignee: {
      name: "Jeswin",
      email: "jeswin2711@gmail.com",
    },
    requester: {
      name: "Joy",
    },
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    recurrence: {
      frequency: "yearly",
      days: [],
    },
    work_type: "preventive",
  });

  const tagClass = (level) =>
    classNames({
      "none-priority": level === "none",
      "low-priority": level === "low",
      "medium-priority": level === "medium",
      "high-priority": level === "high",
    });

  function handleWOClick(wo) {
    setSelectWO(wo);
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
        content: `${state[enteredField]?.toUpperCase()} already exists`,
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

  function handleDataChange(e) {
    console.log(e, "e12");
    setWorkOrderFormData({
      ...workOrderFormData,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(name, value) {
    setWorkOrderFormData({ ...workOrderFormData, [name]: value });
  }

  const handleLocationAddition = () =>
    handleAddition("locations", "enteredLocation");
  const handleAssetAddition = () => handleAddition("assets", "enteredAsset");
  const handleCategoryAddition = () =>
    handleAddition("categories", "enteredCategory");
  const handleVendorAddition = () => handleAddition("vendors", "enteredVendor");
  const handleAssigneeAddition = () =>
    handleAddition("assignees", "enteredAssignee");

  function handleWoPriority(woPriority) {
    setWorkOrderFormData({ ...workOrderFormData, priority: woPriority });
  }

  function handleWoDate(dateKey, dateString) {
    setWorkOrderFormData({ ...workOrderFormData, [dateKey]: dateString });
  }

  function recurrenceComponent() {
    function handleFrequencyDays(e) {
      let selectedDays = [...workOrderFormData.recurrence.days];
      if (selectedDays.includes(e.target.id)) {
        selectedDays = selectedDays.filter((d) => d !== e.target.id);
      } else {
        selectedDays.push(e.target.id);
      }
      setWorkOrderFormData({
        ...workOrderFormData,
        recurrence: { ...workOrderFormData.recurrence, days: selectedDays },
      });
    }

    switch (workOrderFormData.recurrence.frequency) {
      case "daily":
        return (
          <row>
            {days.map((day) => (
              <div>{formatWords(day)}</div>
            ))}
          </row>
        );
      case "weekly":
        return (
          <weeklyrow>
            <p>
              Every{" "}
              <Select
                defaultValue={1}
                onChange={(value) =>
                  setWorkOrderFormData({
                    ...workOrderFormData,
                    recurrence: {
                      ...workOrderFormData.recurrence,
                      week: value,
                    },
                  })
                }
              >
                {Array.from({ length: 52 }, (_, index) => index + 1).map(
                  (num) => (
                    <Select.Option value={num}>{num}</Select.Option>
                  )
                )}
              </Select>{" "}
              weeks on
            </p>
            <dayrow>
              {days.map((day) => (
                <div
                  onClick={handleFrequencyDays}
                  id={day}
                  style={{
                    background: workOrderFormData.recurrence.days.includes(day)
                      ? "#4085f6"
                      : "",
                    color: workOrderFormData.recurrence.days.includes(day)
                      ? "white"
                      : "",
                  }}
                >
                  {formatWords(day)}
                </div>
              ))}
            </dayrow>
            <p>
              Repeats every {workOrderFormData.recurrence.week ?? ""} week on{" "}
              {workOrderFormData.recurrence.days.map(
                (day, index) =>
                  `${DAY_OPTIONS[day]}${
                    workOrderFormData?.recurrence?.days.length - 1 !== index
                      ? ","
                      : ""
                  } `
              )}{" "}
              after completion of this Work Order
            </p>
          </weeklyrow>
        );
      case "monthly":
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <monthlyrow>
              <p>Every</p>
              <Select
                onChange={(value) => {
                  setWorkOrderFormData({
                    ...workOrderFormData,
                    recurrence: {
                      ...workOrderFormData.recurrence,
                      month_no: value,
                    },
                  });
                }}
              >
                {Array.from({ length: 24 }, (_, index) => index + 1).map(
                  (num) => (
                    <Select.Option key={num} value={num}>
                      {num}
                    </Select.Option>
                  )
                )}
              </Select>
              month {workOrderFormData.recurrence.month > 1 ? "s" : ""} on the
              <Select
                onChange={(value) => {
                  setWorkOrderFormData({
                    ...workOrderFormData,
                    recurrence: {
                      ...workOrderFormData.recurrence,
                      day_of_month: value,
                    },
                  });
                }}
              >
                {Array.from({ length: 31 }, (_, index) => index + 1).map(
                  (num) => (
                    <Select.Option key={num} value={num}>
                      {getOrdinalSuffix(num)}
                    </Select.Option>
                  )
                )}
              </Select>
            </monthlyrow>
            <p>
              Repeats every {workOrderFormData?.recurrence?.month_no} month{workOrderFormData?.recurrence?.month_no ? `s` : ""} on
              the{" "}
              {getOrdinalSuffix(workOrderFormData?.recurrence?.day_of_month ?? undefined)}{" "}
              day of the month after completion of this Work Order.
            </p>
          </div>
        );
      case "yearly":
        return (
          <yearly>
            <div>
              <p>Every</p>
              <Select
                onChange={(value) => {
                  setWorkOrderFormData({
                    ...workOrderFormData,
                    recurrence: {
                      ...workOrderFormData.recurrence,
                      year: value,
                    },
                  });
                }}
              >
                {Array.from({ length: 50 }, (_, index) => index + 1).map(
                  (num) => (
                    <Select.Option value={num}>{num}</Select.Option>
                  )
                )}
              </Select>
              <p>year{workOrderFormData.recurrence.year > 1 ? "s" : ""}</p>
            </div>
            <p>
              Repeats every{" "}
              {workOrderFormData.recurrence.year > 1
                ? workOrderFormData.recurrence.year
                : null}{" "}
              year{workOrderFormData.recurrence.year > 1 ? "s" : ""} on 08/20
              after completion of this Work Order.
            </p>
          </yearly>
        );
      default:
        break;
    }
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
                            onClick={() => handleWOClick(wo)}
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
              <Form
                layout="vertical"
                className="work-order-form"
                initialValues={workOrderFormData}
              >
                <Form.Item
                  rules={[{}]}
                  label="What needs to be done ?"
                  name={"wo_title"}
                >
                  <Input
                    name="wo_title"
                    onChange={handleDataChange}
                    value={workOrderFormData.wo_title}
                  />
                </Form.Item>
                <Form.Item
                  rules={[{}]}
                  label="Description"
                  name="wo_description"
                >
                  <TextArea
                    rows={4}
                    name="wo_description"
                    onChange={handleDataChange}
                    value={workOrderFormData.wo_description}
                  />
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
                        onClick={() => handleWoPriority(type.key)}
                        key={type.key}
                        icon={null}
                        text={formatWords(type.key)}
                        btnClassName={
                          workOrderFormData.priority === type.key
                            ? tagClass(workOrderFormData.priority)
                            : ""
                        }
                      />
                    ))}
                  </div>
                </Form.Item>
                <Space size={[8, 16]} wrap className="start-end-date-container">
                  <Form.Item label={"Start Date"}>
                    <DatePicker
                      className="wo-date-picker"
                      onChange={(date, dateString) =>
                        handleWoDate("start_date", dateString)
                      }
                    />
                  </Form.Item>
                  <Form.Item label={"Due Date"}>
                    <DatePicker
                      className="wo-date-picker"
                      onChange={(date, dateString) =>
                        handleWoDate("due_date", dateString)
                      }
                    />
                  </Form.Item>
                </Space>
                <Form.Item
                  label="Estimated Time"
                  className="estimated-time-container"
                >
                  <Space>
                    <Form.Item label={"Hours"} name={"estimated_hours"}>
                      <InputNumber
                        name={"estimated_hours"}
                        min={1}
                        max={24}
                        value={workOrderFormData?.estimated_hours}
                        onChange={(value) =>
                          handleChange("estimated_hours", value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={"Minutes"} name={"estimated_minutes"}>
                      <InputNumber
                        name={"estimated_minutes"}
                        min={0}
                        max={59}
                        value={workOrderFormData?.estimated_minutes}
                        onChange={(value) =>
                          handleChange("estimated_hours", value)
                        }
                      />
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
                <Form.Item label="Assign To" name={"assignee"}>
                  <CustomSelect
                    mode={"multiple"}
                    onChange={(value) => handleChange("assignee", value)}
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
                <Space className="pm-container">
                  <Form.Item label={"Work Type"} name={"work_type"}>
                    <Select>
                      <Select.Option key={"task"} value={"task"}>
                        Task
                      </Select.Option>
                      <Select.Option key={"preventive"} value={"preventive"}>
                        Preventive
                      </Select.Option>
                      <Select.Option key={"reactive"} value={"reactive"}>
                        Reactive
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={"Recurrence"}>
                    <Select
                      value={workOrderFormData.recurrence.frequency}
                      onChange={(value) =>
                        setWorkOrderFormData({
                          ...workOrderFormData,
                          recurrence: {
                            ...workOrderFormData.recurrence,
                            frequency: value,
                          },
                        })
                      }
                    >
                      <Select.Option
                        key={"does_not_repeat"}
                        value={"does_not_repeat"}
                      >
                        Does Not Repeat
                      </Select.Option>
                      <Select.Option key={"daily"} value={"daily"}>
                        Daily
                      </Select.Option>
                      <Select.Option key={"weekly"} value={"weekly"}>
                        Weekly
                      </Select.Option>
                      <Select.Option key={"monthly"} value={"monthly"}>
                        Monthly
                      </Select.Option>
                      <Select.Option key={"yearly"} value={"yearly"}>
                        Yearly
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Space>
                {recurrenceComponent()}
                <Form.Item label="Location" className="location">
                  <CustomSelect
                    placeholder={"Start Typing"}
                    onChange={(value) => handleChange("location", value)}
                    options={state?.locations?.map((item) => ({
                      label: formatWords(item),
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
                    placeholder="Start Typing"
                    onChange={(value) => handleChange("asset", value)}
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
                      label: formatWords(item),
                      value: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Categories" name={"category"}>
                  <CustomSelect
                    placeholder="Start Typing"
                    onChange={(value) => handleChange("category", value)}
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
                      label: formatWords(item),
                      value: item,
                    }))}
                  />
                </Form.Item>
                <Form.Item label="Vendors" name={"vendors"}>
                  <CustomSelect
                    placeholder="Start Typing"
                    onChange={(value) => handleChange("vendors", value)}
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
            <ViewWorkOrder wo={selectWO} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WorkOrder;
