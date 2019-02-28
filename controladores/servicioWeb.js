var models = require('../models');
var Retencion = models.retencion;
class Sw {
    obtenerClientes(req, res) {
        var clientes = {"clientes": ["Albert Mora", "Israel Campovertde", "Jefferson Romero", "Antonio Vega", "Gonzalo Mejia"]};
        res.status(200).json(clientes);
    }
    obtenerTipos(req, res) {
        var tipos = {"tipos": ["Servicios Profesionales", "Servicios Educativos"]};
        res.status(200).json(tipos);
    }
    verRetenciones(req, res) {
        Retencion.findAll().then(function (lista) {
            res.status(200).json(lista);
        });
    }

    verModificar(req, res) {
        var idRetencion = req.params.id;
        Retencion.findOne({where: {id: idRetencion}}).then(function (retencion) {
            res.status(200).json({retencion: retencion});
        });
    }

    sumarRetenciones(req, res) {
        Retencion.sum("valor_retencion").then(function (total) {
            Retencion.sum("valor_retencion", {where: {mes: "1"}}).then(function (mes1) {
                Retencion.sum("valor_retencion", {where: {mes: "2"}}).then(function (mes2) {
                    Retencion.sum("valor_retencion", {where: {mes: "3"}}).then(function (mes3) {
                        Retencion.sum("valor_retencion", {where: {mes: "4"}}).then(function (mes4) {
                            Retencion.sum("valor_retencion", {where: {mes: "5"}}).then(function (mes5) {
                                Retencion.sum("valor_retencion", {where: {mes: "6"}}).then(function (mes6) {
                                    Retencion.sum("valor_retencion", {where: {mes: "7"}}).then(function (mes7) {
                                        Retencion.sum("valor_retencion", {where: {mes: "8"}}).then(function (mes8) {
                                            Retencion.sum("valor_retencion", {where: {mes: "9"}}).then(function (mes9) {
                                                Retencion.sum("valor_retencion", {where: {mes: "10"}}).then(function (mes10) {
                                                    Retencion.sum("valor_retencion", {where: {mes: "11"}}).then(function (mes11) {
                                                        Retencion.sum("valor_retencion", {where: {mes: "12"}}).then(function (mes12) {
                                                            res.status(200).json({
                                                                total: total,
                                                                mes1: mes1,
                                                                mes2: mes2,
                                                                mes3: mes3,
                                                                mes4: mes4,
                                                                mes5: mes5,
                                                                mes6: mes6,
                                                                mes7: mes7,
                                                                mes8: mes8,
                                                                mes9: mes9,
                                                                mes10: mes10,
                                                                mes11: mes11,
                                                                mes12: mes12
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });










            });

        });

    }

    obtenerCantProducto(req, res) {
        var idProd = req.params.codigo;
        Lote.sum("cantidad", {where: {id_producto: idProd}}, {include: {model: Producto}}).then(function (cont) {
            res.status(200).json({cantidad: cont});
        });
    }

}
module.exports = Sw;


