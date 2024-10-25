import { useState, useRef, useCallback, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

interface UseTabInteractionProps {
    selectedTab: number;
    labels: string[];
    onTabSelect: (index: number) => void;
    focusedTab: number;
    tabRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>;
    getButtonClass: (index: number) => string;
    handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    setFocusedTab: React.Dispatch<React.SetStateAction<number>>;
}

const useTabInteraction = ({
    selectedTab,
    labels,
    onTabSelect,
}): UseTabInteractionProps => {
    const [focusedTab, setFocusedTab] = useState(selectedTab);
    // Store refs for each tab button to manage focus manually
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const getButtonClass = useCallback(
        (index: number) => (selectedTab === index ? 'active' : ''),
        [selectedTab],
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>) => {
            switch (event.key) {
                case 'ArrowRight':
                    event.preventDefault();
                    setFocusedTab((prev) => (prev + 1) % labels.length); // Move to the next tab
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    setFocusedTab(
                        (prev) => (prev - 1 + labels.length) % labels.length,
                    ); // Move to the previous tab
                    break;
                case 'Home':
                    event.preventDefault();
                    setFocusedTab(0); // Focus the first tab
                    break;
                case 'End':
                    event.preventDefault();
                    setFocusedTab(labels.length - 1); // Focus the last tab
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    onTabSelect(focusedTab); // Activate the currently focused tab
                    break;
                default:
                    break;
            }
        },
        [focusedTab, labels.length, onTabSelect],
    );

    useEffect(() => {
        if (
            tabRefs.current[focusedTab] !== null &&
            tabRefs.current[focusedTab] !== undefined
        ) {
            tabRefs.current[focusedTab]?.focus();
        }
    }, [focusedTab]);

    return {
        focusedTab,
        tabRefs,
        getButtonClass,
        handleKeyDown,
        setFocusedTab,
        selectedTab,
        labels,
        onTabSelect,
    };
};

export default useTabInteraction;
