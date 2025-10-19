import Config from "./config";

const MasterJson = (type) => {
    switch (type) {
        case 'category':
            return [
                {
                    tabname: 'Category Master',
                    pagename: 'Category',
                    aliasname: 'category',
                    rightsidebarsize: 'sm',
                    fields: [
                        {
                            field: 'categoryname',
                            text: 'Category Name',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Category Name',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Category Name',
                            label: 'Category Name',
                        },
                        {
                            field: 'description',
                            text: 'Description',
                            type: 'textarea',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Description',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'status',
                            text: 'Status',
                            type: 'checkbox',
                            disabled: false,
                            required: false,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Select Status',
                            defaultvalue: 1,

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        }
                    ]
                }
            ];
            break;

        case 'researchstudy':
            return [
                {
                    tabname: 'Research Study Master',
                    pagename: 'Research Study',
                    aliasname: 'researchstudy',
                    rightsidebarsize: 'md',
                    fields: [
                        {
                            field: 'title',
                            text: 'Title',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Enter Title',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Title',
                            label: 'Title',
                        },
                        {
                            field: 'ayushcategoryid',
                            text: 'AYUSH Category',
                            type: 'dropdown',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Select AYUSH Category',
                            defaultvalue: '',
                            masterdata: 'category',
                            masterdatafield: 'categoryname',
                            formdatafield: 'ayushcategory',
                            cleanable: true,
                            searchable: true,
                            staticfilter: {
                                status: 1
                            },
                            projection: {
                                _id: 1,
                                categoryname: 1,
                            },

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'researchtypeid',
                            text: 'Research Type',
                            type: 'dropdown',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Select Research Type',
                            defaultvalue: '',
                            masterdata: 'researchtype',
                            masterdatafield: 'researchtypename',
                            formdatafield: 'researchtype',
                            cleanable: true,
                            searchable: true,
                            staticfilter: {
                                status: 1
                            },
                            projection: {
                                _id: 1,
                                researchtypename: 1,
                            },

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'abstract',
                            text: 'Abstract',
                            type: 'textarea',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Abstract',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'detailedsummary',
                            text: 'Detailed Summary',
                            type: 'html-editor',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Detailed Summary',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'institution',
                            text: 'Institution',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Enter Institution',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Institution',
                            label: 'Institution',
                        },
                        {
                            field: 'publicationdate',
                            text: 'Publication Date',
                            type: 'datepicker',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Select Publication Date',
                            defaultvalue: '',
                            cleanable: true,

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'datepicker',
                            filterplaceholder: 'Select Publication Date',
                            label: 'Publication Date',
                        },
                        {
                            field: 'languageid',
                            text: 'Language',
                            type: 'dropdown',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Select Language',
                            defaultvalue: '',
                            masterdata: 'language',
                            masterdataarray: Config.language,
                            formdatafield: 'language',
                            cleanable: true,
                            searchable: true,
                            staticfilter: {
                                status: 1
                            },
                            projection: {
                                _id: 1,
                                languagename: 1,
                            },

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'externallink',
                            text: 'External Link',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Enter External Link',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                    ]
                }
            ];
            break;

        case 'researchtype':
            return [
                {
                    tabname: 'Research Type Master',
                    pagename: 'Research Type',
                    aliasname: 'researchtype',
                    rightsidebarsize: 'sm',
                    fields: [
                        {
                            field: 'researchtypename',
                            text: 'Research Type Name',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Research Type Name',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Research Type Name',
                            label: 'Research Type Name',
                        },
                        {
                            field: 'status',
                            text: 'Status',
                            type: 'checkbox',
                            disabled: false,
                            required: false,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Select Status',
                            defaultvalue: 1,

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        }
                    ]
                }
            ];
            break;

        case 'author':
            return [
                {
                    tabname: 'Author Master',
                    pagename: 'Author',
                    aliasname: 'author',
                    rightsidebarsize: 'sm',
                    fields: [
                        {
                            field: 'authorname',
                            text: 'Author Name',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Author Name',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Author Name',
                            label: 'Author Name',
                        },
                        {
                            field: 'institution',
                            text: 'Institution',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Institution',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Institution',
                            label: 'Institution',
                        },
                        {
                            field: 'email',
                            text: 'Email',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Email',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Email',
                            label: 'Email',
                        },
                        {
                            field: 'phone',
                            text: 'Phone',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Phone',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Phone',
                            label: 'Phone',
                        },
                        {
                            field: 'specialization',
                            text: 'Specialization',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Specialization',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Specialization',
                            label: 'Specialization',
                        },
                        {
                            field: 'status',
                            text: 'Status',
                            type: 'checkbox',
                            disabled: false,
                            required: false,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Select Status',
                            defaultvalue: 1,

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        }
                    ]
                }
            ];
            break;

        case 'tag':
            return [
                {
                    tabname: 'Tag Master',
                    pagename: 'Tag',
                    aliasname: 'tag',
                    rightsidebarsize: 'sm',
                    fields: [
                        {
                            field: 'tagname',
                            text: 'Tag Name',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Tag Name',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Tag Name',
                            label: 'Tag Name',
                        },
                        {
                            field: 'description',
                            text: 'Description',
                            type: 'textarea',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Description',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'status',
                            text: 'Status',
                            type: 'checkbox',
                            disabled: false,
                            required: false,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Select Status',
                            defaultvalue: 1,

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        }
                    ]
                }
            ];
            break;

        case 'laymansummary':
            return [
                {
                    tabname: 'Layman Summary',
                    pagename: 'Layman Summary',
                    aliasname: 'laymansummary',
                    rightsidebarsize: 'sm',
                    fields: [
                        {
                            field: 'summarytitle',
                            text: 'Summary Title',
                            type: 'text',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Summary Title',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 1,
                            filtertype: 'text',
                            filterplaceholder: 'Enter Summary Title',
                            label: 'Summary Title',
                        },
                        {
                            field: 'laymansummary',
                            text: 'Layman Summary',
                            type: 'textarea',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Enter Layman Summary',
                            defaultvalue: '',

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'languageid',
                            text: 'Language',
                            type: 'dropdown',
                            disabled: false,
                            required: true,
                            defaultvisibility: true,
                            size: 'col-6',
                            placeholder: 'Select Language',
                            defaultvalue: '',
                            masterdata: 'language',
                            masterdataarray: Config.language,
                            formdatafield: 'language',
                            cleanable: true,
                            searchable: true,
                            staticfilter: {
                                status: 1
                            },
                            projection: {
                                _id: 1,
                                languagename: 1,
                            },

                            showingrid: true,
                            sorting: true,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        },
                        {
                            field: 'status',
                            text: 'Status',
                            type: 'checkbox',
                            disabled: false,
                            required: false,
                            defaultvisibility: true,
                            size: 'col-12',
                            placeholder: 'Select Status',
                            defaultvalue: 1,

                            showingrid: true,
                            sorting: false,
                            tablesize: 'tbl-w-250p',

                            filter: 0,
                        }
                    ]
                }
            ];
            break;

        default:
            return [];
    }
};

export default MasterJson;
