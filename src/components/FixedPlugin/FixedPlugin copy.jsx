import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
//import { debug } from 'utils/debuggers.js';

/*/ Google Material-UI/core
import {
  Icon,
} from '@mui/material';*/
// Google Material-UI/icons
import SettingsIcon from '@mui/icons-material/Settings';

import imagine1 from 'assets/img/sidebar-1.jpg';
import imagine2 from 'assets/img/sidebar-2.jpg';
import imagine3 from 'assets/img/sidebar-3.jpg';
import imagine4 from 'assets/img/sidebar-4.jpg';

import Button from '../CustomButtons/Button.jsx';

const imagines = [
    imagine1,
    imagine2,
    imagine3,
    imagine4
];
const hues = [ 'purple', 'blue', 'green', 'orange', 'red' ];

export default function FixedPlugin({
    hue,
    fixedClasses,
    handleColorClick,
    handleImageClick,
    rtlActive,
    ...rest
}) {
    const [bgImage, setBgImage] = React.useState( rest.bgImage );

    const handleClick = () => rest?.handleFixedClick();

    const pluginClasses = classnames('fixed-plugin', {
        'rtl-fixed-plugin': rtlActive
    });
    //debug('pluginClasses', pluginClasses ); //fixed-plugin rtl-fixed-plugin

    return (<div className={pluginClasses} >
        <div id='fixedPluginClasses' className={fixedClasses}>
            <div onClick={handleClick}>
                <SettingsIcon fontSize='large'></SettingsIcon>
                <i className='fa fa-cog'>AK</i>
            </div>
            <ul className='dropdown-menu'>
                <li className='header-title'>SIDEBAR FILTERS</li>
                <li className='adjustments-line'>
                    <a className='switch-trigger'>
                        <div>
                            {hues.map( (color, key) => {
                                return (
                                    <span
                                        className = { hue === color ?
                                            `badge filter badge-${color} active`
                                            : `badge filter badge-${color}`
                                        }
                                        key = {key}
                                        data-color = {color}
                                        onClick = {() => handleColorClick( color )}
                                    />
                                );}
                            )}
                        </div>
                    </a>
                </li>

                <li className='header-title'>Images</li>
                {imagines.map( (imagine, key) => {
                    return (
                        <li className={bgImage === imagine ? 'active' : ''}
                            key = {key}
                        >
                            <a
                                className='img-holder switch-trigger'
                                onClick={() => {
                                    setBgImage( imagine );
                                    handleImageClick( imagine );
                                }}
                            >
                                <img src={imagine} alt='...' />
                            </a>
                        </li>);
                })}

                <li className='button-container'>
                    <div className='button-container'>
                        <Button
                            color='success'
                            href='https://www.creative-tim.com/product/material-dashboard-react?ref=mdr-fixed-plugin'
                            target='_blank'
                            fullWidth
                        >Download free!
                        </Button>
                    </div>
                </li>
                <li className='button-container'>
                    <div className='button-container'>
                        <Button
                            color='warning'
                            href='https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mdr-fixed-plugin'
                            target='_blank'
                            fullWidth
                        >Get PRO version
                        </Button>
                    </div>
                </li>
                <li className='button-container'>
                    <Button
                        color='info'
                        fullWidth
                        href='https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial?ref=mdr-fixed-plugin'
                        target='_blank'
                    >Documentation
                    </Button>
                </li>
                <li className='adjustments-line' />
            </ul>
        </div>
    </div>
    );
}
FixedPlugin.propTypes = {
    bgImage: PropTypes.string,
    fixedClasses: PropTypes.string,
    handleColorClick: PropTypes.func,
    handleFixedClick: PropTypes.func,
    handleImageClick: PropTypes.func,
    hue: PropTypes.oneOf( hues ),
    rtlActive: PropTypes.bool,
};
