export interface Product {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: number;
}

export interface Transaction {
    id: number;
    customer: Customer;
    date: Date;
    products: Product[];
    paymentMethod: "Credit Card" | "Bank Transfer" | "PayPal" | "Pix" | "Cash";
    currency: string;
    status: "Completed" | "Pending" | "Failed";
    totalAmount: number;
}

export interface Customer {
    email: string;
    name: string;
    age: number;
}

export interface Filter {
    statusCompleted?: boolean;
    statusPending?: boolean;
    statusFailed?: boolean;
    creditCard?: boolean;
    bankTransfer?: boolean;
    payPal?: boolean;
    pix?: boolean;
    cash?: boolean;
    currency?: string;
    userName?: string;
    emailAddress?: string;
}

export enum Status {
    Completed = "Completed",
    Pending = "Pending",
    Failed = "Failed",
}

export enum PaymentMethod {
    CreditCard = "Credit Card",
    BankTransfer = "Bank Transfer",
    PayPal = "PayPal",
    Pix = "Pix",
    Cash = "Cash",
}