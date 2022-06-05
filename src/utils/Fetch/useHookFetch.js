import * as React from 'react';

export function useHookFetch(
    uri,
) {

    const [data, setData] = React.useState();
    const [error, setError] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState( false );

    React.useEffect( ()=> {
        if( !uri ) return;

        fetch( uri ).
            then( (response) => response.json()).
            then( setData ).
            then( () => setIsLoaded( true )).
            catch( setError );
    }, [uri]);

    return [ isLoaded, data, error ];
}
