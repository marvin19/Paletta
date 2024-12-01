import { useState, useCallback } from 'react';

type Mode = 'all' | 'adjacent' | 'third';

const useTabSelection = (
    initialTab: number = 1,
): [number, Mode, (index: number) => void] => {
    const [selectedTab, setSelectedTab] = useState(initialTab);
    const modes: Mode[] = ['all', 'adjacent', 'third'];

    const handleTabSelect = useCallback((index: number): void => {
        setSelectedTab(index);
    }, []);

    return [selectedTab, modes[selectedTab], handleTabSelect];
};

export default useTabSelection;
