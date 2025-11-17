// src/components/layout/Sidebar/Sidebar.tsx

import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  PictureOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/tours',
      icon: <FileTextOutlined />,
      label: 'Туры',
    },
    {
      key: '/bookings',
      icon: <ShoppingOutlined />,
      label: 'Бронирования',
    },
    {
      key: '/categories',
      icon: <AppstoreOutlined />,
      label: 'Категории',
    },
    {
      key: '/gallery',
      icon: <PictureOutlined />,
      label: 'Галерея',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Клиенты',
    },
    {
      key: '/messages',
      icon: <MessageOutlined />,
      label: 'Сообщения',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key)
  )?.key || '/dashboard';

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: collapsed ? 14 : 16,
        }}
      >
        {collapsed ? 'BT' : 'Beles Travel'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
