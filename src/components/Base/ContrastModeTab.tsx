import Tabs from '../Layout/TabPanel';
import Dropdown from '../Layout/Dropdown';
import useIsDropdown from '../../hooks/useIsDropdown';
import useTabSelection from '../../hooks/useTabSelection';
import { useEffect } from 'react';

interface ContrastModeTabProps {
    setSelectedMode: (value: 'all' | 'adjacent' | 'third') => void; // Updated to the union type
}

const ContrastModeTab = ({
    setSelectedMode,
}: ContrastModeTabProps): JSX.Element => {
    const isDropdown = useIsDropdown(1350);
    const [selectedTab, selectedMode, handleTabSelect] = useTabSelection();

    // Set the selected mode when tab changes
    useEffect(() => {
        setSelectedMode(selectedMode);
    }, [selectedMode, setSelectedMode]);

    const labels = ['Compare all', 'Adjacent colors', 'Find third color'];

    return isDropdown ? (
        <Dropdown
            labels={labels}
            selectedTab={selectedTab}
            handleTabSelect={handleTabSelect}
        />
    ) : (
        <Tabs
            labels={labels}
            selectedTab={selectedTab}
            ariaLabel="Select contrast mode"
            onTabSelect={handleTabSelect}
            className="contrast-mode-tabs"
        />
    );
};

export default ContrastModeTab;
