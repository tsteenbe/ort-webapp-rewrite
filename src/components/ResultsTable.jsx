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

import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Table } from 'antd';
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
const fetchData = () => {
    return [
        { key: '1', name: 'John Doe', age: 32, address: 'New York' },
        { key: '2', name: 'Jane Smith', age: 32, address: 'London' },
        { key: '3', name: 'Peter Johnson', age: 45, address: 'Sydney' },
        { key: '4', name: 'John Brown', age: 32, address: 'Los Angeles' },
        { key: '5', name: 'Chris Lee', age: 29, address: 'San Francisco' },
        // Add more data as needed
    ];
};

const ResultsTable = ({ webAppOrtResult }) => {
    // State to manage the table data
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
    const [filteredData, setFilteredData] = useState(data);
    const [sortedInfo, setSortedInfo] = useState({});
    const filteredValueDefault = {
        name: [],
        age: [],
        address: [],
    };
    const [filteredValue, setFilteredValue] = useState(filteredValueDefault );

    // Fetch data and set initial data
    useEffect(() => {
        const data = fetchData();
        setData(data);
        setFilteredData(data);  // Initialize filtered data with the full data
    }, []);

    // Handle pagination change
    const handlePageChange = (page, pageSize) => {
        setPagination({ current: page, pageSize });
    };

    // Handle sorting
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('handleTableChange')
    };

    const clearFilters = () => {
        console.log('clearFilters')
        setFilteredValue(filteredValueDefault);
    };
    const clearAll = () => {
        console.log('clearAll')
        setFilteredValue(filteredValueDefault);
        setSortedInfo({});
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name', filteredValue.name, (value) => setFilteredValue({ ...filteredValue, name: value }))
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: true,
            ...getColumnSearchProps('age', filteredValue.age, (value) => setFilteredValue({ ...filteredValue, age: value }))
        },
        {
            title: 'Address',
            dataIndex: 'address',
            ...getColumnSearchProps('address', filteredValue.address, (value) => setFilteredValue({ ...filteredValue, address: value }))
        },
    ];

    return (
        <div>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    pageSizeOptions: ['50', '100', '250', '500', '1000', '5000'],
                    position: 'both',
                    showSizeChanger: true,
                    total: filteredData.length
                }}
                onChange={handleTableChange}
                rowKey="key"
            />
        </div>
    );
};

export default ResultsTable;
