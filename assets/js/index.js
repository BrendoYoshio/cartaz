jQuery(document).ready(function() {
  jQuery("#ean13").mask("9999999999999");
  jQuery("input").val("");
  var img = new Image();
  var scale = 3;
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  const FONT_NAME_1 = 'Exo2_BlackItalic';
  const FONT_NAME_2 = 'Exo2_Regular';
  const FONT_NAME_3 = 'Exo2_Bold';
  const FONT_NAME_4 = 'Exo2_BoldItalic';
  function printAt(context , text, x, y, lineHeight, fitWidth) {
    descricaoT = jQuery("#descricao").val();
    fitWidth = fitWidth || 0;

    if (fitWidth <= 0) {
      context.fillText( text, x, y );
      return;
    }

    for (var idx = 1; idx <= text.length; idx++) {
      var str = text.substr(0, idx);
      if (context.measureText(str).width > fitWidth) {
        context.fillText( text.substr(0, idx-1), x, y );
        printAt(context, text.substr(idx-1), x, y + lineHeight, lineHeight,  fitWidth);
        return;
      }
    }
    if (descricaoW > fitWidth) {
      context.fillText( text, x, y );
    } else {
      context.fillText( text, x, y+20*scale );
    }
  }
  var patt = /,/g;
  result = false;
  var descricaoW = 0;
  var descricaoT = "";
  function validador(id, x, y, cnt) {
    var txt = jQuery(id).val();
    if (txt) {
      txt = jQuery(id).val();
    } else {
      txt = cnt;
    }
    // jQuery(id).val(txt.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase(); }));
    result = patt.test(txt);
    if (id == "#descricao") {
      descricaoW = ctx.measureText(","+jQuery("#descricao").val()).width;
      printAt(ctx, txt, x, y, 34*scale, 420*scale);
    } else if ((id == "#preco_de" || id == "#preco_por") && result) {
      if (id == "#preco_de") {
        ctx.fillText(txt.replace(/,.*/,''), x, y);
        widthPrecoDe = ctx.measureText(txt.replace(/,.*/,'')).width;
        ctx.font = 25*scale+`px "${FONT_NAME_4}"`;
        ctx.fillText(","+txt.replace(/.*,/,''), 140*scale+widthPrecoDe, 490*scale);
        // ctx.fillText(txt.replace(/[^.*,]/+/g,''), 240, 501);
      } else if (id == "#preco_por") {
        // widthPrecoPor = ctx.measureText(txt.replace(/,.*/,'')).width;
        ctx.fillText(txt.replace(/,.*/,''), x-widthPrecoPor2/2, y);
        ctx.font = 80*scale+`px "${FONT_NAME_1}"`;
        ctx.fillText(","+txt.replace(/.*,/,''), canvas.width/2+widthPrecoPor/2, 640*scale);
        widthPrecoPor2 = ctx.measureText(","+txt.replace(/.*,/,'')).width;
        widthPrecoPor = widthPrecoPor + widthPrecoPor2;
      }
    } else if (id == "#ean13") {
      ctx.fillText("cód. barras "+txt, x, y);
    } else {
      ctx.fillText(txt, x, y);
    }

  }
  var widthPrecoPor = 0;
  var widthPrecoPor2 = 0;
  var widthPrecoDe = 0;
  var href = "oferta";
  var normal = 0;
  function desenhar() {
    ctx.clearRect(0, 0, canvas.width*5, canvas.height*5);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    // ctx.drawImage(img,0,0);
    // ctx.shadowColor = 'rgba(250,250,250,1)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.fillStyle = '#000';
    ctx.textAlign='center';
    if (href == "normal") {
      ctx.font = 50*scale+`px "${FONT_NAME_3}"`;
      ctx.fillText("APENAS", canvas.width/2, 444*scale);
      jQuery("#preco_de").val("00");
      jQuery("#preco_de").hide();
      normal = 50;
    } else {
      normal = 0;
    }
    ctx.font = 35*scale+`px "${FONT_NAME_2}"`;
    validador("#descricao", canvas.width/2, (355-normal)*scale, "Descrição descrição");
    ctx.font = 25*scale+`px "${FONT_NAME_2}"`;
    validador("#marca", canvas.width/2, (423-normal)*scale, "Marca");
    ctx.font = 80*scale+`px "${FONT_NAME_1}"`;
    widthPrecoPor2 = ctx.measureText(","+jQuery("#preco_por").val().replace(/.*,/,'')).width;
    ctx.font = 210*scale+`px "${FONT_NAME_1}"`;
    widthPrecoPor = ctx.measureText(jQuery("#preco_por").val().replace(/,.*/,'')).width;
    validador("#preco_por", canvas.width/2, (667-normal)*scale, "00");
    if (widthPrecoPor==0) {
      widthPrecoPor = ctx.measureText("00").width;
    }
    ctx.font = 15*scale+`px "${FONT_NAME_2}"`;
    validador("#ean13", canvas.width/2, (717-normal)*scale, "1234567890123");
    if (href == "oferta") {
      ctx.font = 90*scale+`px "${FONT_NAME_1}"`;
      ctx.fillText("OFERTA", canvas.width/2-5*scale, 312*scale);
      ctx.font = 31*scale+`px "${FONT_NAME_1}"`;
      ctx.fillText("POR", canvas.width/2-widthPrecoPor+widthPrecoPor/2-34*scale, 595*scale);
      jQuery("#preco_de").show();
      ctx.textAlign='left';
      ctx.font = 25*scale+`px "${FONT_NAME_3}"`;
      ctx.fillText("DE", 98*scale, 478*scale);
      ctx.font = 80*scale+`px "${FONT_NAME_4}"`;
      widthPrecoDe = ctx.measureText(jQuery("#preco_de").val()).width;
      validador("#preco_de", 140*scale, 501*scale, "00");
      console.log(widthPrecoDe);
      if (widthPrecoDe>301) {
        var rectX = 324*scale;
        var rectY = 441*scale;
        var rectWidth = 6*scale;
        var rectHeight = 215*scale;
        var cornerRadius = 5*scale;
      } else {
        var rectX = 308*scale;
        var rectY = 425*scale;
        var rectWidth = 6*scale;
        var rectHeight = 195*scale;
        var cornerRadius = 5*scale;
      }

      // Set faux rounded corners
      ctx.lineJoin = "round";
      ctx.lineWidth = cornerRadius;

      // rotate the rect
      ctx.translate(rectX*2+rectWidth, rectY-rectHeight*2);
      ctx.rotate(75 * Math.PI / 180);

      // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
      ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
    }
  }

  function downloadCanvas(link, filename) {
    link.href = document.getElementById('myCanvas').toDataURL();
    link.download = filename;
  }

  jQuery("#download").on('click', function(e) {
    var cont = 0;
    jQuery("form input").each(function(){
      if(jQuery(this).val() == "") {
        jQuery(this).css("border-color", "#F00");
        cont++;
      }
    });
    if(cont == 0) {
      //downloadCanvas(this, '.png');
      jQuery(".col-right").hide();
      jQuery("#myCanvas").css("max-height", '100%');
      window.print();
      jQuery(".col-right").show();
      jQuery("#myCanvas").css("max-height", '842px');
    }
  });

  jQuery("input").on('keyup', function() {
    jQuery(this).css("border-color", "#ccc");
    var valor = jQuery("#preco_de").val().replace(/[^0-9,]+/g,'');
    jQuery("#preco_de").val(valor);
    valor = jQuery("#preco_por").val().replace(/[^0-9,]+/g,'');
    jQuery("#preco_por").val(valor);
    // console.log(jQuery("#name2").val().length);
    desenhar();
  })
  .blur(function() {
    if(jQuery(this).val() == ""){
      jQuery(this).css("border-color", "#F00");
    }
  });
  desenhar();

  // function trocarImg(src) {
  //   jQuery(img).attr("src", src)
  //   .load(function() {
  //     desenhar();
  //   });
  // }
  // trocarImg('assets/img/bg-casamento.png');

  jQuery("nav a").on('click', function(e) {
    e.preventDefault();
    href = jQuery(this).attr("href");
    jQuery("#preco_de").val("");
    desenhar();
  });
});
