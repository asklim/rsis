// import { debug } from 'utils/debuggers.js';
import * as React from 'react';
import PropTypes from 'prop-types';

import { useHookFetch } from './useHookFetch';


export default function Fetch ({
    uri,
    renderSuccess,
    renderLoading = <p>loading...</p>,
    renderError = ({ error }) => (
        <pre>{JSON.stringify(error, null, 2)}</pre>
    ),
    dataHook = useHookFetch,
}) {
    // debug('renderLoading', renderLoading.toString(), renderLoading );
    // // [object Object] "$$typeof": Symbol("react.element")
    // debug('renderError', renderError.toString(), renderError );
    // //function (error) {
    // //  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("pre", null,
    // //  JSON.stringify(error, null, 2));

    const [ isLoaded, data, error ] = dataHook( uri );
    if( error ) return renderError({ error });
    if( !isLoaded ) return renderLoading;
    if( data ) return renderSuccess({ data });
}

Fetch.propTypes = {
    uri: PropTypes.string,
    renderSuccess: PropTypes.func,
    renderLoading: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
    renderError: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
    dataHook: PropTypes.func,
};
