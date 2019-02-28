module.exports = function (sequelize, Sequelize) {
    var Retencion = sequelize.define('retencion', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        cliente: {
            type: Sequelize.STRING(50)
        },
        nro_factura: {
            type: Sequelize.STRING(50)
        },
        monto: {
            type: Sequelize.DOUBLE(10, 2)
        },
        tipo_clasificacion: {
            type: Sequelize.STRING(50)
        },
        porcentaje_clasificacion: {
            type: Sequelize.DOUBLE(10, 2)
        },
        mes: {type: Sequelize.INTEGER},
        valor_retencion: {
            type: Sequelize.DOUBLE(10, 2)
        }

    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updateAt: 'fecha_modificacion'
    });


    return Retencion;
};



