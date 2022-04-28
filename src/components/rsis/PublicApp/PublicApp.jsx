import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import Loading from 'components/misc/Loading.jsx';

const Home = React.lazy(() => import( './pages/Home.jsx' ));
const LoginSignupPage = React.lazy(
    () => import( 'views/LoginSignup/LoginSignup.jsx' )
);

const App = React.lazy(() => import( '../App/App.jsx' ));

const WaitedApp = () =>
    <Suspense fallback={<Variants />}>
        <App />
    </Suspense>
;


const PublicApp = () =>
    <Suspense
        fallback={<Loading />}
    >
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginsignup" element={<LoginSignupPage />} />

            <Route path="*" element={<WaitedApp />} />
        </Routes>
    </Suspense>
;

export default PublicApp;


function Variants() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton variant="rectangular" width={210} height={118}/>
            <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
    );
}
