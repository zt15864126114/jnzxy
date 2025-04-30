import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, TimePicker, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊部定时开关机',
    target: '门诊部资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 2,
    name: '住院部定时开关机',
    target: '住院部资源池',
    type: '关机',
    time: '23:00',
    days: '每天',
    status: '启用',
  },
  {
    id: 3,
    name: '医技科室定时开关机',
    target: '医技科室资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '禁用',
  },
  {
    id: 4,
    name: '行政部定时开关机',
    target: '行政部资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 5,
    name: '急诊科定时开关机',
    target: '急诊科资源池',
    type: '开机',
    time: '00:00',
    days: '每天',
    status: '启用',
  },
  {
    id: 6,
    name: 'ICU定时开关机',
    target: 'ICU资源池',
    type: '开机',
    time: '00:00',
    days: '每天',
    status: '启用',
  },
  {
    id: 7,
    name: '手术室定时开关机',
    target: '手术室资源池',
    type: '开机',
    time: '07:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 8,
    name: '检验科定时开关机',
    target: '检验科资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 9,
    name: '影像科定时开关机',
    target: '影像科资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 10,
    name: '药房定时开关机',
    target: '药房资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 11,
    name: '财务部定时开关机',
    target: '财务部资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 12,
    name: '人事部定时开关机',
    target: '人事部资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 13,
    name: '设备科定时开关机',
    target: '设备科资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '禁用',
  },
  {
    id: 14,
    name: '科研部定时开关机',
    target: '科研部资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 15,
    name: '教学部定时开关机',
    target: '教学部资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 16,
    name: '后勤部定时开关机',
    target: '后勤部资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 17,
    name: '医保部定时开关机',
    target: '医保部资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 18,
    name: '病案室定时开关机',
    target: '病案室资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 19,
    name: '护理部定时开关机',
    target: '护理部资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 20,
    name: '医患沟通部定时开关机',
    target: '医患沟通部资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '禁用',
  },
  {
    id: 21,
    name: '预约挂号部定时开关机',
    target: '预约挂号部资源池',
    type: '开机',
    time: '07:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 22,
    name: '药品管理部定时开关机',
    target: '药品管理部资源池',
    type: '开机',
    time: '07:30',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 23,
    name: '耗材管理部定时开关机',
    target: '耗材管理部资源池',
    type: '开机',
    time: '08:00',
    days: '周一至周五',
    status: '启用',
  },
  {
    id: 24,
    name: '绩效管理部定时开关机',
    target: '绩效管理部资源池',
    type: '开机',
    time: '08:30',
    days: '周一至周五',
    status: '启用',
  },
];

const PowerSchedule = () => {
  const [data, setData] = useState(mockData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '目标资源池',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === '开机' ? 'green' : 'red'}>
          {type}
        </Tag>
      ),
    },
    {
      title: '执行时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '执行日期',
      dataIndex: 'days',
      key: 'days',
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
    form.setFieldsValue({
      ...record,
      time: moment(record.time, 'HH:mm'),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        time: values.time.format('HH:mm'),
      };

      if (editingId) {
        setData(data.map(item => 
          item.id === editingId ? { ...item, ...formattedValues } : item
        ));
        message.success('更新成功');
      } else {
        const newSchedule = {
          ...formattedValues,
          id: Math.max(...data.map(item => item.id)) + 1,
          status: '启用',
        };
        setData([...data, newSchedule]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="定时开关机"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加任务
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? "编辑任务" : "添加任务"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="target"
            label="目标资源池"
            rules={[{ required: true, message: '请选择目标资源池' }]}
          >
            <Select>
              <Option value="门诊部资源池">门诊部资源池</Option>
              <Option value="住院部资源池">住院部资源池</Option>
              <Option value="医技科室资源池">医技科室资源池</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="操作类型"
            rules={[{ required: true, message: '请选择操作类型' }]}
          >
            <Select>
              <Option value="开机">开机</Option>
              <Option value="关机">关机</Option>
              <Option value="重启">重启</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="time"
            label="执行时间"
            rules={[{ required: true, message: '请选择执行时间' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="days"
            label="执行日期"
            rules={[{ required: true, message: '请选择执行日期' }]}
          >
            <Select>
              <Option value="每天">每天</Option>
              <Option value="周一至周五">周一至周五</Option>
              <Option value="周六周日">周六周日</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PowerSchedule; 