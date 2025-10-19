// localStorage utility functions to replace CRM APIs

// User management functions
export const userStorage = {
  // Get all users from localStorage
  getUsers: () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  // Save users to localStorage
  saveUsers: (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Add a new user
  addUser: (userData) => {
    const users = userStorage.getUsers();
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      userStatus: "Active",
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    userStorage.saveUsers(users);
    return newUser;
  },

  // Update user
  updateUser: (userId, updateData) => {
    const users = userStorage.getUsers();
    const userIndex = users.findIndex(user => user._id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData };
      userStorage.saveUsers(users);
      return users[userIndex];
    }
    return null;
  },

  // Find user by email and password (for login)
  authenticateUser: (email, password) => {
    const users = userStorage.getUsers();
    return users.find(user => 
      user.userEmail === email && user.userPassword === password
    );
  },

  // Check if user exists by email
  userExists: (email) => {
    const users = userStorage.getUsers();
    return users.some(user => user.userEmail === email);
  },

  // Clear all users and reset to default
  resetUsers: () => {
    localStorage.removeItem('users');
    // Reinitialize with default users
    const defaultUsers = [
      {
        _id: "1",
        userName: "Admin User",
        userEmail: "admin@gmail.com",
        userPassword: "Admin@123",
        userPhoneNumber: "+1-555-0001",
        userRole: "Administrator",
        userStatus: "Active",
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        _id: "2",
        userName: "Sales User",
        userEmail: "sales@example.com",
        userPassword: "sales123",
        userPhoneNumber: "+1-555-0002",
        userRole: "sales user",
        userStatus: "Active",
        createdAt: "2024-01-01T00:00:00Z"
      }
    ];
    userStorage.saveUsers(defaultUsers);
    return defaultUsers;
  },

  // Force update admin user credentials
  forceUpdateAdmin: () => {
    const users = userStorage.getUsers();
    const adminIndex = users.findIndex(user => user.userEmail === "admin@gmail.com");
    
    if (adminIndex !== -1) {
      // Update existing admin user
      users[adminIndex] = {
        ...users[adminIndex],
        userPassword: "Admin@123",
        userRole: "Administrator"
      };
    } else {
      // Add new admin user
      users.push({
        _id: Date.now().toString(),
        userName: "Admin User",
        userEmail: "admin@gmail.com",
        userPassword: "Admin@123",
        userPhoneNumber: "+1-555-0001",
        userRole: "Administrator",
        userStatus: "Active",
        createdAt: new Date().toISOString()
      });
    }
    
    userStorage.saveUsers(users);
    return users[adminIndex] || users[users.length - 1];
  }
};

// Leads management functions
export const leadsStorage = {
  // Get all leads from localStorage
  getLeads: () => {
    const leads = localStorage.getItem('leads');
    return leads ? JSON.parse(leads) : [];
  },

  // Save leads to localStorage
  saveLeads: (leads) => {
    localStorage.setItem('leads', JSON.stringify(leads));
  },

  // Add new leads (for bulk upload)
  addLeads: (leadsData) => {
    const existingLeads = leadsStorage.getLeads();
    const newLeads = leadsData.map(lead => ({
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...lead,
      createdAt: new Date().toISOString()
    }));
    const updatedLeads = [...existingLeads, ...newLeads];
    leadsStorage.saveLeads(updatedLeads);
    return newLeads;
  },

  // Get leads by owner email
  getLeadsByOwner: (ownerEmail) => {
    const leads = leadsStorage.getLeads();
    return leads.filter(lead => lead.ownerEmail === ownerEmail);
  }
};

// Master data management functions
export const masterDataStorage = {
  // Get master data by type
  getMasterData: (type) => {
    const data = localStorage.getItem(`master_${type}`);
    return data ? JSON.parse(data) : [];
  },

  // Save master data by type
  saveMasterData: (type, data) => {
    localStorage.setItem(`master_${type}`, JSON.stringify(data));
  },

  // Initialize default master data
  initializeMasterData: () => {
    // Initialize with some default data if not exists
    const defaultData = {
      countries: [
        { _id: '1', name: 'United States', code: 'US' },
        { _id: '2', name: 'Canada', code: 'CA' },
        { _id: '3', name: 'United Kingdom', code: 'UK' },
        { _id: '4', name: 'Australia', code: 'AU' }
      ],
      industries: [
        { _id: '1', name: 'Technology', description: 'Technology sector' },
        { _id: '2', name: 'Healthcare', description: 'Healthcare sector' },
        { _id: '3', name: 'Finance', description: 'Finance sector' },
        { _id: '4', name: 'Education', description: 'Education sector' }
      ],
      leadSources: [
        { _id: '1', name: 'Website', description: 'Company website' },
        { _id: '2', name: 'Referral', description: 'Customer referral' },
        { _id: '3', name: 'Social Media', description: 'Social media platforms' },
        { _id: '4', name: 'Cold Call', description: 'Cold calling' }
      ]
    };

    Object.keys(defaultData).forEach(type => {
      if (!masterDataStorage.getMasterData(type).length) {
        masterDataStorage.saveMasterData(type, defaultData[type]);
      }
    });
  }
};

// Initialize default data on first load
export const initializeStorage = () => {
  const users = userStorage.getUsers();
  
  // Always ensure admin user exists with correct credentials
  const adminUser = users.find(user => user.userEmail === "admin@gmail.com");
  if (!adminUser) {
    // Add admin user if it doesn't exist
    userStorage.addUser({
      userName: "Admin User",
      userEmail: "admin@gmail.com",
      userPassword: "Admin@123",
      userPhoneNumber: "+1-555-0001",
      userRole: "Administrator"
    });
  } else if (adminUser.userPassword !== "Admin@123") {
    // Update admin user password if it's incorrect
    userStorage.updateUser(adminUser._id, { userPassword: "Admin@123" });
  }

  // Ensure sales user exists
  const salesUser = users.find(user => user.userEmail === "sales@example.com");
  if (!salesUser) {
    userStorage.addUser({
      userName: "Sales User",
      userEmail: "sales@example.com",
      userPassword: "sales123",
      userPhoneNumber: "+1-555-0002",
      userRole: "sales user"
    });
  }

  // Initialize master data
  masterDataStorage.initializeMasterData();
};

// Session management
export const sessionStorage = {
  // Set user session
  setSession: (user, token) => {
    localStorage.setItem("userrole", user.userRole);
    localStorage.setItem("token", token || "local_token_" + Date.now());
    localStorage.setItem("userId", user._id);
    localStorage.setItem("userEmail", user.userEmail);
    localStorage.setItem("lastActivity", Date.now().toString());
  },

  // Clear session
  clearSession: () => {
    localStorage.removeItem("userrole");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("lastActivity");
  },

  // Get current session
  getSession: () => {
    return {
      userRole: localStorage.getItem("userrole"),
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userEmail: localStorage.getItem("userEmail"),
      lastActivity: localStorage.getItem("lastActivity")
    };
  }
};
