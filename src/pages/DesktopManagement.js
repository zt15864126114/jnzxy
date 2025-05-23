import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, message, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, StopOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊医生桌面-01',
    user: '张医生',
    department: '门诊部',
    template: '门诊医生工作站模板',
    status: '运行中',
    ip: '192.168.1.101',
    createTime: '2024-08-23 10:00:00',
  },
  {
    id: 2,
    name: '住院护士桌面-01',
    user: '李护士',
    department: '住院部',
    template: '住院护士工作站模板',
    status: '运行中',
    ip: '192.168.1.102',
    createTime: '2024-08-23 10:30:00',
  },
  {
    id: 3,
    name: '放射科桌面-01',
    user: '王医生',
    department: '医技科室',
    template: '放射科工作站模板',
    status: '运行中',
    ip: '192.168.1.103',
    createTime: '2024-08-23 11:00:00',
  },
  {
    id: 4,
    name: '药房桌面-01',
    user: '赵药师',
    department: '药剂科',
    template: '药房工作站模板',
    status: '运行中',
    ip: '192.168.1.104',
    createTime: '2024-08-23 11:30:00',
  },
  {
    id: 5,
    name: '收费处桌面-01',
    user: '钱出纳',
    department: '财务科',
    template: '收费处工作站模板',
    status: '运行中',
    ip: '192.168.1.105',
    createTime: '2024-08-23 12:00:00',
  },
  {
    id: 6,
    name: '手术室桌面-01',
    user: '孙医生',
    department: '手术科',
    template: '手术室工作站模板',
    status: '已停止',
    ip: '192.168.1.106',
    createTime: '2024-08-23 12:30:00',
  },
  {
    id: 7,
    name: '急诊科桌面-01',
    user: '周医生',
    department: '急诊科',
    template: '急诊科工作站模板',
    status: '运行中',
    ip: '192.168.1.107',
    createTime: '2024-08-23 13:00:00',
  },
  {
    id: 8,
    name: '超声科桌面-01',
    user: '吴医生',
    department: '医技科室',
    template: '超声科工作站模板',
    status: '运行中',
    ip: '192.168.1.108',
    createTime: '2024-08-23 13:30:00',
  },
  {
    id: 9,
    name: '病理科桌面-01',
    user: '郑医生',
    department: '医技科室',
    template: '病理科工作站模板',
    status: '运行中',
    ip: '192.168.1.109',
    createTime: '2024-08-23 14:00:00',
  },
  {
    id: 10,
    name: '检验科桌面-01',
    user: '王技师',
    department: '医技科室',
    template: '检验科工作站模板',
    status: '运行中',
    ip: '192.168.1.110',
    createTime: '2024-08-23 14:30:00',
  },
  {
    id: 11,
    name: '内镜中心桌面-01',
    user: '刘医生',
    department: '医技科室',
    template: '内镜中心工作站模板',
    status: '已停止',
    ip: '192.168.1.111',
    createTime: '2024-08-23 15:00:00',
  },
  {
    id: 12,
    name: '行政办公桌面-01',
    user: '陈主任',
    department: '行政部',
    template: '行政办公工作站模板',
    status: '运行中',
    ip: '192.168.1.112',
    createTime: '2024-08-23 15:30:00',
  },
  {
    id: 13,
    name: '行政办公工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '行政办公工作站标准配置，包含OA、财务等办公软件',
    createTime: '2024-08-23 16:00:00',
  },
  {
    id: 14,
    name: '人事管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '人事管理工作站标准配置，包含人事管理系统',
    createTime: '2024-08-23 16:30:00',
  },
  {
    id: 15,
    name: '财务工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '财务工作站标准配置，包含财务管理系统',
    createTime: '2024-08-23 17:00:00',
  },
  {
    id: 16,
    name: '设备管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '设备管理工作站标准配置，包含设备管理系统',
    createTime: '2024-08-23 17:30:00',
  },
  {
    id: 17,
    name: '科研工作站',
    type: 'Windows 10',
    cpu: '8核',
    memory: '32GB',
    disk: '1TB SSD',
    description: '科研工作站高性能配置，适用于数据分析、科研软件等',
    createTime: '2024-08-23 18:00:00',
  },
  {
    id: 18,
    name: '教学工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '教学工作站标准配置，包含教学软件、多媒体工具等',
    createTime: '2024-08-23 18:30:00',
  },
  {
    id: 19,
    name: '后勤工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '后勤工作站标准配置，包含后勤管理系统',
    createTime: '2024-08-23 19:00:00',
  },
  {
    id: 20,
    name: '医保工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '医保工作站标准配置，包含医保结算系统',
    createTime: '2024-08-23 19:30:00',
  },
  {
    id: 21,
    name: '病案管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '病案管理工作站标准配置，包含病案管理系统',
    createTime: '2024-08-23 20:00:00',
  },
  {
    id: 22,
    name: '护理管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '护理管理工作站标准配置，包含护理管理系统',
    createTime: '2024-08-23 20:30:00',
  },
  {
    id: 23,
    name: '医患沟通工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '医患沟通工作站标准配置，包含医患沟通系统',
    createTime: '2024-08-23 21:00:00',
  },
  {
    id: 24,
    name: '预约挂号工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '预约挂号工作站标准配置，包含预约挂号系统',
    createTime: '2024-08-23 21:30:00',
  },
  {
    id: 25,
    name: '药品管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '药品管理工作站标准配置，包含药品管理系统',
    createTime: '2024-08-23 22:00:00',
  },
  {
    id: 26,
    name: '耗材管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '耗材管理工作站标准配置，包含耗材管理系统',
    createTime: '2024-08-23 22:30:00',
  },
  {
    id: 27,
    name: '绩效管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '绩效管理工作站标准配置，包含绩效管理系统',
    createTime: '2024-08-23 23:00:00',
  },
  {
    id: 28,
    name: '科研项目管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '科研项目管理工作站标准配置，包含科研项目管理系统',
    createTime: '2024-08-23 23:30:00',
  },
  {
    id: 29,
    name: '教学资源管理工作站',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '教学资源管理工作站标准配置，包含教学资源管理系统',
    createTime: '2025-03-16 00:00:00',
  },
  {
    id: 30,
    name: '门诊医生工作站高性能版',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '门诊医生工作站高性能配置，适用于复杂病例处理、多系统同时运行',
    createTime: '2025-03-16 00:30:00',
  },
  {
    id: 31,
    name: '住院护士工作站高性能版',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '住院护士工作站高性能配置，适用于复杂护理记录、多系统同时运行',
    createTime: '2025-03-16 01:00:00',
  },
  {
    id: 32,
    name: '医技科室工作站高性能版',
    type: 'Windows 10',
    cpu: '16核',
    memory: '32GB',
    disk: '1TB SSD',
    description: '医技科室工作站超高性能配置，适用于复杂影像处理、3D重建等专业软件',
    createTime: '2025-03-16 01:30:00',
  }
];

const DesktopManagement = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '桌面名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '使用人',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '使用模板',
      dataIndex: 'template',
      key: 'template',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '运行中' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === '运行中' ? (
            <Tooltip title="停止桌面">
              <Button type="link" danger icon={<StopOutlined />} onClick={() => handleStop(record)}>
                停止
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="启动桌面">
              <Button type="link" icon={<PlayCircleOutlined />} onClick={() => handleStart(record)}>
                启动
              </Button>
            </Tooltip>
          )}
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

  const handleStart = (record) => {
    setData(data.map(item => 
      item.id === record.id ? { ...item, status: '运行中' } : item
    ));
    message.success(`正在启动桌面: ${record.name}`);
  };

  const handleStop = (record) => {
    setData(data.map(item => 
      item.id === record.id ? { ...item, status: '已停止' } : item
    ));
    message.success(`正在停止桌面: ${record.name}`);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        setData(data.map(item => 
          item.id === editingId ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newDesktop = {
          ...values,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '已停止',
          createTime: new Date().toLocaleString(),
        };
        setData([...data, newDesktop]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="桌面管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加桌面
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? "编辑桌面" : "添加桌面"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="桌面名称"
            rules={[{ required: true, message: '请输入桌面名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="user"
            label="使用人"
            rules={[{ required: true, message: '请输入使用人' }]}
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
            name="template"
            label="使用模板"
            rules={[{ required: true, message: '请选择使用模板' }]}
          >
            <Select>
              <Option value="门诊医生工作站模板">门诊医生工作站模板</Option>
              <Option value="住院护士工作站模板">住院护士工作站模板</Option>
              <Option value="医技科室工作站模板">医技科室工作站模板</Option>
            </Select>
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
        </Form>
      </Modal>
    </div>
  );
};

export default DesktopManagement; 