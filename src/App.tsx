import React, { useState } from 'react';
import Header from './components/Layout/Header';
import SkiptoContent from './components/Layout/SkiptoContent';

const App: React.FC = (): React.ReactElement | null => {
    const [, setSelectedContrast] = useState<number>(3.0);
    const [, setSelectedMode] = useState<'all' | 'third' | 'adjacent'>(
        'adjacent',
    );

    return (
        <div className="app-container">
            <SkiptoContent />
            {/* Left sidebar (25% width) */}
            <div className="app-sidebar">
                <Header
                    setSelectedContrast={setSelectedContrast}
                    setSelectedMode={setSelectedMode}
                />
            </div>
            {/* Right content area (75% width) */}
            <main id="main-content" className="app-main">
                <h1>Test</h1>
                {/* <Palette
                    selectedContrast={selectedContrast}
                    selectedMode={selectedMode}
                /> */}
            </main>
        </div>
    );
};

export default App;
