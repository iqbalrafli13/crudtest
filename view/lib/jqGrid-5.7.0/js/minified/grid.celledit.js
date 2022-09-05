!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base"],e):e(jQuery)}(function(G){"use strict";G.jgrid.extend({editCell:function(u,f,g,C,v){return this.each(function(){var e,i,l,t,r,o=this,d=G(this).jqGrid("getStyleUI",o.p.styleUI+".common","highlight",!0),s=o.p.ariaBody?"":G(this).jqGrid("getStyleUI",o.p.styleUI+".common","hover",!0),a=G(this).jqGrid("getStyleUI",o.p.styleUI+".celledit","inputClass",!0),n=G(this).jqGrid("getStyleUI",o.p.styleUI+".celledit","selectClass",!0);if(o.grid&&!0===o.p.cellEdit){if(f=parseInt(f,10),o.p.selrow=o.rows[u].id,o.p.knv||o.p.ariaBody||G(o).jqGrid("GridNav"),0<o.p.savedRow.length){if(!0===g&&u==o.p.iRow&&f==o.p.iCol)return;G(o).jqGrid("saveCell",o.p.savedRow[0].id,o.p.savedRow[0].ic)}else window.setTimeout(function(){G("#"+G.jgrid.jqID(o.p.knv)).attr("tabindex","-1").focus()},1);if("subgrid"!==(e=(t=o.p.colModel[f]).name)&&"cb"!==e&&"rn"!==e&&"sc"!==e){try{l=G(o.rows[u].cells[f])}catch(e){l=G("td",o.rows[u]).eq(f)}if(0<=parseInt(o.p.iCol,10)&&0<=parseInt(o.p.iRow,10)&&void 0!==o.p.iRowId&&(r=G(o).jqGrid("getGridRowById",o.p.iRowId),G(r).removeClass("selected-row "+s).find("td").eq(o.p.iCol).removeClass("edit-cell "+d)),l.addClass("edit-cell "+d),G(o.rows[u]).addClass("selected-row "+s),!0!==t.editable||!0!==g||l.hasClass("not-editable-cell")||G.jgrid.isFunction(o.p.isCellEditable)&&!o.p.isCellEditable.call(o,e,u,f))i=l.html().replace(/\&#160\;/gi,""),G(o).triggerHandler("jqGridCellSelect",[o.rows[u].id,f,i,C]),G.jgrid.isFunction(o.p.onCellSelect)&&o.p.onCellSelect.call(o,o.rows[u].id,f,i,C);else{try{i=G.unformat.call(o,l,{rowId:o.rows[u].id,colModel:t},f)}catch(e){i=t.edittype&&"textarea"===t.edittype?l.text():l.html()}o.p.autoencode&&(i=G.jgrid.htmlDecode(i)),t.edittype||(t.edittype="text"),o.p.savedRow.push({id:u,ic:f,name:e,v:i,rowId:o.rows[u].id}),("&nbsp;"===i||"&#160;"===i||1===i.length&&160===i.charCodeAt(0))&&(i=""),!G.jgrid.isFunction(o.p.formatCell)||void 0!==(p=o.p.formatCell.call(o,o.rows[u].id,e,i,u,f))&&(i=p),G(o).triggerHandler("jqGridBeforeEditCell",[o.rows[u].id,e,i,u,f]),G.jgrid.isFunction(o.p.beforeEditCell)&&o.p.beforeEditCell.call(o,o.rows[u].id,e,i,u,f);var p=G.extend({},t.editoptions||{},{id:u+"_"+e,name:e,rowId:o.rows[u].id,oper:"edit",module:"cell"});v&&(i=C.key);var c=G.jgrid.createEl.call(o,t.edittype,p,i,!0,G.extend({},G.jgrid.ajaxOptions,o.p.ajaxSelectOptions||{}));-1<G.inArray(t.edittype,["text","textarea","password"])?G(c).addClass(a):"select"===t.edittype&&G(c).addClass(n),l.html("").append(c).attr("tabindex","0"),G.jgrid.bindEv.call(o,c,p),window.setTimeout(function(){G(c).focus()},1),G("input, select, textarea",l).on("keydown",function(e){var i=e.key;if(27===e.keyCode&&(!(0<G("input.hasDatepicker",l).length)||G(".ui-datepicker").is(":hidden")?G(o).jqGrid("restoreCell",u,f):G("input.hasDatepicker",l).datepicker("hide")),13===e.keyCode&&e.altKey&&"TEXTAREA"===this.nodeName)return this.value=this.value+"\r",!0;if(13===e.keyCode&&!e.shiftKey)return G(o).jqGrid("saveCell",u,f),u<o.rows.length-1&&v&&G(o).jqGrid("focusBodyCell",u+1,f),!1;if(9===e.keyCode&&!v){if(o.grid.hDiv.loading)return!1;e.shiftKey?o.p.ariaBody?(G(o).jqGrid("saveCell",u,f),1<f&&G(o).jqGrid("focusBodyCell",u,f-1)):!G(o).jqGrid("prevCell",u,f,e)&&o.p.editNextRowCell&&0<u-1&&o.rows[u-1]&&(u--,G(o).jqGrid("prevCell",u,o.p.colModel.length,e)):o.p.ariaBody?(G(o).jqGrid("saveCell",u,f),f<o.p.colModel.length-1&&G(o).jqGrid("focusBodyCell",u,f+1)):!G(o).jqGrid("nextCell",u,f,e)&&o.p.editNextRowCell&&o.rows[u+1]&&(u++,G(o).jqGrid("nextCell",u,0,e))}!v&&o.p.F2key&&o.p.ariaBody&&"F2"===e.key&&(G(o).jqGrid("saveCell",u,f),G(o).jqGrid("focusBodyCell",u,f),o.p.F2key=!1),v&&("ArrowUp"===i&&(G(o).jqGrid("saveCell",u,f),1<u&&G(o).jqGrid("focusBodyCell",u-1,f)),"ArrowDown"===i&&(G(o).jqGrid("saveCell",u,f),u<o.p.rows.length-1&&G(o).jqGrid("focusBodyCell",u+1,f)),"ArrowLeft"===i&&(G(o).jqGrid("saveCell",u,f),1<f&&G(o).jqGrid("focusBodyCell",u,f-1)),"ArrowRight"===i&&(G(o).jqGrid("saveCell",u,f),f<o.p.colModel.length-1&&G(o).jqGrid("focusBodyCell",u,f+1)),9===e.keyCode&&(G(o).jqGrid("saveCell",u,f),e.shiftKey?1<f&&G(o).jqGrid("focusBodyCell",u,f-1):f<o.p.colModel.length-1&&G(o).jqGrid("focusBodyCell",u,f+1))),e.stopPropagation()}),G(o).triggerHandler("jqGridAfterEditCell",[o.rows[u].id,e,i,u,f]),G.jgrid.isFunction(o.p.afterEditCell)&&o.p.afterEditCell.call(o,o.rows[u].id,e,i,u,f)}o.p.iCol=f,o.p.iRow=u,o.p.iRowId=o.rows[u].id}}})},saveCell:function(b,q,m){return this.each(function(){var t=this,e=t.p.colModel[q],r=e.name,o=G(t).jqGrid("getGridRowById",t.rows[b].id),d=G("td",o).eq(q);void 0!==m&&(w=G.unformat.call(t,d,{rowId:t.rows[b].id,colModel:e},q),t.p.savedRow.push({id:b,ic:q,name:r,v:w,rowId:t.rows[b].id}),t.p.savedValues={oldvalue:w,newvalue:m,indexRow:b});var s=1<=t.p.savedRow.length?0:null,a=G.jgrid.getRegional(this,"errors"),n=G.jgrid.getRegional(this,"edit");if(t.grid&&!0===t.p.cellEdit){if(null!==s){var p=G.jgrid.jqID(r),c=G(d).offset();if(void 0===m)switch(e.edittype){case"select":var l,u,f=e.editoptions.multiple?(i=G("#"+b+"_"+p,o),l=[],(u=G(i).val())?u.join(","):u="",G("option:selected",i).each(function(e,i){l[e]=G(i).text()}),l.join(",")):(u=G("#"+b+"_"+p+" option:selected",o).val(),G("#"+b+"_"+p+" option:selected",o).text());e.formatter&&(f=u);break;case"checkbox":var i=["Yes","No"];e.editoptions&&e.editoptions.value&&(i=e.editoptions.value.split(":")),u=G("#"+b+"_"+p,o).is(":checked")?i[0]:i[1],f=u;break;case"password":case"text":case"textarea":case"button":u=G("#"+b+"_"+p,o).val(),f=u;break;case"custom":try{if(!e.editoptions||!G.jgrid.isFunction(e.editoptions.custom_value))throw"e1";if(void 0===(u=e.editoptions.custom_value.call(t,G(".customelement",d),"get")))throw"e2";f=u}catch(e){"e1"===e?G.jgrid.info_dialog(a.errcap,"function 'custom_value' "+n.msg.nodefined,n.bClose,{styleUI:t.p.styleUI}):"e2"===e?G.jgrid.info_dialog(a.errcap,"function 'custom_value' "+n.msg.novalue,n.bClose,{styleUI:t.p.styleUI}):G.jgrid.info_dialog(a.errcap,e.message,n.bClose,{styleUI:t.p.styleUI})}}else{if(!0!==e.editable||d.hasClass("not-editable-cell")||G.jgrid.isFunction(t.p.isCellEditable)&&!t.p.isCellEditable.call(t,r,b,q))return f=u=m,void t.p.savedRow.splice(0,1);f=u=m}if(f!==t.p.savedRow[s].v){var g=G(t).triggerHandler("jqGridBeforeSaveCell",[t.p.savedRow[s].rowId,r,u,b,q]);g&&(f=u=g),!G.jgrid.isFunction(t.p.beforeSaveCell)||(j=t.p.beforeSaveCell.call(t,t.p.savedRow[s].rowId,r,u,b,q))&&(f=u=j);var C=G.jgrid.checkValues.call(t,u,q),v=!1;if(!0===C[0]){var w=G(t).triggerHandler("jqGridBeforeSubmitCell",[t.p.savedRow[s].rowId,r,u,b,q])||{};G.jgrid.isFunction(t.p.beforeSubmitCell)&&(w=(w=t.p.beforeSubmitCell.call(t,t.p.savedRow[s].rowId,r,u,b,q))||{});g=G(t).triggerHandler("jqGridOnSubmitCell",[t.p.savedRow[s].rowId,r,u,b,q]);if(void 0===g&&(g=!0),!1===(g=G.jgrid.isFunction(t.p.onSubmitCell)&&void 0===(g=t.p.onSubmitCell(t.p.savedRow[s].rowId,r,u,b,q))?!0:g))return;if(0<G("input.hasDatepicker",d).length&&G("input.hasDatepicker",d).datepicker("hide"),"remote"===t.p.cellsubmit)if(t.p.cellurl){var h={};t.p.autoencode&&(u=G.jgrid.htmlEncode(u)),e.editoptions&&e.editoptions.NullIfEmpty&&""===u&&(u="null",v=!0),h[r]=u;var j=t.p.prmNames,y=j.id,g=j.oper;h[y]=G.jgrid.stripPref(t.p.idPrefix,t.p.savedRow[s].rowId),h[g]=j.editoper,h=G.extend(w,h),G(t).jqGrid("progressBar",{method:"show",loadtype:t.p.loadui,htmlcontent:G.jgrid.getRegional(t,"defaults.savetext")}),t.grid.hDiv.loading=!0,G.ajax(G.extend({url:t.p.cellurl,data:G.jgrid.isFunction(t.p.serializeCellData)?t.p.serializeCellData.call(t,h,r):h,type:"POST",complete:function(e,i){var l;G(t).jqGrid("progressBar",{method:"hide",loadtype:t.p.loadui}),t.grid.hDiv.loading=!1,"success"===i&&(!0===(l=!0===(l=G(t).triggerHandler("jqGridAfterSubmitCell",[t,e,h[y],r,u,b,q])||[!0,""])[0]&&G.jgrid.isFunction(t.p.afterSubmitCell)?t.p.afterSubmitCell.call(t,e,h[y],r,u,b,q):l)[0]?(v&&(u=""),G(d).empty(),G(t).jqGrid("setCell",t.p.savedRow[s].rowId,q,f,!1,!1,!0),d=G("td",o).eq(q),G(d).addClass("dirty-cell"),G(o).addClass("edited"),G(t).triggerHandler("jqGridAfterSaveCell",[t.p.savedRow[s].rowId,r,u,b,q]),G.jgrid.isFunction(t.p.afterSaveCell)&&t.p.afterSaveCell.call(t,t.p.savedRow[s].rowId,r,u,b,q),t.p.savedRow.splice(0,1)):(G(t).triggerHandler("jqGridErrorCell",[e,i]),G.jgrid.isFunction(t.p.errorCell)?t.p.errorCell.call(t,e,i):G.jgrid.info_dialog(a.errcap,l[1],n.bClose,{styleUI:t.p.styleUI,top:c.top+30,left:c.left,onClose:function(){t.p.restoreCellonFail||G("#"+b+"_"+p,o).focus()}}),t.p.restoreCellonFail&&G(t).jqGrid("restoreCell",b,q)))},error:function(e,i,l){G("#lui_"+G.jgrid.jqID(t.p.id)).hide(),t.grid.hDiv.loading=!1,G(t).triggerHandler("jqGridErrorCell",[e,i,l]),G.jgrid.isFunction(t.p.errorCell)?t.p.errorCell.call(t,e,i,l):G.jgrid.info_dialog(a.errcap,e.status+" : "+e.statusText+"<br/>"+i,n.bClose,{styleUI:t.p.styleUI,top:c.top+30,left:c.left,onClose:function(){t.p.restoreCellonFail||G("#"+b+"_"+p,o).focus()}}),t.p.restoreCellonFail&&G(t).jqGrid("restoreCell",b,q)}},G.jgrid.ajaxOptions,t.p.ajaxCellOptions||{}))}else try{G.jgrid.info_dialog(a.errcap,a.nourl,n.bClose,{styleUI:t.p.styleUI}),t.p.restoreCellonFail&&G(t).jqGrid("restoreCell",b,q)}catch(e){}"clientArray"===t.p.cellsubmit&&(G(d).empty(),G(t).jqGrid("setCell",t.p.savedRow[s].rowId,q,f,!1,!1,!0),d=G("td",o).eq(q),G(d).addClass("dirty-cell"),G(o).addClass("edited"),G(t).triggerHandler("jqGridAfterSaveCell",[t.p.savedRow[s].rowId,r,u,b,q]),G.jgrid.isFunction(t.p.afterSaveCell)&&t.p.afterSaveCell.call(t,t.p.savedRow[s].rowId,r,u,b,q),t.p.savedRow.splice(0,1))}else try{G.jgrid.isFunction(t.p.validationCell)?t.p.validationCell.call(t,G("#"+b+"_"+p,o),C[1],b,q):(window.setTimeout(function(){G.jgrid.info_dialog(a.errcap,u+" "+C[1],n.bClose,{styleUI:t.p.styleUI,top:c.top+30,left:c.left,onClose:function(){t.p.restoreCellonFail||G("#"+b+"_"+p,o).focus()}})},50),t.p.restoreCellonFail&&G(t).jqGrid("restoreCell",b,q))}catch(e){alert(C[1])}}else G(t).jqGrid("restoreCell",b,q)}window.setTimeout(function(){G("#"+G.jgrid.jqID(t.p.knv)).attr("tabindex","-1").focus(),t.p.ariaBody&&G(t).jqGrid("focusBodyCell",t.p.iRow,t.p.iCol)},0)}})},restoreCell:function(t,r){return this.each(function(){var e=this,i=1<=e.p.savedRow.length?0:null;if(e.grid&&!0===e.p.cellEdit){if(null!==i){var l=G(e).jqGrid("getGridRowById",e.p.savedRow[i].rowId),l=G("td",l).eq(r);if(G.jgrid.isFunction(G.fn.datepicker))try{G("input.hasDatepicker",l).datepicker("hide")}catch(e){}G(l).empty().attr("tabindex","-1"),G(e).jqGrid("setCell",e.p.savedRow[0].rowId,r,e.p.savedRow[i].v,!1,!1,!0),G(e).triggerHandler("jqGridAfterRestoreCell",[e.p.savedRow[i].rowId,e.p.savedRow[i].v,t,r]),G.jgrid.isFunction(e.p.afterRestoreCell)&&e.p.afterRestoreCell.call(e,e.p.savedRow[i].rowId,e.p.savedRow[i].v,t,r),e.p.savedRow.splice(0,1)}window.setTimeout(function(){G("#"+e.p.knv).attr("tabindex","-1").focus(),e.p.ariaBody&&G(e).jqGrid("focusBodyCell",e.p.iRow,e.p.iCol)},0)}})},nextCell:function(t,r,o){var d;return this.each(function(){var e,i=this,l=!1;if(i.grid&&!0===i.p.cellEdit){for(e=r+1;e<i.p.colModel.length;e++)if(!0===i.p.colModel[e].editable&&(!G.jgrid.isFunction(i.p.isCellEditable)||i.p.isCellEditable.call(i,i.p.colModel[e].name,t,e))){l=e;break}!1!==l?(d=!0,G(i).jqGrid("editCell",t,l,!0,o)):(d=!1,0<i.p.savedRow.length&&G(i).jqGrid("saveCell",t,r))}}),d},prevCell:function(t,r,o){var d;return this.each(function(){var e,i=this,l=!1;if(!i.grid||!0!==i.p.cellEdit)return!1;for(e=r-1;0<=e;e--)if(!0===i.p.colModel[e].editable&&(!G.jgrid.isFunction(i.p.isCellEditable)||i.p.isCellEditable.call(i,i.p.colModel[e].name,t,e))){l=e;break}!1!==l?(d=!0,G(i).jqGrid("editCell",t,l,!0,o)):(d=!1,0<i.p.savedRow.length&&G(i).jqGrid("saveCell",t,r))}),d},GridNav:function(){return this.each(function(){var e,i,l,s=this;function t(e,i,l){var t,r,o,d;"v"===l.substr(0,1)&&(t=G(s.grid.bDiv)[0].clientHeight,d=G(s.grid.bDiv)[0].scrollTop,r=s.rows[e].offsetTop+s.rows[e].clientHeight,o=s.rows[e].offsetTop,"vd"===l&&t<=r&&(G(s.grid.bDiv)[0].scrollTop=G(s.grid.bDiv)[0].scrollTop+s.rows[e].clientHeight),"vu"===l&&o<d&&(G(s.grid.bDiv)[0].scrollTop=G(s.grid.bDiv)[0].scrollTop-s.rows[e].clientHeight)),"h"===l&&(r=G(s.grid.bDiv)[0].clientWidth,o=G(s.grid.bDiv)[0].scrollLeft,d=s.rows[e].cells[i].offsetLeft+s.rows[e].cells[i].clientWidth,l=s.rows[e].cells[i].offsetLeft,d>=r+parseInt(o,10)?G(s.grid.bDiv)[0].scrollLeft=G(s.grid.bDiv)[0].scrollLeft+s.rows[e].cells[i].clientWidth:l<o&&(G(s.grid.bDiv)[0].scrollLeft=G(s.grid.bDiv)[0].scrollLeft-s.rows[e].cells[i].clientWidth))}function r(e,i){var l,t;if("lft"===i)for(l=e+1,t=e;0<=t;t--)if(!0!==s.p.colModel[t].hidden){l=t;break}if("rgt"===i)for(l=e-1,t=e;t<s.p.colModel.length;t++)if(!0!==s.p.colModel[t].hidden){l=t;break}return l}s.grid&&!0===s.p.cellEdit&&(s.p.knv=s.p.id+"_kn",e=G("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='"+s.p.knv+"'></div></div>"),G(e).insertBefore(s.grid.cDiv),G("#"+s.p.knv).focus().keydown(function(e){switch(l=e.keyCode,"rtl"===s.p.direction&&(37===l?l=39:39===l&&(l=37)),l){case 38:0<s.p.iRow-1&&(t(s.p.iRow-1,s.p.iCol,"vu"),G(s).jqGrid("editCell",s.p.iRow-1,s.p.iCol,!1,e));break;case 40:s.p.iRow+1<=s.rows.length-1&&(t(s.p.iRow+1,s.p.iCol,"vd"),G(s).jqGrid("editCell",s.p.iRow+1,s.p.iCol,!1,e));break;case 37:0<=s.p.iCol-1&&(i=r(s.p.iCol-1,"lft"),t(s.p.iRow,i,"h"),G(s).jqGrid("editCell",s.p.iRow,i,!1,e));break;case 39:s.p.iCol+1<=s.p.colModel.length-1&&(i=r(s.p.iCol+1,"rgt"),t(s.p.iRow,i,"h"),G(s).jqGrid("editCell",s.p.iRow,i,!1,e));break;case 13:0<=parseInt(s.p.iCol,10)&&0<=parseInt(s.p.iRow,10)&&G(s).jqGrid("editCell",s.p.iRow,s.p.iCol,!0,e);break;default:return!0}return!1}))})},getChangedCells:function(o){var e=[];return o=o||"all",this.each(function(){var t,r=this;r.grid&&!0===r.p.cellEdit&&G(r.rows).each(function(i){var l={};G(this).hasClass("edited")&&(G("td",this).each(function(e){if("cb"!==(t=r.p.colModel[e].name)&&"subgrid"!==t&&"sc"!==t)if("dirty"===o){if(G(this).hasClass("dirty-cell"))try{l[t]=G.unformat.call(r,this,{rowId:r.rows[i].id,colModel:r.p.colModel[e]},e)}catch(e){l[t]=G.jgrid.htmlDecode(G(this).html())}}else try{l[t]=G.unformat.call(r,this,{rowId:r.rows[i].id,colModel:r.p.colModel[e]},e)}catch(e){l[t]=G.jgrid.htmlDecode(G(this).html())}}),l.id=this.id,e.push(l))})}),e}})});