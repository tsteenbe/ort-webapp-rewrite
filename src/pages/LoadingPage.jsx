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
    Col,
    Progress,
    Row
} from 'antd';


const LoadingPage = ({ status }) => {
    const { percentage, text } = status;

    return (
        <Row
            align="middle"
            justify="space-around"
            className="ort-app"
            key="ort-loading"
            type="flex"
        >
            <Col span={6}>
                <a
                    href="https://github.com/oss-review-toolkit/ort"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <div className="ort-loading-logo ort-logo" />
                </a>
                <span>
                    {text}
                </span>
                {percentage === 100
                    ? (
                        <Progress percent={100} />
                    )
                    : (
                        <Progress percent={percentage} status="active" />
                    )}
            </Col>
        </Row>
    );
};

export default LoadingPage;