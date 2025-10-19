'use client';

import { useState, useEffect } from 'react';
import { userStorage, leadsStorage, masterDataStorage, initializeStorage } from '@/utils/localStorage';

export default function TestLocalStorage() {
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [masterData, setMasterData] = useState({});
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Initialize storage and load data
    initializeStorage();
    loadData();
    runTests();
  }, []);

  const loadData = () => {
    setUsers(userStorage.getUsers());
    setLeads(leadsStorage.getLeads());
    setMasterData({
      countries: masterDataStorage.getMasterData('countries'),
      industries: masterDataStorage.getMasterData('industries'),
      leadSources: masterDataStorage.getMasterData('leadSources')
    });
  };

  const runTests = () => {
    const results = [];
    
    try {
      // Test 1: Check if default users are created
      const defaultUsers = userStorage.getUsers();
      results.push({
        test: 'Default Users Created',
        status: defaultUsers.length > 0 ? 'PASS' : 'FAIL',
        details: `Found ${defaultUsers.length} users`
      });

      // Test 2: Check if master data is initialized
      const countries = masterDataStorage.getMasterData('countries');
      results.push({
        test: 'Master Data Initialized',
        status: countries.length > 0 ? 'PASS' : 'FAIL',
        details: `Found ${countries.length} countries`
      });

      // Test 3: Test user authentication
      const testUser = userStorage.authenticateUser('admin@example.com', 'admin123');
      results.push({
        test: 'User Authentication',
        status: testUser ? 'PASS' : 'FAIL',
        details: testUser ? `Authenticated as ${testUser.userName}` : 'Authentication failed'
      });

      // Test 4: Test adding a new user
      const newUser = userStorage.addUser({
        userName: 'Test User',
        userEmail: 'test@example.com',
        userPassword: 'test123',
        userPhoneNumber: '+1-555-9999',
        userRole: 'User'
      });
      results.push({
        test: 'Add New User',
        status: newUser ? 'PASS' : 'FAIL',
        details: newUser ? `Created user with ID: ${newUser._id}` : 'Failed to create user'
      });

      // Test 5: Test adding leads
      const newLeads = leadsStorage.addLeads([{
        name: 'Test Lead',
        email: 'testlead@example.com',
        phone: '+1-555-8888',
        ownerEmail: 'admin@example.com',
        leadStatus: 'New',
        leadSource: 'Website'
      }]);
      results.push({
        test: 'Add Leads',
        status: newLeads.length > 0 ? 'PASS' : 'FAIL',
        details: `Added ${newLeads.length} leads`
      });

    } catch (error) {
      results.push({
        test: 'Error Handling',
        status: 'FAIL',
        details: `Error: ${error.message}`
      });
    }

    setTestResults(results);
  };

  const clearAllData = () => {
    userStorage.resetUsers();
    localStorage.removeItem('leads');
    localStorage.removeItem('master_countries');
    localStorage.removeItem('master_industries');
    localStorage.removeItem('master_leadSources');
    loadData();
    runTests();
  };

  const forceUpdateAdmin = () => {
    userStorage.forceUpdateAdmin();
    loadData();
    runTests();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">LocalStorage Functionality Test</h1>
      
      {/* Test Results */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
        <div className="grid gap-4">
          {testResults.map((result, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              result.status === 'PASS' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-medium">{result.test}</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  result.status === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {result.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{result.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Users ({users.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map(user => (
              <div key={user._id} className="p-2 bg-gray-50 rounded text-sm">
                <div className="font-medium">{user.userName}</div>
                <div className="text-gray-600">{user.userEmail}</div>
                <div className="text-gray-500">{user.userRole}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leads */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Leads ({leads.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {leads.map(lead => (
              <div key={lead._id} className="p-2 bg-gray-50 rounded text-sm">
                <div className="font-medium">{lead.name}</div>
                <div className="text-gray-600">{lead.email}</div>
                <div className="text-gray-500">{lead.leadStatus}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Data */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Master Data</h3>
          <div className="space-y-2 text-sm">
            <div>Countries: {masterData.countries?.length || 0}</div>
            <div>Industries: {masterData.industries?.length || 0}</div>
            <div>Lead Sources: {masterData.leadSources?.length || 0}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>
        <button
          onClick={runTests}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Run Tests
        </button>
        <button
          onClick={clearAllData}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All Data
        </button>
        <button
          onClick={forceUpdateAdmin}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Force Update Admin
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ul className="text-sm space-y-1">
          <li>• This page tests all localStorage functionality</li>
          <li>• All CRM APIs have been replaced with localStorage</li>
          <li>• Default users: admin@gmail.com (Admin@123), sales@example.com (sales123)</li>
          <li>• Data persists in browser localStorage</li>
          <li>• Use &quot;Clear All Data&quot; to reset to initial state</li>
          <li>• Use &quot;Force Update Admin&quot; to fix admin login issues</li>
        </ul>
      </div>
    </div>
  );
}
