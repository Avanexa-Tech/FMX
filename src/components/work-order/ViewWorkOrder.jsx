import React from "react";

const ViewWorkOrder = ({
    wo
}) => {
    const [woStatus, setWoStatus] = useState(wo.priority);  
  return (
    <div className="view-wo">
      <div className="wo-intro">
        <h2>{wo.work_title}</h2>
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
              btnClassName={woStatus === status.key ? status.activeClass : ""}
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
          Conduct a comprehensive inspection of the HVAC system to ensure
          optimal performance and prevent potential issues. This task includes
          checking filters, monitoring refrigerant levels, inspecting electrical
          connections, and cleaning coils.
        </p>
      </div>
    </div>
  );
};

export default ViewWorkOrder;
