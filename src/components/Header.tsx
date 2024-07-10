import logo from '../assets/highcharts-logo.svg';
import ContrastSelectTab from './ContrastSelectTab';
import ContrastModeTab from './ContrastModeTab';
import GitHubLink from './GitHubLink';
import PalettaLogo from './PalettaLogo';

const Header = (): JSX.Element => {
    return (
        <div className="banner">
            <div className="inside-banner">
                <div className="logo-img">
                    <img src={logo} className="logo" alt="Highcharts logo" />
                </div>
                <ContrastSelectTab />
                <ContrastModeTab />
                <div className="link-and-logo">
                    <GitHubLink />
                    <PalettaLogo />
                </div>
            </div>
        </div>
    );
};

export default Header;
