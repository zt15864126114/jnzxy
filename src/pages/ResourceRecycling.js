import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, InputNumber, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊部资源回收策略',
    type: '自动回收',
    condition: '空闲时间超过4小时',
    action: '关机',
    status: '启用',
    department: '门诊部',
  },
  {
    id: 2,
    name: '住院部资源回收策略',
    type: '定时回收',
    condition: '每天23:00',
    action: '关机',
    status: '启用',
    department: '住院部',
  },
  {
    id: 3,
    name: '医技科室资源回收策略',
    type: '手动回收',
    condition: '管理员手动触发',
    action: '关机',
    status: '禁用',
    department: '医技科室',
  },
];

const ResourceRecycling = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '回收类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '触发条件',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: '执行动作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '启用' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
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
        const newStrategy = {
          ...values,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '启用',
        };
        setData([...data, newStrategy]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="资源回收策略"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加策略
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? "编辑策略" : "添加策略"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="策略名称"
            rules={[{ required: true, message: '请输入策略名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="回收类型"
            rules={[{ required: true, message: '请选择回收类型' }]}
          >
            <Select>
              <Option value="自动回收">自动回收</Option>
              <Option value="定时回收">定时回收</Option>
              <Option value="手动回收">手动回收</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="condition"
            label="触发条件"
            rules={[{ required: true, message: '请输入触发条件' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="action"
            label="执行动作"
            rules={[{ required: true, message: '请选择执行动作' }]}
          >
            <Select>
              <Option value="关机">关机</Option>
              <Option value="休眠">休眠</Option>
              <Option value="重启">重启</Option>
            </Select>
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

export default ResourceRecycling; 