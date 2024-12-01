import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '../src/components/Layout/TabPanel';
import { useState } from 'react';

describe('Tabs component', () => {
    const labels = ['Tab 1', 'Tab 2', 'Tab 3'];
    const mockOnTabSelect = jest.fn();

    const setupTabs = (selectedTab: number = 0) => {
        render(
            <Tabs
                labels={labels}
                selectedTab={selectedTab}
                onTabSelect={mockOnTabSelect}
                ariaLabel="Test tabs"
            />,
        );
    };

    const TabsWithState = () => {
        const [selectedTab, setSelectedTab] = useState(0);
        return (
            <Tabs
                labels={labels}
                selectedTab={selectedTab}
                onTabSelect={setSelectedTab}
                ariaLabel="Test tabs"
            />
        );
    };

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks between tests
    });

    it('renders the tabs', () => {
        setupTabs();
        const tabButtons = screen.getAllByRole('tab');
        expect(tabButtons).toHaveLength(labels.length);
    });

    it('renders the correct labels for tabs', () => {
        setupTabs();
        labels.forEach((label, index) => {
            expect(screen.getByText(label)).toBeInTheDocument();
            expect(screen.getByText(label)).toHaveAttribute(
                'aria-controls',
                `tabpanel-${index}`,
            );
        });
    });

    it('selects the correct tab based on the selectedTab prop', () => {
        setupTabs(1); // Selecting the second tab
        const selectedTab = screen.getByText(labels[1]);
        expect(selectedTab).toHaveAttribute('aria-selected', 'true');
        expect(selectedTab).toHaveClass('active');
    });

    it('calls onTabSelect callback with the correct index when a tab is clicked', () => {
        setupTabs();
        const tabToClick = screen.getByText(labels[2]);
        fireEvent.click(tabToClick);
        expect(mockOnTabSelect).toHaveBeenCalledWith(2);
    });

    it('renders the correct aria-label for the tablist', () => {
        setupTabs();
        const tablist = screen.getByRole('tablist');
        expect(tablist).toHaveAttribute('aria-label', 'Test tabs');
    });

    it('changes aria-selected attribute when a different tab is selected', () => {
        // Rendering tab click simulated with state change.
        render(<TabsWithState />);

        const tabToClick = screen.getByText(labels[1]);
        fireEvent.click(tabToClick);
        expect(tabToClick).toHaveAttribute('aria-selected', 'true');
    });
});
