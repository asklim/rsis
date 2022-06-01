import * as React from 'react';
import PropTypes from 'prop-types';
//import { debug } from 'utils/debuggers.js';

// Google Material-UI/core
import { styled } from '@mui/material/styles'; //v.5


const PREFIX = 'ImagesPad';
const classes = {
    root:       `${PREFIX}-root`,
    title:      `${PREFIX}-title`,
    container:  `${PREFIX}-container`,
};

const SxSection = styled( 'section' )( ({ theme }) => {
    const { pxToRem } = theme.typography;
    return ({
        [`&.${classes.root}`]: {
            borderBottom: '1px solid #ddd',
            borderRadius: 0,
        },
        [`&${' '}.${classes.title}`]: {
            fontSize: pxToRem( 12 ),
            fontWeight: 600,
            height: pxToRem( 30 ),
            lineHeight: pxToRem( 25 ),
            marginTop: pxToRem( 10 ),
            minHeight: 'inherit',
            padding: '0',
            paddingTop: pxToRem( 4 ),
            textAlign: 'center',
            textTransform: 'uppercase',
            width: '100%',
        },
        [`&${' '}.${classes.container}`]: {
            color: 'transparent',
            height: pxToRem( 108 ),
            minHeight: 'inherit',
            padding: '0',
            margin: `${pxToRem( 8 )} 0`,
            width: '100%',
        },
    });
});


const Thumbnail = styled( 'span', {
    shouldForwardProp: (prop) => prop !== 'current',
})( ({ current, theme }) => {
    const { pxToRem } = theme.typography;
    const { white } = theme.palette.common;
    const borderHues = {
        'true': '#00bbff',
        'false': theme.palette.common.white,
        'hover': 'rgba(0, 187, 255, 0.53)'
    };
    return ({
        backgroundColor: white,
        borderRadius: '10px',
        border: `${pxToRem(3)} solid`,
        borderColor: borderHues[ current ?? 'false' ],
        color: '#777777',
        cursor: 'pointer',
        display: 'block',
        fontSize: '16px',
        float: 'left',
        maxHeight: pxToRem( 100 ),
        opacity: '1',
        overflow: 'hidden',
        textAlign: 'center',
        //width: '25%',
        width: `calc(25% - ${pxToRem(3*2)})`,
        [`&${' '}img`]: {
            borderRadius: 0,
            height: '100px',
            marginTop: '0 auto',
            width: '100%',
        },
        '&:hover, &:focus': {
            borderColor: borderHues[`hover`],
            boxShadow: 'none',
        }
    });
});

export default function ImagesPad ({
    image: currentBgImage,
    images,
    handleClick,
}) {
    return (<SxSection className={classes.root}>
        <div className={classes.title}>Images</div>
        <div className={classes.container}>
            {images.map( (image, index) => {
                return (
                    <Thumbnail
                        key = {index}
                        //className='img-holder'
                        current = {currentBgImage === image}
                        onClick={() => handleClick?.( image ) }
                    >
                        <a>
                            <img src={image} alt='...' />
                        </a>
                    </Thumbnail>
                );
            })}
        </div>
    </SxSection>);
}
ImagesPad.propTypes = {
    image: PropTypes.string,
    images: PropTypes.arrayOf( PropTypes.string ),
    handleClick: PropTypes.func,
};