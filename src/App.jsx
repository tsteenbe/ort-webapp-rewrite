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

import { useEffect, useState } from 'react';

const ortResultWorkerCode = `
self.onmessage = function (e) {
    const result = processOrtResultData(e.data);
    self.postMessage(result);
};

function processOrtResultData(data) {
    let sum = 0;
    for (let i = 0; i < data; i++) {
        sum += i;
    }
    return sum;
}
`;
let ortResultWorker;

function App () {
    const [count, setCount] = useState(0);
    const [resultLoaded, setResultLoaded] = useState(false);

    useEffect(() => {
        // Create a Blob from the worker code string
        const blob = new Blob([ortResultWorkerCode], { type: 'application/javascript' });

        // Create a URL for the Blob
        const ortResultWorkerURL = URL.createObjectURL(blob);

        // Create a new Web Worker
        if (!ortResultWorker) {
            ortResultWorker = new Worker(ortResultWorkerURL);

            ortResultWorker.onmessage = (e) => {
                console.log('Result from worker:', e.data);
                setResultLoaded(true);
            };

            // Start the heavy computation
            const dataToProcess = 10000; // Adjust this value as needed
            ortResultWorker.postMessage(dataToProcess);

            // Optionally, handle errors
            ortResultWorker.onerror = (error) => {
                console.error('Worker error:', error);
            };

            // Clean up the URL after use
            ortResultWorker.onterminate = () => {
                URL.revokeObjectURL(workerURL);
            };
        }
    }, []);

    return (
        <button onClick={ () => setCount (count + 1)}>
            {count}
        </button>
    );
}

export default App;