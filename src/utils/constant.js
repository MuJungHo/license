export const userlist = [
    {
        _id: "Admin",
        name: "Admin",
        role: "Admin",
        license: {
            "SMARTPASS-Trial": "",
            "SMARTPASS-Pro": "",
        }
    },
    {
        _id: "Operator",
        name: "Operator",
        role: "Operator",
        license: {
            "SMARTPASS-Trial": 400,
            "SMARTPASS-Pro": 400,
        }
    },
    {
        _id: "UserA",
        name: "UserA",
        role: "User",
        license: {
            "SMARTPASS-Pro": 0,
            "SMARTPASS-Trial": 10
        }
    },
    {
        _id: "UserB",
        name: "UserB",
        role: "User",
        license: {
            "SMARTPASS-Pro": 10
        }
    }
]

export const licenselist = [
    {
        _id: "SMARTPASS_trial",
        name: "SMARTPASS Trial",
        product: "SMARTPASS",
        parameters: [
            { _id: "amount", name: "amount", type: "text", options: [], text: "" },
            { _id: "expiredays", name: "expiredays", type: "text", options: [], text: "" },
            { _id: "seed", name: "seed", type: "text", options: [], text: "" },
            { _id: "const", name: "type", type: "const", options: [], text: "Trial" },
            { _id: "permissions", name: "permissions", type: "checkboxes", options: ["FRS", "VMS", "PMS"], text: "" },
            { _id: "filetype", name: "filetype", type: "dropdown", options: [".lic", ".hex"], text: "" },
        ]
    },
    {
        _id: "SMARTPASS_pro",
        name: "SMARTPASS Pro",
        product: "SMARTPASS",
        parameters: [
            { _id: "count", name: "count", type: "text", options: [], text: "" },
            { _id: "expiredays", name: "expiredays", type: "text", options: [], text: "" },
            { _id: "upload", name: "upload", type: "upload", options: [], text: "" },
            { _id: "purpose", name: "purpose", type: "text", options: [], text: "" },
        ]
    },
    // {
    //     _id: "ENOL_1k",
    //     name: "EnOL Enterprise 1k",
    //     product: "ENOL",
    //     parameters: [
    //         { _id: "hostname", name: "hostname", type: "textarea", options: [], text: "" },
    //         { _id: "hostip", name: "hostip", type: "textarea", options: [], text: "" },
    //         { _id: "serialnumber", name: "serialnumber", type: "text", options: [], text: "" },
    //         { _id: "supplier", name: "supplier", type: "text", options: [], text: "" },
    //         { _id: "client", name: "client", type: "text", options: [], text: "" },
    //         { _id: "note", name: "note", type: "textarea", options: [], text: "" },
    //         { _id: "dashboard", name: "dashboard", type: "date", options: [], text: "" },
    //         { _id: "producttype", name: "producttype", type: "radio", options: ["trail", "pro"], text: "" },
    //     ]
    // },
    // {
    //     _id: "ENOL_5k",
    //     name: "EnOL Enterprise 5k",
    //     product: "ENOL",
    //     parameters: [
    //         { _id: "amount", name: "amount", type: "const", options: [], text: "1000" },
    //     ]
    // }
]

export const loglist = [
    {
        _id: "l-3",
        account: "Admin",
        name: "新增/刪除 使用者",
        description: "新增 Operator",
        datetime: "2024-06-06 09:50"
    },
    {
        _id: "l-3",
        account: "Admin",
        name: "轉移/下載 授權",
        description: "轉移 SMARTPASS Trial 至 Operator, 400",
        datetime: "2024-06-06 10:00"
    },
    {
        _id: "l-6",
        account: "Admin",
        name: "轉移/下載 授權",
        description: "轉移 SMARTPASS Pro 至 Operator, 400",
        datetime: "2024-06-06 10:00"
    },
    {
        _id: "l-1",
        account: "Operator",
        name: "新增/刪除 使用者",
        description: "新增 UserA",
        datetime: "2024-06-06 09:30"
    },
    {
        _id: "l-2",
        account: "Operator",
        name: "新增/刪除 使用者",
        description: "新增 UserB",
        datetime: "2024-06-06 09:40"
    },
    {
        _id: "l-4",
        account: "Operator",
        name: "轉移/下載 授權",
        description: "轉移 SMARTPASS Trial 至 UserA, 10",
        datetime: "2024-06-06 10:10"
    },
    {
        _id: "l-5",
        account: "Operator",
        name: "轉移/下載 授權",
        description: "轉移 SMARTPASS Pro 至 UserB, 10",
        datetime: "2024-06-06 10:20"
    },
    {
        _id: "l-7",
        account: "UserA",
        name: "轉移/下載 授權",
        description: "下載 SMARTPASS Pro, 10",
        datetime: "2024-06-06 10:30"
    },
]