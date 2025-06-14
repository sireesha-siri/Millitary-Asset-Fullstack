
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Plus, Search, Calendar } from 'lucide-react';

const mockTransfers = [
  { 
    id: 1, 
    from: 'Base Alpha', 
    to: 'Base Beta', 
    equipment: 'Communication Radios', 
    quantity: 25, 
    date: '2024-06-10', 
    status: 'Completed',
    timestamp: '14:30'
  },
  { 
    id: 2, 
    from: 'Base Beta', 
    to: 'Base Charlie', 
    equipment: 'Medical Supplies', 
    quantity: 50, 
    date: '2024-06-09', 
    status: 'In Transit',
    timestamp: '09:15'
  },
  { 
    id: 3, 
    from: 'Base Charlie', 
    to: 'Base Alpha', 
    equipment: 'Body Armor', 
    quantity: 15, 
    date: '2024-06-08', 
    status: 'Completed',
    timestamp: '16:45'
  },
];

const equipmentTypes = ['Communication Radios', 'Medical Supplies', 'Body Armor', 'M4 Rifles', 'Vehicles', 'Ammunition'];
const bases = ['Base Alpha', 'Base Beta', 'Base Charlie'];

const Transfers = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    equipment: '',
    quantity: '',
    date: ''
  });

  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = transfer.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || transfer.date === filterDate;
    
    return matchesSearch && matchesDate;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New transfer:', formData);
    setShowAddForm(false);
    setFormData({ from: '', to: '', equipment: '', quantity: '', date: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-400 bg-green-500/20';
      case 'In Transit': return 'text-yellow-400 bg-yellow-500/20';
      case 'Pending': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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
          <h1 className="text-3xl font-bold text-black">Asset Transfers</h1>
          <p className="text-muted-foreground">Manage asset transfers between bases</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="military-button flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Transfer</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="military-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="military-input pl-12 w-full"
            />
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="military-input"
          />
        </div>
      </motion.div>

      {/* Transfers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="military-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/20">
              <tr>
                <th className="text-left p-4 text-foreground font-semibold">Transfer Route</th>
                <th className="text-left p-4 text-foreground font-semibold">Equipment</th>
                <th className="text-left p-4 text-foreground font-semibold">Quantity</th>
                <th className="text-left p-4 text-foreground font-semibold">Date & Time</th>
                <th className="text-left p-4 text-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransfers.map((transfer, index) => (
                <motion.tr
                  key={transfer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border hover:bg-card/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground">{transfer.from}</span>
                      <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{transfer.to}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{transfer.equipment}</td>
                  <td className="p-4 text-foreground">{transfer.quantity}</td>
                  <td className="p-4 text-muted-foreground">
                    <div>
                      <div>{transfer.date}</div>
                      <div className="text-sm">{transfer.timestamp}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Transfer Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 mt-12 mb-12 overflow-auto"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="military-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">New Asset Transfer</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">From Base</label>
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    className="military-input w-full"
                    required
                  >
                    <option value="">Select Source Base</option>
                    {bases.map(base => (
                      <option key={base} value={base}>{base}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">To Base</label>
                  <select
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    className="military-input w-full"
                    required
                  >
                    <option value="">Select Destination Base</option>
                    {bases.filter(base => base !== formData.from).map(base => (
                      <option key={base} value={base}>{base}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Equipment Type</label>
                  <select
                    value={formData.equipment}
                    onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                    className="military-input w-full"
                    required
                  >
                    <option value="">Select Equipment</option>
                    {equipmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="military-input w-full"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Transfer Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="military-input w-full"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-card/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="military-button flex-1"
                  >
                    Create Transfer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transfers;
