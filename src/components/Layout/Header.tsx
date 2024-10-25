import { useEffect, useState } from 'react';
import logo from '../../assets/highcharts-logo.svg';
import onlyLogo from '../../assets/highcharts-only-logo.svg';
import ContrastSelectTab from '../Base/ContrastSelectTab';
import ContrastModeTab from '../Base/ContrastModeTab';
import GitHubLink from './GitHubLink';
import PalettaLogo from './PalettaLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestionCircle,
    faBars,
    faX,
} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    setSelectedContrast: (value: number) => void;
    setSelectedMode: (value: 'all' | 'third' | 'neighbor') => void;
}

const Header = ({
    setSelectedContrast,
    setSelectedMode,
}: HeaderProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu if the window is resized above 767px
    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth > 767) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="banner">
            <div className="inside-banner">
                <div className="logo-img">
                    <img src={logo} className="logo" alt="Highcharts logo" />
                    <img
                        src={onlyLogo}
                        className="only-logo"
                        alt="Highcharts logo"
                    />
                </div>
                <ContrastSelectTab setSelectedContrast={setSelectedContrast} />
                <ContrastModeTab setSelectedMode={setSelectedMode} />
                <div className="link-and-logo">
                    <a
                        href="#"
                        className="icon-wrapper"
                        aria-label="How to use"
                    >
                        <FontAwesomeIcon
                            icon={faQuestionCircle}
                            style={{ color: '#000000' }}
                        />
                    </a>
                    <GitHubLink />
                    <PalettaLogo />
                    <button className="burger" aria-label="Open menu">
                        <FontAwesomeIcon
                            icon={isMenuOpen ? faX : faBars}
                            className="hamburger-icon"
                            onClick={toggleMenu}
                            style={{ color: '#000000' }}
                        />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <ContrastSelectTab
                        setSelectedContrast={setSelectedContrast}
                    />
                    <ContrastModeTab setSelectedMode={setSelectedMode} />
                </div>
            )}
        </div>
    );
};

export default Header;
