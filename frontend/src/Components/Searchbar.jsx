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
      <p className="text-blue-900 font-bold text-lg text-center mt-4">
        Get more from your search
      </p>
      <div className="flex justify-center items-center">
        <div className="flex items-start mr-2 relative">
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <BsInfoCircleFill className="text-indigo-500 mr-2 mt-4" size={25} />
            {showToolTip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-blue-800 bg-opacity-75 text-white p-4 rounded-lg text-sm italic shadow-lg w-max z-50">
                {tooltipText}
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center w-[40vw] p-2 border-none rounded-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              onFocus={handleFocus}
              ref={inputRef}
              placeholder="Search..."
              className="w-full p-2 text-sm border-none outline-none bg-gray-100 rounded-md"
            />
            {isFocused && searchTerm && suggestions.length > 0 && (
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 w-full bg-white border rounded-md shadow-lg max-h-36 overflow-y-auto z-50">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex flex-wrap justify-center">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm inline-block bg-blue-900 text-white rounded-full px-2 py-1 mx-1 cursor-pointer hover:bg-blue-600"
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
