
const customerRouter = require('../../data/customers.json');
const productRouter = require('../../data/products.json');
const orderRouter = require('../../data/order.json');
const categoryRouter = require('../../data/category.json');
const menuRouter = require('../../data/menu.json');
const leftMenuRouter = require('../../data/leftmenu.json');

module.exports = function() {
    return {
        customers: customerRouter,
        products: productRouter,
        orders: orderRouter,
        categories: categoryRouter,
        menus: menuRouter,
        leftmenus: leftMenuRouter,
    }
};