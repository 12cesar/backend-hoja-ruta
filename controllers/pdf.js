const { request, response } = require("express")
const path = require("path");
const fs = require("fs");
const pdfHtml = require("pdf-creator-node");
const pdf = require("html-pdf");
const { funDate } = require("../helpers/generar-fecha");
const { TramiteInterno, TramiteExterno, Accion, Area, Prioridad } = require("../models");

const postPdfTramiteInterno=async(req=request,res=response)=>{
  try {
      const {codigo} = req.query;
      const tramite = await TramiteInterno.findOne({
        where:{
          codigo_documento:codigo
        },
        include:[
          {
            model:Area
          },{
            model:Prioridad
          }
        ]
      });
      const acciones = await Accion.findAll({
        where:{
          estado:1
        }
      });
      console.log(tramite.Area.abreviatura);
      divaccion=''
      for (let i = 0; i < acciones.length; i++) {
        accion = `
            <div class="column" style="">
            <p>${acciones[i].id}.- ${acciones[i].nombre.toLowerCase()}</p>
        </div>
        `
        divaccion +=accion;
      }
      let template =path.join(__dirname,'../document/','html','tramite-interno.html');
      let filename = template.replace('.html', '.pdf');
      let html = fs.readFileSync(template,'utf-8');
      const options = {
          "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
          "orientation": "portrait", // portrait or landscape
        }
        const {fecha}= funDate();
        const arrayFech = fecha.split('-');
        html = html.replace('{{ano}}',arrayFech[0]);
        html = html.replace('{{mes}}',arrayFech[1]);
        html = html.replace('{{dia}}',arrayFech[2]);
        html = html.replace('{{codigo}}',codigo);
        html = html.replace('{{nomaccion}}',divaccion);
        html = html.replace('{{area}}',tramite.Area.abreviatura);
        html = html.replace('{{prioridad}}',tramite.Prioridad.nombre);
        let ubicacion = path.join(__dirname,'../document/','pdf',`tramite-interno-${tramite.id_area}.pdf`);
        pdf.create(html, options).toFile(ubicacion, function (err, resp) {
          if (err) {
            console.log(err);
          } else {
            res.sendFile(resp.filename);
          }
        });
  } catch (error) {
      console.log(error);
  }
}
const postPdfTramiteExterno=async(req=request,res=response)=>{
try {
    const {codigo, proveido} = req.query;
    const tramite = await TramiteExterno.findOne({
      where:{
        codigo_documento:codigo
      }
    });
    const acciones = await Accion.findAll({
      where:{
        estado:1
      }
    });
    
    divaccion=''
    for (let i = 0; i < acciones.length; i++) {
      accion = `
          <div class="column" style="">
          <p>${acciones[i].id}.- ${acciones[i].nombre.toLowerCase()}</p>
      </div>
      `
      divaccion +=accion;
    }
    let template =path.join(__dirname,'../document/','html','tramite-externo.html');
    let filename = template.replace('.html', '.pdf');
    let html = fs.readFileSync(template,'utf-8');
    const options = {
        "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
        "orientation": "portrait", // portrait or landscape
      }
      const {fecha}= funDate();
      const arrayFech = fecha.split('-');
      html = html.replace('{{ano}}',arrayFech[0]);
      html = html.replace('{{mes}}',arrayFech[1]);
      html = html.replace('{{dia}}',arrayFech[2]);
      html = html.replace('{{codigo}}',codigo);
      html = html.replace('{{nomaccion}}',divaccion);
      html=html.replace('{{proveido}}',proveido);
      let ubicacion = path.join(__dirname,'../document/','pdf',`tramite-externo-${tramite.id_area}.pdf`);
      pdf.create(html, options).toFile(ubicacion, function (err, resp) {
        if (err) {
          console.log(err);
        } else {
          res.sendFile(resp.filename);
        }
      });
} catch (error) {
    console.log(error);
}
}



module.exports = {
    postPdfTramiteInterno,
    postPdfTramiteExterno
}