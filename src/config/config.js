const Config = {
    // ==================== BUTTON TEXTS ====================
    // Modal Buttons
    createbtn: 'Create',
    closebtn: 'Close',
    updatebtn: 'Update',
    cancelbtn: 'Cancel',
    continuebtn: 'Continue',
    deletebtn: 'Delete',
    previousbtn: 'Previous',
    nextbtn: 'Next',
    savebtn: 'Save',
    submitbtn: 'Submit',
    resetbtn: 'Reset',
    editbtn: 'Edit',
    viewbtn: 'View',
    searchbtn: 'Search',
    filterbtn: 'Filter',
    exportbtn: 'Export',
    importbtn: 'Import',
    downloadbtn: 'Download',
    uploadbtn: 'Upload',
    backbtn: 'Back',
    homebtn: 'Home',
    loginbtn: 'Login',
    logoutbtn: 'Logout',
    signupbtn: 'Sign Up',
    forgotpasswordbtn: 'Forgot Password',
    resetpasswordbtn: 'Reset Password',
    changepasswordbtn: 'Change Password',
    profilebtn: 'Profile',
    settingsbtn: 'Settings',
    helpbtn: 'Help',
    supportbtn: 'Support',
    contactbtn: 'Contact',

    // ==================== FORM LABELS ====================
    // User Form Labels
    fullnamelabel: 'Full Name',
    firstnamelabel: 'First Name',
    lastnamelabel: 'Last Name',
    emaillabel: 'Email Address',
    passwordlabel: 'Password',
    confirmpasswordlabel: 'Confirm Password',
    phonelabel: 'Phone Number',
    mobilelabel: 'Mobile Number',
    addresslabel: 'Address',
    citylabel: 'City',
    statelabel: 'State',
    countrylabel: 'Country',
    pincodelabel: 'PIN Code',
    rolelabel: 'User Role',
    departmentlabel: 'Department',
    designationlabel: 'Designation',
    companylabel: 'Company',
    websiteurl: 'Website URL',
    birthdatelabel: 'Birth Date',
    genderlabel: 'Gender',
    statuslabel: 'Status',
    activelabel: 'Active',
    inactivelabel: 'Inactive',

    // Lead Form Labels
    leadnamelabel: 'Lead Name',
    leademaillabel: 'Lead Email',
    leadphonelabel: 'Lead Phone',
    leadstatuslabel: 'Lead Status',
    leadsourcelabel: 'Lead Source',
    leadownerlabel: 'Lead Owner',
    leadvaluelabel: 'Lead Value',
    leadnotelabel: 'Notes',
    leadfilelabel: 'Lead File',
    leaddatelabel: 'Lead Date',
    followupdatelabel: 'Follow-up Date',

    // ==================== ERROR MESSAGES ====================
    // General Error Messages
    fillallfieldserror: 'Please Fill All Required Fields',
    fillallrequiredfild: 'Please fill all required fields',
    requirederror: 'is required',
    thisfieldrequirederror: 'This field is required',
    invalidformaterror: 'Invalid format',
    invalidlengtherror: 'Invalid length',
    invalidvalueerror: 'Invalid value',
    networkerror: 'Network error. Please check your connection',
    servererror: 'Server error. Please try again later',
    unauthorizederror: 'Unauthorized access',
    forbiddenerror: 'Access forbidden',
    notfounderror: 'Resource not found',
    timeouterror: 'Request timeout. Please try again',
    unknownerror: 'An unknown error occurred',

    // Validation Error Messages
    invalidEmailerror: 'Invalid email address',
    invalidPhoneerror: 'Invalid phone number',
    invalidPassworderror: 'Invalid password format',
    weakPassworderror: 'Password must be at least 8 characters long, include 1 uppercase, 1 number, and 1 special character',
    passwordMismatcherror: 'Passwords do not match',
    onlyNumberserror: 'should contain only digits',
    onlyAlphabetserror: 'should contain only alphabets',
    minLengtherror: 'must be at least {min} characters',
    maxLengtherror: 'must not exceed {max} characters',
    minValueerror: 'must be at least {min}',
    maxValueerror: 'must not exceed {max}',
    uniqueValueerror: 'This value already exists',
    invalidDateerror: 'Invalid date format',
    futureDateerror: 'Date cannot be in the future',
    pastDateerror: 'Date cannot be in the past',

    // File Upload Error Messages
    fileuploadsuccessfullyerror: 'File uploaded successfully!',
    fileuploadfailederror: 'File upload failed',
    errouploadingfileerror: 'Error uploading file. Please try again.',
    invalidFileFormaterror: 'Invalid file format (Only CSV & XLSX allowed)',
    fileSizeExceedederror: 'File size exceeds the maximum limit',
    fileNotFounderror: 'File not found',
    fileReadError: 'Error reading file',
    fileProcessError: 'Error processing file',

    // Authentication Error Messages
    loginFailederror: 'Login failed. Please check your credentials',
    invalidCredentialserror: 'Invalid email or password',
    accountLockederror: 'Account is locked. Please contact administrator',
    sessionExpirederror: 'Session expired. Please login again',
    tokenExpirederror: 'Token expired. Please login again',
    userNotFounderror: 'User not found',
    userAlreadyExistserror: 'User already exists',
    passwordResetFailederror: 'Password reset failed',
    emailNotVerifiederror: 'Email not verified',

    // ==================== SUCCESS MESSAGES ====================
    // General Success Messages
    datasaved: 'Data saved successfully',
    dataupdated: 'Data updated successfully',
    datadeleted: 'Data deleted successfully',
    datacreated: 'Data created successfully',
    datafetched: 'Data fetched successfully',
    dataaddedsuccessfully: 'Data added successfully',
    dataaddedfailed: 'Failed to add data',
    operationcompleted: 'Operation completed successfully',
    changesaved: 'Changes saved successfully',
    settingsupdated: 'Settings updated successfully',
    profileupdated: 'Profile updated successfully',

    // User Success Messages
    usercreated: 'User created successfully',
    userupdated: 'User updated successfully',
    userdeleted: 'User deleted successfully',
    useractivated: 'User activated successfully',
    userdeactivated: 'User deactivated successfully',
    passwordchanged: 'Password changed successfully',
    passwordresetsent: 'Password reset email sent',
    emailverified: 'Email verified successfully',
    accountcreated: 'Account created successfully',

    // Lead Success Messages
    leadcreated: 'Lead created successfully',
    leadupdated: 'Lead updated successfully',
    leaddeleted: 'Lead deleted successfully',
    leadconverted: 'Lead converted successfully',
    leadassigned: 'Lead assigned successfully',
    leadstatusupdated: 'Lead status updated successfully',

    // File Success Messages
    fileuploaded: 'File uploaded successfully',
    filedownloaded: 'File downloaded successfully',
    fileexported: 'File exported successfully',
    fileimported: 'File imported successfully',
    filedeleted: 'File deleted successfully',

    // ==================== WARNING MESSAGES ====================
    // General Warning Messages
    unsavedchanges: 'You have unsaved changes',
    sessionexpiring: 'Your session will expire soon',
    lowstorage: 'Storage space is running low',
    outdateddata: 'Data may be outdated. Please refresh',
    confirmdelete: 'Are you sure you want to delete this item?',
    confirmaction: 'Are you sure you want to perform this action?',
    datawillbelost: 'All unsaved data will be lost',
    operationcannotbeundone: 'This operation cannot be undone',

    // ==================== INFO MESSAGES ====================
    // General Info Messages
    loading: 'Loading...',
    processing: 'Processing your request...',
    refreshing: 'Refreshing data...',
    searching: 'Searching...',
    filtering: 'Filtering...',
    exporting: 'Exporting data...',
    importing: 'Importing data...',
    uploading: 'Uploading file...',
    downloading: 'Downloading file...',
    cancelling: 'Cancelling...',
    saving: 'Saving...',
    updating: 'Updating...',
    deleting: 'Deleting...',
    creating: 'Creating...',
    editing: 'Editing...',
    viewing: 'Viewing...',

    // ==================== PLACEHOLDER TEXTS ====================
    // Form Placeholders
    enterfullname: 'Enter full name',
    enterfirstname: 'Enter first name',
    enterlastname: 'Enter last name',
    enteremail: 'Enter email address',
    enterpassword: 'Enter password',
    enterconfirmpassword: 'Confirm password',
    enterphone: 'Enter phone number',
    entermobile: 'Enter mobile number',
    enteraddress: 'Enter address',
    entercity: 'Enter city',
    enterstate: 'Enter state',
    entercountry: 'Enter country',
    enterpincode: 'Enter PIN code',
    selectrole: 'Select user role',
    selectdepartment: 'Select department',
    selectdesignation: 'Select designation',
    entercompany: 'Enter company name',
    enterwebsite: 'Enter website URL',
    selectbirthdate: 'Select birth date',
    selectgender: 'Select gender',
    selectstatus: 'Select status',

    // Search and Filter Placeholders
    searchplaceholder: 'Search...',
    filterplaceholder: 'Filter...',
    selectall: 'Select All',
    deselectall: 'Deselect All',
    selectoption: 'Select an option',
    selectmultiple: 'Select multiple options',
    enterkeyword: 'Enter keyword',
    enterdate: 'Enter date',
    enterdaterange: 'Enter date range',

    // ==================== TABLE HEADERS ====================
    // User Table Headers
    useridheader: 'User ID',
    usernameheader: 'User Name',
    useremailheader: 'Email',
    userphoneheader: 'Phone',
    userroleheader: 'Role',
    userstatusheader: 'Status',
    usercreateddateheader: 'Created Date',
    userlastloginheader: 'Last Login',
    useractionsheader: 'Actions',

    // Lead Table Headers
    leadidheader: 'Lead ID',
    leadnameheader: 'Lead Name',
    leademailheader: 'Email',
    leadphoneheader: 'Phone',
    leadstatusheader: 'Status',
    leadsourceheader: 'Source',
    leadownerheader: 'Owner',
    leadvalueheader: 'Value',
    leaddateheader: 'Date',
    leadactionsheader: 'Actions',

    // ==================== PAGE TITLES ====================
    // Page Titles
    dashboardtitle: 'Dashboard',
    userstitle: 'Users',
    createusertitle: 'Create User',
    editusertitle: 'Edit User',
    viewusertitle: 'View User',
    leadstitle: 'Leads',
    createleadtitle: 'Create Lead',
    editleadtitle: 'Edit Lead',
    viewleadtitle: 'View Lead',
    salestitle: 'Sales',
    reportstitle: 'Reports',
    settingstitle: 'Settings',
    profiletitle: 'Profile',
    loginpage: 'Login',
    signuppage: 'Sign Up',
    forgotpasswordpage: 'Forgot Password',
    resetpasswordpage: 'Reset Password',
    changepasswordpage: 'Change Password',

    // ==================== NAVIGATION TEXTS ====================
    // Navigation Menu
    home: 'Home',
    dashboard: 'Dashboard',
    users: 'Users',
    leads: 'Leads',
    sales: 'Sales',
    reports: 'Reports',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    help: 'Help',
    support: 'Support',
    contact: 'Contact',
    about: 'About',

    // ==================== STATUS TEXTS ====================
    // Status Options
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
    cancelled: 'Cancelled',
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived',

    // Lead Status Options
    newlead: 'New Lead',
    contacted: 'Contacted',
    qualified: 'Qualified',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    closedwon: 'Closed Won',
    closedlost: 'Closed Lost',

    // ==================== ROLE TEXTS ====================
    // User Roles
    administrator: 'Administrator',
    admin: 'Admin',
    salesuser: 'Sales User',
    salesperson: 'Salesperson',
    manager: 'Manager',
    supervisor: 'Supervisor',
    employee: 'Employee',
    guest: 'Guest',

    // ==================== GENDER OPTIONS ====================
    male: 'Male',
    female: 'Female',
    other: 'Other',
    prefernottosay: 'Prefer not to say',

    // ==================== FILE TYPES ====================
    // Allowed File Types
    csv: 'CSV',
    xlsx: 'XLSX',
    pdf: 'PDF',
    doc: 'DOC',
    docx: 'DOCX',
    jpg: 'JPG',
    jpeg: 'JPEG',
    png: 'PNG',
    gif: 'GIF',
    txt: 'TXT',

    // ==================== DATE FORMATS ====================
    // Date Format Options
    dateformat1: 'DD/MM/YYYY',
    dateformat2: 'MM/DD/YYYY',
    dateformat3: 'YYYY-MM-DD',
    datetimeformat1: 'DD/MM/YYYY HH:mm',
    datetimeformat2: 'MM/DD/YYYY HH:mm',
    datetimeformat3: 'YYYY-MM-DD HH:mm:ss',

    // ==================== CURRENCY ====================
    // Currency Options
    inr: 'INR',
    usd: 'USD',
    eur: 'EUR',
    gbp: 'GBP',
    currencySymbol: '₹',
    currencyCode: 'INR',

    // ==================== VALIDATION RULES ====================
    // Validation Messages
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    password: 'Password must be at least 8 characters',
    confirmPassword: 'Passwords do not match',
    minLength: 'Minimum length is {min} characters',
    maxLength: 'Maximum length is {max} characters',
    min: 'Minimum value is {min}',
    max: 'Maximum value is {max}',
    pattern: 'Invalid format',
    custom: 'Invalid value',

    // ==================== API ENDPOINTS ====================
    // API Base URLs (if needed)
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://brockersbackend.finnovationz.com',
    serverurl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://brockersbackend.finnovationz.com',
    useraction: '/api',
    authEndpoint: '/auth',
    usersEndpoint: '/users',
    leadsEndpoint: '/leads',
    salesEndpoint: '/sales',
    reportsEndpoint: '/reports',
    uploadEndpoint: '/upload',
    downloadEndpoint: '/download',
    
    // Admin Authentication Endpoints
    adminRegisterEndpoint: '/api/article/admin/register',
    adminLoginEndpoint: '/api/article/admin/login',

    // Article Management Endpoints
    articlesEndpoint: '/api/article/articles',
    articleByIdEndpoint: '/api/article/articles',

    // ==================== APP CONFIGURATION ====================
    // App Settings
    appName: 'CRM System',
    appVersion: '1.0.0',
    appDescription: 'Customer Relationship Management System',
    companyName: 'Your Company Name',
    companyAddress: 'Your Company Address',
    companyPhone: '+91 1234567890',
    companyEmail: 'info@yourcompany.com',
    companyWebsite: 'https://yourcompany.com',

    // ==================== PAGINATION ====================
    // Pagination Settings
    itemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 25, 50, 100],
    showPagination: true,
    showPageSizeSelector: true,
    showTotalItems: true,

    // ==================== THEME SETTINGS ====================
    // Theme Configuration
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    successColor: '#10b981',
    errorColor: '#ef4444',
    warningColor: '#f59e0b',
    infoColor: '#3b82f6',
    lightTheme: 'light',
    darkTheme: 'dark',
    defaultTheme: 'light',

    // ==================== TOAST SETTINGS ====================
    // Toast Configuration
    toastPosition: 'top-right',
    toastAutoClose: 3000,
    toastHideProgressBar: false,
    toastCloseOnClick: true,
    toastPauseOnHover: true,
    toastDraggable: true,
    toastLimit: 5,

    // ==================== <MASTER DATA> ====================
    // Language Options
    language: [
        {
            label: 'English',
            value: 'en'
        },
        {
            label: 'Hindi',
            value: 'hi'
        },
        {
            label: 'Marathi',
            value: 'mr'
        },
        {
            label: 'Others',
            value: 'others'
        }
    ],

    // Journal Options
    journal: [
        { value: 1, label: "AyushVeda Ayurveda" },
        { value: 2, label: "AyushVeda Yoga" },
        { value: 3, label: "AyushVeda Naturopathy" },
        { value: 4, label: "AyushVeda Homeopathy" },
        { value: 5, label: "AyushVeda Unani" },
        { value: 6, label: "AyushVeda Siddha" },
        { value: 7, label: "AyushVeda Global Health" },
    ],

    // Article Type Options
    articletype: [
        { value: 1, label: "Original Research" },
        { value: 2, label: "Review Article" },
        { value: 3, label: "Commentary" },
        { value: 4, label: "Case Report" },
        { value: 5, label: "Letter to the Editor" },
        { value: 6, label: "Editorial" },
        { value: 7, label: "Clinical Trial" },
        { value: 8, label: "Meta-Analysis" },
    ],

    // Badge Type Options
    badgetype: [
        { value: 1, label: "Research" },
        { value: 2, label: "Open Access" },
        { value: 3, label: "Comment" },
        { value: 4, label: "News" },
        { value: 5, label: "Review" },
    ],

    // Journal Code Options
    journalcode: [
        { value: 1, label: "Technology" },
        { value: 2, label: "Cardiology" },
        { value: 3, label: "Medicine" },
        { value: 4, label: "Pediatrics" },
        { value: 5, label: "Oncology" },
        { value: 6, label: "Psychiatry" },
        { value: 7, label: "Ayurveda" },
        { value: 8, label: "Yoga" },
        { value: 9, label: "Naturopathy" },
        { value: 10, label: "Homeopathy" },
        { value: 11, label: "Unani" },
        { value: 12, label: "Siddha" },
        { value: 13, label: "Global Health" },
    ],
    

    // ===================== </MASTER DATA> ====================
};

export default Config;