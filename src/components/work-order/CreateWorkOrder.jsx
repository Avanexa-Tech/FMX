import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import StyledButton from '../common/StyledButton';
import { formatWords, getOrdinalSuffix } from '../../helpers';
import CustomSelect from '../common/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkOrder, updateWorkOrder } from '../../redux/slice/workOrderSlice';
import { DAY_OPTIONS, days } from '../../constant';
import { toggleShowCreateWorkOrder } from '../../redux/slice/userActionSlice';
import { Link } from 'react-router-dom';
import { deleteProcedure } from '../../redux/slice/procedureSlice';

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

const CreateWorkOrder = ({ submitWoRef, state, dispatch, tagClass, woEditForm, setWoEditForm = () => { } }) => {
  const { workOrders } = useSelector((state) => state?.work_order);
  const { procedures } = useSelector((state) => state?.procedure);
  const { assets } = useSelector((state) => state?.assets);
  const initialState = {
    id: workOrders.length + 1,
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
    assignees: {
      name: "Jeswin",
      email: "jeswin2711@gmail.com",
    },
    requester: {
      name: "Joy",
    },
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    recurrence: {
      frequency: "daily",
      days: [],
    },
    work_type: "preventive",
  };

  const actionDispatch = useDispatch();
  const [workOrderFormData, setWorkOrderFormData] = useState(initialState);

  const [form] = Form.useForm();

  useEffect(() => {
    if (woEditForm && woEditForm.id) {
      form.setFieldsValue(woEditForm);
      setWorkOrderFormData({ ...woEditForm });
    }
  }, [form, woEditForm]);

  function handleCreateWO() {
    if (woEditForm && woEditForm.id) {
      actionDispatch(updateWorkOrder(workOrderFormData));
      actionDispatch(toggleShowCreateWorkOrder(false));
      setWorkOrderFormData(initialState);
      setWoEditForm({});
    } else {
      actionDispatch(createWorkOrder(workOrderFormData));
    }
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
  const handleAssetAddition = () => {
    handleAddition("assets", "enteredAsset")
  };
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
      setWorkOrderFormData((prev) => ({
        ...prev,
        recurrence: { ...workOrderFormData.recurrence, days: [...selectedDays] },
      }));
      console.log(selectedDays, "2323");
      if (selectedDays.length === 7) {
        setWorkOrderFormData({
          ...workOrderFormData,
          recurrence: { ...workOrderFormData.recurrence, frequency: "daily" },
        });
      }
    }

    function handleChangeFrequencyToWeek(day) {
      setWorkOrderFormData({
        ...workOrderFormData,
        recurrence: {
          ...workOrderFormData.recurrence,
          frequency: "weekly",
          week: 1,
          days: days.filter((d) => d !== day)
        },
      });
    }

    switch (workOrderFormData.recurrence.frequency) {
      case "daily":
        return (
          <row>
            <div>
              {days.map((day, ind) => (
                <div key={ind} onClick={() => handleChangeFrequencyToWeek(day)}>{formatWords(day)}</div>
              ))}
            </div>
            <p>
              Repeats every day after completion of this Work Order.
            </p>
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
                  (num, ind) => (
                    <Select.Option key={ind} value={num}>{num}</Select.Option>
                  )
                )}
              </Select>{" "}
              weeks on
            </p>
            <dayrow>
              {days.map((day, ind) => (
                <div
                  key={ind}
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
              Repeats every {workOrderFormData.recurrence.week > 1 ? workOrderFormData.recurrence.week : ""} week on{" "}
              {workOrderFormData.recurrence.days.map(
                (day, index) =>
                  `${DAY_OPTIONS[day]}${workOrderFormData?.recurrence?.days.length - 1 !== index
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
            <monthlyrow id="www">
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
              Repeats every {workOrderFormData?.recurrence?.month_no} month
              {workOrderFormData?.recurrence?.month_no ? `s` : ""} on the{" "}
              {getOrdinalSuffix(
                workOrderFormData?.recurrence?.day_of_month ?? undefined
              )}{" "}
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
                  (num, ind) => (
                    <Select.Option key={ind} value={num}>{num}</Select.Option>
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

  function handleAttachmentUpload({ fileList: newFileList }) {
    setWorkOrderFormData({
      ...workOrderFormData, attachments: {
        ...newFileList,
        status: "done",
      }
    });
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="work-order-form"
        initialValues={workOrderFormData}
        onFinish={handleCreateWO}
        scrollToFirstError={true}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input Work Order Title!",
            },
          ]}
          label="What needs to be done?"
          name={"wo_title"}
        >
          <Input
            name="wo_title"
            onChange={handleDataChange}
            value={workOrderFormData.wo_title}
          />
        </Form.Item>
        <Form.Item rules={[{}]} label="Description" name="wo_description">
          <TextArea
            rows={4}
            name="wo_description"
            onChange={handleDataChange}
            value={workOrderFormData.wo_description}
          />
        </Form.Item>
        <Form.Item label="Images">
          <Dragger customRequest={() => { }} onChange={handleAttachmentUpload}>
            <p className="ant-upload-drag-icon">
              <i className="fi fi-ts-camera-viewfinder"></i>
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
                btnClassName={
                  workOrderFormData.priority === type.key
                    ? tagClass(workOrderFormData.priority)
                    : ""
                }
                onClick={() => handleWoPriority(type.key)}
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
        <Form.Item label="Estimated Time" className="estimated-time-container">
          <Space>
            <Form.Item label={"Hours"} name={"estimated_hours"}>
              <InputNumber
                name={"estimated_hours"}
                min={1}
                max={24}
                value={workOrderFormData?.estimated_hours}
                onChange={(value) => handleChange("estimated_hours", value)}
              />
            </Form.Item>
            <Form.Item label={"Minutes"} name={"estimated_minutes"}>
              <InputNumber
                name={"estimated_minutes"}
                min={0}
                max={59}
                value={workOrderFormData?.estimated_minutes}
                onChange={(value) => handleChange("estimated_hours", value)}
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Procedure" className="procedure-form-item">
          <div className='procedure-form-item'>
            <div>
              <p>Create Or Attach New Form, Procedure Or Checklist</p>
              <StyledButton
                icon={<i className="fi fi-br-plus"></i>}
                text={"Add Procedure"}
                btnClassName={"add-procedure-btn"}
                href="create-procedure"
              />
            </div>
            {procedures.length > 0 ? procedures.map((item, ind) => (
              <div className='procedure-form-card' key={ind} >
                  <div className='title'>
                    <i className="fi fi-ts-guide-alt"></i>
                    {item.procedure_name}
                  </div>
                  <div className='icons'>
                  <Link to="create-procedure" state={item}><i className="fi fi-rr-pencil"></i></Link>
                  <i className="fi fi-rs-trash" onClick={() => actionDispatch(deleteProcedure(item?.id))}></i>
                  </div>
                </div>
          )) : <></>}
          </div>

        </Form.Item>
        <Form.Item label="Assign To" name={"assignees"}>
          <CustomSelect
            mode={"multiple"}
            onChange={(value) => handleChange("assignees", value)}
            placeholder="Type Name, Email Or Phone Number"
            options={state?.assignees?.map((assignees) => ({
              label: assignees.email,
              value: assignees.name,
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
                    icon={<i className="fi fi-rs-user-add"></i>}
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
              <Select.Option key={"does_not_repeat"} value={"does_not_repeat"}>
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
        <div className="recurrent-area">{recurrenceComponent()}</div>
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
                {console.log(menu, 'menu1212')}
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
                    icon={<i className="fi fi-ts-land-layer-location"></i>}
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
                    icon={<i className="fi fi-tr-boxes"></i>}
                    text={"Add Asset"}
                    onClick={handleAssetAddition}
                    href="/assets_management"
                  />
                </Space>
              </>
            )}
            options={assets?.map((item) => ({
              label: formatWords(item.asset_name),
              value: item.id,
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
                    icon={<i className="fi fi-ts-category"></i>}
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
                    icon={<i className="fi fi-tr-seller"></i>}
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
        <Button
          ref={submitWoRef}
          htmlType="submit"
          style={{ display: "none" }}
        />
      </Form>
    </>
  );
};

export default CreateWorkOrder;
