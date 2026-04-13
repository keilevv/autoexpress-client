import React, { useEffect, useState, useRef } from "react";
import { Badge, Dropdown, List, Button, Typography, notification, Spin } from "antd";
import { BellOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import notificationService from "../../../services/notification";
import { apiUrl } from "../../../helpers/constants";

const { Text } = Typography;

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = useSelector((state) => state.auth.accessToken);
  const listRef = useRef();

  const fetchNotifications = async (currentPage) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await notificationService.getNotifications(token, currentPage, 10);
      const newItems = res.data.results;
      if (newItems.length < 10) {
        setHasMore(false);
      }
      
      if (currentPage === 1) {
        setUnreadCount(res.data.unreadCount || 0);
        setNotifications(newItems);
      } else {
        setNotifications((prev) => [...prev, ...newItems]);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications(1);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    // Use SSE for real-time notifications
    const eventSource = new EventSource(`${apiUrl}/notifications/stream?token=${token}`);
    
    eventSource.onmessage = (e) => {
      try {
        const newNotification = JSON.parse(e.data);
        newNotification.is_read = false; // explicitly format incoming SSE message
        setNotifications((prev) => [newNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
        notification.info({
          message: newNotification.title,
          description: newNotification.description,
          placement: "bottomRight",
        });
      } catch (err) {
        console.error("Error parsing SSE data", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await notificationService.deleteNotification(token, id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      notification.error({ message: "Failed to delete notification" });
    }
  };

  const onLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage);
  };

  const loadMoreBtn =
    !loading && hasMore ? (
      <div style={{ textAlign: "center", marginTop: 12, height: 32, lineHeight: "32px" }}>
        <Button onClick={onLoadMore} type="link">Ver más</Button>
      </div>
    ) : null;

  const handleOpenChange = (open) => {
    if (open && unreadCount > 0) {
      notificationService.markAllAsRead(token).catch(err => console.log(err));
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }
  };

  const dropdownContent = (
    <div style={{ width: 350, backgroundColor: 'white', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: 10, maxHeight: 400, overflowY: 'auto' }}>
      <Typography.Title level={5} style={{ padding: '0 10px', marginBottom: 5 }}>
        Notificaciones
      </Typography.Title>
      <List
        loading={loading && page === 1}
        itemLayout="horizontal"
        loadMore={loadMoreBtn}
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => handleDelete(e, item._id)} />
            ]}
            style={{ 
              padding: '10px', 
              backgroundColor: item.is_read ? 'transparent' : '#f0f5ff',
              borderRadius: '4px',
              marginBottom: '4px',
              borderBottom: '1px solid #f0f0f0' 
            }}
          >
            <List.Item.Meta
              title={
                item.link ? (
                 <Link to={item.link} style={{ display: 'block' }}>{item.title}</Link>
                ) : (
                 <Text strong>{item.title}</Text>
                )
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Dropdown overlay={dropdownContent} trigger={["click"]} onOpenChange={handleOpenChange}>
      <button className="flex items-center justify-center hover:bg-gray-100 rounded-lg text-gray-700 text-lg p-2 mr-2">
        <Badge count={unreadCount} size="small">
          <BellOutlined style={{ fontSize: '20px', color: '#fff' }} />
        </Badge>
      </button>
    </Dropdown>
  );
}

export default NotificationList;