"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="min-vh-100 p-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-white rounded-custom-lg shadow-custom p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <h2 className="h5 fw-semibold text-dark">Dashboard</h2>
            </div>
            <div className="text-center py-5">
              <div className="mb-4">
                <svg 
                  width="120" 
                  height="120" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  className="mx-auto"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="9"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="15" y2="17"/>
                </svg>
              </div>
              <h3 className="h5 text-muted mb-2">No Data Found</h3>
              <p className="text-muted mb-0">There are no dashboard components to display at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;