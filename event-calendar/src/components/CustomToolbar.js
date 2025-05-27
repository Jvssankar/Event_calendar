// src/CustomToolbar.js
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import "../styles.css";

const months = moment.months(); // January, February, ..., December
const years = Array.from({ length: 20 }, (_, i) => 2015 + i); // Example range

const CustomToolbar = ({ date, onNavigate }) => {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const handleMonthChange = (e) => {
    const newDate = new Date(date);
    newDate.setMonth(Number(e.target.value));
    onNavigate("date", newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(date);
    newDate.setFullYear(Number(e.target.value));
    onNavigate("date", newDate);
  };

  return (
    <div
      className="calendar-toolbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <button onClick={() => onNavigate("PREV")} className="nav-icon">
        <FaChevronLeft />
      </button>

      {/* Month Dropdown */}
      <select value={currentMonth} onChange={handleMonthChange}>
        {months.map((month, idx) => (
          <option value={idx} key={month}>
            {month}
          </option>
        ))}
      </select>

      {/* Year Dropdown */}
      <select value={currentYear} onChange={handleYearChange}>
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      <button onClick={() => onNavigate("NEXT")} className="nav-icon">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CustomToolbar;
