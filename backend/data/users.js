import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        isVendor: true,
        isBlogger: true
    },
    {
        name: 'Venodr User',
        email: 'venodr@example.com',
        password: bcrypt.hashSync('123456', 10),
        isVendor: true
    },
    {
        name: 'Blogger User',
        email: 'blogger@example.com',
        password: bcrypt.hashSync('123456', 10),
        isBlogger: true
    },
    {
        name: 'Customer 1',
        email: 'customer@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 2',
        email: 'customer2@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 3',
        email: 'customer3@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 4',
        email: 'customer4@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 5',
        email: 'customer5@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 6',
        email: 'customer6@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Customer 7',
        email: 'customer7@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users