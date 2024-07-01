import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../Firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import {
  AiOutlineBell,
  AiOutlineCheckCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsChatDots, BsFillInfoCircleFill } from "react-icons/bs";

const NotificationCenter = () => {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0); // State for new notification count

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const notificationsRef = collection(db, "notifications");
      const q = query(notificationsRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(updatedNotifications);

        // Count new notifications
        const newCount = updatedNotifications.filter(
          (notification) => !notification.read
        ).length;
        setNewNotificationCount(newCount);
      });

      return unsubscribe;
    };

    fetchNotifications();
  }, [user]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);

    // Mark all new notifications as read when opening the panel
    if (!showNotifications && newNotificationCount > 0) {
      markAllAsRead();
    }
  };

  const markAllAsRead = async () => {
    const batch = writeBatch(db);

    notifications.forEach((notification) => {
      if (!notification.read) {
        const notificationRef = doc(db, "notifications", notification.id);
        batch.update(notificationRef, { read: true });
      }
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const clearNotifications = async () => {
    const batch = writeBatch(db);

    notifications.forEach((notification) => {
      const notificationRef = doc(db, "notifications", notification.id);
      batch.delete(notificationRef);
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    const notificationRef = doc(db, "notifications", notificationId);

    try {
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    const notificationRef = doc(db, "notifications", notificationId);

    try {
      await deleteDoc(notificationRef);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Function to format Firestore timestamp to a readable date string

  const formatFirestoreTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return ""; // Handle cases where timestamp is null, undefined, or lacks toDate method
    const dateObject = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date object
    return dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="absolute top-1 right-1">
      <button
        className="bg-gradient-to-r from-blue-500 to-pink-500 p-2 rounded-full text-white ml-4 mt-3 focus:outline-none relative "
        onClick={toggleNotifications}
      >
        <AiOutlineBell className="h-5 w-5" />
        {newNotificationCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-semibold rounded-full px-2">
            {newNotificationCount}
          </span>
        )}
      </button>
      {showNotifications && (
        <div className="absolute top-16 right-4 z-50">
          <div className="w-80 bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none flex items-center space-x-1"
                  >
                    Mark all as read
                    <AiOutlineCheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearNotifications}
                    className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none flex items-center space-x-1"
                  >
                    Clear all
                    <AiOutlineDelete className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <ul className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`flex items-start bg-white hover:bg-gray-100 p-3 rounded-md ${notification.read
                      ? "border-l-4 border-gray-200"
                      : "border-l-4 border-blue-500"
                      } transition duration-300 ease-in-out`}
                  >
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {notification.type === "message" ? (
                          <BsChatDots className="h-5 w-5" />
                        ) : (
                          <BsFillInfoCircleFill className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatFirestoreTimestamp(notification.timestamp)}
                      </p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-500 hover:underline focus:outline-none"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-500 hover:underline focus:outline-none ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
