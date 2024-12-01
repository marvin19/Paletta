import { useEffect, useState } from 'react';
import logo from '../../assets/highcharts-logo.svg';
import onlyLogo from '../../assets/highcharts-only-logo.svg';
import ContrastSelectTab from '../Base/ContrastSelectTab';
import ContrastModeTab from '../Base/ContrastModeTab';
import GitHubLink from './GitHubLink';
import HowToUseModal from './HowToUseModal';
import Modal from './Modal';
import PalettaLogo from './PalettaLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuestionCircle,
    faBars,
    faX,
} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    setSelectedContrast: (value: number) => void;
    setSelectedMode: (value: 'all' | 'third' | 'adjacent') => void;
}

const Header = ({
    setSelectedContrast,
    setSelectedMode,
}: HeaderProps): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openModal = (): void => {
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    // Close the menu if the window is resized above 767px
    useEffect(() => {
        const handleResize = (): void => {
            setWindowWidth(window.innerWidth);
            if (windowWidth > 767) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    return (
        <header className="banner">
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
                    <button
                        onClick={openModal}
                        className="icon-wrapper"
                        aria-label="How to use"
                    >
                        <FontAwesomeIcon
                            icon={faQuestionCircle}
                            style={{ color: '#000000' }}
                        />
                    </button>
                    <GitHubLink />
                    <PalettaLogo />
                    <button
                        className="burger"
                        aria-label="Open menu"
                        style={{
                            display: windowWidth < 768 ? 'block' : 'none',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={isMenuOpen ? faX : faBars}
                            className="burger-icon"
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <HowToUseModal />
            </Modal>
        </header>
    );
};

export default Header;
