
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Calendar, Package } from 'lucide-react';

const mockPurchases = [
  { id: 1, base: 'Base Alpha', equipment: 'M4 Rifles', quantity: 50, date: '2024-06-10', cost: 125000 },
  { id: 2, base: 'Base Beta', equipment: 'Body Armor', quantity: 30, date: '2024-06-09', cost: 45000 },
  { id: 3, base: 'Base Charlie', equipment: 'Communication Radios', quantity: 25, date: '2024-06-08', cost: 75000 },
  { id: 4, base: 'Base Alpha', equipment: 'Medical Supplies', quantity: 100, date: '2024-06-07', cost: 25000 },
];

const equipmentTypes = ['M4 Rifles', 'Body Armor', 'Communication Radios', 'Medical Supplies', 'Vehicles', 'Ammunition'];
const bases = ['Base Alpha', 'Base Beta', 'Base Charlie'];

const Purchases = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEquipment, setFilterEquipment] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [formData, setFormData] = useState({
    base: '',
    equipment: '',
    quantity: '',
    date: '',
    cost: ''
  });

  const filteredPurchases = mockPurchases.filter(purchase => {
    const matchesSearch = purchase.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.base.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment = !filterEquipment || purchase.equipment === filterEquipment;
    const matchesDate = !filterDate || purchase.date === filterDate;
    
    return matchesSearch && matchesEquipment && matchesDate;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New purchase:', formData);
    setShowAddForm(false);
    setFormData({ base: '', equipment: '', quantity: '', date: '', cost: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Purchases</h1>
          <p className="text-muted-foreground">Manage asset purchases and procurement</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="military-button flex items-center space-x-2 "
        >
          <Plus className="w-5 h-5" />
          <span>Add Purchase</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="military-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search purchases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="military-input pl-12 w-full"
            />
          </div>
          
          <select
            value={filterEquipment}
            onChange={(e) => setFilterEquipment(e.target.value)}
            className="military-input"
          >
            <option value="">All Equipment Types</option>
            {equipmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="military-input"
          />
        </div>
      </motion.div>

      {/* Purchases Table */}
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
                <th className="text-left p-4 text-foreground font-semibold">Base</th>
                <th className="text-left p-4 text-foreground font-semibold">Equipment</th>
                <th className="text-left p-4 text-foreground font-semibold">Quantity</th>
                <th className="text-left p-4 text-foreground font-semibold">Date</th>
                <th className="text-left p-4 text-foreground font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase, index) => (
                <motion.tr
                  key={purchase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border hover:bg-card/50 transition-colors"
                >
                  <td className="p-4 text-foreground">{purchase.base}</td>
                  <td className="p-4 text-foreground">{purchase.equipment}</td>
                  <td className="p-4 text-foreground">{purchase.quantity}</td>
                  <td className="p-4 text-muted-foreground">{purchase.date}</td>
                  <td className="p-4 text-accent font-semibold">${purchase.cost.toLocaleString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Purchase Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 mt-12 mb-12 overflow-auto"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="military-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Add New Purchase</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Base</label>
                  <select
                    value={formData.base}
                    onChange={(e) => setFormData({...formData, base: e.target.value})}
                    className="military-input w-full"
                    required
                  >
                    <option value="">Select Base</option>
                    {bases.map(base => (
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
                  <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="military-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Cost ($)</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                    className="military-input w-full"
                    min="0"
                    step="0.01"
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
                    Add Purchase
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

export default Purchases;
