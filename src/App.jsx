/*
 * Copyright (C) 2017 The ORT Project Authors (see <https://github.com/oss-review-toolkit/ort/blob/main/NOTICE>)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 * License-Filename: LICENSE
 */

import {
    useEffect,
    useRef,
    useState
} from 'react';
import WebAppOrtResult from './models/WebAppOrtResult';
import AppPage from './pages/AppPage';
import LoadingPage from './pages/LoadingPage';
import ErrorPage from './pages/ErrorPage';
import './App.css';

let webAppOrtResult;

function pause(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

async function loadOrtResultData(setLoadingStatus) {
    console.log("loadOrtResultData");
    // Parse JSON report data embedded in HTML page
    const ortResultDataNode = document.querySelector('script[id="ort-report-data"]');
    let ortResultData;

    if (ortResultDataNode) {
        const { textContent: ortResultDataNodeContents, type: ortResultDataNodeType } = ortResultDataNode;

        // Check report is WebApp template e.g. contains 'ORT_REPORT_DATA_PLACEHOLDER'
        if (!!ortResultDataNodeContents && ortResultDataNodeContents.length !== 27) {
            setLoadingStatus({ percentage: 10, text: 'Loading result data...' });

            if (ortResultDataNodeType === 'application/gzip') {
                // Decode Base64 (convert ASCII to binary).
                const decodedBase64Data = atob(ortResultDataNodeContents);

                await pause(2);

                // Convert binary string to character-number array.
                const charData = decodedBase64Data.split('').map((x) => x.charCodeAt(0));

                // Turn number array into byte-array.
                const binData = new Uint8Array(charData);

                setLoadingStatus({ percentage: 20, text: 'Uncompressing result data...' });
                await pause(2);

                // Decompress byte-array.
                const data = pako.inflate(binData);

                await pause(2);
                setLoadingStatus({ percentage: 40, text: 'Uncompressed result data...' });

                ortResultData = JSON.parse(new TextDecoder('utf-8').decode(data));
            } else {
                await pause(2);

                ortResultData = JSON.parse(ortResultDataNodeContents);
            }

            setLoadingStatus({ percentage: 55, text: 'Processing result data...' });
            await pause(2);

            webAppOrtResult = new WebAppOrtResult(ortResultData);
            await pause(2);
            setLoadingStatus({ percentage: 95, text: 'Processed report data...' });

            console.log("webAppOrtResult", webAppOrtResult);

            // Make webAppOrtResult inspectable via Browser's console
            window.ORT = webAppOrtResult;

            setLoadingStatus({ percentage: 99, text: 'Almost ready to display scan report...' });
            await pause(2);
             setLoadingStatus({ percentage: 100 });
        } else {
            setLoadingStatus({ error: true, text: 'No review results could be loaded...' });
        }
    } else {
        setLoadingStatus({ error: true, text: 'Oops, something went wrong...' });
    }
}

function App () {
    const isOrtResultLoaded = useRef(false);
    const [currentPage, setCurrentPage] = useState('loading');
    const [loadingStatus, setLoadingStatus] = useState({ error: false, percentage: 0, text: '' });
    
    useEffect(() => {
        if (!isOrtResultLoaded.current) {
            isOrtResultLoaded.current = true
            loadOrtResultData(setLoadingStatus);
        }
    }, []);

    useEffect(() => {
        if (loadingStatus.error) {
            setCurrentPage('oops');
        }
        
        if (loadingStatus.percentage === 100) {
            setCurrentPage('oops');
        }
    }, [loadingStatus]);

    const renderPage = () => {
        switch (currentPage) {
        case 'loading':
            return (
                <LoadingPage status={loadingStatus}/>
            );
        case 'app':
            return <AppPage />;
        default:
            return <ErrorPage/>
        }
    };

    return (renderPage())
}

export default App;