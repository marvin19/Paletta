import React from 'react';

interface DropdownProps {
    labels: string[];
    label: string;
    selectedTab: number;
    handleTabSelect: (index: number) => void;
}

const Dropdown = ({
    labels,
    label,
    selectedTab,
    handleTabSelect,
}: DropdownProps): JSX.Element => {
    const handleDropdownChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        handleTabSelect(Number(e.target.value));
    };

    return (
        <div>
            <label htmlFor="contrast-mode-dropdown">{label}</label>
            <select
                id="contrast-mode-dropdown"
                value={selectedTab}
                onChange={handleDropdownChange}
                aria-label="Select contrast mode"
                className="contrast-mode-dropdown"
            >
                {labels.map((label, index) => (
                    <option value={index} key={index}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
