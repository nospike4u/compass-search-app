import React, { useState, useEffect, useRef } from "react";
import searchData from "./SearchData";
import { BsInfoCircleFill } from "react-icons/bs";
import "./SearchBar.css";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipTimer, setToolTipTimer] = useState(null);

  const inputRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredSuggestions = searchData.filter((term) =>
        term.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (suggestions.length > 0) {
        handleAddTag(suggestions[0]);
      } else if (searchTerm && searchData.includes(searchTerm)) {
        handleAddTag(searchTerm);
      }
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleAddTag = (tag) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((item) => item !== tag));
  };

  const handleSuggestionClick = (suggestion) => {
    handleAddTag(suggestion);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setSuggestions([]), 200);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowToolTip(true);
    }, 1000);
    setToolTipTimer(timer);
  };

  const handleMouseLeave = () => {
    clearTimeout(toolTipTimer);
    setShowToolTip(false);
  };

  const tooltipText = (
    <div>
      <p>
        Our search feature offers <strong>AUTOCOMPLETE</strong> functionality to
        help you quickly find what you're looking for.
      </p>
      <p>
        Pressing <strong>ENTER</strong> selects the first item in the
        autocomplete list.
      </p>
      <p>
        You can view all the tool tips again by setting activating{" "}
        <strong>SHOW TOOLTIPS</strong> in your profile settings.
      </p>
    </div>
  );

  return (
    <div>
      <p className="search-header">Get more more from your search</p>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <div
            className="info-icon-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <BsInfoCircleFill
              className="info-icon"
              size={25}
              style={{ color: "#757ED0" }}
            />
            {showToolTip && <div className="tooltip">{tooltipText}</div>}
          </div>
          <div className="search-bar">
            {/* <BsInfoCircleFill className="info-icon" /> */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              onFocus={handleFocus}
              ref={inputRef}
              placeholder="Search..."
            />
            {isFocused && searchTerm && suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion) => (
                  // <li
                  //   key={suggestion}
                  //   onClick={() => handleSuggestionClick(suggestion)}>
                  //   {suggestion}
                  // </li>
                  <li
                    key={suggestion}
                    onMouseDown={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <div className="tags">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  onClick={() => handleTagClick(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
