'use strict';
var models = require('../models');
var Retencion = models.retencion;
const uuidv4 = require('uuid/v4');
const pdf = require('html-pdf');
var fs = require('file-system');
class retencionControlador {

    guardar(req, res) {

        Retencion.findOne({where: {nro_factura: req.body.nro_factura}}).then(function (existe) {
            if (existe) {
                req.flash('info', 'ERROR AL GUARDAR, EL NUMERO DE FACTURA YA EXISTE');
                res.redirect('/registro_retencion');
            } else {
                Retencion.create({
                    external_id: uuidv4(),
                    cliente: req.body.cliente,
                    nro_factura: req.body.nro_factura,
                    monto: req.body.monto,
                    tipo_clasificacion: req.body.clasificacion,
                    porcentaje_clasificacion: req.body.porcentaje,
                    mes: req.body.mes,
                    valor_retencion: req.body.retencion

                }).then(function (newPersona, created) {
                    if (newPersona) {
                        //req.flash('info', 'Se ha creado correctamente');
                        console.log("Se ha creado correctamente");
                        res.redirect('/retenciones');
                    }
                });
            }
        });
    }

    ver_retenciones(req, res) {
        res.render('plantilla_principal',
                {title: 'Retenciones',
                    fragmento: 'fragmentos/listar_retenciones',
                    info: req.flash('info')
                });
    }

    verRegistro(req, res) {
        Retencion.findAll().then(function (lista) {
            res.render('plantilla_principal', {
                title: 'Registro retencion',
                fragmento: 'fragmentos/registro_retencion',
                lista: lista,
                info: req.flash('info')
            });
        }).catch(function (err) {
            console.log("Error:", err);
            //req.flash('error', 'Hubo un error');
            res.redirect('registro_retencion');
        });
    }

    modificar(req, res) {

        Retencion.update({
            cliente: req.body.cliente,
            nro_factura: req.body.nro_factura,
            monto: req.body.monto,
            tipo_clasificacion: req.body.clasificacion,
            porcentaje_clasificacion: req.body.porcentaje,
            mes: req.body.mes,
            valor_retencion: req.body.retencion
        }, {where: {external_id: req.body.external}}).then(function (editado, err) {
            if (editado) {
                req.flash('info', 'SE HA MODIFICADO EXITOSAMENTE');
                res.redirect('/retenciones');
            }
        });
    }

    buscar(req, res) {
        Retencion.findAll({where: {mes: req.body.buscar_mes}}).then(function (busqueda) {
            res.render('plantilla_principal', {
                title: 'Registro retencion',
                fragmento: 'fragmentos/busqueda',
                lista: busqueda
            });
        }).catch(function (err) {
            console.log("Error:", err);
            res.redirect('/error');
        });
    }

    generarReporte(req, res) {
        Retencion.findAll({}).then(function (retencion) {
            var nombreArchivo = 'reporte_retenciones.pdf';//variable para dar nombre al archivo pdf
            var estiloTabla = '<style>table {font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;border-collapse: collapse;width: 100%;font-size:70%;}\n\
                    table td, #customers th {border: 1px solid #ddd;padding: 8px;}table tr:nth-child(even){background-color: #f2e3e3;}\n\
                    table th {padding-top: 12px;padding-bottom: 12px;text-center: left;background-color: #190006;color: white;}</style>';
            var contenido = estiloTabla + '<div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">\n\
                        <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align:right; font-family: sans-serif; font-size: .85em">';
            contenido += '</p></div><div style="background-color: #fafafa;  margin:1rem;padding:1rem;text-align: center; ">\n\
                        REPORTE DE RETENCIONES\n\
                        <table>\n\
                        <thead style="text-align: center;">\n\
                        <tr>\n\
                            <th scope="col">#</th>\n\
                            <th scope="col">Cliente</th>\n\
                            <th scope="col">Número de factura</th>\n\
                            <th scope="col">Monto</th>\n\
                            <th scope="col">Porcentaje</th>\n\
                            <th scope="col">Valor de retención</th>\n\
                            <th scope="col">Mes</th>\n\
                        </tr>\n\
                        </thead>\n\
                        <tbody>';
            for (var i = 0; i < retencion.length; i++) {
                contenido += '<tr>';
                contenido += ' <td>' + (i + 1) + '</td>';
                contenido += '<td>' + retencion[i].cliente + '</td>';
                contenido += '<td>' + retencion[i].nro_factura + '</td>';
                contenido += '<td>' + retencion[i].monto + '</td>';
                contenido += '<td>' + retencion[i].porcentaje_clasificacion + '</td>';
                contenido += '<td>' + retencion[i].valor_retencion + '</td>';
                contenido += '<td>' + retencion[i].mes + '</td>';

                contenido += '</tr>';
            }
            contenido += '<div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">\n\
                        <p style="color: #266; width: 70%; padding-bottom: 5px; text-align: left; font-family: sans-serif; font-size: .65em; float:center;">\n\
                        Esta lista se creó en una computadora y no es válida sin la firma y el sello.</p>\n\
                        <p style="color: #266; margin: 0; padding-bottom: 5px; text-align: right; font-family:sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p></div>';
            var options = {
                'format': 'A4',
                'header': {
                    'heigth': '60px'
                },
                "footer": {
                    'heigth': '22mm'
                }
            };
            //crear el pdf en una ruta del proyecto
            pdf.create(contenido, options).toFile('./' + nombreArchivo, function (err, respuesta) {//crreacion del pdf temporal en l acarpeta public reportes
                if (err) {
                    console.log(err);//mensaje de erro en el caso que lo haya
                } else {
                    console.log(respuesta);
                    res.download('./' + nombreArchivo, nombreArchivo, function () {//metodo para descargar el pedf
                        fs.unlinkSync('./' + nombreArchivo);// funcion anonima para elminar el reporte del servidor
                    });
                }
            });
        });
    }

}



module.exports = retencionControlador;


