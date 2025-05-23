import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, InputNumber, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊医生工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '门诊医生工作站标准配置，包含HIS、PACS等医疗系统',
    createTime: '2024-08-23 10:00:00',
  },
  {
    id: 2,
    name: '住院护士工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '住院护士工作站标准配置，包含护理系统、医嘱系统等',
    createTime: '2024-08-23 10:30:00',
  },
  {
    id: 3,
    name: '医技科室工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '医技科室工作站高性能配置，适用于影像、检验等专业软件',
    createTime: '2024-08-23 11:00:00',
  },
  {
    id: 4,
    name: '药房工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '药房工作站标准配置，包含药房管理系统',
    createTime: '2024-08-23 11:30:00',
  },
  {
    id: 5,
    name: '收费处工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '收费处工作站标准配置，包含收费系统、医保系统等',
    createTime: '2024-08-23 12:00:00',
  },
  {
    id: 6,
    name: '手术室工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '手术室工作站高性能配置，适用于手术导航、手术记录等专业软件',
    createTime: '2024-08-23 12:30:00',
  },
  {
    id: 7,
    name: '急诊科工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '急诊科工作站标准配置，包含急诊系统、抢救记录等',
    createTime: '2024-08-23 13:00:00',
  },
  {
    id: 8,
    name: '放射科工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '32GB',
    disk: '1TB SSD',
    description: '放射科工作站高性能配置，适用于影像处理、3D重建等专业软件',
    createTime: '2024-08-23 13:30:00',
  },
  {
    id: 9,
    name: '超声科工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '超声科工作站高性能配置，适用于超声影像处理等专业软件',
    createTime: '2024-08-23 14:00:00',
  },
  {
    id: 10,
    name: '病理科工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '病理科工作站高性能配置，适用于病理图像处理等专业软件',
    createTime: '2024-08-23 14:30:00',
  },
  {
    id: 11,
    name: '检验科工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '检验科工作站高性能配置，适用于检验数据处理等专业软件',
    createTime: '2024-08-23 15:00:00',
  },
  {
    id: 12,
    name: '内镜中心工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '内镜中心工作站高性能配置，适用于内镜图像处理等专业软件',
    createTime: '2024-08-23 15:30:00',
  },
  {
    id: 13,
    name: '行政办公工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '行政办公工作站标准配置，包含OA、财务等办公软件',
    createTime: '2024-08-23 16:00:00',
  },
  {
    id: 14,
    name: '人事管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '人事管理工作站标准配置，包含人事管理系统',
    createTime: '2024-08-23 16:30:00',
  },
  {
    id: 15,
    name: '财务工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '财务工作站标准配置，包含财务管理系统',
    createTime: '2024-08-23 17:00:00',
  },
  {
    id: 16,
    name: '设备管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '设备管理工作站标准配置，包含设备管理系统',
    createTime: '2024-08-23 17:30:00',
  },
  {
    id: 17,
    name: '科研工作站模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '32GB',
    disk: '1TB SSD',
    description: '科研工作站高性能配置，适用于数据分析、科研软件等',
    createTime: '2024-08-23 18:00:00',
  },
  {
    id: 18,
    name: '教学工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '教学工作站标准配置，包含教学软件、多媒体工具等',
    createTime: '2024-08-23 18:30:00',
  },
  {
    id: 19,
    name: '后勤工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '后勤工作站标准配置，包含后勤管理系统',
    createTime: '2024-08-23 19:00:00',
  },
  {
    id: 20,
    name: '医保工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '医保工作站标准配置，包含医保结算系统',
    createTime: '2024-08-23 19:30:00',
  },
  {
    id: 21,
    name: '病案管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '病案管理工作站标准配置，包含病案管理系统',
    createTime: '2024-08-23 20:00:00',
  },
  {
    id: 22,
    name: '护理管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '护理管理工作站标准配置，包含护理管理系统',
    createTime: '2024-08-23 20:30:00',
  },
  {
    id: 23,
    name: '医患沟通工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '医患沟通工作站标准配置，包含医患沟通系统',
    createTime: '2024-08-23 21:00:00',
  },
  {
    id: 24,
    name: '预约挂号工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '预约挂号工作站标准配置，包含预约挂号系统',
    createTime: '2024-08-23 21:30:00',
  },
  {
    id: 25,
    name: '药品管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '药品管理工作站标准配置，包含药品管理系统',
    createTime: '2024-08-23 22:00:00',
  },
  {
    id: 26,
    name: '耗材管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '耗材管理工作站标准配置，包含耗材管理系统',
    createTime: '2024-08-23 22:30:00',
  },
  {
    id: 27,
    name: '绩效管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '绩效管理工作站标准配置，包含绩效管理系统',
    createTime: '2024-08-23 23:00:00',
  },
  {
    id: 28,
    name: '科研项目管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '科研项目管理工作站标准配置，包含科研项目管理系统',
    createTime: '2024-08-23 23:30:00',
  },
  {
    id: 29,
    name: '教学资源管理工作站模板',
    type: 'Windows 10',
    cpu: '4核',
    memory: '8GB',
    disk: '256GB SSD',
    description: '教学资源管理工作站标准配置，包含教学资源管理系统',
    createTime: '2025-03-16 00:00:00',
  },
  {
    id: 30,
    name: '门诊医生工作站高性能模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '门诊医生工作站高性能配置，适用于复杂病例处理、多系统同时运行',
    createTime: '2025-03-16 00:30:00',
  },
  {
    id: 31,
    name: '住院护士工作站高性能模板',
    type: 'Windows 10',
    cpu: '8核',
    memory: '16GB',
    disk: '512GB SSD',
    description: '住院护士工作站高性能配置，适用于复杂护理记录、多系统同时运行',
    createTime: '2025-03-16 01:00:00',
  },
  {
    id: 32,
    name: '医技科室工作站高性能模板',
    type: 'Windows 10',
    cpu: '16核',
    memory: '32GB',
    disk: '1TB SSD',
    description: '医技科室工作站超高性能配置，适用于复杂影像处理、3D重建等专业软件',
    createTime: '2025-03-16 01:30:00',
  }
];

const TemplateManagement = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作系统',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'CPU核心数',
      dataIndex: 'cpu',
      key: 'cpu',
    },
    {
      title: '内存(GB)',
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: '存储(GB)',
      dataIndex: 'storage',
      key: 'storage',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '已发布' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
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

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        setData(data.map(item => 
          item.id === editingId ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newTemplate = {
          ...values,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '开发中',
        };
        setData([...data, newTemplate]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="模板管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加模板
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? "编辑模板" : "添加模板"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="操作系统"
            rules={[{ required: true, message: '请选择操作系统' }]}
          >
            <Select>
              <Option value="Windows 10">Windows 10</Option>
              <Option value="Windows 11">Windows 11</Option>
              <Option value="Ubuntu 20.04">Ubuntu 20.04</Option>
              <Option value="CentOS 7">CentOS 7</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="cpu"
            label="CPU核心数"
            rules={[{ required: true, message: '请输入CPU核心数' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="memory"
            label="内存(GB)"
            rules={[{ required: true, message: '请输入内存大小' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="storage"
            label="存储(GB)"
            rules={[{ required: true, message: '请输入存储大小' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TemplateManagement; 