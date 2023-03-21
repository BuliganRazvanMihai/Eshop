import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Razvan',
          email: 'buligan2006@gmail.com',
          password: bcrypt.hashSync('test1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'doe@example.com',
          password: bcrypt.hashSync('1111', 8),
          isAdmin: false,
        },
      ],
    products: [
        {
            name: 'Resistor1',
            category: 'electronics',
            image: '/images/p1.jpg',
            price: 0.03,
            countInStock: 125,
            producer: 'Idk',
            rating: 5.0,
            numReviews: 0,
            description: 'detail about the resistor'
        },
        {
            name: 'Resistor2',
            category: 'electronics',
            image: '/images/p1.jpg',
            price: 0.03,
            countInStock: 125,
            producer: 'Idk',
            rating: 5.0,
            numReviews: 0,
            description: 'detail about the resistor'
        },
        {
            name: 'Resistor3',
            category: 'electronics',
            image: '/images/p1.jpg',
            price: 0.03,
            countInStock: 125,
            producer: 'Idk',
            rating: 5.0,
            numReviews: 0,
            description: 'detail about the resistor'
        },
        {
            name: 'Resistor4',
            category: 'electronics',
            image: '/images/p1.jpg',
            price: 0.03,
            countInStock: 125,
            producer: 'Idk',
            rating: 5.0,
            numReviews: 0,
            description: 'detail about the resistor'
        },
        {
            name: 'Resistor5',
            category: 'electronics',
            image: '/images/p1.jpg',
            price: 0.03,
            countInStock: 0,
            producer: 'Idk',
            rating: 5.0,
            numReviews: 0,
            description: 'detail about the resistor'
        },
    ]
};

export default data;