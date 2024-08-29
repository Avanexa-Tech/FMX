import { Button, Form, Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useReducer, useRef, useState } from "react";
import StyledButton from "../common/StyledButton";
import { formatWords } from "../../helpers";
import Dragger from "antd/es/upload/Dragger";
import CustomSelect from "../common/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { createAsset, updateAsset } from "../../redux/slice/assetSlice";

const initialState = {
  locations: [],
  enteredLocation: undefined,
  model: [],
  enteredModel: undefined,
  manufacturer: [],
  enteredManufacturer: undefined,
  serialNumber: [],
  enteredSerialNumber: undefined,
  assetType: [],
  enteredAssetTypes: undefined,
  vendors: [],
  enteredVendor: undefined,
  parentAsset: [],
  enteredParentAsset: undefined,
  assignees: [
    {
      name: "Jeswin",
      email: "jeswin2711@gmail.com",
    },
  ],
  enteredAssignee: [],
};

function assetReducer(state, action) {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload };
    case "SET_ENTERED_LOCATION":
      return { ...state, enteredLocation: action.payload };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_ENTERED_MODEL":
      return { ...state, enteredModel: action.payload };
    case "SET_MANUFACTURER":
      return { ...state, manufacturer: action.payload };
    case "SET_ENTERED_MANUFACTURER":
      return { ...state, enteredManufacturer: action.payload };
    case "SET_SERIAL_NUMBER":
      return { ...state, serialNumber: action.payload };
    case "SET_ENTERED_SERIAL_NUMBER":
      return { ...state, enteredSerialNumber: action.payload };
    case "SET_ASSET_TYPE":
      return { ...state, assetType: action.payload };
    case "SET_ENTERED_ASSET_TYPE":
      return { ...state, enteredAssetTypes: action.payload };
    case "SET_VENDORS":
      return { ...state, vendors: action.payload };
    case "SET_ENTERED_VENDORS":
      return { ...state, enteredVendor: action.payload };
    case "SET_PARENT_ASSET":
      return { ...state, parentAsset: action.payload };
    case "SET_ENTERED_PARENT_ASSET":
      return { ...state, enteredParentAsset: action.payload };
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

const CreateAsset = ({ assetEditForm, setAssetEditForm }) => {
  const [assetActiveStatus, setAssetActiveStatus] = useState("active");
  const submitRef = useRef();
  const [state, dispatch] = useReducer(assetReducer, initialState);
  const assetSliceDispatch = useDispatch();
  const { assets } = useSelector((state) => state.assets);
  const [assetFormData, setAssetFormData] = useState({
    id: assets.length + 1,
    asset_name: "",
    asset_description: "",
    asset_status: "",
    location: "",
    model: "",
    manufacturer: "",
    serial_number: "",
    asset_types: "",
    vendor: "",
    parent_asset: "",
  });

  const assetStatus = [
    {
      key: "active",
    },
    {
      key: "inactive",
    },
    {
      key: "under_maintenance",
    },
  ];

  const [form] = Form.useForm();

  useEffect(() => {
    if (assetEditForm && assetEditForm.id) {
      form.setFieldsValue(assetEditForm);
      setAssetFormData({ ...assetEditForm });
    }
  }, [form, assetEditForm]);

  function handleChange(name, value) {
    setAssetFormData({ ...assetFormData, [name]: value });
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

  const handleLocationAddition = () =>
    handleAddition("locations", "enteredLocation");

  const handleModelAddition = () => handleAddition("model", "enteredModel");
  const handleManufacturerAddition = () =>
    handleAddition("manufacturer", "enteredManufacturer");
  const handleSerialNumberAddition = () =>
    handleAddition("serialNumber", "enteredSerialNumber");
  const handleAssetTypesAddition = () =>
    handleAddition("assetType", "enteredAssetTypes");
  const handleVendorAddition = () => handleAddition("vendors", "enteredVendor");
  const handleParentAssetAddition = () =>
    handleAddition("parentAsset", "enteredParentAsset");

  const handleCreateAsset = () => {
    if (assetEditForm && assetEditForm.id) {
      assetSliceDispatch(updateAsset(assetFormData));
      setAssetFormData(initialState);
      setAssetEditForm({});
    }
    else{
      assetSliceDispatch(createAsset(assetFormData));
    }
  };

  return (
    <>
      <div className="create-asset-form">
        <h3>{assetEditForm?.id ? "Update" : "Create"} Asset</h3>
        <Form
          layout="vertical"
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 8 }}
          initialValues={assetFormData}
          scrollToFirstError={true}
          onFinish={handleCreateAsset}
          form={form}
        >
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
                message: "Please Enter Name For Asset",
              },
            ]}
            name={"asset_name"}
          >
            <Input
              placeholder="HVAC System"
              name="asset_name"
              value={assetFormData.asset_name}
              onChange={(e) => handleChange("asset_name", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              placeholder="Main Building HVAC System"
              value={assetFormData.asset_description}
              onChange={(e) =>
                handleChange("asset_description", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Asset Image">
            <Dragger customRequest={() => {}} onChange={() => {}}>
              <p className="ant-upload-drag-icon">
                <i className="fi fi-ts-camera-viewfinder"></i>
              </p>
              <p className="ant-upload-text">Add or Drag Pictures</p>
            </Dragger>
          </Form.Item>
          <Form.Item label="Asset Status">
            <div className="asset-row">
              {assetStatus.map((status) => (
                <StyledButton
                  text={formatWords(status.key)}
                  btnClassName={
                    assetActiveStatus === status.key ? "active-cls" : ""
                  }
                  onClick={() => setAssetActiveStatus(status.key)}
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Location">
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
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_LOCATION",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredLocation}
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
          <Form.Item label="Model">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("model", value)}
              options={state?.model?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Model"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_MODEL",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredModel}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Model"}
                      onClick={handleModelAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Manufacturer">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("manufacturer", value)}
              options={state?.manufacturer?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Manufacturer"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_MANUFACTURER",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredManufacturer}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Manufacturer"}
                      onClick={handleManufacturerAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Serial Number">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("serial_number", value)}
              options={state?.serialNumber?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Serial Number"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_SERIAL_NUMBER",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredSerialNumber}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Serial Number"}
                      onClick={handleSerialNumberAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Space>
            <Form.Item label="Year">
              <Input placeholder="2020" />
            </Form.Item>
            <Form.Item label="Teams in charge">
              <Select>
                <Select.Option value="team1">Team 1</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item label="Asset Types">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("asset_types", value)}
              options={state?.assetType?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Asset Type"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_ASSET_TYPE",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredAssetTypes}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Asset Type"}
                      onClick={handleAssetTypesAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Vendors">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("vendors", value)}
              options={state?.vendors?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Vendor"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_VENDORS",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredVendor}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Vendor"}
                      onClick={handleVendorAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Parent Asset">
            <CustomSelect
              placeholder={"Start Typing"}
              onChange={(value) => handleChange("parent_asset", value)}
              options={state?.parentAsset?.map((item) => ({
                label: formatWords(item),
                value: item,
              }))}
              dropdownRender={(menu) => (
                <>
                  <div className="menu-dropdown">{menu}</div>
                  <Space className="dynamic-input-container">
                    <Input
                      placeholder="Please Enter Parent Asset"
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ENTERED_PARENT_ASSET",
                          payload: e.target.value,
                        })
                      }
                      value={state?.enteredParentAsset}
                    />
                    <StyledButton
                      icon={<i className="fi fi-ts-land-layer-location"></i>}
                      text={"Add Parent Asset"}
                      onClick={handleParentAssetAddition}
                    />
                  </Space>
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Documentation">
            <Dragger customRequest={() => {}} onChange={() => {}}>
              <p className="ant-upload-drag-icon">
                <i className="fi fi-ts-camera-viewfinder"></i>
              </p>
              <p className="ant-upload-text">Upload or Drop Files</p>
            </Dragger>
          </Form.Item>
          <Button
            ref={submitRef}
            style={{ display: "none" }}
            htmlType="submit"
          />
        </Form>
      </div>
      <StyledButton
        key="create-asset-btn"
        icon={!assetEditForm?.id && <i className="fi fi-rr-plus"></i>}
        text={assetEditForm?.id ? "Update Asset" : "Create Asset"}
        btnClassName={"create-asset-btn"}
        onClick={() => submitRef.current?.click()}
      />
    </>
  );
};

export default CreateAsset;
