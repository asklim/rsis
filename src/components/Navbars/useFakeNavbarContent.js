import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory( 'debug:useFakeNavbarContent' );

import * as React from 'react';
// import PropTypes from 'prop-types';
import { Divider } from '@mui/material';


export default function useFakeNavbarContent( uri ) {
    const [data, setData] = React.useState('init');
    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState( false );

    async function fetchData (uri) {
        try {
            let list;
            list = await fakeFetch( uri, 0 );
            //debug( 'list', list );
            setData( list );
            setIsLoaded( true );
        }
        catch (err) {
            debug( 'error', err );
            setError( err );
        }
    }

    React.useEffect( () => {
        if( !uri ) return;
        fetchData( uri );
    }, [uri]);

    return [ isLoaded, data, error ];
}


async function fakeFetch (uri, delay=0) {
    return new Promise( (resolve, reject) => {
        const response = {
            notifications: getNotificationsList,
            profile: getProfilePopupList,
        };
        setTimeout( () => {
            response[ uri ] ?
                resolve( response[ uri ]() )
                : reject( 'Fake-Server error' );
        }, delay * 1000 );
    } );
}

function getNotificationsList () {
    return [
        {
            title: 'Mike John responded to your email',
            action: (logger=debug) => logger('notification 1 action'),
        },{
            title: 'You have 5 new tasks',
            action: (logger=debug) => logger('notification 2 action'),
        },{
            title: `You're now friend with Andrew`,
            action: (logger=debug) => logger('notification 3 action'),
        },{
            title: 'Another Notification',
            action: (logger=debug) => logger('notification 4 action'),
        },{
            title: 'Another One',
            action: (logger=debug) => logger('notification 5 action'),
        },{
            title: 'Another Second',
            action: (logger=debug) => logger('notification 6 action'),
        },{
            title: 'You have a new emails',
            action: (logger=debug) => logger('notification 7 action'),
        },
    ];
}


function getProfilePopupList () {
    return [
        {
            title: 'Profile',
            action: (logger=debug) => logger('profilePopup 1 action'),
        },{
            title: 'Settings',
            action: (logger=debug) => logger('profilePopup 2 action'),
        },
        <Divider light key={'d1'}/>,
        {
            title: 'Logout',
            action: (logger=debug) => logger('profilePopup 3 action'),
        },
        <Divider key={'d2'} />,
        {
            title: 'Another One',
            action: (logger=debug) => logger('profilePopup 4 action'),
        },
    ];
}

