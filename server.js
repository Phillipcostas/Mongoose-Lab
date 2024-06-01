// app.js

const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
const Customer = require('./models/schema');
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Display welcome message
console.log('Welcome to the CRM');

// User interface
let choice;
do {
    console.log('What would you like to do?');
    console.log('  1. Create a customer');
    console.log('  2. View all customers');
    console.log('  3. Update a customer');
    console.log('  4. Delete a customer');
    console.log('  5. Quit');

    choice = prompt('Number of action to run: ').trim();

    switch (choice) {
        case '1':
            createCustomer();
            break;
        case '2':
            viewCustomers();
            break;
        case '3':
            updateCustomer();
            break;
        case '4':
            deleteCustomer();
            break;
        case '5':
            console.log('Exiting the Application');
            mongoose.connection.close();
            break;
        default:
            console.log('Invalid choice. Please try again.');
    }
} while (choice !== '5');

// Functions to implement CRUD operations

function createCustomer() {
    try {
        console.log('Creating a customer...');
        const name = prompt('Enter customer name: ').trim();
        const age = parseInt(prompt('Enter customer age: ').trim());
        
        const customer = new Customer({
            name: name,
            age: age
        });

        customer.save()
            .then(() => {
                console.log('Customer created successfully.');
            })
            .catch(error => {
                console.error('Error creating customer:', error);
            });
    } catch (error) {
        console.error('Error creating customer:', error);
    }
}

function viewCustomers() {
    console.log('Viewing all customers...');
    Customer.find()
        .then(customers => {
            customers.forEach(customer => {
                console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
            });
        })
        .catch(error => {
            console.error('Error fetching customers:', error);
        });
}

function updateCustomer() {
    try {
        console.log('Updating a customer...');
        const customerId = prompt('Enter the ID of the customer to update: ').trim();
        const name = prompt('Enter the new name: ').trim();
        const age = parseInt(prompt('Enter the new age: ').trim());
        
        Customer.findByIdAndUpdate(customerId, { name, age })
            .then(() => {
                console.log('Customer updated successfully.');
            })
            .catch(error => {
                console.error('Error updating customer:', error);
            });
    } catch (error) {
        console.error('Error updating customer:', error);
    }
}

function deleteCustomer() {
    try {
        console.log('Deleting a customer...');
        const customerId = prompt('Enter the ID of the customer to delete: ').trim();
        
        Customer.findByIdAndDelete(customerId)
            .then(() => {
                console.log('Customer deleted successfully.');
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
            });
    } catch (error) {
        console.error('Error deleting customer:', error);
    }
}
