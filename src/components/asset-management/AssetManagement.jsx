import React, { useState } from "react";
import StyledButton from "../common/StyledButton";
import {
  Tabs,
  Tag
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createWorkOrderImg } from "../../assets/images";
import CreateAsset from "./CreateAsset";
import { formatWords } from "../../helpers";
import { toggleShowAssetCreationForm } from "../../redux/slice/userActionSlice";
import ViewAsset from "./ViewAsset";

let filterBtns = [
  {
    key: "asset",
    icon: <i class="fi fi-tr-boxes"></i>,
    label: "Asset",
  },
  {
    key: "asset_type",
    icon: <i class="fi fi-tr-boxes"></i>,
    label: "Asset Type",
  },
  {
    key: "location",
    icon: <i className="fi fi-rs-marker"></i>,
    label: "Location",
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

const AssetManagement = () => {

  const { assets } = useSelector((state) => state.assets);
  const { user } = useSelector((state) => state.user_auth);
  const { showAssetForm } = useSelector((state) => state.user_action);
  const [selectedAsset, setSelectedAsset] = useState(false);
  const dispatch = useDispatch();
  const [assetEditForm, setAssetEditForm] = useState({})

  function handleAssetCardClick(asset){
    toggleAssetForm(false)
    setSelectedAsset(asset)
  }

  function toggleAssetForm(boolVal){
    dispatch(toggleShowAssetCreationForm(boolVal));
  }

  const AssetCard = ({ asset,handleAssetCardClick }) => {
    return (
      <div className="asset-card" onClick={() => handleAssetCardClick(asset)}>
        <div className="asset-details">
          <h3>{asset.asset_name}</h3>
          <p>Created By {formatWords(user.full_name)}</p>
          <p>Asset ID : {asset.id}</p>
          {asset.location && (
            <text>
              <i class="fi fi-ts-location-alt"></i>
              {asset.location}
            </text>
          )}
        </div>
        <div className="asset-extra-details">
          {/* <img className="asset-image" > */}
          <i className="fi fi-rr-box-open-full asset-image"></i>
          {/* </img> */}
          <Tag className="asset-status">
            <div className={"active" === "active" ? "active-asset" : ""} />
            <p>Active</p>
          </Tag>
        </div>
      </div>
    );
  };

  return (
    <section className="asset-management-container">
      <div className="am-head">
        <div className="asset-filters">
          {filterBtns.map((btn) => (
            <StyledButton
              key={btn.key}
              icon={btn.icon}
              text={btn.label}
              btnClassName={"filter-btn"}
            />
          ))}
        </div>
        <div className="asset-ctas">
          <p>Reset Filters</p>
          <StyledButton
            icon={<i className="fi fi-br-plus"></i>}
            text={"Create Asset"}
            onClick={() => toggleAssetForm("true")}
          />
        </div>
      </div>
      <div className="asset-management-data-container">
        <div className="assets-list">
          <Tabs
            style={{
              width: "100%",
            }}
            items={[
              {
                key: "active",
                label: "Active",
                children: (
                  <>
                    {quickActions}
                    {assets.length ? (
                      <div className="assets-flat-list">
                        {assets
                          .map((asset) => (
                            <AssetCard
                              asset={asset}
                              handleAssetCardClick={handleAssetCardClick}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-asset">
                        <img
                          src={createWorkOrderImg}
                          alt="Create New Work Order"
                        />
                        <p>Start Adding Assets To Your <b>FM<span>X</span></b> Account</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Asset"}
                          onClick={() => toggleAssetForm("true")}
                        />
                      </div>
                    )}
                  </>
                ),
              },
              {
                key: "inactive",
                label: "InActive",
                children: (
                  <>
                    {quickActions}
                    {assets.length ? (
                      <div className="assets-flat-list">
                        {assets
                          .map((asset) => (
                            <AssetCard
                              asset={asset}
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="create-new-asset">
                        <img
                          src={createWorkOrderImg}
                          alt="Create New Work Order"
                        />
                        <p>Start Adding Assets To Your <b>FM<span>X</span></b> Account</p>
                        <StyledButton
                          icon={<i className="fi fi-rr-plus"></i>}
                          text={"Create Asset"}
                          onClick={() => toggleAssetForm("true")}
                        />
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="create-assets">
          {showAssetForm ? (
            <CreateAsset
              assetEditForm={assetEditForm}
              setAssetEditForm={setAssetEditForm}
            />
          ) : selectedAsset ? (
            <ViewAsset
              selectedAsset={selectedAsset}
              user={user}
              assetEditForm={assetEditForm}
              setAssetEditForm={setAssetEditForm}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default AssetManagement;
