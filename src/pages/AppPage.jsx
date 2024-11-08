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

import React, { useState } from 'react';
import {
    Col,
    Layout,
    Row,
    Tabs
} from 'antd';
import {
    ControlOutlined,
    PartitionOutlined,
    PieChartOutlined,
    TableOutlined
} from '@ant-design/icons';

import ResultsSummary from './../components/ResultsSummary';
import ResultsTable from './../components/ResultsTable';
import ResultsTree from './../components/ResultsTree';

const { Content } = Layout;

const AppPage = ({ webAppOrtResult }) => {
    const [activeTab, setActiveTab] = useState('ort-tabs-table');

    const handleAboutClick = (key) => {
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <Layout className="ort-app">
            <Content>
                <Row align="top" style={{ minHeight: '100vh' }}>
                    <Col span={24}>
                        <Tabs
                            activeKey={activeTab}
                            animated={false}
                            items={[
                                {
                                    label: (
                                        <span>
                                            <PieChartOutlined />
                                            Summary
                                        </span>
                                    ),
                                    key: 'ort-tabs-summary',
                                    children: (
                                        <ResultsSummary/>
                                    )
                                },
                                {
                                    label: (
                                        <span>
                                            <TableOutlined />
                                            Table
                                        </span>
                                    ),
                                    key: 'ort-tabs-table',
                                    children: (
                                        <ResultsTable />
                                    )
                                },
                                {
                                    label: (
                                        <span>
                                            <PartitionOutlined />
                                            Tree
                                        </span>
                                    ),
                                    key: 'ort-tabs-tree',
                                    children: (
                                        <ResultsTree />
                                    )
                                }
                            ]}
                            tabBarExtraContent={(
                                <ControlOutlined
                                    className="ort-control"
                                    onClick={handleAboutClick}
                                />
                            )}
                            onChange={handleTabChange}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AppPage;
