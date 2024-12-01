import Tab from './Tab';

interface TabsProps {
    labels: string[];
    selectedTab: number;
    onTabSelect: (index: number) => void;
    ariaLabel: string;
    className?: string;
}

const Tabs = ({
    labels,
    selectedTab,
    onTabSelect,
    ariaLabel,
    className,
}: TabsProps): JSX.Element => {
    return (
        <div
            className={`tabs ${className}`}
            role="tablist"
            aria-label={ariaLabel}
        >
            <Tab
                labels={labels}
                selectedTab={selectedTab}
                onTabSelect={onTabSelect}
            />
        </div>
    );
};

export default Tabs;
