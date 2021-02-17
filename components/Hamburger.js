import React from "react";

export const Hamburger = ({ width = 24, height = 24, stroke = "#ffffff" }) => (
  <svg
    viewBox="0 0 24 24"
    width={width}
    height={height}
    stroke={stroke}
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="hamburger-icon"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default Hamburger;
