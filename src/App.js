import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DesktopOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  SettingOutlined,
  MonitorOutlined,
  ClockCircleOutlined,
  LaptopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

// 导入各个功能模块组件
import ResourcePool from './pages/ResourcePool';
import BackupStrategy from './pages/BackupStrategy';
import TemplateManagement from './pages/TemplateManagement';
import TerminalControl from './pages/TerminalControl';
import DesktopManagement from './pages/DesktopManagement';
import ResourceRecycling from './pages/ResourceRecycling';
import ResourceMonitoring from './pages/ResourceMonitoring';
import PowerSchedule from './pages/PowerSchedule';

const { Header, Sider, Content } = Layout;

function App() {
  const menuItems = [
    {
      key: '1',
      icon: <CloudServerOutlined />,
      label: <Link to="/resource-pool">资源池管理</Link>,
    },
    {
      key: '2',
      icon: <DatabaseOutlined />,
      label: <Link to="/backup-strategy">备份策略</Link>,
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: <Link to="/template-management">模板管理</Link>,
    },
    {
      key: '4',
      icon: <LaptopOutlined />,
      label: <Link to="/terminal-control">终端管控</Link>,
    },
    {
      key: '5',
      icon: <DesktopOutlined />,
      label: <Link to="/desktop-management">桌面管理</Link>,
    },
    {
      key: '6',
      icon: <DeleteOutlined />,
      label: <Link to="/resource-recycling">资源回收策略</Link>,
    },
    {
      key: '7',
      icon: <MonitorOutlined />,
      label: <Link to="/resource-monitoring">资源监控</Link>,
    },
    {
      key: '8',
      icon: <ClockCircleOutlined />,
      label: <Link to="/power-schedule">定时开关机</Link>,
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200}>
          <div className="logo" style={{ 
            height: 32, 
            margin: 16, 
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            桌面管理系统
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="/resource-pool" element={<ResourcePool />} />
              <Route path="/backup-strategy" element={<BackupStrategy />} />
              <Route path="/template-management" element={<TemplateManagement />} />
              <Route path="/terminal-control" element={<TerminalControl />} />
              <Route path="/desktop-management" element={<DesktopManagement />} />
              <Route path="/resource-recycling" element={<ResourceRecycling />} />
              <Route path="/resource-monitoring" element={<ResourceMonitoring />} />
              <Route path="/power-schedule" element={<PowerSchedule />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App; 