const transaksiTable = '#transaksi'
const transaksiPager = '#transaksiPager'
const transaksiDialog = '#transaksiDialog'
const transaksiForm = '#transaksiForm'

// const orderTable = '#order'
// const orderPager = '#orderPager'
// const orderDialog = '#orderDialog'
// const orderForm = '#orderForm'

let indexRow = 0
let sortName = 'nofaktur'
let timeout = null
let highlightSearch
let nofaktur
let currentSearch
let postData
let ordersPostData
let triggerClick = true
let activeGrid = '#transaksi'
let socket

$(window).resize(function() {
	$(transaksiTable).setGridWidth($(window).width() - 15)
	// $(orderTable).setGridWidth($(window).width() - 15)
})

$(document).ready(function() {
	loadtransaksiTable()
	// loadOrderTable()
  // loadSocket()

	$('#t_transaksi').html(`
		<div id="global_search">
			<label> Global search </label>
			<input id="gs_global_search" class="ui-widget-content ui-corner-all" style="padding: 5px;" globalsearch="true" clearsearch="true">
		</div>
	`)
  /*
	$(document).on('click', '#clearFilter', function () {
		currentSearch = undefined
	  $('[id*="gs_"]').val('')
	  $(transaksiTable).jqGrid('setGridParam', { postData: null })
	  $(transaksiTable)
	    .jqGrid('setGridParam', {
	      postData: {
	        page: 1,
	        rows: 10,
	        sidx: 'transaksi_name',
	        sord: 'asc',
	      },
	    })
	    .trigger('reloadGrid')
	  highlightSearch = 'undefined'
	})

	$('[id*=gs_]').each(function(i, el) {
		$(el).on('focus', function(el) {
			currentSearch = $(this)
		})
	})
  */
  $('#pg_transaksiPager table tr').first().attr('align', 'center')
})


function loadtransaksiTable() {
	$(transaksiTable).jqGrid({
		url: "ajax.php?cari=datatable",
		datatype: 'JSON',
		caption: 'Customers Datassss',
		rownumbers: true,
		height: 277,
		autowidth: true,
		shrinkToFit: false,
		viewrecords: true,
		sortable: true,
		sortname: sortName,
		pager: $(transaksiPager),
		rowNum:10,
		rowList:[10,20,30],
		toolbar: [true, 'top'],
		colModel: [
			{
	            index:'nofaktur',
	            name:'nofaktur',
	            label:'nofaktur'
	        },
	        {
	            index:'tanggal',
	            name:'tanggal',
	            label:'Tanggal Faktur',
	            formatter: 'date',
	            formatoptions: {
	                newformat:'d-m-Y'
	            },
	        },
	        {
	            index:'nama',
	            name:'nama',
	            label:'Nama Pelanggan'
	        },
	        {
	            index:'gender',
	            name:'gender',
	            label:'gender',
	            stype: 'select',
	            searchoptions: {
	                value: ':ALL;1:LAKI - LAKI;2:PEREMPUAN',
	            }
	        },
	        {
	            index:'phone',
	            name:'phone',
	            label:'phone'
	        },
	        {
	            index:'address',
	            name:'address',
	            label:'address'
	        },
	        {
	            index:'saldo',
	            name:'saldo',
	            label:'saldo'
	        },
		],
		onSort: function(id) {
			activeGrid = '#transaksi'
			indexRow = $(this).jqGrid('getCell', id, 'rn') - 1
    	page = $(this).jqGrid('getGridParam', 'page') - 1
    	rows = $(this).jqGrid('getGridParam', 'postData').rows
    	if (indexRow >= rows) indexRow = (indexRow - rows * page)

			nofaktur = $(this)
				.jqGrid('getRowData', id).nofaktur
				.replace(/(<([^>]+)>)/ig,"")

			if (nofaktur) showOrder(nofaktur)
		},
		loadComplete: function() {
			$(document).unbind('keydown')
			customBindKeys()
			postData = $(this).jqGrid('getGridParam', 'postData')

			setTimeout(function() {
				$('#transaksi tbody tr td:not([aria-describedby=transaksi_rn])').highlight(highlightSearch)

				if (indexRow > $('#transaksi').getDataIDs().length - 1) {
					indexRow = $('#transaksi').getDataIDs().length - 1
				}

				if (triggerClick) {
					$('#' + $('#transaksi').getDataIDs()[indexRow]).click()
					triggerClick = false
				} else {
					$('#transaksi').setSelection($('#transaksi').getDataIDs()[indexRow])
				}

				$('#gsh_transaksi_rn').html(`
	    		<button id="clearFilter" title="Clear Filter" style="width: 100%; height: 100%;"> X </button>	
	  		`).click(function() {

	  		})

				$('[id*=gs_]').on('input', function() {
					highlightSearch = $(this).val()
					clearTimeout(timeout)

					timeout = setTimeout(function() {
		    		$('#transaksi').trigger('reloadGrid')
					}, 500);
				})

				$('#t_transaksi input').on('input', function() {
					clearTimeout(timeout)

					timeout = setTimeout(function() {
						indexRow = 0
		    		$(transaksiTable).jqGrid('setGridParam', {postData: {'global_search': highlightSearch}}).trigger('reloadGrid')
					}, 500);
				})

				$('input')
					.css('text-transform', 'uppercase')
					.attr('autocomplete', 'off')
			}, 50)
		}
		// .customBindKeys()
	})

	// .jqGrid('filterToolbar',
	// 	{
	// 		searchOnEnter: false,
	// 		defaultSearch: 'cn',
	// 		afterSearch: function() {
	// 			indexRow = 0
	// 		},
	// 	}
	// )

	.jqGrid('navGrid', transaksiPager,
		{
			search: false,
			refresh: false,
			add: false,
			edit: false,
			del: false,
		}
	)

	$(transaksiTable).navButtonAdd(transaksiPager, {
   	caption: "Add",
		title: "Add",
		id: "addtransaksi",
		buttonicon: "ui-icon-plus",
		onClickButton:function(){
			activeGrid = undefined
			addtransaksi()
		},
	})

	$(transaksiTable).navButtonAdd(transaksiPager, {
   	caption: "Edit",
		title: "Edit",
		id: "edittransaksi",
		buttonicon: "ui-icon-pencil",
		onClickButton:function(){
			if ($(transaksiTable).jqGrid('getGridParam','selrow') !== null) {
				activeGrid = undefined
        		var row = $(this) .jqGrid('getGridParam', 'selrow');
				edittransaksi(row)

			} else {
				alert('Please, select row')
			}
		},
	})

	$(transaksiTable).navButtonAdd(transaksiPager, {
   	caption: "Delete",
		title: "Delete",
		id: "deletetransaksi",
		buttonicon: "ui-icon-trash",
		onClickButton:function(){
			if ($(transaksiTable).jqGrid('getGridParam','selrow') !== null) {
		
				activeGrid = undefined
				nofaktur = $(transaksiTable).jqGrid('getGridParam','selrow')
				confirmDeletetransaksi(nofaktur)
			} else {
				alert('Please, select row')
			}
		},
	})

	/*
	$(transaksiTable).navButtonAdd(transaksiPager, {
   	caption: "All Reports",
		title: "All Reports",
		id: "allReports",
		buttonicon: "ui-icon-document",
		onClickButton:function(){
			let params
			for (var key in postData) {
		    if (params != "") {
		        params += "&";
		    }
		    params += key + "=" + encodeURIComponent(postData[key]);
			}

			window.open('transaksi/report?' + params)
		},
	})
	*/

	.keyControl()
}

function addtransaksi() {
	$(transaksiDialog).load('create-modal.php', function() {
		$($(transaksiForm + ' input')[0]).focus()
	}).dialog({
		modal: true,
		title: "Add transaksi",
		height: '500',
		width: '650',
		position: [0, 0],
		buttons: {
			'Save': function() {
				storetransaksi()
			},
			'Cancel': function() {
				activeGrid = '#transaksi'
				$(this).dialog('close')
			}
		}
	})
}
function storetransaksi() {
	$.ajax({
		url: 'ajax.php?cari=store_transaksi',
		type: 'POST',
		dataType: 'JSON',
		data: $(transaksiForm).serializeArray(),
		beforeSend: function() {
			$('#errorBox').remove()
		},
		success: function(res) {
			if (res.status == 'submitted') {
				$(transaksiDialog).dialog('close')

				$.ajax({url:'ajax.php?cari=show&nofaktur='+res.postData.nofaktur+'&sort_index='+$(transaksiTable).jqGrid('getGridParam', 'sortname')+"&postData="+res.postData[$(transaksiTable).jqGrid('getGridParam', 'sortname')]+'&sort_order='+$(transaksiTable).jqGrid('getGridParam', 'sortorder')+'&limit='+$(transaksiTable).jqGrid('getGridParam', 'postData').rows,
				
					type: 'GET',
					dataType: 'JSON',
					success: function(res) {
						if (res.data) {
							indexRow = res.row - 1
						}
						selectedPage = res.page
						setTimeout(function() {
							$('#transaksi').trigger('reloadGrid', [{page: selectedPage}])
						}, 50)
						activeGrid = '#transaksi'
					}
				})
			} else {
				console.log(res)
				$('#gridData').before(`
					<div id="errorBox" class="ui-state-error" style="padding: 5px;">
						${res.messages}
					</div>
				`)
			}
		}
	})
}
/*
function storetransaksi() {
	$.ajax({
		url: baseUrl + 'transaksi/store',
		type: 'POST',
		dataType: 'JSON',
		data: $(transaksiForm).serializeArray(),
		success: function(res) {
			$('#errorBox').remove()
			if (res.status == 'submitted') {
				$(transaksiDialog).dialog('close')

				$.ajax({
					url: baseUrl + '/transaksi/show/' + res.postData.no_invoice + '/' + res.postData[$(transaksiTable).jqGrid('getGridParam', 'sortname')] + '/' + $(transaksiTable).jqGrid('getGridParam', 'sortname') + '/' + $(transaksiTable).jqGrid('getGridParam', 'sortorder') + '/' + $(transaksiTable).jqGrid('getGridParam', 'postData').rows,
					type: 'GET',
					dataType: 'JSON',
					success: function(res) {
						if (res.data) {
							indexRow = res.row - 1
						}
						selectedPage = res.page
						setTimeout(function() {
							$('#transaksi').trigger('reloadGrid', [{page: selectedPage}])
						}, 50)
					}
				})
			} else {
				$('#transaksiData').before(`
					<div id="errorBox" class="ui-state-error" style="padding: 5px;">
						${res}
					</div>
				`)
			}
		}
	})
}
*/

function edittransaksi(nofaktur) {
  $(transaksiDialog).load('update-modal.php?id='+nofaktur, function() {
	
		$($(transaksiForm + ' input')[0]).focus()

	}).dialog({
		modal: true,
		title: "Edit transaksi",
		height: '500',
		width: '650',
		position: [0, 0],
		buttons: {
			'Save': function() {
				updatetransaksi(nofaktur)
			},
			'Cancel': function() {
				activeGrid = '#transaksi'
				$(this).dialog('close')
			}
		}
	})
}

function updatetransaksi(nofaktur) {
	$.ajax({
		url: 'ajax.php?cari=update_transaksi&id=' + nofaktur,
		type: 'POST',
		dataType: 'JSON',
		data: $(transaksiForm).serializeArray(),
		success: function(res) {
			$('#errorBox').remove()
			if (res.status == 'submitted') {
				$(transaksiDialog).dialog('close')

				$.ajax({url:'ajax.php?cari=show&nofaktur='+res.postData.nofaktur+'&sort_index='+$(transaksiTable).jqGrid('getGridParam', 'sortname')+"&postData="+res.postData[$(transaksiTable).jqGrid('getGridParam', 'sortname')]+'&sort_order='+$(transaksiTable).jqGrid('getGridParam', 'sortorder')+'&limit='+$(transaksiTable).jqGrid('getGridParam', 'postData').rows,
				
					type: 'GET',
					dataType: 'JSON',
					success: function(res) {
						if (res.data) {
							indexRow = res.row - 1
						}
						selectedPage = res.page
						setTimeout(function() {
							$('#transaksi').trigger('reloadGrid', [{page: selectedPage}])
						}, 50)
						activeGrid = '#transaksi'

					}
				})
			} else {
				$('#transaksiData').before(`
					<div id="errorBox" class="ui-state-error" style="padding: 5px;">
						${res}
					</div>
				`)
			}
		}
	})
}

function confirmDeletetransaksi(nofaktur) {
  $(transaksiDialog).load('delete-modal.php?id='+nofaktur)
		.dialog({
		modal: true,
		title: "Delete transaksi",
		height: '500',
		width: '650',
		position: [0, 0],
		buttons: {
			'Delete': function() {
				deletetransaksi(nofaktur)
			},
			'Cancel': function() {
				$(transaksiDialog).dialog('close')
				activeGrid = '#transaksi'	
			}
		}
	})

	function deletetransaksi(nofaktur) {
		$.ajax({
			url:'ajax.php?cari=delete_confirm&id=' + nofaktur,
			type: 'POST',
			dataType: 'JSON',
			success: function(res) {
				if (res == 'deleted') {
					$(transaksiDialog).dialog('close')
					$('#transaksi').trigger('reloadGrid')
				}
			}
		})
	}
}

function loadOrderTable() {
	$(orderTable).jqGrid({
		datatype: 'JSON',
		caption: 'Orders Data',
		rownumbers: true,
		autowidth: true,
		shrinkToFit: false,
		viewrecords: true,		
		pager: $(orderPager),
   	rowNum:10,
   	rowList:[10,20,30],
		footerrow: true,
		userDataOnFooter: true,
		height: 'auto',
		sortable: true,
		colModel: [
			{
				index: 'item_name',
				name: 'item_name',
				label: 'Item Name',
			},
			{
				index: 'item_price',
				name: 'item_price',
				label: 'Item Price',
				formatter: 'currency',
				align: 'right',
				formatoptions: {
					decimalPlaces: 0,
					decimalSeparator: ',',
					thousandsSeparator: '.',
				},
			},
			{
				index: 'qty',
				name: 'qty',
				label: 'Qty',
				align: 'right',
			},
			{
				index: 'total_price',
				name: 'total_price',
				label: 'Total Price',
				formatter: 'currency',
				align: 'right',
				formatoptions: {
					decimalPlaces: 0,
					decimalSeparator: ',',
					thousandsSeparator: '.',
				},
			},
		],
		loadComplete: function(data) {
			ordersPostData = $(this).jqGrid('getGridParam', 'postData')

			sum = $('#order').jqGrid("getCol", "total_price", false, "sum")

			$('#order').jqGrid('footerData', 'set', {
				qty: 'Total',
				total_price: sum,
			}, true)
		},
		onSelectRow: function(id) {
			activeGrid = '#order'
			nofaktur = $(this).jqGrid('getRowData', id).nofaktur
		},
		keys: true,
	})

	.jqGrid('navGrid', orderPager,
		{
			search: false,
			refresh: false,
			add: false,
			edit: false,
			del: false,
		}
	)

	.keyControl()
}

// function showOrder(nofaktur) {
// 	$('#order').jqGrid('setGridParam', {
// 		url: baseUrl + 'order/show/' + nofaktur,
// 	}).trigger('reloadGrid')
// }

$.fn.keyControl = function (e) {
  var l = $.extend(
    {
      onEnter: null,
      onSpace: null,
      onLeftKey: null,
      onRightKey: null,
      scrollingRows: !0,
    },
    e || {}
  )
  return this.each(function () {
    var s = this

    $("body").is("[role]") || $("body").attr("role", "application"),
      (s.p.scrollrows = l.scrollingRows),
      $(s)
        .on("keydown", function (e) {
          var t,
            i,
            r = $(s).find("tr[tabindex=0]")[0],
            o = s.p.treeReader.expanded_field

          if (r) {
            var n = s.p.selrow,
              a = s.p._index[$.jgrid.stripPref(s.p.idPrefix, r.id)]
				    var currentPage = $(s).getGridParam('page')
						var lastPage = $(s).getGridParam('lastpage')
						var row = $(this).jqGrid('getGridParam', 'postData').rows

            if (
              33 === e.keyCode ||
              34 === e.keyCode ||
              35 === e.keyCode ||
              36 === e.keyCode ||
              37 === e.keyCode ||
              38 === e.keyCode ||
              39 === e.keyCode ||
              40 === e.keyCode
            ) {
            	if (33 === e.keyCode) {
            		triggerClick = true
            		if (currentPage > 1) {
            			$(s).jqGrid('setGridParam', { "page": currentPage - 1 }).trigger('reloadGrid')
            		}
                $(s).triggerHandler("jqGridKeyUp", [t, n, e]),
                  $(this).isFunction(l.onUpKey) && l.onUpKey.call(s, t, n, e),
                  e.preventDefault()
              }
            	if (34 === e.keyCode) {
            		triggerClick = true
            		if (currentPage !== lastPage) {
            			$(s).jqGrid('setGridParam', { "page": currentPage + 1 }).trigger('reloadGrid')
            		}
                $(s).triggerHandler("jqGridKeyUp", [t, n, e]),
                  $(this).isFunction(l.onUpKey) && l.onUpKey.call(s, t, n, e),
                  e.preventDefault()
              }
              if (35 === e.keyCode) {
              	triggerClick = true
              	if (currentPage !== lastPage) {
              		$(s).jqGrid('setGridParam', { "page": lastPage}).trigger('reloadGrid')
              		if (e.ctrlKey) {
	              		if ($(s).jqGrid('getGridParam', 'selrow') !== $('#transaksi').find(">tbody>tr.jqgrow").filter(":last").attr('id')) {
		              		$(s).jqGrid('setSelection', $(s).find(">tbody>tr.jqgrow").filter(":last").attr('id')).trigger('reloadGrid')
	              		}
	              	}
              	}
              	if (e.ctrlKey) {
              		if ($(s).jqGrid('getGridParam', 'selrow') !== $('#transaksi').find(">tbody>tr.jqgrow").filter(":last").attr('id')) {
	              		$(s).jqGrid('setSelection', $(s).find(">tbody>tr.jqgrow").filter(":last").attr('id')).trigger('reloadGrid')
              		}
              	}
                $(s).triggerHandler("jqGridKeyUp", [t, n, e]),
                  $(this).isFunction(l.onUpKey) && l.onUpKey.call(s, t, n, e),
                  e.preventDefault()
              }
              if (36 === e.keyCode) {
              	triggerClick = true
              	if (e.ctrlKey) {
              		if ($(s).jqGrid('getGridParam', 'selrow') !== $('#transaksi').find(">tbody>tr.jqgrow").filter(":first").attr('id')) {
	              		$(s).jqGrid('setSelection', $(s).find(">tbody>tr.jqgrow").filter(":first").attr('id'))
              		}
              	}
            		$(s).jqGrid('setGridParam', { "page": 1}).trigger('reloadGrid')
                $(s).triggerHandler("jqGridKeyUp", [t, n, e]),
                  $(this).isFunction(l.onUpKey) && l.onUpKey.call(s, t, n, e),
                  e.preventDefault()
              }
              if (38 === e.keyCode) {
              	// if (e.ctrlKey) {
              	// 	if ($(s).jqGrid('getGridParam', 'selrow') !== $('#transaksi').find(">tbody>tr.jqgrow").filter(":first").attr('id')) {
	              // 		$(s).jqGrid('setSelection', $(s).find(">tbody>tr.jqgrow").filter(":first").attr('id')).trigger('reloadGrid')
              	// 	} else {
              	// 		return false
              	// 	}
              	// } else {
	              //   if (
	              //     ((t = ""), (i = r.previousSibling) && $(i).hasClass("jqgrow"))
	              //   ) {
	              //     if ($(i).is(":hidden")) {
	              //       for (; i; )
	              //         if (
	              //           ((i = i.previousSibling),
	              //           !$(i).is(":hidden") && $(i).hasClass("jqgrow"))
	              //         ) {
	              //           t = i.id
	              //           break
	              //         }
	              //     } else t = i.id
	              //     $(s).jqGrid("setSelection", t, !0, e)
	              // 	}
               //  }
                $(s).triggerHandler("jqGridKeyUp", [t, n, e]),
                  $(this).isFunction(l.onUpKey) && l.onUpKey.call(s, t, n, e),
                  e.preventDefault()
              }
              if (40 === e.keyCode) {
              	// if (e.ctrlKey) {
              	// 	if ($(s).jqGrid('getGridParam', 'selrow') !== $('#transaksi').find(">tbody>tr.jqgrow").filter(":last").attr('id')) {
	              // 		$(s).jqGrid('setSelection', $(s).find(">tbody>tr.jqgrow").filter(":last").attr('id')).trigger('reloadGrid')
              	// 	} else {
              	// 		return false
              	// 	}
              	// } else {
	              //   if (
	              //     ((t = ""), (i = r.nextSibling) && $(i).hasClass("jqgrow"))
	              //   ) {
	              //     if ($(i).is(":hidden")) {
	              //       for (; i; )
	              //         if (
	              //           ((i = i.nextSibling),
	              //           !$(i).is(":hidden") && $(i).hasClass("jqgrow"))
	              //         ) {
	              //           t = i.id
	              //           break
	              //         }
	              //     } else t = i.id
	              //     $(s).jqGrid("setSelection", t, !0, e)
	              // 	}
               //  }
                $(s).triggerHandler("jqGridKeyDown", [t, n, e]),
                  $(this).isFunction(l.onDownKey) &&
                    l.onDownKey.call(s, t, n, e),
                  e.preventDefault()
              }
              37 === e.keyCode &&
                (s.p.treeGrid &&
                  s.p.data[a][o] &&
                  $(r).find("div.treeclick").trigger("click"),
                $(s).triggerHandler("jqGridKeyLeft", [s.p.selrow, e]),
                $(this).isFunction(l.onLeftKey) &&
                  l.onLeftKey.call(s, s.p.selrow, e)),
                39 === e.keyCode &&
                  (s.p.treeGrid &&
                    !s.p.data[a][o] &&
                    $(r).find("div.treeclick").trigger("click"),
                  $(s).triggerHandler("jqGridKeyRight", [s.p.selrow, e]),
                  $(this).isFunction(l.onRightKey) &&
                    l.onRightKey.call(s, s.p.selrow, e))
            } else
              13 === e.keyCode
                ? ($(s).triggerHandler("jqGridKeyEnter", [s.p.selrow, e]),
                  $(this).isFunction(l.onEnter) &&
                    l.onEnter.call(s, s.p.selrow, e))
                : 32 === e.keyCode &&
                  ($(s).triggerHandler("jqGridKeySpace", [s.p.selrow, e]),
                  $(this).isFunction(l.onSpace) &&
                    l.onSpace.call(s, s.p.selrow, e))
          }
        })
        .on("click", function (e) {
          $(e.target).is("input, textarea, select") ||
            $(e.target, s.rows).closest("tr.jqgrow").focus()
        })
  })
}

$.fn.isFunction = function (e) {
  return "function" == typeof e
}

function customBindKeys() {
	$(document).keydown(function(e) {
		if (
		  e.keyCode == 38 ||
		  e.keyCode == 40 ||
		  e.keyCode == 33 ||
		  e.keyCode == 34 ||
		  e.keyCode == 35 ||
		  e.keyCode == 36
		) {
		  e.preventDefault();

			if (activeGrid !== undefined) {
			  var gridArr = $(activeGrid).getDataIDs();
			  var selrow = $(activeGrid).getGridParam("selrow");
			  var curr_index = 0;
			  var currentPage = $(activeGrid).getGridParam('page')
				var lastPage = $(activeGrid).getGridParam('lastpage')
				var row = $(activeGrid).jqGrid('getGridParam', 'postData').rows

			  for (var i = 0; i < gridArr.length; i++) {
			    if (gridArr[i] == selrow) curr_index = i;
			  }

			  switch (e.keyCode) {
			  	case 33:
	      		if (currentPage > 1) {
	      			$(activeGrid).jqGrid('setGridParam', { "page": currentPage - 1 }).trigger('reloadGrid')
	      		}
						break
					case 34:
	      		if (currentPage !== lastPage) {
	      			$(activeGrid).jqGrid('setGridParam', { "page": currentPage + 1 }).trigger('reloadGrid')
	      		}
			  	case 38:
			  		if (curr_index - 1 >= 0)
			      $(activeGrid)
			        .resetSelection()
			        .setSelection(gridArr[curr_index - 1])
			      break
			    case 40:
			    	if (curr_index + 1 < gridArr.length)
			      $(activeGrid)
			        .resetSelection()
			        .setSelection(gridArr[curr_index + 1])
			        break
				}
		  }
		}
	})
}