var express = require('express');
var router = express.Router();

var retencion = require('../controladores/retencionControlador');
var retencionControlador = new retencion ();

var SW = require('../controladores/servicioWeb');
var swControlador = new SW ();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registro_retencion', retencionControlador.verRegistro);
router.get('/retenciones', retencionControlador.ver_retenciones);
router.post('/guardar_retencion', retencionControlador.guardar);
router.post('/guardar_modificacion', retencionControlador.modificar);
router.post('/buscar_retencion', retencionControlador.buscar);
router.get('/generar_reporte', retencionControlador.generarReporte);


//SW
router.get('/sw/clientes', swControlador.obtenerClientes);
router.get('/sw/tipos', swControlador.obtenerTipos);
router.get('/sw/retenciones', swControlador.verRetenciones);
router.get('/sw/modificar/:id', swControlador.verModificar);
router.get('/sw/sumar_retenciones', swControlador.sumarRetenciones);



module.exports = router;




