import React, { useState } from "react";
import "./ContextMenu.css";
import {
  FaBuilding,
  FaUserTie,
  FaUsers,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const ContextMenu = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const handleEmailClick = () => {
    // Email-Adresse, Betreff und Inhalt
    const email = "jane.doe@example.com";
    const subject = "Hello Jane";
    const body = "I would like to discuss something important with you.";

    // Mailto-Link
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleTeamsClick = () => {
    const phoneNumber = "+1234567890";
    const teamsLink = `https://teams.microsoft.com/l/call/0/0?users=${phoneNumber}`;
    const teamsTab = window.open(teamsLink, "_blank");
  };

  const handleSlackClick = () => {
    const phoneNumber = "+1234567890";
    const slackLink = `slack://call/?id=${phoneNumber}`;
    const slackTab = window.open(slackLink, "_blank");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCallDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button className="btn rounded-full ml-40" onClick={toggleCardVisibility}>
        {isCardVisible ? "Hide" : "Show"}
      </button>
      {isCardVisible && (
        <div className="card shadow-xl card w-[250px] h-[400px] shadow-xl mt-2 ml-16 pt-8">
          <div className="avatar p-4 flex space-x-4">
            <div className="w-16 rounded-full">
              <img src="https://randomuser.me/api/portraits/lego/1.jpg" />
            </div>
            <div className="name ml-4 pt-4">John Doe</div>
          </div>
          <div className="card-body p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaBuilding className="card-icon " />
                <span className="text-sm">Department: Marketing</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaUserTie className="card-icon " />
                <span className="text-sm">Position: Manager</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaUsers className="card-icon " />
                <span className="text-sm">Team: Growth</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaPhone className="card-icon " />
                <span className="text-sm">Phone: +123 456 7890</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaEnvelope className="card-icon " />
                <span className="text-sm">john.doe@example.com</span>
              </div>
            </div>
            <div className="flex space-x-2 justify-center mt-8">
              <div className="dropdown dropdown-start">
                {/* Trigger Button */}
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle bg-white"
                  onClick={toggleCallDropdown}
                >
                  <FaPhone className="card-icon " />
                </label>
                {isDropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-m dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 z-10"
                  >
                    <li>
                      <button onClick={handleTeamsClick} className="card-btn">
                        <span>
                          <FaPhone className="card-icon " />
                          Teams
                        </span>
                      </button>
                    </li>
                    <li>
                      <button onClick={handleSlackClick} className="card-btn">
                        <span>
                          <FaPhone className="card-icon " />
                          Slack
                        </span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              <button
                className="btn bg-white rounded-full"
                onClick={handleEmailClick}
              >
                <FaEnvelope className="card-icon " />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
