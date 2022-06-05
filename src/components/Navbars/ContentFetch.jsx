
import * as React from 'react';
import PropTypes from 'prop-types';

import Fetch from 'utils/Fetch/Fetch.jsx';

import { default as dataHook } from './useFakeNavbarContent.js';
// const dataHook = useFakeNavbarContent;

export default function ContentFetch ({
    uri,
    render,
}) {
    return <Fetch
        uri = {uri}
        renderLoading = {null}
        renderSuccess = {render}
        dataHook = {dataHook}
    />;
}
ContentFetch.propTypes = {
    uri: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
};
