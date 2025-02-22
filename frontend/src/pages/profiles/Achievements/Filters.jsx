import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ onSearch }) => {
    const [showDistanceTags, setShowDistanceTags] = useState(false);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [sortType, setSortType] = useState('newest');

    const distances = [
        { value: '3', label: '3K' },
        { value: '5', label: '5K' },
        { value: '10', label: '10K' },
        { value: '21', label: 'Half Marathon' },
        { value: '42', label: 'Full Marathon' }
    ];

    const handleSortChange = (e) => {
        const newSortType = e.target.value;
        setSortType(newSortType);
        if (newSortType === 'distance') {
            setShowDistanceTags(true);
        } else {
            setShowDistanceTags(false);
            setSelectedDistance(null);
        }
    };

    const handleDistanceClick = (value) => {
        setSelectedDistance(value);
    };

    const handleSearch = () => {
        onSearch(sortType, selectedDistance);
    };

    return (
        <div className="filters-bar">
            <div className="filter-group">
                <span className="filter-label">Sắp xếp:</span>
                <select 
                    className="filter-select" 
                    id="sortSelect"
                    onChange={handleSortChange}
                    value={sortType}
                >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="distance">Cự ly</option>
                </select>
                <button 
                    className="search-button" 
                    onClick={handleSearch}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>

            {showDistanceTags && (
                <div className="distance-tags">
                    {distances.map((distance) => (
                        <span
                            key={distance.value}
                            className={`distance-tag ${selectedDistance === distance.value ? 'selected' : ''}`}
                            onClick={() => handleDistanceClick(distance.value)}
                        >
                            {distance.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Filters;