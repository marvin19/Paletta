import { useEffect } from 'react';
import Tabs from '../Layout/TabPanel';
import Dropdown from '../Layout/Dropdown';
import useIsDropdown from '../../hooks/useIsDropdown';
import useContrastSelection from '../../hooks/useContrastSelection';
interface ContrastSelectTabProps {
    setSelectedContrast: (value: number) => void;
}

const ContrastSelectTab = ({
    setSelectedContrast,
}: ContrastSelectTabProps): JSX.Element => {
    const isDropdown = useIsDropdown(1350);
    const [selectedTab, selectedContrast, handleTabSelect] =
        useContrastSelection();

    useEffect(() => {
        setSelectedContrast(selectedContrast);
    }, [selectedContrast, setSelectedContrast]);

    const labels = ['Level AAA (7:1)', 'Level AA (4.5:1)', 'Level A (3:1)'];

    return isDropdown ? (
        <Dropdown
            labels={labels}
            label="Contrast level:"
            selectedTab={selectedTab}
            handleTabSelect={handleTabSelect}
        />
    ) : (
        <Tabs
            labels={labels}
            selectedTab={selectedTab}
            ariaLabel="Select contrast level"
            onTabSelect={handleTabSelect}
            className="contrast-tabs"
        />
    );
};

export default ContrastSelectTab;
