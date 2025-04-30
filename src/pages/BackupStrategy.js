import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, TimePicker, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '门诊系统每日备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '23:00:00',
    retentionPeriod: '30天',
    status: '正常',
    targetLocation: '门诊HIS数据库',
    lastBackupTime: '2024-03-20 23:00:00',
    nextBackupTime: '2024-03-21 23:00:00',
    description: '门诊HIS系统数据库每日增量备份'
  },
  {
    id: 2,
    name: '住院系统周备份',
    type: '数据库备份',
    frequency: '每周',
    executionTime: '22:00:00',
    retentionPeriod: '90天',
    status: '正常',
    targetLocation: '住院HIS数据库',
    lastBackupTime: '2024-03-17 22:00:00',
    nextBackupTime: '2024-03-24 22:00:00',
    description: '住院HIS系统数据库每周全量备份'
  },
  {
    id: 3,
    name: 'PACS系统备份',
    type: '文件备份',
    frequency: '每周',
    executionTime: '01:00:00',
    retentionPeriod: '180天',
    status: '正常',
    targetLocation: '影像文件存储',
    lastBackupTime: '2024-03-18 01:00:00',
    nextBackupTime: '2024-03-25 01:00:00',
    description: 'PACS影像文件系统每周增量备份'
  },
  {
    id: 4,
    name: 'LIS系统备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '00:00:00',
    retentionPeriod: '60天',
    status: '正常',
    targetLocation: '检验LIS数据库',
    lastBackupTime: '2024-03-20 00:00:00',
    nextBackupTime: '2024-03-21 00:00:00',
    description: '检验系统数据库每日增量备份'
  },
  {
    id: 5,
    name: '电子病历系统备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '02:00:00',
    retentionPeriod: '365天',
    status: '正常',
    targetLocation: 'EMR数据库',
    lastBackupTime: '2024-03-20 02:00:00',
    nextBackupTime: '2024-03-21 02:00:00',
    description: '电子病历系统每日全量备份'
  },
  {
    id: 6,
    name: '医保结算系统备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '01:30:00',
    retentionPeriod: '90天',
    status: '正常',
    targetLocation: '医保系统数据库',
    lastBackupTime: '2024-03-20 01:30:00',
    nextBackupTime: '2024-03-21 01:30:00',
    description: '医保结算系统每日增量备份'
  },
  {
    id: 7,
    name: '药品管理系统备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '03:00:00',
    retentionPeriod: '90天',
    status: '正常',
    targetLocation: '药品系统数据库',
    lastBackupTime: '2024-03-20 03:00:00',
    nextBackupTime: '2024-03-21 03:00:00',
    description: '药品管理系统每日增量备份'
  },
  {
    id: 8,
    name: '手术麻醉系统备份',
    type: '数据库备份',
    frequency: '每日',
    executionTime: '02:30:00',
    retentionPeriod: '180天',
    status: '正常',
    targetLocation: '手术系统数据库',
    lastBackupTime: '2024-03-20 02:30:00',
    nextBackupTime: '2024-03-21 02:30:00',
    description: '手术麻醉系统每日增量备份'
  },
  {
    id: 9,
    name: '手术室系统备份',
    type: '文件备份',
    target: '手术记录文件',
    schedule: '每天 03:00',
    retention: '90天',
    status: '正常',
    lastBackup: '2025-03-20 03:00:00',
  },
  {
    id: 10,
    name: '药房系统备份',
    type: '数据库备份',
    target: '药房管理系统',
    schedule: '每天 21:00',
    retention: '60天',
    status: '正常',
    lastBackup: '2025-03-20 21:00:00',
  },
  {
    id: 11,
    name: '财务系统备份',
    type: '数据库备份',
    target: '财务数据库',
    schedule: '每天 20:00',
    retention: '180天',
    status: '正常',
    lastBackup: '2025-03-20 20:00:00',
  },
  {
    id: 12,
    name: '人事系统备份',
    type: '数据库备份',
    target: '人事管理系统',
    schedule: '每周六 01:00',
    retention: '365天',
    status: '正常',
    lastBackup: '2025-03-16 01:00:00',
  },
  {
    id: 13,
    name: 'OA系统备份',
    type: '文件备份',
    target: '办公文档',
    schedule: '每天 19:00',
    retention: '90天',
    status: '正常',
    lastBackup: '2025-03-20 19:00:00',
  },
  {
    id: 14,
    name: '医保系统备份',
    type: '数据库备份',
    target: '医保结算系统',
    schedule: '每天 18:00',
    retention: '180天',
    status: '正常',
    lastBackup: '2025-03-20 18:00:00',
  },
  {
    id: 15,
    name: '设备管理系统备份',
    type: '数据库备份',
    target: '医疗设备管理',
    schedule: '每周五 23:00',
    retention: '90天',
    status: '正常',
    lastBackup: '2025-03-15 23:00:00',
  },
  {
    id: 16,
    name: '医技系统备份',
    type: '差异备份',
    frequency: '每天',
    time: '01:00',
    retention: '60天',
    status: '禁用',
    target: '医技科室资源池',
  },
  {
    id: 17,
    name: '药房系统备份',
    type: '完整备份',
    frequency: '每天',
    time: '22:00',
    retention: '30天',
    status: '启用',
    target: '药房资源池',
  },
  {
    id: 18,
    name: '检验系统备份',
    type: '增量备份',
    frequency: '每周',
    time: '03:00',
    retention: '90天',
    status: '启用',
    target: '检验科资源池',
  },
  {
    id: 19,
    name: '影像系统备份',
    type: '差异备份',
    frequency: '每天',
    time: '00:00',
    retention: '60天',
    status: '启用',
    target: '影像科资源池',
  },
  {
    id: 20,
    name: '手术室系统备份',
    type: '完整备份',
    frequency: '每天',
    time: '21:00',
    retention: '30天',
    status: '启用',
    target: '手术室资源池',
  },
  {
    id: 21,
    name: '急诊系统备份',
    type: '增量备份',
    frequency: '每周',
    time: '04:00',
    retention: '90天',
    status: '启用',
    target: '急诊部资源池',
  },
  {
    id: 22,
    name: '财务系统备份',
    type: '差异备份',
    frequency: '每天',
    time: '23:30',
    retention: '60天',
    status: '启用',
    target: '财务部资源池',
  },
  {
    id: 23,
    name: '人事系统备份',
    type: '完整备份',
    frequency: '每周',
    time: '01:30',
    retention: '90天',
    status: '启用',
    target: '人事部资源池',
  },
  {
    id: 24,
    name: '设备管理系统备份',
    type: '增量备份',
    frequency: '每天',
    time: '22:30',
    retention: '30天',
    status: '禁用',
    target: '设备科资源池',
  },
  {
    id: 25,
    name: '科研系统备份',
    type: '差异备份',
    frequency: '每周',
    time: '02:30',
    retention: '90天',
    status: '启用',
    target: '科研部资源池',
  },
  {
    id: 26,
    name: '教学系统备份',
    type: '完整备份',
    frequency: '每天',
    time: '20:00',
    retention: '60天',
    status: '启用',
    target: '教学部资源池',
  },
  {
    id: 27,
    name: '后勤系统备份',
    type: '增量备份',
    frequency: '每周',
    time: '03:30',
    retention: '30天',
    status: '启用',
    target: '后勤部资源池',
  },
  {
    id: 28,
    name: '医保系统备份',
    type: '差异备份',
    frequency: '每天',
    time: '00:30',
    retention: '90天',
    status: '启用',
    target: '医保部资源池',
  },
  {
    id: 29,
    name: '病案系统备份',
    type: '完整备份',
    frequency: '每周',
    time: '01:00',
    retention: '60天',
    status: '启用',
    target: '病案室资源池',
  },
  {
    id: 30,
    name: '护理系统备份',
    type: '增量备份',
    frequency: '每天',
    time: '21:30',
    retention: '30天',
    status: '启用',
    target: '护理部资源池',
  },
  {
    id: 31,
    name: '医患沟通系统备份',
    type: '差异备份',
    frequency: '每周',
    time: '02:00',
    retention: '90天',
    status: '禁用',
    target: '医患沟通部资源池',
  },
  {
    id: 32,
    name: '预约挂号系统备份',
    type: '完整备份',
    frequency: '每天',
    time: '20:30',
    retention: '60天',
    status: '启用',
    target: '门诊部资源池',
  },
  {
    id: 33,
    name: '药品管理系统备份',
    type: '增量备份',
    frequency: '每周',
    time: '03:00',
    retention: '30天',
    status: '启用',
    target: '药房资源池',
  },
  {
    id: 34,
    name: '耗材管理系统备份',
    type: '差异备份',
    frequency: '每天',
    time: '00:00',
    retention: '90天',
    status: '启用',
    target: '设备科资源池',
  },
  {
    id: 35,
    name: '绩效管理系统备份',
    type: '完整备份',
    frequency: '每周',
    time: '01:30',
    retention: '60天',
    status: '启用',
    target: '人事部资源池',
  },
  {
    id: 36,
    name: '科研项目管理系统备份',
    type: '增量备份',
    frequency: '每天',
    time: '22:00',
    retention: '30天',
    status: '启用',
    target: '科研部资源池',
  },
  {
    id: 37,
    name: '教学资源管理系统备份',
    type: '差异备份',
    frequency: '每周',
    time: '02:30',
    retention: '90天',
    status: '启用',
    target: '教学部资源池',
  },
];

const BackupStrategy = () => {
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
      title: '备份类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '执行频率',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: '执行时间',
      dataIndex: 'executionTime',
      key: 'executionTime',
    },
    {
      title: '保留期限',
      dataIndex: 'retentionPeriod',
      key: 'retentionPeriod',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === '正常' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '目标资源池',
      dataIndex: 'targetLocation',
      key: 'targetLocation',
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
        const newStrategy = {
          ...formattedValues,
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
        title="备份策略管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加备份策略
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 8 }} />
      </Card>

      <Modal
        title={editingId ? "编辑备份策略" : "添加备份策略"}
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
            label="备份类型"
            rules={[{ required: true, message: '请选择备份类型' }]}
          >
            <Select>
              <Option value="完整备份">完整备份</Option>
              <Option value="增量备份">增量备份</Option>
              <Option value="差异备份">差异备份</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="frequency"
            label="执行频率"
            rules={[{ required: true, message: '请选择执行频率' }]}
          >
            <Select>
              <Option value="每天">每天</Option>
              <Option value="每周">每周</Option>
              <Option value="每月">每月</Option>
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
            name="retention"
            label="保留期限"
            rules={[{ required: true, message: '请选择保留期限' }]}
          >
            <Select>
              <Option value="30天">30天</Option>
              <Option value="60天">60天</Option>
              <Option value="90天">90天</Option>
              <Option value="180天">180天</Option>
            </Select>
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
        </Form>
      </Modal>
    </div>
  );
};

export default BackupStrategy; 