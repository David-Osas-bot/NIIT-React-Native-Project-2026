export const roles = [
  {
    id: 'customer',
    title: "I'm a Customer",
    description: 'Order food from your favorite restaurants',
    image: require('../../../assets/customer.png'),
    icon: 'person',
    route: 'Login',
  },
  {
    id: 'driver',
    title: "I'm a Driver",
    description: 'Deliver food to customers and earn money',
    image: require('../../../assets/driver.png'),
    icon: 'car',
    route: 'DriverLogin',
  },
  {
    id: 'chef',
    title: "I'm a Chef",
    description: 'Prepare delicious food and grow your business',
    image: require('../../../assets/chef1.png'),
    icon: 'restaurant',
    route: 'ChefLogin',
  },
];