
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Target, Trash2 } from 'lucide-react';

const mockAssignments = [
  { 
    id: 1, 
    personnel: 'Sgt. Johnson', 
    equipment: 'M4 Rifle', 
    quantity: 1, 
    base: 'Base Alpha',
    date: '2024-06-10',
    status: 'Active'
  },
  { 
    id: 2, 
    personnel: 'Cpl. Smith', 
    equipment: 'Body Armor', 
    quantity: 1, 
    base: 'Base Beta',
    date: '2024-06-09',
    status: 'Active'
  },
  { 
    id: 3, 
    personnel: 'Lt. Wilson', 
    equipment: 'Communication Radio', 
    quantity: 2, 
    base: 'Base Charlie',
    date: '2024-06-08',
    status: 'Returned'
  },
];

const mockExpenditures = [
  { 
    id: 1, 
    equipment: 'Ammunition', 
    quantity: 100, 
    base: 'Base Alpha',
    date: '2024-06-10',
    reason: 'Training Exercise',
    authorizedBy: 'Maj. Davis'
  },
  { 
    id: 2, 
    equipment: 'Medical Supplies', 
    quantity: 25, 
    base: 'Base Beta',
    date: '2024-06-09',
    reason: 'Field Operations',
    authorizedBy: 'Capt. Miller'
  },
];

const equipmentTypes = ['M4 Rifle', 'Body Armor', 'Communication Radio', 'Medical Supplies', 'Ammunition', 'Night Vision'];
const bases = ['Base Alpha', 'Base Beta', 'Base Charlie'];

const Assignments = () => {
  const [activeTab, setActiveTab] = useState<'assignments' | 'expenditures'>('assignments');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [showExpendForm, setShowExpendForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [assignmentData, setAssignmentData] = useState({
    personnel: '',
    equipment: '',
    quantity: '',
    base: '',
    date: ''
  });

  const [expenditureData, setExpenditureData] = useState({
    equipment: '',
    quantity: '',
    base: '',
    date: '',
    reason: '',
    authorizedBy: ''
  });

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New assignment:', assignmentData);
    setShowAssignForm(false);
    setAssignmentData({ personnel: '', equipment: '', quantity: '', base: '', date: '' });
  };

  const handleExpenditureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New expenditure:', expenditureData);
    setShowExpendForm(false);
    setExpenditureData({ equipment: '', quantity: '', base: '', date: '', reason: '', authorizedBy: '' });
  };

  const filteredAssignments = mockAssignments.filter(assignment =>
    assignment.personnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExpenditures = mockExpenditures.filter(expenditure =>
    expenditure.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expenditure.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Assignments & Expenditures</h1>
          <p className="text-muted-foreground">Manage asset assignments and expenditures</p>
        </div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAssignForm(true)}
            className="military-button flex items-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Assign Asset</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExpendForm(true)}
            className="military-button-danger flex items-center space-x-2"
          >
            <Target className="w-5 h-5" />
            <span>Mark Expended</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="military-card p-1"
      >
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'assignments'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-foreground hover:bg-primary/20'
            }`}
          >
            Asset Assignments
          </button>
          <button
            onClick={() => setActiveTab('expenditures')}
            className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'expenditures'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-foreground hover:bg-primary/20'
            }`}
          >
            Asset Expenditures
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="military-card p-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="military-input pl-12 w-full"
          />
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'assignments' ? (
          <motion.div
            key="assignments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="military-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/20">
                  <tr>
                    <th className="text-left p-4 text-foreground font-semibold">Personnel</th>
                    <th className="text-left p-4 text-foreground font-semibold">Equipment</th>
                    <th className="text-left p-4 text-foreground font-semibold">Quantity</th>
                    <th className="text-left p-4 text-foreground font-semibold">Base</th>
                    <th className="text-left p-4 text-foreground font-semibold">Date</th>
                    <th className="text-left p-4 text-foreground font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment, index) => (
                    <motion.tr
                      key={assignment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-border hover:bg-card/50 transition-colors"
                    >
                      <td className="p-4 text-foreground font-medium">{assignment.personnel}</td>
                      <td className="p-4 text-foreground">{assignment.equipment}</td>
                      <td className="p-4 text-foreground">{assignment.quantity}</td>
                      <td className="p-4 text-foreground">{assignment.base}</td>
                      <td className="p-4 text-muted-foreground">{assignment.date}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          assignment.status === 'Active' 
                            ? 'text-green-400 bg-green-500/20' 
                            : 'text-gray-400 bg-gray-500/20'
                        }`}>
                          {assignment.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expenditures"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="military-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-destructive/20">
                  <tr>
                    <th className="text-left p-4 text-foreground font-semibold">Equipment</th>
                    <th className="text-left p-4 text-foreground font-semibold">Quantity</th>
                    <th className="text-left p-4 text-foreground font-semibold">Base</th>
                    <th className="text-left p-4 text-foreground font-semibold">Date</th>
                    <th className="text-left p-4 text-foreground font-semibold">Reason</th>
                    <th className="text-left p-4 text-foreground font-semibold">Authorized By</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenditures.map((expenditure, index) => (
                    <motion.tr
                      key={expenditure.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-border hover:bg-card/50 transition-colors"
                    >
                      <td className="p-4 text-foreground font-medium">{expenditure.equipment}</td>
                      <td className="p-4 text-destructive font-semibold">-{expenditure.quantity}</td>
                      <td className="p-4 text-foreground">{expenditure.base}</td>
                      <td className="p-4 text-muted-foreground">{expenditure.date}</td>
                      <td className="p-4 text-foreground">{expenditure.reason}</td>
                      <td className="p-4 text-foreground">{expenditure.authorizedBy}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assignment Modal */}
      <AnimatePresence>
        {showAssignForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 mt-12 mb-12 overflow-auto"
            onClick={() => setShowAssignForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="military-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Assign Asset to Personnel</h3>
              
              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Personnel Name</label>
                  <input
                    type="text"
                    value={assignmentData.personnel}
                    onChange={(e) => setAssignmentData({...assignmentData, personnel: e.target.value})}
                    className="military-input w-full"
                    placeholder="e.g., Sgt. Johnson"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Equipment Type</label>
                  <select
                    value={assignmentData.equipment}
                    onChange={(e) => setAssignmentData({...assignmentData, equipment: e.target.value})}
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
                    value={assignmentData.quantity}
                    onChange={(e) => setAssignmentData({...assignmentData, quantity: e.target.value})}
                    className="military-input w-full"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Base</label>
                  <select
                    value={assignmentData.base}
                    onChange={(e) => setAssignmentData({...assignmentData, base: e.target.value})}
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
                  <label className="block text-sm font-medium text-foreground mb-2">Assignment Date</label>
                  <input
                    type="date"
                    value={assignmentData.date}
                    onChange={(e) => setAssignmentData({...assignmentData, date: e.target.value})}
                    className="military-input w-full"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAssignForm(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-card/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="military-button flex-1"
                  >
                    Assign Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expenditure Modal */}
      <AnimatePresence>
        {showExpendForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 mt-12 mb-12 overflow-auto"
            onClick={() => setShowExpendForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="military-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Mark Assets as Expended</h3>
              
              <form onSubmit={handleExpenditureSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Equipment Type</label>
                  <select
                    value={expenditureData.equipment}
                    onChange={(e) => setExpenditureData({...expenditureData, equipment: e.target.value})}
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
                    value={expenditureData.quantity}
                    onChange={(e) => setExpenditureData({...expenditureData, quantity: e.target.value})}
                    className="military-input w-full"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Base</label>
                  <select
                    value={expenditureData.base}
                    onChange={(e) => setExpenditureData({...expenditureData, base: e.target.value})}
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
                  <label className="block text-sm font-medium text-foreground mb-2">Expenditure Date</label>
                  <input
                    type="date"
                    value={expenditureData.date}
                    onChange={(e) => setExpenditureData({...expenditureData, date: e.target.value})}
                    className="military-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Reason</label>
                  <input
                    type="text"
                    value={expenditureData.reason}
                    onChange={(e) => setExpenditureData({...expenditureData, reason: e.target.value})}
                    className="military-input w-full"
                    placeholder="e.g., Training Exercise"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Authorized By</label>
                  <input
                    type="text"
                    value={expenditureData.authorizedBy}
                    onChange={(e) => setExpenditureData({...expenditureData, authorizedBy: e.target.value})}
                    className="military-input w-full"
                    placeholder="e.g., Maj. Davis"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowExpendForm(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-card/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="military-button-danger flex-1"
                  >
                    Mark Expended
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

export default Assignments;
