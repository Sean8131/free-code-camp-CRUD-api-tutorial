import express from 'express';
import { v4 as uuidv4} from 'uuid';

const router = express.Router();


// Mock database

let users = [
    {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        status: "",
        id: "36424291-51ad-47bc-97fc-687b1fc528f8"
    },
    {
        first_name: "Alice",
        last_name: "Smith",
        status: "",
        email: "alicesmith@example.com",
        id: "32b2761d-760e-4bf2-92af-18ccfc27e55f"
    },    
];

// Getting the list of users from the mock database

router.get('/', (req, res) => {
    res.send(users);
});

router.post('/', (req, res) => {

    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
});

router.get('/:id', (req, res) => {

    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
});

router.delete('/:id', (req, res) => {
    
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`${id} deleted successfully from database`);
});

router.patch('/:id', (req, res) => {
    
    const { id } = req.params;

    const { first_name, last_name, email, status } = req.body;

    const user = users.find((user) => user.id === id);

    if(first_name) user.first_name = first_name;
    if(last_name) user.last_name = last_name;
    if(email) user.email = email;
    if(status) user.status = status;

    res.send(`User with the ${id} has been updated`)
});

export default router;