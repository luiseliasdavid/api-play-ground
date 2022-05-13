const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('brand', {
        // Model attributes are defined here
        nameBrand: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}