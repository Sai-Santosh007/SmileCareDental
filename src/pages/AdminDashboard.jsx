import { useState, useEffect } from 'react';
import { Lock, Unlock, RefreshCw, LogOut, Calendar, Users, Clock, Phone, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const CORRECT_PIN = '2580';
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle PIN input
  const handlePinDigit = (digit) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
      setPinError('');
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  // Handle PIN login
  const handleLogin = () => {
    if (pin === CORRECT_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN');
      setPin('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setAppointments(null);
    setActiveTab('upcoming');
    setError('');
  };

  // Fetch appointments
  const fetchAppointments = async (tab) => {
    if (!APPS_SCRIPT_URL) {
      setError('Apps Script URL not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const action = tab === 'upcoming' ? 'getNext10Days' : 'getAllRecords';
      const response = await fetch(`${APPS_SCRIPT_URL}?action=${action}`);
      const result = await response.json();

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when authenticated or tab changes
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'upcoming') {
        fetchAppointments('upcoming');
      } else if (activeTab === 'all' && !appointments) {
        fetchAppointments('all');
      }
    }
  }, [isAuthenticated, activeTab]);

  // Handle refresh
  const handleRefresh = () => {
    fetchAppointments(activeTab);
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'booked') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    } else if (statusLower === 'cancelled') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    } else if (statusLower === 'completed') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {status || 'Booked'}
      </span>
    );
  };

  // PIN Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter your 4-digit PIN</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                  i < pin.length
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 bg-gray-50 text-gray-300'
                }`}
              >
                {i < pin.length ? '•' : ''}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {pinError && (
            <div className="text-center mb-4">
              <span className="text-red-500 text-sm font-medium">{pinError}</span>
            </div>
          )}

          {/* PIN Pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                onClick={() => handlePinDigit(digit.toString())}
                className="h-14 rounded-lg bg-gray-100 hover:bg-gray-200 text-xl font-semibold text-gray-700 transition-colors active:scale-95"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="h-14 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors active:scale-95 flex items-center justify-center"
            >
              ← Backspace
            </button>
            <button
              onClick={() => handlePinDigit('0')}
              className="h-14 rounded-lg bg-gray-100 hover:bg-gray-200 text-xl font-semibold text-gray-700 transition-colors active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleLogin}
              disabled={pin.length !== 4}
              className={`h-14 rounded-lg font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                pin.length === 4
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Unlock className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Clinic Name */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">Smile Care Dental</span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Smile Care Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs and Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Upcoming (10 Days)
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'all'
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Records
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium text-sm">Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading appointments...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Appointments Display */}
        {!loading && !error && appointments && (
          <div className="space-y-8">
            {Object.keys(appointments).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No appointments found</p>
              </div>
            ) : (
              Object.entries(appointments).map(([date, slots]) => {
                const hasAppointments = Object.keys(slots).some(
                  slot => slots[slot] && slots[slot].length > 0
                );

                return (
                  <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Date Header */}
                    <div className="bg-teal-50 border-b border-teal-100 px-6 py-4">
                      <h2 className="text-xl font-bold text-teal-800">
                        {formatDate(date)}
                      </h2>
                    </div>

                    <div className="p-6">
                      {!hasAppointments ? (
                        <p className="text-gray-400 text-sm italic">No appointments</p>
                      ) : (
                        <div className="space-y-6">
                          {Object.entries(slots).map(([timeSlot, patients]) => {
                            if (!patients || patients.length === 0) return null;
                            const isFull = patients.length >= 5;

                            return (
                              <div key={timeSlot} className="border-l-4 border-teal-300 pl-4">
                                {/* Time Slot Header */}
                                <div className="flex items-center gap-3 mb-3">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <h3 className="text-base font-semibold text-gray-700">
                                    {timeSlot}
                                  </h3>
                                  {isFull && (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                      FULL
                                    </span>
                                  )}
                                  <span className="text-sm text-gray-500">
                                    ({patients.length} patient{patients.length !== 1 ? 's' : ''})
                                  </span>
                                </div>

                                {/* Patient Cards */}
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {patients.map((patient, index) => (
                                    <div
                                      key={index}
                                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-700 text-sm font-bold rounded-full">
                                            #{patient.token}
                                          </span>
                                        </div>
                                        {getStatusBadge(patient.status)}
                                      </div>
                                      
                                      <h4 className="font-bold text-gray-900 mb-1 truncate">
                                        {patient.name}
                                      </h4>
                                      
                                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                        <Phone className="w-3 h-3" />
                                        <span>{patient.phone}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Users className="w-3 h-3" />
                                        <span>{patient.type || 'Online'}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
