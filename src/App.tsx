import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Palette from './components/Containers/Palette';
import SkiptoContent from './components/Layout/SkiptoContent';

const App: React.FC = (): React.ReactElement | null => {
    const [selectedContrast, setSelectedContrast] = useState<number>(3.0);
    const [selectedMode, setSelectedMode] = useState<
        'all' | 'third' | 'neighbor'
    >('neighbor');

    return (
        <>
            <SkiptoContent />
            <Header
                setSelectedContrast={setSelectedContrast}
                setSelectedMode={setSelectedMode}
            />
            <Palette
                selectedContrast={selectedContrast}
                selectedMode={selectedMode}
            />
        </>
    );
};

export default App;
