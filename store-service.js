const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

const initialize = () => {
    return new Promise((resolve, reject) => {
        const itemJson = path.join(__dirname, './data/items.json');
        const categoriesJson= path.join(__dirname, './data/categories.json');

        // Reading item.json file
        fs.readFile(itemJson, 'utf8', (err, data) => {
            if (err) {
                reject(`Unable to read file. ${err.message}`);
                return;
            }
            items = JSON.parse(data);
            resolve('Item.json file is read successfully');

            // Reading categories.json file
            fs.readFile(categoriesJson,'utf8', (err, data) => {
                if (err) {
                    reject(`Unable to read file. ${err.message}`);
                    return;
                }
                categories = JSON.parse(data);
                resolve('Categories.json file is read successfully');
            });
        });
    });
};

const getAllItems = () => {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject(`No results returned`);
        } else {
            resolve(items);
        }
    });
};

const getPublishedItems = () => {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length === 0) {
            reject(`No results returned`);
        } else {
            resolve(publishedItems);
        }
    });
};


const getCategories = () => {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject(`No results returned`);
        } else {
            resolve(categories);
        }
    });
};

module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};