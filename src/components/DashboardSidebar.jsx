import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsSpeedometer2,
  BsClipboardCheck,
  BsClockHistory,
  BsPersonGear,
  BsCreditCard,
} from "react-icons/bs";

export default function CustomerSidebar() {
  return (
    <aside className="customer-sidebar z-1">
      <div className="cs-brand">My Account</div>

      <nav className="cs-nav">
        <NavLink to="/dashboard" className="cs-link rounded-4">
          <BsSpeedometer2 /> <span>Overview</span>
        </NavLink>

        <div className="cs-section">Orders</div>
        <NavLink to="/orders" className="cs-link rounded-4">
          <BsClipboardCheck /> <span>Order history</span>
        </NavLink>
        <NavLink to="/recent-purchases" className="cs-link rounded-4">
          <BsClockHistory /> <span>Recent purchases</span>
        </NavLink>

        <div className="cs-section">Account</div>
        <NavLink to="/manage-account" className="cs-link rounded-4">
          <BsPersonGear /> <span>Manage account</span>
        </NavLink>
      </nav>
    </aside>
  );
}
