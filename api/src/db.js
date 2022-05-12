require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/sneakers`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Sneakers, Colors, Users, Brand, Products, Reviews, Category, Cart } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Sneakers.belongsToMany(Colors, { through: 'Sneakers-Colors' });
Colors.belongsToMany(Sneakers, { through: 'Sneakers-Colors' });

Brand.hasMany(Sneakers, {foreignKey: 'brand_name', constraints: false});
Sneakers.belongsTo(Brand,{foreignKey: 'brand_name', constraints: false});


// Brand.hasMany(Sneakers, {foreignKey: 'brandName', targetId: 'name'});
// Sneakers.belongsTo(Brand, {foreignKey: 'brandName', sourcekey: 'brand_name'});


Sneakers.belongsToMany(Category, { through: 'Sneakers-Category' });
Category.belongsToMany(Sneakers, { through: 'Sneakers-Category' });


// Users.hasMany(Reviews, { through: 'Users-Reviews' })
// Reviews.belongsTo(Users, { through: 'Users-Reviews' })

// Reviews.belongsTo(Shoe);
// Shoe.hasMany(Reviews);


Sneakers.hasOne(Cart, { foreignKey: 'sneakerId', sourceKey: 'id' });
Cart.belongsTo(Sneakers, { foreignKey: 'sneakerId', targetId: 'id' });
Users.hasMany(Cart, { foreignKey: 'userId', sourceKey: 'id' });
Cart.belongsTo(Users, { foreignKey: 'userId', targetId: 'id' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
