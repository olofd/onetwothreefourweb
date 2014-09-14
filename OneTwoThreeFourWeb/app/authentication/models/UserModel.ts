
module app.users {
    export interface User {
        Id?: string;
        UserName?: string;
        FirstName?: string;
        LastName?: string;
        Email?: string;
        Created?: any;
        Modified?: any;
        Deleted?: boolean
    }
}

