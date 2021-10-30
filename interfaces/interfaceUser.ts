interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;

}

export default interface User extends Address {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}
