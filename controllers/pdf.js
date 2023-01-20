const { request, response } = require("express")
const path = require("path");
const fs = require("fs");
const pdfHtml = require("pdf-creator-node");
const pdf = require("html-pdf");
const { funDate } = require("../helpers/generar-fecha");

const postPdfTramiteInterno=(req=request,res=response)=>{
    try {
        const {codigo} = req.query;
        let template =path.join(__dirname,'../document/','html','tramite-interno.html');
        let filename = template.replace('.html', '.pdf');
        let html = fs.readFileSync(template,'utf-8');
        const options = {
            "format": "A4",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
            "orientation": "portrait", // portrait or landscape
          }
          const {fecha}= funDate();
          const arrayFech = fecha.split('-');
          console.log(arrayFech);
          html = html.replace('{{ano}}',arrayFech[0]);
          html = html.replace('{{mes}}',arrayFech[1]);
          html = html.replace('{{dia}}',arrayFech[2]);
          html = html.replace('{{codigo}}',codigo)
          let ubicacion = path.join(__dirname,'../document/','pdf',`tramite-interno-${8}.pdf`);
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
    postPdfTramiteInterno
}