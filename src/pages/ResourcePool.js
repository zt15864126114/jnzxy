import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊部资源池',
    type: '计算资源',
    cpu: 32,
    memory: 64,
    storage: 1000,
    status: '正常',
    department: '门诊部',
  },
  {
    id: 2,
    name: '住院部资源池',
    type: '存储资源',
    cpu: 64,
    memory: 128,
    storage: 2000,
    status: '正常',
    department: '住院部',
  },
  {
    id: 3,
    name: '医技科室资源池',
    type: '计算资源',
    cpu: 16,
    memory: 32,
    storage: 500,
    status: '维护中',
    department: '医技科室',
  },
  {
    id: 4,
    name: '行政部资源池',
    type: '网络资源',
    cpu: 8,
    memory: 16,
    storage: 200,
    status: '正常',
    department: '行政部',
  },
  {
    id: 5,
    name: '急诊科资源池',
    type: '计算资源',
    cpu: 24,
    memory: 48,
    storage: 800,
    status: '正常',
    department: '急诊科',
  },
  {
    id: 6,
    name: 'ICU资源池',
    type: '存储资源',
    cpu: 40,
    memory: 96,
    storage: 1500,
    status: '正常',
    department: 'ICU',
  },
  {
    id: 7,
    name: '手术室资源池',
    type: '计算资源',
    cpu: 20,
    memory: 40,
    storage: 600,
    status: '维护中',
    department: '手术室',
  },
  {
    id: 8,
    name: '检验科资源池',
    type: '存储资源',
    cpu: 12,
    memory: 24,
    storage: 400,
    status: '正常',
    department: '检验科',
  },
  {
    id: 9,
    name: '影像科资源池',
    type: '网络资源',
    cpu: 10,
    memory: 20,
    storage: 300,
    status: '正常',
    department: '影像科',
  },
  {
    id: 10,
    name: '药房资源池',
    type: '计算资源',
    cpu: 16,
    memory: 32,
    storage: 500,
    status: '正常',
    department: '药房',
  },
  {
    id: 11,
    name: '财务部资源池',
    type: '存储资源',
    cpu: 8,
    memory: 16,
    storage: 300,
    status: '正常',
    department: '财务部',
  },
  {
    id: 12,
    name: '人事部资源池',
    type: '计算资源',
    cpu: 12,
    memory: 24,
    storage: 400,
    status: '正常',
    department: '人事部',
  },
  {
    id: 13,
    name: '设备科资源池',
    type: '网络资源',
    cpu: 10,
    memory: 20,
    storage: 300,
    status: '维护中',
    department: '设备科',
  },
  {
    id: 14,
    name: '科研部资源池',
    type: '计算资源',
    cpu: 48,
    memory: 96,
    storage: 2000,
    status: '正常',
    department: '科研部',
  },
  {
    id: 15,
    name: '教学部资源池',
    type: '存储资源',
    cpu: 16,
    memory: 32,
    storage: 800,
    status: '正常',
    department: '教学部',
  },
  {
    id: 16,
    name: '后勤部资源池',
    type: '计算资源',
    cpu: 8,
    memory: 16,
    storage: 300,
    status: '正常',
    department: '后勤部',
  },
  {
    id: 17,
    name: '医保部资源池',
    type: '存储资源',
    cpu: 12,
    memory: 24,
    storage: 500,
    status: '正常',
    department: '医保部',
  },
  {
    id: 18,
    name: '病案室资源池',
    type: '网络资源',
    cpu: 10,
    memory: 20,
    storage: 400,
    status: '正常',
    department: '病案室',
  },
  {
    id: 19,
    name: '护理部资源池',
    type: '计算资源',
    cpu: 16,
    memory: 32,
    storage: 600,
    status: '正常',
    department: '护理部',
  },
  {
    id: 20,
    name: '医患沟通部资源池',
    type: '存储资源',
    cpu: 8,
    memory: 16,
    storage: 300,
    status: '维护中',
    department: '医患沟通部',
  },
  {
    id: 21,
    name: '预约挂号部资源池',
    type: '计算资源',
    cpu: 20,
    memory: 40,
    storage: 700,
    status: '正常',
    department: '预约挂号部',
  },
  {
    id: 22,
    name: '药品管理部资源池',
    type: '存储资源',
    cpu: 12,
    memory: 24,
    storage: 500,
    status: '正常',
    department: '药品管理部',
  },
  {
    id: 23,
    name: '耗材管理部资源池',
    type: '网络资源',
    cpu: 10,
    memory: 20,
    storage: 400,
    status: '正常',
    department: '耗材管理部',
  },
  {
    id: 24,
    name: '绩效管理部资源池',
    type: '计算资源',
    cpu: 16,
    memory: 32,
    storage: 600,
    status: '正常',
    department: '绩效管理部',
  },
];

const ResourcePool = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '资源池名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '资源类型',
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
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
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
        const newResource = {
          ...values,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '正常',
        };
        setData([...data, newResource]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="资源池管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加资源池
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 8 }} />
      </Card>

      <Modal
        title={editingId ? "编辑资源池" : "添加资源池"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="资源池名称"
            rules={[{ required: true, message: '请输入资源池名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="资源类型"
            rules={[{ required: true, message: '请选择资源类型' }]}
          >
            <Select>
              <Option value="计算资源">计算资源</Option>
              <Option value="存储资源">存储资源</Option>
              <Option value="网络资源">网络资源</Option>
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
        </Form>
      </Modal>
    </div>
  );
};

export default ResourcePool; 