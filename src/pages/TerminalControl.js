import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, message, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊医生工作站-01',
    ip: '192.168.1.101',
    mac: '00:1A:2B:3C:4D:5E',
    department: '门诊部',
    location: '门诊楼3层内科诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:30:00',
  },
  {
    id: 2,
    name: '住院护士工作站-01',
    ip: '192.168.1.102',
    mac: '00:1A:2B:3C:4D:5F',
    department: '住院部',
    location: '住院楼5层护士站',
    status: '在线',
    lastOnline: '2025-03-20 08:15:00',
  },
  {
    id: 3,
    name: '医技科室工作站-01',
    ip: '192.168.1.103',
    mac: '00:1A:2B:3C:4D:60',
    department: '医技科室',
    location: '医技楼2层检验科',
    status: '离线',
    lastOnline: '2025-03-19 18:00:00',
  },
  {
    id: 4,
    name: '药房工作站-01',
    ip: '192.168.1.104',
    mac: '00:1A:2B:3C:4D:61',
    department: '药房',
    location: '门诊楼1层药房',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 5,
    name: '收费处工作站-01',
    ip: '192.168.1.105',
    mac: '00:1A:2B:3C:4D:62',
    department: '收费处',
    location: '门诊楼1层收费处',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 6,
    name: '手术室工作站-01',
    ip: '192.168.1.106',
    mac: '00:1A:2B:3C:4D:63',
    department: '手术室',
    location: '住院楼6层手术室',
    status: '在线',
    lastOnline: '2025-03-20 07:30:00',
  },
  {
    id: 7,
    name: '急诊科工作站-01',
    ip: '192.168.1.107',
    mac: '00:1A:2B:3C:4D:64',
    department: '急诊科',
    location: '急诊楼1层诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 8,
    name: '放射科工作站-01',
    ip: '192.168.1.108',
    mac: '00:1A:2B:3C:4D:65',
    department: '放射科',
    location: '医技楼1层放射科',
    status: '在线',
    lastOnline: '2025-03-20 07:45:00',
  },
  {
    id: 9,
    name: '超声科工作站-01',
    ip: '192.168.1.109',
    mac: '00:1A:2B:3C:4D:66',
    department: '超声科',
    location: '医技楼2层超声科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 10,
    name: '病理科工作站-01',
    ip: '192.168.1.110',
    mac: '00:1A:2B:3C:4D:67',
    department: '病理科',
    location: '医技楼3层病理科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 11,
    name: '检验科工作站-01',
    ip: '192.168.1.111',
    mac: '00:1A:2B:3C:4D:68',
    department: '检验科',
    location: '医技楼2层检验科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 12,
    name: '内镜中心工作站-01',
    ip: '192.168.1.112',
    mac: '00:1A:2B:3C:4D:69',
    department: '内镜中心',
    location: '医技楼3层内镜中心',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 13,
    name: '门诊医生工作站-02',
    ip: '192.168.1.113',
    mac: '00:1A:2B:3C:4D:6A',
    department: '门诊部',
    location: '门诊楼3层外科诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:30:00',
  },
  {
    id: 14,
    name: '住院护士工作站-02',
    ip: '192.168.1.114',
    mac: '00:1A:2B:3C:4D:6B',
    department: '住院部',
    location: '住院楼6层护士站',
    status: '在线',
    lastOnline: '2025-03-20 08:15:00',
  },
  {
    id: 15,
    name: '医技科室工作站-02',
    ip: '192.168.1.115',
    mac: '00:1A:2B:3C:4D:6C',
    department: '医技科室',
    location: '医技楼2层检验科',
    status: '离线',
    lastOnline: '2025-03-19 18:00:00',
  },
  {
    id: 16,
    name: '药房工作站-02',
    ip: '192.168.1.116',
    mac: '00:1A:2B:3C:4D:6D',
    department: '药房',
    location: '住院楼1层药房',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 17,
    name: '收费处工作站-02',
    ip: '192.168.1.117',
    mac: '00:1A:2B:3C:4D:6E',
    department: '收费处',
    location: '住院楼1层收费处',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 18,
    name: '手术室工作站-02',
    ip: '192.168.1.118',
    mac: '00:1A:2B:3C:4D:6F',
    department: '手术室',
    location: '住院楼6层手术室',
    status: '在线',
    lastOnline: '2025-03-20 07:30:00',
  },
  {
    id: 19,
    name: '急诊科工作站-02',
    ip: '192.168.1.119',
    mac: '00:1A:2B:3C:4D:70',
    department: '急诊科',
    location: '急诊楼1层诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 20,
    name: '放射科工作站-02',
    ip: '192.168.1.120',
    mac: '00:1A:2B:3C:4D:71',
    department: '放射科',
    location: '医技楼1层放射科',
    status: '在线',
    lastOnline: '2025-03-20 07:45:00',
  },
  {
    id: 21,
    name: '超声科工作站-02',
    ip: '192.168.1.121',
    mac: '00:1A:2B:3C:4D:72',
    department: '超声科',
    location: '医技楼2层超声科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 22,
    name: '病理科工作站-02',
    ip: '192.168.1.122',
    mac: '00:1A:2B:3C:4D:73',
    department: '病理科',
    location: '医技楼3层病理科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 23,
    name: '检验科工作站-02',
    ip: '192.168.1.123',
    mac: '00:1A:2B:3C:4D:74',
    department: '检验科',
    location: '医技楼2层检验科',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 24,
    name: '内镜中心工作站-02',
    ip: '192.168.1.124',
    mac: '00:1A:2B:3C:4D:75',
    department: '内镜中心',
    location: '医技楼3层内镜中心',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 25,
    name: '门诊医生工作站-03',
    ip: '192.168.1.125',
    mac: '00:1A:2B:3C:4D:76',
    department: '门诊部',
    location: '门诊楼3层儿科诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:30:00',
  },
  {
    id: 26,
    name: '住院护士工作站-03',
    ip: '192.168.1.126',
    mac: '00:1A:2B:3C:4D:77',
    department: '住院部',
    location: '住院楼7层护士站',
    status: '在线',
    lastOnline: '2025-03-20 08:15:00',
  },
  {
    id: 27,
    name: '医技科室工作站-03',
    ip: '192.168.1.127',
    mac: '00:1A:2B:3C:4D:78',
    department: '医技科室',
    location: '医技楼2层检验科',
    status: '离线',
    lastOnline: '2025-03-19 18:00:00',
  },
  {
    id: 28,
    name: '药房工作站-03',
    ip: '192.168.1.128',
    mac: '00:1A:2B:3C:4D:79',
    department: '药房',
    location: '急诊楼1层药房',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 29,
    name: '收费处工作站-03',
    ip: '192.168.1.129',
    mac: '00:1A:2B:3C:4D:7A',
    department: '收费处',
    location: '急诊楼1层收费处',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 30,
    name: '手术室工作站-03',
    ip: '192.168.1.130',
    mac: '00:1A:2B:3C:4D:7B',
    department: '手术室',
    location: '住院楼7层手术室',
    status: '在线',
    lastOnline: '2025-03-20 07:30:00',
  },
  {
    id: 31,
    name: '急诊科工作站-03',
    ip: '192.168.1.131',
    mac: '00:1A:2B:3C:4D:7C',
    department: '急诊科',
    location: '急诊楼1层诊室',
    status: '在线',
    lastOnline: '2025-03-20 08:00:00',
  },
  {
    id: 32,
    name: '放射科工作站-03',
    ip: '192.168.1.132',
    mac: '00:1A:2B:3C:4D:7D',
    department: '放射科',
    location: '医技楼1层放射科',
    status: '在线',
    lastOnline: '2025-03-20 07:45:00',
  }
];

const TerminalControl = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '终端名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'MAC地址',
      dataIndex: 'mac',
      key: 'mac',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '在线' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '最后在线时间',
      dataIndex: 'lastOnline',
      key: 'lastOnline',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="重启终端">
            <Button type="link" icon={<ReloadOutlined />} onClick={() => handleRestart(record)}>
              重启
            </Button>
          </Tooltip>
          <Tooltip title="关机">
            <Button type="link" danger icon={<PoweroffOutlined />} onClick={() => handleShutdown(record)}>
              关机
            </Button>
          </Tooltip>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleRestart = (record) => {
    message.success(`正在重启终端: ${record.name}`);
  };

  const handleShutdown = (record) => {
    message.success(`正在关闭终端: ${record.name}`);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        setData(data.map(item => 
          item.id === editingId ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newTerminal = {
          ...values,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '离线',
          lastOnline: '-',
        };
        setData([...data, newTerminal]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="终端管控"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加终端
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? "编辑终端" : "添加终端"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="终端名称"
            rules={[{ required: true, message: '请输入终端名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ip"
            label="IP地址"
            rules={[
              { required: true, message: '请输入IP地址' },
              { pattern: /^(\d{1,3}\.){3}\d{1,3}$/, message: '请输入有效的IP地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mac"
            label="MAC地址"
            rules={[
              { required: true, message: '请输入MAC地址' },
              { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: '请输入有效的MAC地址' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="department"
            label="所属部门"
            rules={[{ required: true, message: '请选择所属部门' }]}
          >
            <Select>
              <Option value="门诊部">门诊部</Option>
              <Option value="住院部">住院部</Option>
              <Option value="医技科室">医技科室</Option>
              <Option value="行政部">行政部</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置信息' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TerminalControl; 