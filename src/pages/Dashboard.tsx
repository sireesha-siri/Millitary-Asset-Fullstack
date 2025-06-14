import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Target,
  Calendar,
  Filter,
  X,
  ChevronDown
} from 'lucide-react';

// Mock data
const mockData = {
  openingBalance: 1250,
  closingBalance: 980,
  purchases: 320,
  transfersIn: 150,
  transfersOut: 180,
  assignedAssets: 890,
  expendedAssets: 90,
};

const equipmentTypes = ['All Types', 'Weapons', 'Vehicles', 'Communication', 'Medical', 'Supplies'];
const bases = ['All Bases', 'Base Alpha', 'Base Beta', 'Base Charlie'];

const Dashboard: React.FC = () => {
  const [showNetMovementModal, setShowNetMovementModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState('All Types');
  const [selectedBase, setSelectedBase] = useState('All Bases');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const netMovement = mockData.purchases + mockData.transfersIn - mockData.transfersOut;

  const metrics = [
    {
      title: 'Opening Balance',
      value: mockData.openingBalance,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Closing Balance',
      value: mockData.closingBalance,
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Net Movement',
      value: netMovement,
      icon: netMovement >= 0 ? TrendingUp : TrendingDown,
      color: netMovement >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: netMovement >= 0 ? 'bg-green-500/20' : 'bg-red-500/20',
      clickable: true,
    },
    {
      title: 'Assigned Assets',
      value: mockData.assignedAssets,
      icon: Target,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: 'Expended Assets',
      value: mockData.expendedAssets,
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-muted-foreground">Asset management overview</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <select
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
              className="military-input pr-10 appearance-none"
            >
              {bases.map((base) => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="military-input pr-10 appearance-none"
            >
              {equipmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="military-input"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="military-input"
            />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`military-card p-6 ${metric.clickable ? 'cursor-pointer' : ''}`}
              onClick={metric.clickable ? () => setShowNetMovementModal(true) : undefined}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              {metric.clickable && (
                <p className="text-xs text-muted-foreground mt-2">Click for details</p>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="military-card p-6"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Purchase', item: '50x M4 Rifles', base: 'Base Alpha', time: '2 hours ago' },
            { action: 'Transfer', item: '25x Radios', base: 'Base Alpha → Base Beta', time: '4 hours ago' },
            { action: 'Assignment', item: '10x Body Armor', base: 'Base Charlie', time: '6 hours ago' },
            { action: 'Expenditure', item: '5x Ammunition', base: 'Base Alpha', time: '8 hours ago' },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-card/50 rounded-md hover:bg-card/70 transition-colors"
            >
              <div>
                <p className="font-medium text-white">{activity.action}: {activity.item}</p>
                <p className="text-sm text-muted-foreground">{activity.base}</p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Net Movement Modal */}
      <AnimatePresence>
        {showNetMovementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNetMovementModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="military-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Net Movement Breakdown</h3>
                <button onClick={() => setShowNetMovementModal(false)} className="p-2 rounded-md hover:bg-primary/20">
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-500/20 rounded-md">
                  <span className="text-foreground">Purchases</span>
                  <span className="font-bold text-green-400">+{mockData.purchases}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-500/20 rounded-md">
                  <span className="text-foreground">Transfers In</span>
                  <span className="font-bold text-blue-400">+{mockData.transfersIn}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/20 rounded-md">
                  <span className="text-foreground">Transfers Out</span>
                  <span className="font-bold text-red-400">-{mockData.transfersOut}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Net Movement</span>
                    <span className={`text-lg font-bold ${netMovement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {netMovement >= 0 ? '+' : ''}{netMovement}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
