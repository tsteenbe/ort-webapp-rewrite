/*
 * Copyright (C) 2024 The ORT Project Authors (see <https://github.com/oss-review-toolkit/ort/blob/main/NOTICE>)
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
    Alert,
    Col,
    Row
} from 'antd';


const ErrorPage = ({ message }) => {
    return (
        <Row
            align="middle"
            className="ort-app"
            justify="space-around"
            key="ort-oops-error-msg"
            type="flex"
        >
            <Col span={8}>
                <Alert
                    message="Oops, something went wrong..."
                    type="error"
                    description={(
                        <div>
                            <p>
                                Try reloading this report. If that does not solve the issue please
                                contact your OSS Review Toolkit admin(s) for support.
                            </p>
                            <p>
                                If you believe you found a bug please fill a
                                {' '}
                                <a
                                    href="https://github.com/oss-review-toolkit/ort/issues"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    issue on GitHub
                                </a>
                                .
                            </p>
                        </div>
                    )}
                />
            </Col>
        </Row>
  );
};

export default ErrorPage;