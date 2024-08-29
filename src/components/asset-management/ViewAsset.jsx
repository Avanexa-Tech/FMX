import React from "react";
import teamIcon from "../../assets/images/team-icon.png";
import sourceFile from "../../assets/files/sample.pdf";
import { toggleShowAssetCreationForm } from "../../redux/slice/userActionSlice";
import { useDispatch } from "react-redux";

const ViewAsset = ({
  selectedAsset,
  user,
  assetEditForm,
  setAssetEditForm,
}) => {

  const dispatch = useDispatch()

  return (
    <section className="view-asset-container">
      <div className="view-asset-head">
        <h3>{selectedAsset.asset_name}</h3>
        <div>
          <i
            className="fi fi-rr-pencil"
            onClick={() => {
              setAssetEditForm(selectedAsset);
              dispatch(toggleShowAssetCreationForm(true));
            }}
          ></i>
        </div>
      </div>
      <div className="asset-description">
        <label>Description</label>
        <p>{selectedAsset?.asset_description}</p>
      </div>
      <div className="asset-status-view">
        <label>Asset Status</label>
        <p>{selectedAsset?.asset_status}</p>
      </div>
      <div className="asset-details-container">
        <div className="asset-details-box">
          <label>Model</label>
          <p>{selectedAsset?.model}</p>
        </div>
        <div className="asset-details-box">
          <label>Manufacturer</label>
          <p>{selectedAsset?.manufacturer}</p>
        </div>
        <div className="asset-details-box">
          <label>Serial Number</label>
          <p>{selectedAsset?.serial_number}</p>
        </div>
        <div className="asset-details-box">
          <label>Year</label>
          <p>{selectedAsset?.year ?? 2022}</p>
        </div>
      </div>
      <div className="team-in-charge">
        <label>Team In Charge</label>
        <div>
          <img src={teamIcon} />
          <p>Team 1</p>
        </div>
      </div>
      <div className="asset-details-box">
        <label>Location</label>
        <p>{selectedAsset?.location ?? 2022}</p>
      </div>
      <div className="asset-details-container">
        <div className="asset-details-box">
          <label>Asset Type</label>
          <p>{selectedAsset?.model}</p>
        </div>
        <div className="asset-details-box">
          <label>Vendors</label>
          <div>
            <img src={teamIcon} />
            <p>Jeswin Jaison</p>
          </div>
        </div>
        <div className="asset-details-box">
          <label>Parent Asset</label>
          <p>{selectedAsset?.serial_number}</p>
        </div>
        <div className="asset-details-box">
          <label>Documentation</label>
          <div>
            <p>
              <a href={sourceFile} download={true}>
                User Manual <i class="fi fi-tr-display-arrow-down"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="asset-creation-details">
        <p>
          Created By {user.full_name} on {selectedAsset.created_time ?? ""}
        </p>
        <p>Last updated on {selectedAsset.updated_time ?? ""}</p>
      </div>
    </section>
  );
};

export default ViewAsset;
