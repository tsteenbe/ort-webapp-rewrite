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

import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import {
    Button,
    Col,
    Empty,
    Row,
    Space,
    Table
} from 'antd';
import {
    CloudDownloadOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    FileAddOutlined,
    FileExcelOutlined,
    LaptopOutlined
} from '@ant-design/icons';

import PackageDetails from './PackageDetails';
import PackageFindingsTable from './PackageFindingsTable';
import PackageLicenses from './PackageLicenses';
import PackagePaths from './PackagePaths';
import PathExcludesTable from './PathExcludesTable';
import ScopeExcludesTable from './ScopeExcludesTable';
import { getColumnSearchProps } from './Shared';



// Mock data (in a real-world app, data would come from an API)
// const fetchDat2 = () => {
//     return [
//         { key: '1', name: 'John Doe', age: 32, address: 'New York' },
//         { key: '2', name: 'Jane Smith', age: 32, address: 'London' },
//         { key: '3', name: 'Peter Johnson', age: 45, address: 'Sydney' },
//         { key: '4', name: 'John Brown', age: 32, address: 'Los Angeles' },
//         { key: '5', name: 'Chris Lee', age: 29, address: 'San Francisco' },
//         // Add more data as needed
//     ];
// };

const fetchData = () => {
    return Array.from({ length: 300 }, (_, index) => ({
        key: index + 1,
        name: `Item ${index + 1}`,
        age: 32 + (index % 30), // just a random age for the sake of example
        address: `City ${index + 1}`,
    }))
};

const ResultsTable = ({ webAppOrtResult }) => {
    // State to manage the table data
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const [filteredData, setFilteredData] = useState(data);
    const filteredInfoDefault = {
        name: [],
        age: [],
        address: []
    };
    const [filteredInfo, setFilteredInfo] = useState(filteredInfoDefault);
    const [sortedInfo, setSortedInfo] = useState({});

    // Fetch data and set initial data
    useEffect(() => {
        const data = fetchData();
        setData(data);
        setFilteredData(data);  // Initialize filtered data with the full data
    }, []);

    // Handle pagination change
    const handlePaginationChange = (page, pageSize) => {
        setPagination({ current: page, pageSize });
    };

    // Handle sorting
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('handleTableChange', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        console.log('clearFilters')
        setFilteredInfo(filteredInfoDefault);
    };

    const clearAll = () => {
        console.log('clearAll')
        setFilteredInfo(filteredInfoDefault);
        setSortedInfo({});
    };

    const columns = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ...getColumnSearchProps('name', filteredInfo.name, (value) => setFilteredInfo({ ...filteredInfo, name: value }))
        },
        {
            key: 'age',
            title: 'Age',
            dataIndex: 'age',
            sorter: true,
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            ...getColumnSearchProps('age', filteredInfo.age, (value) => setFilteredInfo({ ...filteredInfo, age: value }))
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ...getColumnSearchProps('address', filteredInfo.address, (value) => setFilteredInfo({ ...filteredInfo, address: value }))
        },
    ];

    return (
        <div>
            <Row justify="end">
                <Col>
                    <Space
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                    </Space>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredData}
                locale={{
                    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No packages"></Empty>,
                }}
                pagination={{
                    current: pagination.current,
                    defaultPageSize: 100,
                    hideOnSinglePage: true,
                    pageSizeOptions: ['50', '100', '250', '500', '1000', '5000'],
                    position: 'both',
                    onChange: handlePaginationChange,
                    showSizeChanger: true
                }}
                onChange={handleTableChange}
                rowKey="key"
            />
        </div>
    );
};

export default ResultsTable;
