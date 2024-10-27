import { useCallback } from 'react';
import useTabInteraction from '../../hooks/useTabInteraction';

interface TabProps {
    labels: string[];
    selectedTab: number;
    onTabSelect: (index: number) => void;
}

// TODO: Move functionality to custom hook?
const Tab = ({ labels, selectedTab, onTabSelect }: TabProps): JSX.Element => {
    const {
        focusedTab,
        tabRefs,
        getButtonClass,
        handleKeyDown,
        setFocusedTab,
    } = useTabInteraction({
        labels,
        selectedTab,
        onTabSelect,
    });

    const handleTabClick = useCallback(
        (index: number) => {
            onTabSelect(index);
        },
        [onTabSelect],
    );

    return (
        <>
            {labels.map((label, index) => (
                <button
                    key={index}
                    role="tab"
                    aria-selected={selectedTab === index}
                    aria-controls={`tabpanel-${index}`}
                    id={`tab-${index}`}
                    className={getButtonClass(index) + ' btn-white-border'}
                    ref={(el) => {
                        tabRefs.current[index] = el;
                    }}
                    onClick={() => {
                        handleTabClick(index);
                    }}
                    onKeyDown={handleKeyDown}
                    tabIndex={focusedTab === index ? 0 : -1} // Only focused tab is focusable
                    onFocus={() => {
                        setFocusedTab(index);
                    }} // Update the focus when tab is focused manually
                >
                    {label}
                </button>
            ))}
        </>
    );
};

export default Tab;
