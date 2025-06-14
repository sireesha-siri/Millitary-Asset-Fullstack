
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  ShoppingCart, 
  ArrowLeftRight, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,Power
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();

  const menuItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: BarChart3, 
      permission: 'dashboard' 
    },
    { 
      path: '/purchases', 
      label: 'Purchases', 
      icon: ShoppingCart, 
      permission: 'purchases' 
    },
    { 
      path: '/transfers', 
      label: 'Transfers', 
      icon: ArrowLeftRight, 
      permission: 'transfers' 
    },
    { 
      path: '/assignments', 
      label: 'Assignments', 
      icon: Users, 
      permission: 'assignments' 
    },
  ];

  const filteredMenuItems = menuItems.filter(item => hasPermission(item.permission));

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full military-card z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className={`flex items-center justify-center rounded-full p-2 bg-primary/10 ${isCollapsed ? 'mx-auto' : ''}`}>
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">MAMS</h2>
                  <p className="text-xs text-muted-foreground">Military Asset MS</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-primary/20 text-foreground"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </motion.button>
        </div>

        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-primary/20 text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-card/50 rounded-md"
            >
              <p className="text-sm font-medium text-foreground-accent">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.roles}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          title="Logout"
          className={`w-full flex items-center space-x-3 p-3 rounded-md military-button-danger ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {isCollapsed ? (
            <Power className="w-5 h-5 text-black"/>
          ) : (
            <>
              <LogOut className="w-5 h-5 text-black" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            </>
          )}
        </motion.button>

      </div>
    </motion.div>
  );
};

export default Sidebar;
