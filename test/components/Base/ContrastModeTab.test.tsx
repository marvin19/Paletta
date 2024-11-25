import { render, screen, fireEvent } from '@testing-library/react';
import ContrastModeTab from '../../../src/components/Base/ContrastModeTab';
import useIsDropdown from '../../../src/hooks/useIsDropdown';
import useTabSelection from '../../../src/hooks/useTabSelection';

jest.mock('../../../src/hooks/useIsDropdown');
jest.mock('../../../src/hooks/useTabSelection');

describe('ContrastModeTab', () => {
    const mockSetSelectedMode = jest.fn();
    const labels = ['Compare all', 'Only adjacents', 'Find third color'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders dropdown when isDropdown is true', () => {
        // Mock the hook to return true for dropdown view
        (useIsDropdown as jest.Mock).mockReturnValue(true);
        (useTabSelection as jest.Mock).mockReturnValue([
            1,
            'adjacent',
            jest.fn(),
        ]);

        render(<ContrastModeTab setSelectedMode={mockSetSelectedMode} />);

        // Ensure dropdown is rendered
        const dropdown = screen.getByRole('combobox');
        expect(dropdown).toBeInTheDocument();
    });

    it('renders tabs when isDropdown is false', () => {
        // Mock the hook to return false for tabs view
        (useIsDropdown as jest.Mock).mockReturnValue(false);
        (useTabSelection as jest.Mock).mockReturnValue([
            1,
            'adjacent',
            jest.fn(),
        ]);

        render(<ContrastModeTab setSelectedMode={mockSetSelectedMode} />);

        // Ensure tabs are rendered
        const tablist = screen.getByRole('tablist');
        expect(tablist).toBeInTheDocument();

        // Ensure the correct number of tabs
        const tabs = screen.getAllByRole('tab');
        expect(tabs).toHaveLength(labels.length);

        // Ensure tab labels are correct
        labels.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('calls setSelectedMode when selectedMode changes', () => {
        const handleTabSelect = jest.fn();
        (useIsDropdown as jest.Mock).mockReturnValue(false);
        (useTabSelection as jest.Mock).mockReturnValue([
            1,
            'adjacent',
            handleTabSelect,
        ]);

        render(<ContrastModeTab setSelectedMode={mockSetSelectedMode} />);

        // Check that setSelectedMode is called with the correct mode
        expect(mockSetSelectedMode).toHaveBeenCalledWith('adjacent');
    });

    it('updates selectedMode when a tab is clicked', () => {
        const handleTabSelect = jest.fn();
        (useIsDropdown as jest.Mock).mockReturnValue(false);
        (useTabSelection as jest.Mock).mockReturnValue([
            0,
            'all',
            handleTabSelect,
        ]);

        render(<ContrastModeTab setSelectedMode={mockSetSelectedMode} />);

        // Click on the second tab
        const secondTab = screen.getByText('Only adjacents');
        fireEvent.click(secondTab);

        // Ensure the tab select function is called
        expect(handleTabSelect).toHaveBeenCalledWith(1);
    });

    it('updates selectedMode when a dropdown option is selected', () => {
        const handleTabSelect = jest.fn();
        (useIsDropdown as jest.Mock).mockReturnValue(true);
        (useTabSelection as jest.Mock).mockReturnValue([
            0,
            'all',
            handleTabSelect,
        ]);

        render(<ContrastModeTab setSelectedMode={mockSetSelectedMode} />);

        // Select the third option in the dropdown
        const dropdown = screen.getByRole('combobox');
        fireEvent.change(dropdown, { target: { value: '2' } });

        // Ensure the tab select function is called with the correct index
        expect(handleTabSelect).toHaveBeenCalledWith(2);
    });
});
