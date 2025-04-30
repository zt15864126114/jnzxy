import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Typography, Space, Tooltip, Badge } from 'antd';
import { 
  DesktopOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Text } = Typography;

// 模拟数据
const mockData = {
  overview: {
    totalDesktops: 100,
    runningDesktops: 85,
    usedStorage: 750,
    totalStorage: 1000,
    usedMemory: 128,
    totalMemory: 256,
    usedCPU: 65,
    alerts: 3,
  },
  trends: {
    cpu: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 40) + 40,
    })),
    memory: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 30) + 50,
    })),
    storage: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 20) + 60,
    })),
  },
  details: [
    {
      id: 1,
      name: '门诊部资源池',
      cpu: 75,
      memory: 80,
      storage: 65,
      status: '正常',
      desktops: 35,
      runningDesktops: 30,
      lastUpdate: '10:30',
    },
    {
      id: 2,
      name: '住院部资源池',
      cpu: 85,
      memory: 90,
      storage: 75,
      status: '警告',
      desktops: 45,
      runningDesktops: 40,
      lastUpdate: '10:30',
    },
    {
      id: 3,
      name: '医技科室资源池',
      cpu: 60,
      memory: 70,
      storage: 55,
      status: '正常',
      desktops: 20,
      runningDesktops: 15,
      lastUpdate: '10:30',
    },
    {
      id: 4,
      name: '行政部资源池',
      cpu: 45,
      memory: 50,
      storage: 40,
      status: '正常',
      desktops: 15,
      runningDesktops: 12,
      lastUpdate: '10:30',
    },
    {
      id: 5,
      name: '急诊科资源池',
      cpu: 70,
      memory: 75,
      storage: 60,
      status: '正常',
      desktops: 25,
      runningDesktops: 22,
      lastUpdate: '10:30',
    },
    {
      id: 6,
      name: 'ICU资源池',
      cpu: 80,
      memory: 85,
      storage: 70,
      status: '警告',
      desktops: 30,
      runningDesktops: 28,
      lastUpdate: '10:30',
    },
    {
      id: 7,
      name: '手术室资源池',
      cpu: 65,
      memory: 70,
      storage: 55,
      status: '正常',
      desktops: 20,
      runningDesktops: 18,
      lastUpdate: '10:30',
    },
    {
      id: 8,
      name: '检验科资源池',
      cpu: 55,
      memory: 60,
      storage: 45,
      status: '正常',
      desktops: 15,
      runningDesktops: 14,
      lastUpdate: '10:30',
    },
    {
      id: 9,
      name: '影像科资源池',
      cpu: 50,
      memory: 55,
      storage: 40,
      status: '正常',
      desktops: 12,
      runningDesktops: 10,
      lastUpdate: '10:30',
    },
    {
      id: 10,
      name: '药房资源池',
      cpu: 60,
      memory: 65,
      storage: 50,
      status: '正常',
      desktops: 18,
      runningDesktops: 16,
      lastUpdate: '10:30',
    },
    {
      id: 11,
      name: '财务部资源池',
      cpu: 40,
      memory: 45,
      storage: 35,
      status: '正常',
      desktops: 10,
      runningDesktops: 8,
      lastUpdate: '10:30',
    },
    {
      id: 12,
      name: '人事部资源池',
      cpu: 45,
      memory: 50,
      storage: 40,
      status: '正常',
      desktops: 12,
      runningDesktops: 10,
      lastUpdate: '10:30',
    },
    {
      id: 13,
      name: '设备科资源池',
      cpu: 50,
      memory: 55,
      storage: 45,
      status: '警告',
      desktops: 15,
      runningDesktops: 13,
      lastUpdate: '10:30',
    },
    {
      id: 14,
      name: '科研部资源池',
      cpu: 90,
      memory: 95,
      storage: 85,
      status: '警告',
      desktops: 40,
      runningDesktops: 38,
      lastUpdate: '10:30',
    },
    {
      id: 15,
      name: '教学部资源池',
      cpu: 60,
      memory: 65,
      storage: 55,
      status: '正常',
      desktops: 20,
      runningDesktops: 18,
      lastUpdate: '10:30',
    },
    {
      id: 16,
      name: '后勤部资源池',
      cpu: 40,
      memory: 45,
      storage: 35,
      status: '正常',
      desktops: 10,
      runningDesktops: 8,
      lastUpdate: '10:30',
    },
    {
      id: 17,
      name: '医保部资源池',
      cpu: 45,
      memory: 50,
      storage: 40,
      status: '正常',
      desktops: 12,
      runningDesktops: 10,
      lastUpdate: '10:30',
    },
    {
      id: 18,
      name: '病案室资源池',
      cpu: 50,
      memory: 55,
      storage: 45,
      status: '正常',
      desktops: 15,
      runningDesktops: 13,
      lastUpdate: '10:30',
    },
    {
      id: 19,
      name: '护理部资源池',
      cpu: 60,
      memory: 65,
      storage: 55,
      status: '正常',
      desktops: 20,
      runningDesktops: 18,
      lastUpdate: '10:30',
    },
    {
      id: 20,
      name: '医患沟通部资源池',
      cpu: 45,
      memory: 50,
      storage: 40,
      status: '警告',
      desktops: 12,
      runningDesktops: 10,
      lastUpdate: '10:30',
    },
    {
      id: 21,
      name: '预约挂号部资源池',
      cpu: 65,
      memory: 70,
      storage: 60,
      status: '正常',
      desktops: 25,
      runningDesktops: 22,
      lastUpdate: '10:30',
    },
    {
      id: 22,
      name: '药品管理部资源池',
      cpu: 55,
      memory: 60,
      storage: 50,
      status: '正常',
      desktops: 18,
      runningDesktops: 16,
      lastUpdate: '10:30',
    },
    {
      id: 23,
      name: '耗材管理部资源池',
      cpu: 50,
      memory: 55,
      storage: 45,
      status: '正常',
      desktops: 15,
      runningDesktops: 13,
      lastUpdate: '10:30',
    },
    {
      id: 24,
      name: '绩效管理部资源池',
      cpu: 60,
      memory: 65,
      storage: 55,
      status: '正常',
      desktops: 20,
      runningDesktops: 18,
      lastUpdate: '10:30',
    },
  ],
  alerts: [
    {
      id: 1,
      time: '10:30',
      type: '警告',
      content: '住院部资源池CPU使用率超过80%',
      status: '未处理',
      level: 'warning',
    },
    {
      id: 2,
      time: '09:15',
      type: '错误',
      content: '住院部资源池内存使用率超过90%',
      status: '未处理',
      level: 'error',
    },
    {
      id: 3,
      time: '08:00',
      type: '警告',
      content: '医技科室资源池存储使用率超过75%',
      status: '已处理',
      level: 'warning',
    },
    {
      id: 4,
      time: '10:25',
      type: '警告',
      content: 'ICU资源池CPU使用率超过80%',
      status: '未处理',
      level: 'warning',
    },
    {
      id: 5,
      time: '10:20',
      type: '警告',
      content: 'ICU资源池内存使用率超过85%',
      status: '未处理',
      level: 'warning',
    },
    {
      id: 6,
      time: '10:15',
      type: '错误',
      content: '设备科资源池存储使用率超过90%',
      status: '未处理',
      level: 'error',
    },
    {
      id: 7,
      time: '10:10',
      type: '警告',
      content: '科研部资源池CPU使用率超过90%',
      status: '未处理',
      level: 'warning',
    },
    {
      id: 8,
      time: '10:05',
      type: '警告',
      content: '科研部资源池内存使用率超过95%',
      status: '未处理',
      level: 'warning',
    },
    {
      id: 9,
      time: '10:00',
      type: '警告',
      content: '科研部资源池存储使用率超过85%',
      status: '未处理',
      level: 'warning',
    }
    // {
    //   id: 10,
    //   time: '09:55',
    //   type: '警告',
    //   content: '医患沟通部资源池CPU使用率超过80%',
    //   status: '未处理',
    //   level: 'warning',
    // },
    // {
    //   id: 11,
    //   time: '09:50',
    //   type: '错误',
    //   content: '门诊部资源池内存使用率超过90%',
    //   status: '已处理',
    //   level: 'error',
    // },
    // {
    //   id: 12,
    //   time: '09:45',
    //   type: '警告',
    //   content: '急诊科资源池存储使用率超过75%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 13,
    //   time: '09:40',
    //   type: '警告',
    //   content: '手术室资源池CPU使用率超过80%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 14,
    //   time: '09:35',
    //   type: '错误',
    //   content: '检验科资源池内存使用率超过90%',
    //   status: '已处理',
    //   level: 'error',
    // },
    // {
    //   id: 15,
    //   time: '09:30',
    //   type: '警告',
    //   content: '影像科资源池存储使用率超过75%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 16,
    //   time: '09:25',
    //   type: '警告',
    //   content: '药房资源池CPU使用率超过80%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 17,
    //   time: '09:20',
    //   type: '错误',
    //   content: '财务部资源池内存使用率超过90%',
    //   status: '已处理',
    //   level: 'error',
    // },
    // {
    //   id: 18,
    //   time: '09:15',
    //   type: '警告',
    //   content: '人事部资源池存储使用率超过75%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 19,
    //   time: '09:10',
    //   type: '警告',
    //   content: '教学部资源池CPU使用率超过80%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 20,
    //   time: '09:05',
    //   type: '错误',
    //   content: '后勤部资源池内存使用率超过90%',
    //   status: '已处理',
    //   level: 'error',
    // },
    // {
    //   id: 21,
    //   time: '09:00',
    //   type: '警告',
    //   content: '医保部资源池存储使用率超过75%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 22,
    //   time: '08:55',
    //   type: '警告',
    //   content: '病案室资源池CPU使用率超过80%',
    //   status: '已处理',
    //   level: 'warning',
    // },
    // {
    //   id: 23,
    //   time: '08:50',
    //   type: '错误',
    //   content: '护理部资源池内存使用率超过90%',
    //   status: '已处理',
    //   level: 'error',
    // },
    // {
    //   id: 24,
    //   time: '08:45',
    //   type: '警告',
    //   content: '预约挂号部资源池存储使用率超过75%',
    //   status: '已处理',
    //   level: 'warning',
    // },
  ],
};

const ResourceMonitoring = () => {
  const [data] = useState(mockData);

  const getStatusIcon = (status) => {
    switch (status) {
      case '正常':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case '警告':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case '错误':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return null;
    }
  };

  const columns = [
    {
      title: '资源池名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {getStatusIcon(record.status)}
          {text}
        </Space>
      ),
    },
    {
      title: '桌面数量',
      key: 'desktops',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.runningDesktops}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            运行中 / {record.desktops} 总数
          </Text>
        </Space>
      ),
    },
    {
      title: 'CPU使用率',
      dataIndex: 'cpu',
      key: 'cpu',
      render: (value) => (
        <Tooltip title={`CPU使用率: ${value}%`}>
          <span style={{ color: value > 80 ? '#f5222d' : '#1890ff' }}>{value}%</span>
        </Tooltip>
      ),
    },
    {
      title: '内存使用率',
      dataIndex: 'memory',
      key: 'memory',
      render: (value) => (
        <Tooltip title={`内存使用率: ${value}%`}>
          <span style={{ color: value > 80 ? '#f5222d' : '#52c41a' }}>{value}%</span>
        </Tooltip>
      ),
    },
    {
      title: '存储使用率',
      dataIndex: 'storage',
      key: 'storage',
      render: (value) => (
        <Tooltip title={`存储使用率: ${value}%`}>
          <span style={{ color: value > 80 ? '#f5222d' : '#faad14' }}>{value}%</span>
        </Tooltip>
      ),
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
    },
  ];

  const alertColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 80,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type, record) => (
        <Badge 
          status={record.level === 'error' ? 'error' : 'warning'} 
          text={type} 
        />
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === '已处理' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  // ECharts 折线图配置
  const getLineOption = (title, data, color) => ({
    title: {
      text: title,
      left: 'center',
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 500 }
    },
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data.map(item => item.time),
      axisLabel: { rotate: 0 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { formatter: '{value}%' }
    },
    series: [
      {
        data: data.map(item => item.value),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color },
        itemStyle: { color },
        areaStyle: { color: color + '22' },
      }
    ]
  });

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card bodyStyle={{ padding: '20px' }}>
            <Statistic
              title={
                <Space>
                  <DesktopOutlined />
                  <span>桌面总数</span>
                </Space>
              }
              value={data.overview.totalDesktops}
              suffix={`/ ${data.overview.runningDesktops} 运行中`}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: '20px' }}>
            <Statistic
              title={
                <Space>
                  <DatabaseOutlined />
                  <span>存储使用率</span>
                </Space>
              }
              value={data.overview.usedStorage}
              suffix={`/ ${data.overview.totalStorage}GB`}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: '20px' }}>
            <Statistic
              title={
                <Space>
                  <CloudServerOutlined />
                  <span>内存使用率</span>
                </Space>
              }
              value={data.overview.usedMemory}
              suffix={`/ ${data.overview.totalMemory}GB`}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: '20px' }}>
            <Statistic
              title={
                <Space>
                  <AlertOutlined />
                  <span>告警数量</span>
                </Space>
              }
              value={data.overview.alerts}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={16}>
          <Card 
            title="资源使用趋势" 
            bodyStyle={{ padding: '12px' }}
          >
            <ReactECharts style={{ height: 220 }} option={getLineOption('CPU使用趋势', data.trends.cpu, '#1890ff')} />
            <ReactECharts style={{ height: 220, marginTop: 16 }} option={getLineOption('内存使用趋势', data.trends.memory, '#52c41a')} />
            <ReactECharts style={{ height: 220, marginTop: 16 }} option={getLineOption('存储使用趋势', data.trends.storage, '#faad14')} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="告警信息" 
            style={{ height: '100%' }}
            bodyStyle={{ padding: '12px' }}
          >
            <Table 
              columns={alertColumns} 
              dataSource={data.alerts} 
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* <Card 
        title="资源池详情" 
        style={{ marginTop: '24px' }}
        bodyStyle={{ padding: '12px' }}
      >
        <Table 
          columns={columns} 
          dataSource={data.details} 
          rowKey="id"
          pagination={false}
        />
      </Card> */}
    </div>
  );
};

export default ResourceMonitoring; 