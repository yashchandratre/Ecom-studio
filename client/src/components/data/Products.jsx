const product = [
{ id: 1, name: 'Classic Leather Tote', price: '₹4,499', img: '/Assets/beingstrong-big-bag.jpg' },
{ id: 2, name: 'Noise-Canceling Headphones', price: '₹8,999', img: '/Assets/beingstrong-shaker-bottle-black.jpg' },
{ id: 3, name: 'Minimalist Watch', price: '₹5,299', img: '/Assets/bs-towel.jpg' },
{ id: 4, name: 'Running Sneakers', price: '₹3,299', img: '/Assets/hr-olympic-bars1.jpg' },
{ id: 5, name: 'Wireless Charger', price: '₹1,299', img: '/Assets/hr-olympic-EZ-bars.jpg' },
{ id: 6, name: 'Scented Candle Set', price: '₹899', img: 'https://via.placeholder.com/400x300?text=Candle' },
];

const products = [
  {
    id: 1,
    name: 'Classic Leather Tote',
    price: '₹4,499',
    sku: 'TOTE-001',
    stock: 5,
    images: [
      '/Assets/hr-olympic-EZ-bars.jpg',
      '/Assets/hr-olympic-EZ-bars.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",
    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ],
  },
  { 
    id: 2, 
    name: 'Noise-Canceling Headphones', 
    price: '₹8,999', 
    sku: 'TOTE-001',
    stock: 12,
    images: [
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      '/Assets/hr-olympic-bars1.jpg',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HODDD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ],
 },
 { 
    id: 3, 
    name: 'Minimalist Watch', 
    price: '₹5,299', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]
},
{ 
    id: 4, 
    name: 'Running Sneakers', 
    price: '₹3,299', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HODDD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]
 },
{ 
    id: 5, 
    name: 'Wireless Charger', 
    price: '₹1,299', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",
    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]
 },
{ 
    id: 6, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 7, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 8, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 9, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 10, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 11, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 12, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 13, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
{ 
    id: 14, 
    name: 'Scented Candle Set', 
    price: '₹899', 
   sku: 'TOTE-001',
    stock: 12,
    images: [
      'https://via.placeholder.com/1200x900?text=Leather+Tote+1',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+2',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+3',
      'https://via.placeholder.com/1200x900?text=Leather+Tote+4',
    ],
    description: 'Handmade leather tote with spacious interior and matte finish. Perfect for everyday use.',
    category:"HOD",

    reviews: [
      { name: 'Anjali', rating: 5, text: 'Beautiful bag, great quality.', date: '2025-11-05T12:00:00Z' },
      { name: 'Ravi', rating: 4, text: 'Good value for the price.', date: '2025-12-01T09:00:00Z' },
    ]  
},
  // ... add others similarly (or keep existing ones but add images/reviews fields)
];

export default products;

