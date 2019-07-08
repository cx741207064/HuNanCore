var $report = (function () {
     var wordObj = null;
     var isSave = false;
     var ftype=".doc";
     var isExport = false;
    /*私有方法 获取全路径*/
    function getRootPath() {
        var location = document.location;
        if("file:" == location.protocol) {
            var str = location.toString();
            return str.replace(str.split("/").reverse()[0], "");
        }
        var pathName = location.pathname.split("/");
        return location.protocol + "//" + location.host + "/";
    }

    /*私有方法 获取DsoFramer对象*/
    function getwordObj(oframeid, wordpath,orientLandscape) {
        if(wordObj == null) {
            wordObj = document.getElementById(oframeid);
            wordObj.WebUrl="download.sword?ctrl=WordCtrl_openWord&rUUID="+Sword.utils.uuid(32);      //打开和保存[服务器端脚本路径,如果需要对网络文件操作,必须制定一个处理程序]
        	if($chk(pageContainer)&&$chk(pageContainer.initData) && pageContainer.initData.getAttr('isSavePdf')=="true"){
        		isSave = true;
        		wordObj.ExtParam=pageContainer.initData.getAttr('tzsuuid')+","+pageContainer.initData.getAttr('tzsjg')+","+pageContainer.initData.getAttr('slsxdm')+","+pageContainer.initData.getAttr('djbs')+","+pageContainer.initData.getAttr('djxh')+","+pageContainer.initData.getAttr('lcslid')+","+pageContainer.initData.getAttr('lcsxdm');
        	}
            wordObj.RecordID="";
            wordObj.Template="";
            wordObj.FileName=wordpath;  //文档名称
            wordObj.FileType= ftype;
            wordObj.EditType="1,1";
            wordObj.UserName="";
            wordObj.PenColor="#FF8000";
            wordObj.PenWidth="2";
            wordObj.Print="1";
            wordObj.ShowToolBar="2";
            wordObj.ShowMenu="0";
            try {
                var stats = wordObj.WebOpen();
                if(!stats){
                	swordAlert("打开失败，请检查路径是否正确！");
                	pc.getMask().unmask();
                	wordObj = null;
                	return;
        		}
            } catch(e) {
            	swordAlert("若是第一次访问打印页面，打印控件需要进行加载，请关闭后重新打开当前页面！");
            	pc.getMask().unmask();
            	wordObj = null;
            	return;
            }
            if(ftype != ".xls"){
            	var orientation = wordObj.WebObject.PageSetup.Orientation;
            if(orientLandscape&&orientation!=1){
                wordObj.WebObject.PageSetup.TogglePortrait();
            }else if(!orientLandscape&&orientation!=0){
            	wordObj.WebObject.PageSetup.TogglePortrait();
            }
            }
            pc.getMask().unmask();
            wordObj.WebObject.Protect(2);
        }
        return wordObj;
    }

    /*私有方法 根据名称替换书签*/
    function replaceBookmark(strName, content, type) {
        if(wordObj != null){
//	        if(wordObj.WebObject.BookMarks.Exists(strName)) {
	            if(type != null && type == "pic") {//图片
	                var objDoc = wordObj.WebObject.BookMarks(strName).Range.Select();
	                var objSelection = wordObj.Selection;
	                objSelection.TypeParagraph();
	                var objShape = objSelection.InlineShapes.AddPicture(getRootPath() + content);
	            }
	            else {
//	                wordObj.WebObject.BookMarks(strName).Range.Select();
//	                wordObj.WebObject.Application.selection.Text = content;
	            	try{
	            		wordObj.WebObject.BookMarks(strName).Range.Text = content;
	            	}catch(e){}
	            }
//	        }
        }
    }

    function exitPreview() {
    	if(wordObj != null){
    		if(wordObj.WebObject.Application.ActiveWindow.ActivePane.View.Type==4)wordObj.WebObject.ClosePrintPreview();
    		wordObj.WebObject.Application.ActiveDocument.Range(0,0).Select();
    		wordObj.Active(true);
    	}
    }

    function baseVoListObj() {
        this.singlevo = null;
        this.volist = [];
        this.cols = [];
        this.captions = [];
        this.widths = [];
    }

    /*私有方法 删除所有书签*/
    function clearAllBookMarksValue() {
        while(wordObj.WebObject.Bookmarks.Count != 0) {
            wordObj.WebObject.Bookmarks(1).Delete();
        }
    }

    return {

        //	接口方法 第一个参数可以接收数组 或者是对象，第二个参数是要生成的form的 名字
        jsonToForm : function (json, name) {

            if('array' == $type(json)) {
                json.each(function(v, i) {
                    createOneForm(v);
                });
            } else if('object' == $type(json)) {
                createOneForm(json);
            } else {
                return false;
            }
            return true;
            function createOneForm(oneForm) {
                var form = new Element('form', {
                    'id':name,
                    'name':name,
                    'styles':{'display':'none'}
                }).inject(window.document.body, 'bottom');
                for(e in oneForm) {
                    var value = $defined(oneForm[e].value) ? oneForm[e].value : oneForm[e];
                    if(!$defined(value)) value = "";
                    new Element('textarea', {
                        'name':e,
                        'text': value
                    }).inject(form, 'bottom');
                }
            }

        },
        //	接口方法 合并form类型的JSON对象，第一个参数为将被合并的对象，第二个参数是要将第一个参数合并的目标对象，如果两个对象中存在相同key的值，第二个参数中的值将被第一个覆盖。
        mergeJsonForm : function (des, src) {
        	if('object' == $type(des)&&'object' == $type(src)){
        		for(e in des){
        			src[e] = des[e];
            	}
        	}else{
        		swordAlert("请输入正确的表单数据");
        	}
        	
        },

       
        /*公共方法  批量生成*/
        batchprint:function(volistarray, oframeid, wordpath, beforeprint, afterprint) {
            if(beforeprint) beforeprint.call();
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            exitPreview();
            var len = volistarray.length,i = 0;
            wordObj.WebObject.Select();
            wordObj.WebObject.Application.selection.Copy();
            for(i; i < len; i++) {
                if(i == 0) {
                    this.replaceBookmark(volistarray[i]);
                }
                try {
                    wordObj.WebObject.Unprotect();
                } catch(e) {
                }
                clearAllBookMarksValue();
                if(i != 0) {
                    wordObj.WebObject.Select();
                    wordObj.WebObject.Application.selection.Collapse(0);
                    wordObj.WebObject.Application.selection.MoveEnd();
                    wordObj.WebObject.Application.selection.InsertBreak(2);
                    wordObj.WebObject.Application.selection.Paste();
                    this.replaceBookmark(volistarray[i]);
                }
            }
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            wordObj.WebObject.Fields.Update();
            wordObj.WebObject.Protect(2);
            if(afterprint) afterprint.call();
        },

        /*公共方法  批量生成*/
        batchBuild:function(volistarray, oframeid, wordpath, beforeprint, afterprint) {
            if(beforeprint) beforeprint.call();
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            exitPreview();
            var len = volistarray.length,i = 0;
            wordObj.WebObject.Select();
            wordObj.WebObject.Application.selection.Copy();
            for(i; i < len; i++) {
            	var temp = volistarray[i];
                if(i == 0) {
                	if($type(temp)=="array"){
                		for(var k=0; k<temp.length;k++){
                			 this.replaceBookmark(temp[k]);
                		}
                	}else this.replaceBookmark(temp);
                }
                try {
                    wordObj.WebObject.Unprotect();
                } catch(e) {
                }
                clearAllBookMarksValue();
                if(i != 0) {
                    wordObj.WebObject.Select();
                    wordObj.WebObject.Application.selection.Collapse(0);
                    wordObj.WebObject.Application.selection.MoveEnd();
                    wordObj.WebObject.Application.selection.InsertBreak(2);
                    wordObj.WebObject.Application.selection.Paste();
                	if($type(temp)=="array"){
                		for(var k=0; k<temp.length;k++){
                			 this.replaceBookmark(temp[k]);
                		}
                	}else this.replaceBookmark(temp);
                }
            }
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            wordObj.WebObject.Fields.Update();
            wordObj.WebObject.Protect(2);
            if(afterprint) afterprint.call();
        },
        /*公共方法  关闭*/
        close :function() {
        	if(wordObj!=null){
        		wordObj.WebClose();
        	}
        	var box = window.parent[window.name];
        	if($chk(box)){
        		box.close();
        	}else{  window.close();}
        },
        /*公共方法  根据表格模板构造表格*/
        replaceBookmarkbuildtable:function(volist) {
            exitPreview();
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            var firstbookmark = volist.cols[0];
            if(wordObj != null){
	            if(wordObj.WebObject.Bookmarks.Exists(firstbookmark)) {
	                var colindex = wordObj.WebObject.Bookmarks(firstbookmark).Range.Cells(1).ColumnIndex;
	                var rowindex = wordObj.WebObject.Bookmarks(firstbookmark).Range.Cells(1).RowIndex;
	                var colcount = volist.cols.length;
	                var rowcount = volist.volist.length;
	
	                var currenttable = wordObj.WebObject.Bookmarks(firstbookmark).Range.Tables(1);
	                currenttable.Cell(rowindex, colindex).Select();
	                var i = 0,j = 0;
	                for(i; i < rowcount - 1; i++) {
	                    wordObj.WebObject.Application.selection.InsertRowsAbove();
	                }
	                var temprc = rowcount + rowindex;
	                var tempcc = colcount + colindex;
	                var m = 0,n = 0;
	                for(i = rowindex; i < temprc; i++) {
	                    for(j = colindex; j < tempcc; j++) {
	                        var temptext = volist.volist[m][volist.cols[n]];
	                        alert(currenttable.Cell(i, j));
	                        //currenttable.Cell(i, j).Range.InsertAfter(temptext);
	                        //currenttable.Cell(i,j).Range.InsertAfter((i)+","+(j));
	                        n += 1;
	                    }
	                    n = 0;
	                    m += 1;
	                }
	            }
	            wordObj.WebObject.Fields.Update();
	            wordObj.WebObject.Protect(2);
            }
        },
        
        /*公共方法  根据表格模板构造表格*/
        replaceBookmarkByGridData:function(gridData,keyList) {
            if(!gridData||typeof gridData != "object"){
            	alert("请输入正确的表格数据");
            	return;
            }
            exitPreview();
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            if(!keyList){
            	keyList = [];
            	if(gridData.trs[0]!= undefined){
            		var tds = gridData.trs[0].tds;
            		var n=0;
            		for(var i in tds) {
            			keyList[n] = i;
            			n=n+1;
            		}
            	}
            }
            //var beginDate = new Date();
            var firstbookmark ="";
            var c = wordObj.WebObject.Bookmarks.Count+1;
            if(wordObj != null){
            	var beginDate = new Date();
            	for(var n = 1;n < c;n++){
            		var bk = wordObj.WebObject.Bookmarks(n);
	            	for(var m = 0;m < keyList.length;m++){
	            		if(keyList[m] == bk){
	            			firstbookmark = keyList[m];
	            			break;
	            		}
		            }
            	}
            if(keyList.length > 0){
            	if(firstbookmark != ""){
	                var colindex = wordObj.WebObject.Bookmarks(firstbookmark).Range.Cells(1).ColumnIndex;
	                var rowindex = wordObj.WebObject.Bookmarks(firstbookmark).Range.Cells(1).RowIndex;
	                var colcount = keyList.length;
	                var rowcount = gridData.trs.length;
	
	                var currenttable = wordObj.WebObject.Bookmarks(firstbookmark).Range.Tables(1);
	                currenttable.Cell(rowindex, colindex).Select();
	                var i = 0,j = 0;
	                for(i; i < rowcount - 1; i++) {
	                    wordObj.WebObject.Application.selection.InsertRowsAbove();
	                }
	                var temprc = rowcount + rowindex;
	                var tempcc = colcount + colindex;
	
	                var m = 0,n = 0;
	                for(i = rowindex; i < temprc; i++) {
	                    for(j = colindex; j < tempcc; j++) {
	                    	var td = gridData.trs[m].tds[keyList[n]];
	                    	var temptext = "";
	                    	if($chk(td)) temptext = td.value;
	                    	//判断当前td的名称在模板中是否包含对应的标签
	                    	if (wordObj.WebObject.Bookmarks.Exists(keyList[n])){
	                    		//获取该标签对应列号
	                    		var col = wordObj.WebObject.Bookmarks(keyList[n]).Range.Cells(1).ColumnIndex;
	                    		currenttable.Cell(i, col).Range.Text = temptext;
	                    	}
	                        n += 1;
	                    }
	                    n = 0;
	                    m += 1;
	                }
            	}
            }
            wordObj.WebObject.Fields.Update();
            wordObj.WebObject.Protect(2);
            }
        },
        /*公共方法 初始化*/
        init:function(oframeid, wordpath,orientLandscape,customBars) {
        	if($chk(pc)&&$chk(pc.initData) && pc.initData.getAttr('isExport')=="true"){
            	isExport = true;            
            }
        	var box = window.parent[window.name];
            ftype = wordpath.substr(wordpath.lastIndexOf("."),wordpath.length);
    		if($(oframeid))$(oframeid).parentNode.removeChild($(oframeid));
    		var h = 1;
        	if(!$chk(box)){
        		var brs = document.getElements('br');
        		for(var i=0;i<brs.length;i++){
        			brs[i].destroy();
        		}
        		var inps = document.getElements('input');
        		for(var i=0;i<inps.length;i++){
        			inps[i].destroy();
        		}
        		
        		var installPrint = new Element('div', {name:'installPrint',type:'print',caption:'打印',onclick:'$report.installPrint()',enabled:'true'});
        		var print = new Element('div', {name:'print',type:'print',caption:'快速打印',onclick:'$report.print()',enabled:'true'});
        		var printpreview = new Element('div', {name:'printpreview',type:'print',caption:'打印预览',onclick:'$report.printpreview()',enabled:'true'});
        		var leftMargin  = new Element('div', {name:'leftMargin',type:'edit',caption:'左边距',onclick:'$report.leftMargin()',enabled:'true'});
        		var rightMargin = new Element('div', {name:'rightMargin',type:'edit',caption:'右边距',onclick:'$report.rightMargin()',enabled:'true'});
        		var topMargin = new Element('div', {name:'topMargin',type:'edit',caption:'上边距',onclick:'$report.topMargin()',enabled:'true'});
        		var bottomMargin = new Element('div', {name:'bottomMargin',type:'edit',caption:'下边距',onclick:'$report.bottomMargin()',enabled:'true'});
        		var orientation = new Element('div', {name:'orientation',type:'edit',caption:'纸张方向',onclick:'$report.changeOrientation()',enabled:'true'});
        		var lineSpacing1 = new Element('div', {name:'lineSpacing1',type:'edit',caption:'行间距',onclick:'$report.changeLineSpacing1()',enabled:'true'});
//        		var lineSpacing15 = new Element('div', {name:'lineSpacing15',type:'edit',caption:'1.5行距',onclick:'$report.changeLineSpacing15()',enabled:'true'});
//        		var lineSpacing2 = new Element('div', {name:'lineSpacing2',type:'edit',caption:'2倍行距',onclick:'$report.changeLineSpacing2()',enabled:'true'});
        		var close = new Element('div', {name:'close',type:'close',caption:'退出',onclick:'$report.close()',enabled:'true'});
        		var toolbar = null;
        		toolbar  = new Element('div', {name:'printBarButton',sword:'SwordToolBar'});

        		  var winheight = parseFloat($(window.document.body).getCoordinates().height) || 0;
        		  if(Browser.Engine.trident4)winheight = winheight-80-30;
        		  else winheight = winheight-50-30;
        		  h = winheight;
        		  $(toolbar).grab(installPrint);
        		  $(toolbar).grab(print);
          		  if(ftype != ".xls"){
          		  	$(toolbar).grab(printpreview);
          		  	$(toolbar).grab(leftMargin);
          		  $(toolbar).grab(rightMargin);
          		  $(toolbar).grab(topMargin);
          		  $(toolbar).grab(bottomMargin);
          		  $(toolbar).grab(orientation);
          		  $(toolbar).grab(lineSpacing1);          		  
          		  }
          		  if(isExport){
        			var exportEl = new Element('div', {name:'export',type:'export',caption:'导出',onclick:'$report.exportObj()',enabled:'true'});
        		    $(toolbar).grab(exportEl);   
        		  }
//          		  $(toolbar).grab(lineSpacing15);
//          		  $(toolbar).grab(lineSpacing2);
          		  if($chk(customBars)){
          			for(var i=0;i<customBars.length;i++){
    	      			$(toolbar).grab(customBars[i]);
    	    		}
          		  }
        			  $(toolbar).grab(close);
          		  $(document.body).grab(toolbar);
          		  pc.initWidgetParam(toolbar);
          		  pc.firePIOnDataInit();
          		  
          		  pc.getMask().mask(document.body);
        	}else{
        		h = box.popUpDiv.getHeight()-65;
                window.addEvent('resize',function(e){
                	$(oframeid).style.height = box.popUpDiv.getHeight() - 65 + "px";
                });
        	  } 
        	  
      		  
            	var div=document.createElement("div");
                var codes=[];  
                codes.push('<object classid="clsid:8B23EA28-2009-402F-92C4-59BE0E063499" CODEBASE="/gt3_public/ocx/iWebOffice2009.ocx" id="'+oframeid+'" width="100%" height="'+h+'px">');
                codes.push('</object> ');
                 
                div.style.cssText="display:none;"
                div.innerHTML=codes.join("");
                var dso =div.removeChild(div.getElementsByTagName("object")[0]);
                document.body.appendChild(dso);
                div=null;
                if(ftype !=".xls"){
                   setTimeout("$report.lazyWidth("+oframeid+")",10);
                }
        	$(oframeid).attachEvent("OnToolsClick",function(vIndex,vCaption)   {
        			if(vIndex==-1&&vCaption=="返回"){
        				wordObj.WebObject.Protect(2);
        				wordObj.WebObject.CommandBars("Standard").Visible=false
        	            wordObj.WebObject.CommandBars("Formatting").Visible=false; 
        			}else if(vIndex==-1&&vCaption=="全屏"){
        				wordObj.WebObject.Protect(2);
        				wordObj.WebObject.CommandBars("Standard").Visible=false
        	            wordObj.WebObject.CommandBars("Formatting").Visible=false; 
        			}
        		　　})
            return getwordObj("oframe", wordpath,orientLandscape,customBars);
        },
        lazyWidth:function(oframeid){
        	if($chk(wordObj)){
            	wordObj.WebObject.Application.ActiveDocument.Range(0,0).Select();
            	wordObj.Active(true);
            	pc.getMask().unmask();
        	}
        },
        /*公共方法 打印预览*/
        printpreview : function() {
			if (wordObj.WebObject.Application.ActiveWindow.ActivePane.View.Type == 4) {
				exitPreview();
				return;
			}
			wordObj.WebObject.PrintPreview();
		},
        /* 公共方法 左边距 */
        leftMargin : function () {
        	swordPrompt("请输入左边距",{width:400,height:300,   
                onOk: function(promptValue){  
                	 try {
                		 exitPreview();
                         wordObj.WebObject.Unprotect();
                     } catch(e) {
                     }
                	  try {
                    	wordObj.WebObject.PageSetup.LeftMargin = promptValue;   
                    	wordObj.WebObject.Protect(2);
          			} catch (e) {
          				swordAlert(e.message);
                    	wordObj.WebObject.Protect(2);
          			}
                    }   
                });   
        }, 
        /*公共方法 右边距*/
        rightMargin : function () {
        	swordPrompt("请输入右边距",{width:400,height:300,   
                onOk: function(promptValue){  
                	 try {
                		 exitPreview();
                         wordObj.WebObject.Unprotect();
                     } catch(e) {
                     }
                	  try {
                    	wordObj.WebObject.PageSetup.RightMargin = promptValue;   
                    	wordObj.WebObject.Protect(2);
          			} catch (e) {
          				swordAlert(e.message);
                    	wordObj.WebObject.Protect(2);
          			}
                    }   
                });   
        }, 
        /*公共方法 上边距*/
        topMargin : function () {
        	swordPrompt("请输入上边距",{width:400,height:300,   
                onOk: function(promptValue){ 
                	 try {
                		 exitPreview();
                         wordObj.WebObject.Unprotect();
                     } catch(e) {
                     }
                	  try {
                    	wordObj.WebObject.PageSetup.TopMargin = promptValue;   
                    	wordObj.WebObject.Protect(2);
          			} catch (e) {
          				swordAlert(e.message);
                    	wordObj.WebObject.Protect(2);
          			}
                    }   
                });   
        }, 
        /*公共方法 下边距*/
        bottomMargin : function () {
        	swordPrompt("请输入下边距",{width:400,height:300,   
                onOk: function(promptValue){
                	 try {
                		 exitPreview();
                         wordObj.WebObject.Unprotect();
                     } catch(e) {
                     }
                	  try {
                    	wordObj.WebObject.PageSetup.BottomMargin = promptValue;   
                    	wordObj.WebObject.Protect(2);
          			} catch (e) {
          				swordAlert(e.message);
                    	wordObj.WebObject.Protect(2);
          			}
                    }   
                });   
        },  /*公共方法 横纵向切换*/
        changeOrientation : function () {
         try {
        	 	 exitPreview();
                 wordObj.WebObject.Unprotect();
             } catch(e) {
             }
        	wordObj.WebObject.PageSetup.TogglePortrait();
        	wordObj.WebObject.Protect(2);
        },  /*公共方法 行间距*/
        changeLineSpacing1 : function () {
        	swordPrompt("请输入行间距",{width:400,height:300,   
                onOk: function(promptValue){
                	 try {
                		 exitPreview();
                         wordObj.WebObject.Unprotect();
                     } catch(e) {
                     }
                	 try {
            	   	      wordObj.WebObject.Application.Selection.WholeStory();  //选中整个文档
            	   	      wordObj.WebObject.Application.Selection.ParagraphFormat.LineSpacingRule = 4
            	   	      wordObj.WebObject.Application.Selection.ParagraphFormat.LineSpacing = promptValue;  //行距
               	          wordObj.WebObject.Protect(2);
          			} catch (e) {
          				swordAlert(e.message);
                    	wordObj.WebObject.Protect(2);
          			}
                    }   
                });  
        }, /*公共方法 1.5倍间距*/
        changeLineSpacing15 : function () {
       	 	try {
       	 		 exitPreview();
  	             wordObj.WebObject.Unprotect();
  	         } catch(e) {
  	         }
  	       try {
    	         wordObj.WebObject.Range().ParagraphFormat.Space15();// = promptValue;
      	         wordObj.WebObject.Protect(2);
			} catch (e) {
				swordAlert(e.message);
				wordObj.WebObject.Protect(2);
			}
       }, /*公共方法 2倍间距*/
       changeLineSpacing2 : function () {
      	 	try {
      		 	 exitPreview();
 	             wordObj.WebObject.Unprotect();
 	         } catch(e) {
 	         }
 	        try {
 	 	         wordObj.WebObject.Range().ParagraphFormat.Space2();// = promptValue;
 	 	         wordObj.WebObject.Protect(2);
			} catch (e) {
				swordAlert(e.message);
				wordObj.WebObject.Protect(2);
			}
      }, 
        /*公共方法 打印*/
        print : function (breforeprint, afterprint, flag) {
            if (breforeprint)
				breforeprint.call();
			if (ftype != ".xls") {
				exitPreview();
				try {
					wordObj.WebObject.Application.ActiveDocument.PrintOut();
				} catch (e) {
				}
			} else {
				wordObj.WebObject.PrintOut();
			}
			if(isSave)$report.saveWord();
            if(afterprint) afterprint.call();
        }, 
        /*保存到服务器*/
        saveWord : function () {
        	var stats = wordObj.WebSave(true);
    		if(stats){
    			swordAlert("上传成功！");
    		}else{
    			var dataObj = {};
    			dataObj['ajaxErrorPage'] = "swordweb/html/error/error_ajax.jsp";
    			dataObj['ajaxErrorPopupParam'] = "{titleName:\'系统提示\',width: 590,height:195,top:50,isMin:\"false\",isNormal:\"false\",isMax:\"false\"}";
    			dataObj['debugMes'] = wordObj.Status;
    			dataObj['exception'] = true;
    			dataObj['exceptionMes'] = "1019900000001:系统出现异常！请联系管理员";
    			dataObj['exceptionName'] = "";
    			var param = {};
    			param['errMes'] = true;
    			pc.showEx(param,dataObj);
    		}
        },
        /*打印设置方法 打印*/
        installPrint : function () {
        	if(ftype != ".xls"){
        		exitPreview();
        	}
//            wordObj.WebObject.Application.ActivePrinter = defaultPrint;
            wordObj.WebOpenPrint();
            
            if(isSave)$report.saveWord();
        },
        /*公共方法 根据vo替换书签*/
        replaceBookmarkUsevo: function (voObj) {
            exitPreview();
            if(typeof voObj != "object") {
                alert("请输入正确的vo对象");
            } else {
            	try{
            		wordObj.WebObject.Unprotect();
            	}catch(e){}
                for(var i in voObj) {
                    replaceBookmark(i, voObj[i]);
                }
                wordObj.WebObject.Protect(2);
                if(wordObj != null){
                	wordObj.WebObject.Fields.Update();
                }
            }
        },
        /*公共方法 根据JsonForm对象替换书签*/
        replaceBookmarkUseJsonForm: function (jsonForm) {
        	 try {
                 wordObj.WebObject.Unprotect();
             } catch(e) {
             }
            exitPreview();
            if(typeof jsonForm != "object") {
                alert("请输入正确的jsonForm对象");
            } else {
                for(var i in jsonForm) {
                	 if(wordObj.WebObject.BookMarks.Exists(i)) {
                           wordObj.WebObject.BookMarks(i).Range.Select();
                           wordObj.WebObject.Application.selection.Text = jsonForm[i].value;
//                	wordObj.WebSetBookmarks(i,jsonForm[i].value);
                     }
                }
                wordObj.WebObject.Fields.Update();
            }
            wordObj.WebObject.Protect(2);
//            wordObj.EditType="0,0";
        },
        /*公共方法 根据voList替换标签*/
        replaceBookmark:function(voList, tablebookmark, beforeprint, afterprint) {
            if(beforeprint) beforeprint.call();
            if(voList.singlevo != null) {
                this.replaceBookmarkUsevo(voList.singlevo);
            }
            if(tablebookmark) {
                this.replaceBookmarkUsevolist(tablebookmark, voList);
            } else {
                this.replaceBookmarkbuildtable(voList);
            }
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            if(wordObj != null){
	            wordObj.WebObject.Fields.Update();
	            wordObj.WebObject.Protect(2);
	            if(afterprint) afterprint.call();
            }
        },

        /*公共方法 获取数据volist*/
        getVodata:function(singlevoformName, volistformName) {
            var voListObj = new baseVoListObj();
            var formObj = document.forms[singlevoformName];
            if(formObj) {
                var vo = {};
                if(formObj.elements) {
                    var elArray = formObj.elements;
                    for(var i = elArray.length; i >= 1;) {
                        i--;
                        vo[elArray[i].name] = elArray[i].value;
                    }
                    voListObj.singlevo = vo;
                }

            }
            if(volistformName) {
                volistformName.each(function(item, index) {
                    var formArray = document.getElementsByName(item);
                    var formObj = null;
                    if(formArray.length > 0)formObj = formArray[0];
                    if(formObj != null & formObj.elements) {
                        var vo = {};
                        var elArray = formObj.elements;
                        for(var i = elArray.length; i >= 0; i--) {
                            vo[elArray[i].name] = elArray[i].value;
                        }
                        voListObj.volist.push(vo);
                        if(index = 0) {
                            voListObj.cols.push(formObj.elements[0].name);
                            voListObj.captions.push(formObj.elements[0].caption ? formObj.elements[0].caption : "");
                            voListObj.widths.push(formObj.elements[0].style.width);
                        }
                    }
                });
            }
            return voListObj;
        },


        /*公共方法 根据Form表单元素构造vo*/
        getSingleVo: function (formName, arrayObj) {//第二个参数可以为空，不填时默认为表单里的所有元素
            var formObj = document.forms[formName];
            if(formObj != null) {
                if(arrayObj != null) {
                    if(arrayObj instanceof Array) {
                        var vo = {};
                        for(var i = 0; i < arrayObj.length; i++) {
                            if(formObj.elements[arrayObj[i]] != undefined) {
                                vo[arrayObj[i]] = formObj.elements[arrayObj[i]].value;
                            }
                        }
                        return vo;
                    } else {
                        alert("弟二个参数应为数组类型");
                    }
                } else {
                    var vo = {};
                    for(var i = 0; i < formObj.elements.length; i++) {
                        vo[formObj.elements[i].name] = formObj.elements[i].value;
                    }
                    return vo;
                }
            } else {
                alert("第一个参数表示的表单不存在");
                return null;
            }
        },
        /*公共方法 根据Form表单元素构造vo*/
        getVoList :function(formName, arrayObj) {//表单名，属性数组(可以为空)
            /*ar formArray = document.forms[formName];*/
            var formArray = document.getElementsByName(formName);
            if(formArray != null) {
                if(arrayObj instanceof Array) {
                    var voListObj = new baseVoListObj();
                    /*for(var i=0;i<formArray.length;i++){
                     var vo = {};
                     for(var j=0;j<arrayObj.length;j++){
                     if(formArray[i].elements[arrayObj[j]]!= undefined ){
                     vo[arrayObj[j]] =  formArray[i].elements[arrayObj[j]].value;
                     if(i==0){
                     voListObj.captions.push( formArray[i].elements[arrayObj[j]].caption? formArray[i].elements[arrayObj[j]].caption:"");
                     voListObj.cols.push(arrayObj[j]);
                     voListObj.widths.push(formArray[i].elements[arrayObj[j]].style.width);
                     }
                     }
                     }
                     voListObj.singlevo.push(vo);
                     }*/
                    var vo = {};
                    if(formArray[0].elements) {
                        arrayObj.each(function(item, index) {
                            vo[item] = formArray[0].elements[item].value;
                        });
                    }
                    voListObj.singlevo = vo;
                    return voListObj;
                } else {
                    var voListObj = new baseVoListObj();
                    for(var i = 0; i < formArray.length; i++) {
                        var vo = {};
                        for(var j = 0; j < formArray[i].elements.length; j++) {
                            vo[formArray[i].elements[j].name] = formArray[i].elements[j].value;
                            if(i == 0) {
                                voListObj.cols.push(formArray[i].elements[j].name);
                                voListObj.captions.push(formArray[i].elements[j].caption ? formArray[i].elements[j].caption : "");
                                voListObj.widths.push(formArray[i].elements[j].style.width);
                            }
                        }
                        voListObj.volist.push(vo);
                    }
                    return voListObj;
                }
            } else {
                return null;
            }
        },


        /*公共方法 根据volist替换书签*/
        replaceBookmarkUsevolist:function(strName, voListObj, isBorder) {
            try {
                wordObj.WebObject.Unprotect();
            } catch(e) {
            }
            if(typeof voListObj != "object") {
                alert("参数应为数组类型");
            } else {
                var row = voListObj.volist.length;
                var col = voListObj.cols.length;
                if(row != 0 && col != 0) {
                    var objDoc = wordObj.WebObject.BookMarks(strName).Range;
                    var objTable = wordObj.WebObject.Tables.Add(objDoc, row + 1, col);//插入表格
                    for(var k = 0; k < voListObj.captions.length; k++) {
                        objTable.Cell(1, k + 1).Range.InsertAfter(voListObj.captions[k]);
                    }
                    for(var i = 0; i < row; i++) {
                        for(var j = 0; j < col; j++) {
                            objTable.Cell(i + 2, j + 1).Range.InsertAfter(voListObj.volist[i][voListObj.cols[j]]);
                            var width = voListObj.widths[j];
                            if(width.indexOf("px") != -1) {
                                objTable.Cell(i + 2, j + 1).Width = (width.substr(0, width.length - 2) / 100) * 28.35;//1厘米=28.35磅
                            }
                        }
                    }
                    //objTable.AutoFormat(1);
                    if(false == isBorder) {
                        objTable.Borders.InsideLineStyle = 0;
                    } else {
                        objTable.Borders.InsideLineStyle = 1;
                    }
                    objTable.Borders.OutsideLineStyle = 1;
                }
            }
            wordObj.WebObject.Fields.Update();
            wordObj.WebObject.Protect(2);
        },
        exportObj:function(){
        	$report.saveWord();
        	var sb = new SwordSubmit();
        	sb.options.postType="download";
        	sb.pushData("fileName",wordObj.FileName);
        	sb.setCtrl("WordCtrl_export");
        	sb.submit();
        }
        /************************end****************************************************/
    };
}());

function printsbxx(nsrxxReturn){
	//注意此处FROM的提交方式必须为 getSubmitData()	
	var nsrxxForm = $w("nsrxxForm").getSubmitData();
	var sbbxxForm = $w("sbbxxForm").getSubmitData();
	var slxxForm = $w("slxxForm").getSubmitData();
	//纳税人信息
	var sbrq1 = $w("nsrxxForm").getValue("sbrq1");
	var skssqq = $w("nsrxxForm").getValue("skssqq");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var nsrsbh = $w("nsrxxForm").getValue("nsrsbh");
	var skssqz = $w("nsrxxForm").getValue("skssqz");
	var slr = $w("slxxForm").getValue("slr");
	
	//申报信息
	//（一）按适用税率征税货物及劳务销售额
	var ybhwjlwbys1 = $w("sbbxxForm").getValue("ybhwjlw_bys_1");
	var ybhwjlwbnlj1 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_1");
	var jzjthwjlwbys1 = $w("sbbxxForm").getValue("jzjthwjlw_bys_1");
	var jzjthwjlwbnlj1 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_1");
	//其中：应税货物销售额
	var ybhwjlwbys2 = $w("sbbxxForm").getValue("ybhwjlw_bys_2");
	var ybhwjlwbnlj2 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_2");
	var jzjthwjlwbys2 = $w("sbbxxForm").getValue("jzjthwjlw_bys_2");
	var jzjthwjlwbnlj2 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_2");
	//应税劳务销售额
	var ybhwjlwbys3 = $w("sbbxxForm").getValue("ybhwjlw_bys_3");
	var ybhwjlwbnlj3 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_3");
	var jzjthwjlwbys3 = $w("sbbxxForm").getValue("jzjthwjlw_bys_3");
	var jzjthwjlwbnlj3 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_3");
	//纳税检查调整的销售额
	var ybhwjlwbys4 = $w("sbbxxForm").getValue("ybhwjlw_bys_4");
	var ybhwjlwbnlj4 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_4");
	var jzjthwjlwbys4 = $w("sbbxxForm").getValue("jzjthwjlw_bys_4");
	var jzjthwjlwbnlj4 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_4");
	//（二）按简易征收办法征税货物销售额
	var ybhwjlwbys5 = $w("sbbxxForm").getValue("ybhwjlw_bys_5");
	var ybhwjlwbnlj5 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_5");	
	var jzjthwjlwbys5 = $w("sbbxxForm").getValue("jzjthwjlw_bys_5");
	var jzjthwjlwbnlj5 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_5");
	//其中：纳税检查调整的销售额6
	var ybhwjlwbys6 = $w("sbbxxForm").getValue("ybhwjlw_bys_6");
	var ybhwjlwbnlj6 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_6");	
	var jzjthwjlwbys6 = $w("sbbxxForm").getValue("jzjthwjlw_bys_6");
	var jzjthwjlwbnlj6 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_6");
	//（三）免、抵、退办法出口货物销售额
	var ybhwjlwbys7 = $w("sbbxxForm").getValue("ybhwjlw_bys_7");
	var ybhwjlwbnlj7 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_7");
	//（四）免税货物及劳务销售额
	var ybhwjlwbys8 = $w("sbbxxForm").getValue("ybhwjlw_bys_8");
	var ybhwjlwbnlj8 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_8");
	//其中：免税货物销售额
    var ybhwjlwbys9 = $w("sbbxxForm").getValue("ybhwjlw_bys_9");
	var ybhwjlwbnlj9 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_9");
    //免税劳务销售额
    var ybhwjlwbys10 = $w("sbbxxForm").getValue("ybhwjlw_bys_10");
	var ybhwjlwbnlj10 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_10");
	//销项税额
	var ybhwjlwbys11 = $w("sbbxxForm").getValue("ybhwjlw_bys_11");
	var ybhwjlwbnlj11 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_11");
	var jzjthwjlwbys11 = $w("sbbxxForm").getValue("jzjthwjlw_bys_11");	
	var jzjthwjlwbnlj11 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_11");
	//进项税额
	var ybhwjlwbys12 = $w("sbbxxForm").getValue("ybhwjlw_bys_12");
	var ybhwjlwbnlj12 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_12");
	var jzjthwjlwbys12 = $w("sbbxxForm").getValue("jzjthwjlw_bys_12");
	var jzjthwjlwbnlj12 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_12");
	//上期留抵税额
	var ybhwjlwbys13 = $w("sbbxxForm").getValue("ybhwjlw_bys_13");
	var ybhwjlwbnlj13 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_13");
	var jzjthwjlwbys13 = $w("sbbxxForm").getValue("jzjthwjlw_bys_13");
	//进项税额转出
	var ybhwjlwbys14 = $w("sbbxxForm").getValue("ybhwjlw_bys_14");
	var ybhwjlwbnlj14 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_14");
	var jzjthwjlwbys14 = $w("sbbxxForm").getValue("jzjthwjlw_bys_14");
	var jzjthwjlwbnlj14 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_14");
	//免、抵、退应退税额
	var ybhwjlwbys15 = $w("sbbxxForm").getValue("ybhwjlw_bys_15");
	var ybhwjlwbnlj15 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_15");
	//按适用税率计算的纳税检查应补缴税额
	var ybhwjlwbys16 = $w("sbbxxForm").getValue("ybhwjlw_bys_16");
	var ybhwjlwbnlj16 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_16");
	//应抵扣税额合计
	var ybhwjlwbys17 = $w("sbbxxForm").getValue("ybhwjlw_bys_17");
	var jzjthwjlwbys17 = $w("sbbxxForm").getValue("jzjthwjlw_bys_17");
	//实际抵扣税额
	var ybhwjlwbys18 = $w("sbbxxForm").getValue("ybhwjlw_bys_18");
	var ybhwjlwbnlj18 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_18");
	var jzjthwjlwbys18 = $w("sbbxxForm").getValue("jzjthwjlw_bys_18");
	var jzjthwjlwbnlj18 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_18");
	//应纳税额
	var ybhwjlwbys19 = $w("sbbxxForm").getValue("ybhwjlw_bys_19");
	var ybhwjlwbnlj19 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_19");
	var jzjthwjlwbys19 = $w("sbbxxForm").getValue("jzjthwjlw_bys_19");
	var jzjthwjlwbnlj19 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_19");
	//期末留抵税额
	var ybhwjlwbys20 = $w("sbbxxForm").getValue("ybhwjlw_bys_20");
	var ybhwjlwbnlj20 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_20");
	var jzjthwjlwbys20 = $w("sbbxxForm").getValue("jzjthwjlw_bys_20");
	//简易征收办法计算的应纳税额
	var ybhwjlwbys21 = $w("sbbxxForm").getValue("ybhwjlw_bys_21");
	var ybhwjlwbnlj21 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_21");
	var jzjthwjlwbys21 = $w("sbbxxForm").getValue("jzjthwjlw_bys_21");
	var jzjthwjlwbnlj21 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_21");
	//按简易征收办法计算的纳税检查应补缴税额
	var ybhwjlwbys22 = $w("sbbxxForm").getValue("ybhwjlw_bys_22");
	var ybhwjlwbnlj22 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_22");
	//应纳税额减征额
	var ybhwjlwbys23 = $w("sbbxxForm").getValue("ybhwjlw_bys_23");
	var ybhwjlwbnlj23 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_23");
	var jzjthwjlwbys23 = $w("sbbxxForm").getValue("jzjthwjlw_bys_23");
	var jzjthwjlwbnlj23 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_23");
	//应纳税额合计
	var ybhwjlwbys24 = $w("sbbxxForm").getValue("ybhwjlw_bys_24");
	var ybhwjlwbnlj24 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_24");
	var jzjthwjlwbys24 = $w("sbbxxForm").getValue("jzjthwjlw_bys_24");
	var jzjthwjlwbnlj24 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_24");
	//期初未缴税额（多缴为负数）
	var ybhwjlwbys25 = $w("sbbxxForm").getValue("ybhwjlw_bys_25");
	var ybhwjlwbnlj25 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_25");
	var jzjthwjlwbys25 = $w("sbbxxForm").getValue("jzjthwjlw_bys_25");
	var jzjthwjlwbnlj25 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_25");
	//实收出口开具专用缴款书退税额
	var ybhwjlwbys26 = $w("sbbxxForm").getValue("ybhwjlw_bys_26");
	var ybhwjlwbnlj26 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_26");
	//本期已缴税额
	var ybhwjlwbys27 = $w("sbbxxForm").getValue("ybhwjlw_bys_27");
	var ybhwjlwbnlj27 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_27");
	var jzjthwjlwbys27 = $w("sbbxxForm").getValue("jzjthwjlw_bys_27");
	var jzjthwjlwbnlj27 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_27");
	//①分次预缴税额
	var ybhwjlwbys28 = $w("sbbxxForm").getValue("ybhwjlw_bys_28");
	var jzjthwjlwbys28 = $w("sbbxxForm").getValue("jzjthwjlw_bys_28");
	//②出口开具专用缴款书预缴税额
	var ybhwjlwbys29 = $w("sbbxxForm").getValue("ybhwjlw_bys_29");
	//③本期缴纳上期应纳税额
	var ybhwjlwbys30 = $w("sbbxxForm").getValue("ybhwjlw_bys_30");
	var ybhwjlwbnlj30 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_30");
	var jzjthwjlwbys30 = $w("sbbxxForm").getValue("jzjthwjlw_bys_30");
	var jzjthwjlwbnlj30 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_30");
	//④本期缴纳欠缴税额
	var ybhwjlwbys31 = $w("sbbxxForm").getValue("ybhwjlw_bys_31");
	var ybhwjlwbnlj31 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_31");
	var jzjthwjlwbys31 = $w("sbbxxForm").getValue("jzjthwjlw_bys_31");
	var jzjthwjlwbnlj31 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_31");
	//期末未缴税额（多缴为负数）
	var ybhwjlwbys32 = $w("sbbxxForm").getValue("ybhwjlw_bys_32");
	var ybhwjlwbnlj32 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_32");
	var jzjthwjlwbys32 = $w("sbbxxForm").getValue("jzjthwjlw_bys_32");
	var jzjthwjlwbnlj32 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_32");
	//其中：欠缴税额（≥0）
	var ybhwjlwbys33 = $w("sbbxxForm").getValue("ybhwjlw_bys_33");
	var jzjthwjlwbys33 = $w("sbbxxForm").getValue("jzjthwjlw_bys_33");
	//本期应补(退)税额
	var ybhwjlwbys34 = $w("sbbxxForm").getValue("ybhwjlw_bys_34");
	var jzjthwjlwbys34 = $w("sbbxxForm").getValue("jzjthwjlw_bys_34");
	//即征即退实际退税额
	var jzjthwjlwbys35 = $w("sbbxxForm").getValue("jzjthwjlw_bys_35");
	var jzjthwjlwbnlj35 = $w("sbbxxForm").getValue("jzjthwjlw_bnlj_35");
	//期初未缴查补税额
	var ybhwjlwbys36 = $w("sbbxxForm").getValue("ybhwjlw_bys_36");
	var ybhwjlwbnlj36 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_36");
	//本期入库查补税额
	var ybhwjlwbys37 = $w("sbbxxForm").getValue("ybhwjlw_bys_37");
	var ybhwjlwbnlj37 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_37");
	//期末未缴查补税额
	var ybhwjlwbys38 = $w("sbbxxForm").getValue("ybhwjlw_bys_38");
	var ybhwjlwbnlj38 = $w("sbbxxForm").getValue("ybhwjlw_bnlj_38");
	
	var printBtn = new SwordSubmit();	
		
	//申报日期就是填表日期
	printBtn.pushData("tbrq",sbrq1);	
	printBtn.pushData("skssqq",skssqq);
	printBtn.pushData("skssqz",skssqz);
	printBtn.pushData("nsrsbh",nsrsbh);
	//所属行业（行业名称）
	var sshy =nsrxxReturn.hymc.value;
	printBtn.pushData("sshy",sshy);
	//法定代表人姓名
	var fddbrxm =nsrxxReturn.fddbrxm.value;
	printBtn.pushData("fddbrxm",fddbrxm);
	//注册地址
	var zcdz =nsrxxReturn.zcdz.value;
	printBtn.pushData("zcdz",zcdz);	
	//营业地址(生产经营地址)
	var scjydz =nsrxxReturn.scjydz.value;
	printBtn.pushData("yydz",scjydz);
	printBtn.pushData("slr",slr);
	//（一）按适用税率征税货物及劳务销售额
	printBtn.pushData("ybhwjlwbys1",ybhwjlwbys1);
	printBtn.pushData("ybhwjlwbnlj1",ybhwjlwbnlj1);
	printBtn.pushData("jzjthwjlwbys1",jzjthwjlwbys1);
	printBtn.pushData("jzjthwjlwbnlj1",jzjthwjlwbnlj1);	
	//其中：应税货物销售额
	printBtn.pushData("ybhwjlwbys2",ybhwjlwbys2);
	printBtn.pushData("ybhwjlwbnlj2",ybhwjlwbnlj2);
	printBtn.pushData("jzjthwjlwbys2",jzjthwjlwbys2);
	printBtn.pushData("jzjthwjlwbnlj2",jzjthwjlwbnlj2)
	//应税劳务销售额
	printBtn.pushData("ybhwjlwbys3",ybhwjlwbys3);
	printBtn.pushData("ybhwjlwbnlj3",ybhwjlwbnlj3);
	printBtn.pushData("jzjthwjlwbys3",jzjthwjlwbys3);
	printBtn.pushData("jzjthwjlwbnlj3",jzjthwjlwbnlj3)
	//纳税检查调整的销售额
	printBtn.pushData("ybhwjlwbys4",ybhwjlwbys4);
	printBtn.pushData("ybhwjlwbnlj4",ybhwjlwbnlj4);
	printBtn.pushData("jzjthwjlwbys4",jzjthwjlwbys4);
	printBtn.pushData("jzjthwjlwbnlj4",jzjthwjlwbnlj4);
	//（二）按简易征收办法征税货物销售额
    printBtn.pushData("ybhwjlwbys5",ybhwjlwbys5);
    printBtn.pushData("ybhwjlwbnlj5",ybhwjlwbnlj5);
    printBtn.pushData("jzjthwjlwbys5",jzjthwjlwbys5);
    printBtn.pushData("jzjthwjlwbnlj5",jzjthwjlwbnlj5);
    //其中：纳税检查调整的销售额6
    printBtn.pushData("ybhwjlwbys6",ybhwjlwbys6);
    printBtn.pushData("ybhwjlwbnlj6",ybhwjlwbnlj6);
    printBtn.pushData("jzjthwjlwbys6",jzjthwjlwbys6);
    printBtn.pushData("jzjthwjlwbnlj6",jzjthwjlwbnlj6);
	//（三）免、抵、退办法出口货物销售额
    printBtn.pushData("ybhwjlwbys7",ybhwjlwbys7);
    printBtn.pushData("ybhwjlwbnlj7",ybhwjlwbnlj7);
	//（四）免税货物及劳务销售额
    printBtn.pushData("ybhwjlwbys8",ybhwjlwbys8);
    printBtn.pushData("ybhwjlwbnlj8",ybhwjlwbnlj8);
    //其中：免税货物销售额
    printBtn.pushData("ybhwjlwbys9",ybhwjlwbys9);
    printBtn.pushData("ybhwjlwbnlj9",ybhwjlwbnlj9);
    //免税劳务销售额
    printBtn.pushData("ybhwjlwbys10",ybhwjlwbys10);
    printBtn.pushData("ybhwjlwbnlj10",ybhwjlwbnlj10);
	//销项税额
    printBtn.pushData("ybhwjlwbys11",ybhwjlwbys11);
    printBtn.pushData("ybhwjlwbnlj11",ybhwjlwbnlj11);
    printBtn.pushData("jzjthwjlwbys11",jzjthwjlwbys11);
    printBtn.pushData("jzjthwjlwbnlj11",jzjthwjlwbnlj11);
	//进项税额
	printBtn.pushData("ybhwjlwbys12",ybhwjlwbys12);
    printBtn.pushData("ybhwjlwbnlj12",ybhwjlwbnlj12);
    printBtn.pushData("jzjthwjlwbys12",jzjthwjlwbys12);
    printBtn.pushData("jzjthwjlwbnlj12",jzjthwjlwbnlj12);
	//上期留抵税额
	printBtn.pushData("ybhwjlwbys13",ybhwjlwbys13);
	printBtn.pushData("ybhwjlwbnlj13",ybhwjlwbnlj13);
	printBtn.pushData("jzjthwjlwbys13",jzjthwjlwbys13);
	//进项税额转出
	printBtn.pushData("ybhwjlwbys14",ybhwjlwbys14);
	printBtn.pushData("ybhwjlwbnlj14",ybhwjlwbnlj14);
	printBtn.pushData("jzjthwjlwbys14",jzjthwjlwbys14);
	printBtn.pushData("jzjthwjlwbnlj14",jzjthwjlwbnlj14);
	//免、抵、退应退税额
	printBtn.pushData("ybhwjlwbys15",ybhwjlwbys15);
	printBtn.pushData("ybhwjlwbnlj15",ybhwjlwbnlj15);
	//按适用税率计算的纳税检查应补缴税额
	printBtn.pushData("ybhwjlwbys16",ybhwjlwbys16);
	printBtn.pushData("ybhwjlwbnlj16",ybhwjlwbnlj16);
	//应抵扣税额合计
	printBtn.pushData("ybhwjlwbys17",ybhwjlwbys17);
	printBtn.pushData("jzjthwjlwbys17",jzjthwjlwbys17);
	//实际抵扣税额
	printBtn.pushData("ybhwjlwbys18",ybhwjlwbys18);
	printBtn.pushData("ybhwjlwbnlj18",ybhwjlwbnlj18);
	printBtn.pushData("jzjthwjlwbys18",jzjthwjlwbys18);
	printBtn.pushData("jzjthwjlwbnlj18",jzjthwjlwbnlj18);
	//应纳税额
	printBtn.pushData("ybhwjlwbys19",ybhwjlwbys19);
	printBtn.pushData("ybhwjlwbnlj19",ybhwjlwbnlj19);
	printBtn.pushData("jzjthwjlwbys19",jzjthwjlwbys19);
	printBtn.pushData("jzjthwjlwbnlj19",jzjthwjlwbnlj19);
	//期末留抵税额
	printBtn.pushData("ybhwjlwbys20",ybhwjlwbys20);
	printBtn.pushData("ybhwjlwbnlj20",ybhwjlwbnlj20);
	printBtn.pushData("jzjthwjlwbys20",jzjthwjlwbys20);
	//简易征收办法计算的应纳税额
	printBtn.pushData("ybhwjlwbys21",ybhwjlwbys21);
	printBtn.pushData("ybhwjlwbnlj21",ybhwjlwbnlj21);
	printBtn.pushData("jzjthwjlwbys21",jzjthwjlwbys21);
	printBtn.pushData("jzjthwjlwbnlj21",jzjthwjlwbnlj21);
	//按简易征收办法计算的纳税检查应补缴税额
	printBtn.pushData("ybhwjlwbys22",ybhwjlwbys22);
	printBtn.pushData("ybhwjlwbnlj22",ybhwjlwbnlj22);
	//应纳税额减征额
	printBtn.pushData("ybhwjlwbys23",ybhwjlwbys23);
	printBtn.pushData("ybhwjlwbnlj23",ybhwjlwbnlj23);
	printBtn.pushData("jzjthwjlwbys23",jzjthwjlwbys23);
	printBtn.pushData("jzjthwjlwbnlj23",jzjthwjlwbnlj23);
	//应纳税额合计
	printBtn.pushData("ybhwjlwbys24",ybhwjlwbys24);
	printBtn.pushData("ybhwjlwbnlj24",ybhwjlwbnlj24);
	printBtn.pushData("jzjthwjlwbys24",jzjthwjlwbys24);
	printBtn.pushData("jzjthwjlwbnlj24",jzjthwjlwbnlj24);
	//期初未缴税额（多缴为负数）
	printBtn.pushData("ybhwjlwbys25",ybhwjlwbys25);
	printBtn.pushData("ybhwjlwbnlj25",ybhwjlwbnlj25);
	printBtn.pushData("jzjthwjlwbys25",jzjthwjlwbys25);
	printBtn.pushData("jzjthwjlwbnlj25",jzjthwjlwbnlj25);
	//实收出口开具专用缴款书退税额
	printBtn.pushData("ybhwjlwbys26",ybhwjlwbys26);
	printBtn.pushData("ybhwjlwbnlj26",ybhwjlwbnlj26);
	//本期已缴税额
	printBtn.pushData("ybhwjlwbys27",ybhwjlwbys27);
	printBtn.pushData("ybhwjlwbnlj27",ybhwjlwbnlj27);
	printBtn.pushData("jzjthwjlwbys27",jzjthwjlwbys27);
	printBtn.pushData("jzjthwjlwbnlj27",jzjthwjlwbnlj27);
	//①分次预缴税额
	printBtn.pushData("ybhwjlwbys28",ybhwjlwbys28);
	printBtn.pushData("jzjthwjlwbys28",jzjthwjlwbys28);
	//②出口开具专用缴款书预缴税额
	printBtn.pushData("ybhwjlwbys29",ybhwjlwbys29);
	//③本期缴纳上期应纳税额
	printBtn.pushData("ybhwjlwbys30",ybhwjlwbys30);
	printBtn.pushData("ybhwjlwbnlj30",ybhwjlwbnlj30);
	printBtn.pushData("jzjthwjlwbys30",jzjthwjlwbys30);
	printBtn.pushData("jzjthwjlwbnlj30",jzjthwjlwbnlj30);
	//④本期缴纳欠缴税额
	printBtn.pushData("ybhwjlwbys31",ybhwjlwbys31);
	printBtn.pushData("ybhwjlwbnlj31",ybhwjlwbnlj31);
	printBtn.pushData("jzjthwjlwbys31",jzjthwjlwbys31);
	printBtn.pushData("jzjthwjlwbnlj31",jzjthwjlwbnlj31);
	//期末未缴税额（多缴为负数）
	printBtn.pushData("ybhwjlwbys32",ybhwjlwbys32);
	printBtn.pushData("ybhwjlwbnlj32",ybhwjlwbnlj32);
	printBtn.pushData("jzjthwjlwbys32",jzjthwjlwbys32);
	printBtn.pushData("jzjthwjlwbnlj32",jzjthwjlwbnlj32);
	//其中：欠缴税额（≥0）
	printBtn.pushData("ybhwjlwbys33",ybhwjlwbys33);
	printBtn.pushData("jzjthwjlwbys33",jzjthwjlwbys33);
	//本期应补(退)税额
	printBtn.pushData("ybhwjlwbys34",ybhwjlwbys34);
	printBtn.pushData("jzjthwjlwbys34",jzjthwjlwbys34);
	//即征即退实际退税额
	printBtn.pushData("jzjthwjlwbys35",jzjthwjlwbys35);
	printBtn.pushData("jzjthwjlwbnlj35",jzjthwjlwbnlj35);
	//期初未缴查补税额
	printBtn.pushData("ybhwjlwbys36",ybhwjlwbys36);
	printBtn.pushData("ybhwjlwbnlj36",ybhwjlwbnlj36);
	//本期入库查补税额
	printBtn.pushData("ybhwjlwbys37",ybhwjlwbys37);
	printBtn.pushData("ybhwjlwbnlj37",ybhwjlwbnlj37);
	//期末未缴查补税额
	printBtn.pushData("ybhwjlwbys38",ybhwjlwbys38);
	printBtn.pushData("ybhwjlwbnlj38",ybhwjlwbnlj38);
	
	printBtn.setCtrl("SB202ZzsybnsrsbCtrl_printZzsYbnsrSbbxx");
	swordOpenWin('/sword?ctrl=SB202ZzsybnsrsbCtrl_printZzsYbnsrSbbxx&r='+Math.random(),printBtn);	
}

//免填单打印  打印Word
function gyTaxWordPrint(){
	var printBtn = new SwordSubmit();//定义打印提交按钮
	var sendKeys = "print";
	var haveFb = false;
	var iframes = document.all.tags("IFRAME");
	var iframeArrs1 = [];
	var iframeArrs2 = [];
	var iframeArrs3 = [];
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="table01" style="display: none; height: 100%; overflow: hidden;">
			//	<iframe id="table01iframe" name="table01iframe"></iframe>
			//</div>
			iframeArrs1[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe"));
		}
	}
	
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="A108010" style="display: none">
			//	<iframe id="tableA108010iframe" src="" name="tableA108010iframe" style="height: 675px; width: 100%" scrolling="auto"></iframe>
			//</div>
			iframeArrs2[i] = iframes[i].id.substring(iframes[i].id.indexOf("table")+5,iframes[i].id.indexOf("iframe"));
		}
	}
	
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="sb402_cztdsyssb2_div" style="display: none">
			//	<iframe id="sb402_cztdsyssb2_iframe"></iframe>
			//</div>
			iframeArrs3[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe")) + "div";
		}
	}
	
	var isPrintFb = false;
	for(var index = 0;index < iframeArrs1.length;index++){
		if($(iframeArrs1[index]) != null && $(iframeArrs1[index]) != undefined && $(iframeArrs1[index]) != ""){
			haveFb = true;
			if($(iframeArrs1[index]).style.display != "none"){
				$(iframes[index]).contentWindow.setFbdymbuuid();
				$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
					var n = o.get("name");
					printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
					sendKeys = sendKeys + "," + n + ":form";
				});
				var name = "nsrxxForm";
				if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					printBtn.pushData($w(name).getSubmitData());
					sendKeys = sendKeys + "," + name + ":form";
				}
				var name = "slxxForm";
				if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					printBtn.pushData($w(name).getSubmitData());
					sendKeys = sendKeys + "," + name + ":form";
				}
				$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
					var n = o.get("name");
					printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
					sendKeys = sendKeys + "," + n + ":grid";
				});
				isPrintFb = true;
				
				break;
			}
		}
	}
	
	if(!isPrintFb){
		for(var index = 0;index < iframeArrs2.length;index++){
			if($(iframeArrs2[index]) != null && $(iframeArrs2[index]) != undefined && $(iframeArrs2[index]) != ""){
				haveFb = true;
				if($(iframeArrs2[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						sendKeys = sendKeys + "," + n + ":form";
					});
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						sendKeys = sendKeys + "," + n + ":grid";
					});
					isPrintFb = true;
					break;
				}
			}
		}
	}
	
	if(!isPrintFb){
		for(var index = 0;index < iframeArrs3.length;index++){
			if($(iframeArrs3[index]) != null && $(iframeArrs3[index]) != undefined && $(iframeArrs3[index]) != ""){
				haveFb = true;
				if($(iframeArrs3[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						sendKeys = sendKeys + "," + n + ":form";
					});
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						sendKeys = sendKeys + "," + n + ":grid";
					});
					isPrintFb = true;
					break;
				}
			}
		}
	}
	
	if(!isPrintFb){
		if(haveFb){
			dymbuuid = setZbdymbuuid();
		}
		$$("div[sword='SwordForm']").each(function(o) {//将页面表单中的Form名称记录在sendKeys变量中
			var n = o.get("name");
			printBtn.pushData($w(n).getSubmitData());
			sendKeys = sendKeys + "," + n + ":form";
		});
		$$("div[sword='SwordGrid']").each(function(o) {//将页面表单中的Grid名称记录在sendKeys变量中
			var n = o.get("name");
			printBtn.pushData($w(n).getAllNoDeleteGridData());
			sendKeys = sendKeys + "," + n + ":grid";
		});
	}
	
	printBtn.pushData("sendKeys",sendKeys);
	if(typeof(dymbuuid) != 'undefined'){
		printBtn.pushData("dymbuuid",dymbuuid);
	}else{
		printBtn.pushData("dymbuuid","");
	}
	if(typeof(hxdyForPrint) != 'undefined'){
		printBtn.pushData("hxdyForPrint",hxdyForPrint);
	}else{
		printBtn.pushData("hxdyForPrint","");
	}
	if(typeof(printTitle) != 'undefined'){
		printBtn.pushData("printTitle",printTitle);
	}else{
		printBtn.pushData("printTitle","");
	}
	if(typeof(caculateGridHJFlag) != 'undefined'){
		printBtn.pushData("caculateGridHJFlag",caculateGridHJFlag);
	}else{
		printBtn.pushData("caculateGridHJFlag","");
	}
	if(typeof(printRepeatFormFlag) != 'undefined'){
		printBtn.pushData("printRepeatFormFlag",printRepeatFormFlag);
	}else{
		printBtn.pushData("printRepeatFormFlag","");
	}
	if(typeof(printRepeatGridFlag) != 'undefined'){
		printBtn.pushData("printRepeatGridFlag",printRepeatGridFlag);
	}else{
		printBtn.pushData("printRepeatGridFlag","");
	}
	printBtn.pushData("xbdykg","N");
	printBtn.setCtrl("GY011GyDyCtrl_gyPrintWord");
	swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrintWord&r=' + Math
		.random(), printBtn);
	printBtn.setFunction("onError","onErrorPrint");
	
}

//免填单打印  打印Excel
function gyTaxPrint(){
	
	var printBtn = new SwordSubmit();//定义打印提交按钮
	var sendKeys = "print";
	var haveFb = false;
	var iframes = document.all.tags("IFRAME");
	var iframeArrs1 = [];
	var iframeArrs2 = [];
	var iframeArrs3 = [];
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="table01" style="display: none; height: 100%; overflow: hidden;">
			//	<iframe id="table01iframe" name="table01iframe"></iframe>
			//</div>
			iframeArrs1[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe"));
		}
	}
	
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="A108010" style="display: none">
			//	<iframe id="tableA108010iframe" src="" name="tableA108010iframe" style="height: 675px; width: 100%" scrolling="auto"></iframe>
			//</div>
			iframeArrs2[i] = iframes[i].id.substring(iframes[i].id.indexOf("table")+5,iframes[i].id.indexOf("iframe"));
		}
	}
	
	for (var i = 0;i < iframes.length;i++){
		if(iframes[i].id.indexOf("iframe") > 0){
			//<div id="sb402_cztdsyssb2_div" style="display: none">
			//	<iframe id="sb402_cztdsyssb2_iframe"></iframe>
			//</div>
			iframeArrs3[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe")) + "div";
		}
	}
	
	var isPrintFb = false;
	for(var index = 0;index < iframeArrs1.length;index++){
		if($(iframeArrs1[index]) != null && $(iframeArrs1[index]) != undefined && $(iframeArrs1[index]) != ""){
			haveFb = true;
			if($(iframeArrs1[index]).style.display != "none"){
				$(iframes[index]).contentWindow.setFbdymbuuid();
				$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
					var n = o.get("name");
					printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
					sendKeys = sendKeys + "," + n + ":form";
				});
				var name = "nsrxxForm";
				if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					printBtn.pushData($w(name).getSubmitData());
					sendKeys = sendKeys + "," + name + ":form";
				}
				var name = "slxxForm";
				if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					printBtn.pushData($w(name).getSubmitData());
					sendKeys = sendKeys + "," + name + ":form";
				}
				$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
					var n = o.get("name");
					printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
					sendKeys = sendKeys + "," + n + ":grid";
				});
				isPrintFb = true;
				break;
			}
		}
	}
	
	if(!isPrintFb){
		for(var index = 0;index < iframeArrs2.length;index++){
			if($(iframeArrs2[index]) != null && $(iframeArrs2[index]) != undefined && $(iframeArrs2[index]) != ""){
				haveFb = true;
				if($(iframeArrs2[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						sendKeys = sendKeys + "," + n + ":form";
					});
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						sendKeys = sendKeys + "," + n + ":grid";
					});
					isPrintFb = true;
					break;
				}
			}
		}
	}
	
	if(!isPrintFb){
		for(var index = 0;index < iframeArrs3.length;index++){
			if($(iframeArrs3[index]) != null && $(iframeArrs3[index]) != undefined && $(iframeArrs3[index]) != ""){
				haveFb = true;
				if($(iframeArrs3[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						sendKeys = sendKeys + "," + n + ":form";
					});
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						printBtn.pushData($w(name).getSubmitData());
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						sendKeys = sendKeys + "," + n + ":grid";
					});
					isPrintFb = true;
					break;
				}
			}
		}
	}
	if(!isPrintFb){
		if(haveFb){
			dymbuuid = setZbdymbuuid();
		}
		$$("div[sword='SwordForm']").each(function(o) {//将页面表单中的Form名称记录在sendKeys变量中
			var n = o.get("name");
			printBtn.pushData($w(n).getSubmitData());
			sendKeys = sendKeys + "," + n + ":form";
		});
		$$("div[sword='SwordGrid']").each(function(o) {//将页面表单中的Grid名称记录在sendKeys变量中
			var n = o.get("name");
			var codeToCaption = {};
			var rowels = $w(n).dataDiv().getChildren();
			rowels.each(function(rowel){
				var cells = $w(n).getRow(rowel).getChildren();
				cells.each(function(cell){
					if(cell.type == "select"){
						var obj = {};
						var realvalue = cell.getProperty("realvalue");
						if($chk(realvalue)){
							var title = cell.getProperty("title");
							var key = cell.name;
							if($chk(codeToCaption[key])){
								var map = codeToCaption[key];
								map[realvalue] = title;
								codeToCaption[key] = map;
							}else{
								obj[realvalue] = title;
								codeToCaption[key] = obj;
							}
						}
					}
				})
			});
			var oldData = $w(n).getAllNoDeleteGridData();
			var data = JSON.decode(JSON.encode(oldData));
			for(var key in codeToCaption){
				for(var i=0;i<data.trs.length;i++){
					var tds = data.trs[i].tds;
					if(tds[key]!=undefined&&tds[key]!=null&&$chk(tds[key].value)){
						var code = tds[key].value;
						tds[key].value = codeToCaption[key][code];
						tds.xh={value:i+1};
					}
				}
			}
			printBtn.pushData(data);
			sendKeys = sendKeys + "," + n + ":grid";
		});
	}
	
	printBtn.pushData("sendKeys",sendKeys);
	if(typeof(dymbuuid) != 'undefined'){

		printBtn.pushData("dymbuuid",dymbuuid);
	}else{
		printBtn.pushData("dymbuuid","");
	}
	if(typeof(hxdyForPrint) != 'undefined'){
		printBtn.pushData("hxdyForPrint",hxdyForPrint);
	}else{
		printBtn.pushData("hxdyForPrint","");
	}
	if(typeof(printTitle) != 'undefined'){
		printBtn.pushData("printTitle",printTitle);
	}else{
		printBtn.pushData("printTitle","");
	}
	if(typeof(caculateGridHJFlag) != 'undefined'){
		printBtn.pushData("caculateGridHJFlag",caculateGridHJFlag);
	}else{
		printBtn.pushData("caculateGridHJFlag","");
	}
	if(typeof(printRepeatFormFlag) != 'undefined'){
		printBtn.pushData("printRepeatFormFlag",printRepeatFormFlag);
	}else{
		printBtn.pushData("printRepeatFormFlag","");
	}
	if(typeof(printRepeatGridFlag) != 'undefined'){
		printBtn.pushData("printRepeatGridFlag",printRepeatGridFlag);
	}else{
		printBtn.pushData("printRepeatGridFlag","");
	}
	printBtn.setCtrl("GY011GyDyCtrl_gyPrint");
	swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrint&r=' + Math
		.random(), printBtn);
	printBtn.setFunction("onError","onErrorPrint");
}
var xbdykg = false;
function isXbdy(){
  var sub = new SwordSubmit();            //动态创建提交按钮组件   
  sub.options.async="false"; //设置ajax请求为异步提交   
  getUUid();
  sub.pushData("dymbuuid",dymbuuid);
  sub.setCtrl("GY011GyDyCtrl_getXtcs");//设置提交按钮的ctrl属性值   
  sub.setFunction("onSuccess","xbdySuccess"); //动态设置提交组件的事件   
  sub.submit();
}
var oldMblj_tmp = null;
function xbdySuccess(req,resData){
  var flag = resData.getAttr("xbdykg");
  oldMblj_tmp = resData.getAttr("mblj");
  if(flag=="Y"){
    xbdykg = true;
  }
}
var exportFlag = ""
//免填单打印  打印Excel或者打印Word
function gyTaxPrintWordOrExcel(callback){
  isXbdy();
  if(xbdykg){
    
    var printBtn = new SwordSubmit();//定义打印提交按钮
    var sendKeys = "print";
    var haveFb = false;
    var iframes = document.getElementsByTagName("IFRAME");
    var iframeArrs1 = [];
    var iframeArrs2 = [];
    var iframeArrs3 = [];
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="table01" style="display: none; height: 100%; overflow: hidden;">
        //  <iframe id="table01iframe" name="table01iframe"></iframe>
        //</div>
        iframeArrs1[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe"));
      }
    }
    
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="A108010" style="display: none">
        //  <iframe id="tableA108010iframe" src="" name="tableA108010iframe" style="height: 675px; width: 100%" scrolling="auto"></iframe>
        //</div>
        iframeArrs2[i] = iframes[i].id.substring(iframes[i].id.indexOf("table")+5,iframes[i].id.indexOf("iframe"));
      }
    }
    
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="sb402_cztdsyssb2_div" style="display: none">
        //  <iframe id="sb402_cztdsyssb2_iframe"></iframe>
        //</div>
        iframeArrs3[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe")) + "div";
      }
    }
    
    var isPrintFb = false;
    for(var index = 0;index < iframeArrs1.length;index++){
      if($(iframeArrs1[index]) != null && $(iframeArrs1[index]) != undefined && $(iframeArrs1[index]) != ""){
        haveFb = true;
        if($(iframeArrs1[index]).style.display != "none"){
          $(iframes[index]).contentWindow.setFbdymbuuid();
          var nsrxxFlag = false;
          $(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
            var n = o.get("name");
            cxSubmit($(iframes[index].id).contentWindow.$w(n));
            if("nsrxxForm" == n){
              nsrxxFlag = true;
            }
            printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
            cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
            sendKeys = sendKeys + "," + n + ":form";
          });
          if(!nsrxxFlag){
            var name = "nsrxxForm";
            if($w(name) != null && $w(name) != undefined && $w(name) != ""){
              cxSubmit($w(name));
              printBtn.pushData($w(name).getSubmitData());
              cxSubmit($w(name),true);
              sendKeys = sendKeys + "," + name + ":form";
            }
          }
          var name = "slxxForm";
          if($w(name) != null && $w(name) != undefined && $w(name) != ""){
            cxSubmit($w(name));
            printBtn.pushData($w(name).getSubmitData());
            cxSubmit($w(name),true);
            sendKeys = sendKeys + "," + name + ":form";
          }
          $(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
            var n = o.get("name");
            cxGrid($(iframes[index].id).contentWindow.$w(n),false);
					//处理打印下拉列表只能打印code值的情况
					var codeToCaption = {};
					var rowels = $(iframes[index].id).contentWindow.$w(n).dataDiv().getChildren();
					rowels.each(function(rowel){
						var cells = $(iframes[index].id).contentWindow.$w(n).getRow(rowel).getChildren();
						cells.each(function(cell){
							if(cell.type == "select"){
								var obj = {};
								var realvalue = cell.getProperty("realvalue");
								if($chk(realvalue)){
									var title = cell.getProperty("title");
									var key = cell.name;
									if($chk(codeToCaption[key])){
										var map = codeToCaption[key];
										map[realvalue] = title;
										codeToCaption[key] = map;
									}else{
										obj[realvalue] = title;
										codeToCaption[key] = obj;
									}
								}
							}
						})
					});
					var oldData = $(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData();
					var data = JSON.decode(JSON.encode(oldData));
					for(var key in codeToCaption){
						for(var i=0;i<data.trs.length;i++){
							var tds = data.trs[i].tds;
							if(tds[key]!=undefined&&tds[key]!=null&&$chk(tds[key].value)){
								var code = tds[key].value;
								tds[key].value = codeToCaption[key][code];
								tds.xh = {value:i+1};
							}
						}
					}
					printBtn.pushData(data);
            cxGrid($(iframes[index].id).contentWindow.$w(n),true);
            sendKeys = sendKeys + "," + n + ":grid";
          });
          isPrintFb = true;
          break;
        }
      }
    }
    
    if(!isPrintFb){
      for(var index = 0;index < iframeArrs2.length;index++){
        if($(iframeArrs2[index]) != null && $(iframeArrs2[index]) != undefined && $(iframeArrs2[index]) != ""){
          haveFb = true;
          if($(iframeArrs2[index]).style.display != "none"){
            $(iframes[index]).contentWindow.setFbdymbuuid();
            var nsrxxFlag = false;
            $(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
              var n = o.get("name");
              cxSubmit($(iframes[index].id).contentWindow.$w(n));
              if("nsrxxForm" == n){
                nsrxxFlag = true;
              }
              printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
              cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
              sendKeys = sendKeys + "," + n + ":form";
            });
            if(!nsrxxFlag){
              var name = "nsrxxForm";
              if($w(name) != null && $w(name) != undefined && $w(name) != ""){
                cxSubmit($w(name));
                printBtn.pushData($w(name).getSubmitData());
                cxSubmit($w(name),true);
                sendKeys = sendKeys + "," + name + ":form";
              }
            }
            var name = "slxxForm";
            if($w(name) != null && $w(name) != undefined && $w(name) != ""){
              cxSubmit($w(name));
              printBtn.pushData($w(name).getSubmitData());
              cxSubmit($w(name),true);
              sendKeys = sendKeys + "," + name + ":form";
            }
            $(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
              var n = o.get("name");
              cxGrid($(iframes[index].id).contentWindow.$w(n),false);
              printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
              cxGrid($(iframes[index].id).contentWindow.$w(n),true);
              sendKeys = sendKeys + "," + n + ":grid";
            });
            isPrintFb = true;
            break;
          }
        }
      }
    }
    
    if(!isPrintFb){
      for(var index = 0;index < iframeArrs3.length;index++){
        if($(iframeArrs3[index]) != null && $(iframeArrs3[index]) != undefined && $(iframeArrs3[index]) != ""){
          haveFb = true;
          if($(iframeArrs3[index]).style.display != "none"){
            $(iframes[index]).contentWindow.setFbdymbuuid();
            var nsrxxFlag = false;
            $(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {//将附表中的Form名称记录在sendKeys变量中
              var n = o.get("name");
              cxSubmit($(iframes[index].id).contentWindow.$w(n));
              if("nsrxxForm" == n){
                nsrxxFlag = true;
              }
              printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
              cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
              sendKeys = sendKeys + "," + n + ":form";
            });
            if(!nsrxxFlag){
              var name = "nsrxxForm";
              if($w(name) != null && $w(name) != undefined && $w(name) != ""){
                cxSubmit($w(name));
                printBtn.pushData($w(name).getSubmitData());
                cxSubmit($w(name),true);
                sendKeys = sendKeys + "," + name + ":form";
              }
            }
            var name = "slxxForm";
            if($w(name) != null && $w(name) != undefined && $w(name) != ""){
              cxSubmit($w(name));
              printBtn.pushData($w(name).getSubmitData());
              cxSubmit($w(name),true);
              sendKeys = sendKeys + "," + name + ":form";
            }
            $(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
              var n = o.get("name");
              cxGrid($(iframes[index].id).contentWindow.$w(n),false);
              printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
              cxGrid($(iframes[index].id).contentWindow.$w(n),true);
              sendKeys = sendKeys + "," + n + ":grid";
            });
            isPrintFb = true;
            break;
          }
        }
      }
    }
    if(!isPrintFb){
      if(haveFb){
        dymbuuid = setZbdymbuuid();
        if(dymbuuid == false){
          return;
        }
      }
      $$("div[sword='SwordForm']").each(function(o) {//将页面表单中的Form名称记录在sendKeys变量中
        var n = o.get("name");
        cxSubmit($w(n));
        printBtn.pushData($w(n).getSubmitData());
        cxSubmit($w(n),true);
        sendKeys = sendKeys + "," + n + ":form";
      });
      $$("div[sword='SwordGrid']").each(function(o) {//将页面表单中的Grid名称记录在sendKeys变量中
        var n = o.get("name");
        cxGrid($w(n),false);
        //printBtn.pushData($w(n).getAllNoDeleteGridData());
        // ============== 代码转名称改为了前台转化
        printBtn.pushData(gridCodeCaptionTransform(n));
		// ==============
		
        cxGrid($w(n),true);
        sendKeys = sendKeys + "," + n + ":grid";
      });
    }

    printBtn.pushData("sendKeys",sendKeys);
    if(typeof(dymbuuid) != 'undefined'){
      printBtn.pushData("dymbuuid",dymbuuid);
    }else{
      printBtn.pushData("dymbuuid","");
    }
    if(typeof(hxdyForPrint) != 'undefined'){
      printBtn.pushData("hxdyForPrint",hxdyForPrint);
    }else{
      printBtn.pushData("hxdyForPrint","");
    }
    if(typeof(printTitle) != 'undefined'){
      printBtn.pushData("printTitle",printTitle);
    }else{
      printBtn.pushData("printTitle","");
    }
    if(typeof(caculateGridHJFlag) != 'undefined'){
      printBtn.pushData("caculateGridHJFlag",caculateGridHJFlag);
    }else{
      printBtn.pushData("caculateGridHJFlag","");
    }
    if(typeof(printRepeatFormFlag) != 'undefined'){
      printBtn.pushData("printRepeatFormFlag",printRepeatFormFlag);
    }else{
      printBtn.pushData("printRepeatFormFlag","");
    }
    if(typeof(printRepeatGridFlag) != 'undefined'){
      printBtn.pushData("printRepeatGridFlag",printRepeatGridFlag);
    }else{
      printBtn.pushData("printRepeatGridFlag","");
    }
    //处理打印类型与路径不一致，取路径的类型
    if(oldMblj_tmp!=""&&oldMblj_tmp!=null){
      var type = oldMblj_tmp.substring(oldMblj_tmp.lastIndexOf(".")+1,oldMblj_tmp.length);
      if(type == "doc"||type == "docx"){
        printFileType = "word";
      }else if(type == "xls"||type == "xlsx"){
        printFileType = "excel";
      }
    }
    if(typeof(printFileType) != 'undefined'){
      printBtn.pushData("printFileType",printFileType);
    }else{
      printBtn.pushData("printFileType","");
    }
    if(typeof(ccbg) != 'undefined'){
      printBtn.pushData("ccbg",ccbg);
    }
    if(typeof(tsxx) != 'undefined'){
      printBtn.pushData("tsxx",tsxx);
    }
    if(typeof(fykg) != 'undefined'){
      printBtn.pushData("fykg",fykg);
    }
    if(typeof(zzlx) != 'undefined'){
      printBtn.pushData("zzlx",zzlx);
    }
    if(typeof(printMode) != 'undefined'){
      printBtn.pushData("printMode",printMode);
    }
    if(callback!=null){
      callback.call(this,printBtn);
    }
    if(typeof(printNewOrOld) != 'undefined'){
      printBtn.pushData("xbdykg",printNewOrOld);
    }
    printBtn.setFunction("onError","onErrorPrint");
    cxSwordOpenWin(true);
    if(printFileType == "word"){
      printBtn.setCtrl("GY011GyDyCtrl_gyPrintWord");
      swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrintWord&r=' + Math
        .random(), printBtn);
    }else if(printFileType == "excel" || printFileType == ""){
      printBtn.setCtrl("GY011GyDyCtrl_gyPrint");
      if(exportFlag){
        printBtn.options.async="true"; //设置ajax请求为异步提交   
        printBtn.setCtrl("GY011GyDyCtrl_gyPrint");//设置提交按钮的ctrl属性值   
        printBtn.setFunction("onSuccess","exportSuccess"); //动态设置提交组件的事件   
        printBtn.submit();  
      }else{
        swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrint&r=' + Math
                .random(), printBtn);
      }
    }else{
      swordAlert("请指定打印方式为Word或者为Excel");
      return;
    }
    cxSwordOpenWin(false);
  }else{
    var printBtn = new SwordSubmit();//定义打印提交按钮
    var sendKeys = "print";
    var haveFb = false;
    var iframes = document.getElementsByTagName("IFRAME");//document.all.tags("IFRAME"); 征管代码 document.getElementsByTagName("IFRAME");
    var iframeArrs1 = [];
    var iframeArrs2 = [];
    var iframeArrs3 = [];
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="table01" style="display: none; height: 100%; overflow: hidden;">
        //  <iframe id="table01iframe" name="table01iframe"></iframe>
        //</div>
        iframeArrs1[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe"));
      }
    }
    
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="A108010" style="display: none">
        //  <iframe id="tableA108010iframe" src="" name="tableA108010iframe" style="height: 675px; width: 100%" scrolling="auto"></iframe>
        //</div>
        iframeArrs2[i] = iframes[i].id.substring(iframes[i].id.indexOf("table")+5,iframes[i].id.indexOf("iframe"));
      }
    }
    
    for (var i = 0;i < iframes.length;i++){
      if(iframes[i].id.indexOf("iframe") > 0){
        //<div id="sb402_cztdsyssb2_div" style="display: none">
        //  <iframe id="sb402_cztdsyssb2_iframe"></iframe>
        //</div>
        iframeArrs3[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe")) + "div";
      }
    }
    
    var isPrintFb = false;
    for(var index = 0;index < iframeArrs1.length;index++){
      if($(iframeArrs1[index]) != null && $(iframeArrs1[index]) != undefined && $(iframeArrs1[index]) != ""){
        haveFb = true;
			if($(iframeArrs1[index]).style.display != "none"){
				$(iframes[index]).contentWindow.setFbdymbuuid();
				var nsrxxFlag = false;
				$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
					var n = o.get("name");
					cxSubmit($(iframes[index].id).contentWindow.$w(n));
					if("nsrxxForm" == n){
						nsrxxFlag = true;
					}
					printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
					cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
					sendKeys = sendKeys + "," + n + ":form";
				});
				if(!nsrxxFlag){
				var name = "nsrxxForm";
				if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					cxSubmit($w(name));
					printBtn.pushData($w(name).getSubmitData());
					cxSubmit($w(name),true);
					sendKeys = sendKeys + "," + name + ":form";
				   }
			    }
          var name = "slxxForm";
          if($w(name) != null && $w(name) != undefined && $w(name) != ""){
					cxSubmit($w(name));
					printBtn.pushData($w(name).getSubmitData());
					cxSubmit($w(name),true);
            sendKeys = sendKeys + "," + name + ":form";
          }
          $(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {//将附表中的Grid名称记录在sendKeys变量中
            var n = o.get("name");
					cxGrid($(iframes[index].id).contentWindow.$w(n),false);
					//处理打印下拉列表只能打印code值的情况
					var codeToCaption = {};
					var rowels = $(iframes[index].id).contentWindow.$w(n).dataDiv().getChildren();
					rowels.each(function(rowel){
						var cells = $(iframes[index].id).contentWindow.$w(n).getRow(rowel).getChildren();
						cells.each(function(cell){
							if(cell.type == "select"){
								var obj = {};
								var realvalue = cell.getProperty("realvalue");
								if($chk(realvalue)){
									var title = cell.getProperty("title");
									var key = cell.name;
									if($chk(codeToCaption[key])){
										var map = codeToCaption[key];
										map[realvalue] = title;
										codeToCaption[key] = map;
									}else{
										obj[realvalue] = title;
										codeToCaption[key] = obj;
									}
								}
							}
						})
					});
					var oldData = $(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData();
					var data = JSON.decode(JSON.encode(oldData));
					for(var key in codeToCaption){
						for(var i=0;i<data.trs.length;i++){
							var tds = data.trs[i].tds;
							if(tds[key]!=undefined&&tds[key]!=null&&$chk(tds[key].value)){
								var code = tds[key].value;
								tds[key].value = codeToCaption[key][code];
								tds.xh = {value:i+1};
							}
						}
					}
					printBtn.pushData(data);
					cxGrid($(iframes[index].id).contentWindow.$w(n),true);
            sendKeys = sendKeys + "," + n + ":grid";
          });
          isPrintFb = true;
          break;
        }
      }
    }
    
    if(!isPrintFb){
      for(var index = 0;index < iframeArrs2.length;index++){
        if($(iframeArrs2[index]) != null && $(iframeArrs2[index]) != undefined && $(iframeArrs2[index]) != ""){
				haveFb = true;
				if($(iframeArrs2[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					var nsrxxFlag = false;
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						cxSubmit($(iframes[index].id).contentWindow.$w(n));
						if("nsrxxForm" == n){
							nsrxxFlag = true;
						}
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
						sendKeys = sendKeys + "," + n + ":form";
					});
					if(!nsrxxFlag){
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendKeys = sendKeys + "," + name + ":form";
					   }
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {// 将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						cxGrid($(iframes[index].id).contentWindow.$w(n),false);
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						cxGrid($(iframes[index].id).contentWindow.$w(n),true);
						sendKeys = sendKeys + "," + n + ":grid";
					});
            isPrintFb = true;
            break;
          }
        }
      }
    }
    
    if(!isPrintFb){
      for(var index = 0;index < iframeArrs3.length;index++){
        if($(iframeArrs3[index]) != null && $(iframeArrs3[index]) != undefined && $(iframeArrs3[index]) != ""){
          haveFb = true;
				if($(iframeArrs3[index]).style.display != "none"){
					$(iframes[index]).contentWindow.setFbdymbuuid();
					var nsrxxFlag = false;
					$(iframes[index].id).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						cxSubmit($(iframes[index].id).contentWindow.$w(n));
						if("nsrxxForm" == n){
							nsrxxFlag = true;
						}
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getSubmitData());
						cxSubmit($(iframes[index].id).contentWindow.$w(n),true);
						sendKeys = sendKeys + "," + n + ":form";
					});
					if(!nsrxxFlag){
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendKeys = sendKeys + "," + name + ":form";
					   }
					}
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendKeys = sendKeys + "," + name + ":form";
					}
					$(iframes[index].id).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {// 将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						cxGrid($(iframes[index].id).contentWindow.$w(n),false);
						printBtn.pushData($(iframes[index].id).contentWindow.$w(n).getAllNoDeleteGridData());
						cxGrid($(iframes[index].id).contentWindow.$w(n),true);
						sendKeys = sendKeys + "," + n + ":grid";
					});
            isPrintFb = true;
            break;
          }
        }
      }
    }
    if(!isPrintFb){
      if(haveFb){
        dymbuuid = setZbdymbuuid();
        if(dymbuuid == false){
          return;
        }
      }
      $$("div[sword='SwordForm']").each(function(o) {//将页面表单中的Form名称记录在sendKeys变量中
			var n = o.get("name");
			cxSubmit($w(n));
			printBtn.pushData($w(n).getSubmitData());
			cxSubmit($w(n),true);
			sendKeys = sendKeys + "," + n + ":form";
		});
		$$("div[sword='SwordGrid']").each(function(o) {// 将页面表单中的Grid名称记录在sendKeys变量中
			var n = o.get("name");
			cxGrid($w(n),false);
			printBtn.pushData($w(n).getAllNoDeleteGridData());
			cxGrid($w(n),true);
        sendKeys = sendKeys + "," + n + ":grid";
      });
    }

    printBtn.pushData("sendKeys",sendKeys);
    if(typeof(dymbuuid) != 'undefined'){
      printBtn.pushData("dymbuuid",dymbuuid);
    }else{
      printBtn.pushData("dymbuuid","");
    }
    if(typeof(hxdyForPrint) != 'undefined'){
      printBtn.pushData("hxdyForPrint",hxdyForPrint);
    }else{
      printBtn.pushData("hxdyForPrint","");
    }
    if(typeof(printTitle) != 'undefined'){
      printBtn.pushData("printTitle",printTitle);
    }else{
      printBtn.pushData("printTitle","");
    }
    if(typeof(caculateGridHJFlag) != 'undefined'){
      printBtn.pushData("caculateGridHJFlag",caculateGridHJFlag);
    }else{
      printBtn.pushData("caculateGridHJFlag","");
    }
    if(typeof(printRepeatFormFlag) != 'undefined'){
      printBtn.pushData("printRepeatFormFlag",printRepeatFormFlag);
    }else{
      printBtn.pushData("printRepeatFormFlag","");
    }
    if(typeof(printRepeatGridFlag) != 'undefined'){
      printBtn.pushData("printRepeatGridFlag",printRepeatGridFlag);
    }else{
      printBtn.pushData("printRepeatGridFlag","");
    }
    //处理打印类型与路径不一致，取路径的类型
    if(oldMblj_tmp!=""&&oldMblj_tmp!=null){
      var type = oldMblj_tmp.substring(oldMblj_tmp.lastIndexOf(".")+1,oldMblj_tmp.length);
      if(type == "doc"||type == "docx"){
        printFileType = "word";
      }else if(type == "xls"||type == "xlsx"){
        printFileType = "excel";
      }
    }
    if(typeof(printFileType) != 'undefined'){
      printBtn.pushData("printFileType",printFileType);
    }else{
      printBtn.pushData("printFileType","");
	}
	if(typeof(ccbg) != 'undefined'){
		printBtn.pushData("ccbg",ccbg);
	}
	if(typeof(tsxx) != 'undefined'){
		printBtn.pushData("tsxx",tsxx);
	}
	if(typeof(fykg) != 'undefined'){
		printBtn.pushData("fykg",fykg);
	}
	if(typeof(zzlx) != 'undefined'){
		printBtn.pushData("zzlx",zzlx);
	}
	if(typeof(printMode) != 'undefined'){
		printBtn.pushData("printMode",printMode);
	}
    if(printFileType == "word"){
      printBtn.setCtrl("GY011GyDyCtrl_gyPrintWord");
      swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrintWord&r=' + Math
        .random(), printBtn);
    }else if(printFileType == "excel" || printFileType == ""){
      printBtn.setCtrl("GY011GyDyCtrl_gyPrint");
      swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyPrint&r=' + Math
          .random(), printBtn);
    }else{
      swordAlert("请指定打印方式为Word或者为Excel");
      return;
    }
    printBtn.setFunction("onError","onErrorPrint");
  }
	
}
function cxSubmit(obj,isHf){
// 按照核心打印svn 157250 的代码修改情况， 老板打印gyTaxPrintWordOrExcel也调用此方法 故而注释调此处逻辑
//  if(xbdykg=="N"){
//    return;
//  }
	if(isHf){
		obj.getSubmitData = function() {
	        var b = {
	                sword: this.options.sword,
	                name: this.options.name,
	                data: {}
	            };
	            var a = this.getFieldEls();
	            a.each(function(f) {
	                if ($type(f) == "string") {
	                    f = $(f)
	                }
	                var d = f.get("name");
	                var c = "";
	                if (f.get("widgetGetValue") == "true") {
	                    c = this.getWidget(d).getValue(f) || ""
	                } else {
	                    if (f.get("widget") == "select") {
	                        c = f.get("realvalue") || ""
	                    } else {
	                        c = f.get("realvalue") ||f.get("value") || ""
	                    }
	                }
	                b.data[d] = {
	                    value: c
	                }
	            }, this);
	            return b;
	        }
	}else{
		obj.getSubmitData = function() {
			var b = {
					sword: this.options.sword,
					name: this.options.name,
					data: {}
			};
			var a = this.getFieldEls();
			a.each(function(f) {
				if ($type(f) == "string") {
					f = $(f)
				}
				var d = f.get("name");
				var c = "";
				if (f.get("widgetGetValue") == "true") {
					c = this.getWidget(d).getValue(f) || "";
					if(this.getWidget(d).getShowValue!=null){
						c = this.getWidget(d).getShowValue(f,c);
					}
				} else {
					if (f.get("widget") == "select") {
						c = f.get("realvalue") || ""
					} else {
						c = f.get("value") ||f.get("realvalue")|| ""
					}
				}
				b.data[d] = {
						value: c
				}
			}, this);
			return b;
		}
	}
}
function cxGrid(obj,isHf){
// 按照核心打印svn 157250 的代码修改情况，老板打印gyTaxPrintWordOrExcel也调用此方法 故而注释调此处逻辑
//  if(xbdykg=="N"){
//    return;
//  }
	if(typeof(cxGridFlag) != 'undefined'){
		if(cxGridFlag=='N'){
			return;
		}
	}
	if(isHf){
		obj.getOneRowData = function(a) {
	        if (!$defined(a)) {
	            return null
	        }
	        var h = this.getRow(a);
	        if (!$chk(h)) {
	            return;
	        }
	        var b = h.get("status");
	        var g;
	        if (b == "insert") {
	            g = this.getOneRowDataFromDiv(h);
	            var f = h.retrieve("rowData").tds;
	            for (var c in f) {
	                var d = g.tds;
	                if (!$defined(d[c])) {
	                    d[c] = {
	                        value: f[c]["value"]
	                    };
	                }
	            }
	            g.getValue = function(k) {
	                var l = this.tds[k];
	                if (!$defined(l)) {
	                    return null;
	                }
	                return l.value;
	            }
	        } else {
	            g = h.retrieve("rowData");
	            if ($chk(g) && this.selPuls) {
	                this.selPuls.each(function(k) {
	                    var m = k.name;
	                    var o = k.sbmitcontent;
	                    if ($chk(g.tds[m])) {
	                        var n = g.tds[m] ? g.tds[m].value : "";
	                        if (n && n.contains("|") && n.contains("code") && n.contains("caption")) {
	                            if ($type(n) == "string") {
	                                n = n.toHash();
	                            }
	                            var l = {};
	                            if ($type(n) == "hash") {
	                                n.each(function(q, p) {
	                                    l[p] = q;
	                                }, this);
	                            }
	                            g.tds[m].value = o.substitute(l);
	                        }
	                    }
	                });
	            }
	            this.addGV(g);
	        }
	        return g;
	    };
		obj.getOneRowDataFromDiv = function(a) {
	        var c = this.getRow(a);
	        var b = {
	            tds: {},
	            status: "insert"
	        };
	        c.getElements("*[name][dataEl=true]").each(function(d) {
	            var h, k = {};
	            var f = d.get("type");
	            if (f != "hidden") {
	                if (f == "checkbox" || f == "radio") {
	                    h = d.getElement("input[type=" + f + "]").get("checked") == true ? 1 : 0
	                } else {
	                    if (["select", "pulltree", "pullbigtree", "text"].contains(f)) {
	                    	h = d.get("realvalue") //征管代码 h = d.get("showvalue") 2017-11-16 经过调试realvalue 是对的
	                    } else {
	                        if (f == "password") {
	                            h = d.retrieve("realvalue")
	                        } else {
	                            if (f == "file2") {
	                                var g = d.retrieve("up");
	                                if (g) {
	                                    h = d.retrieve("up").getValue()
	                                } else {
	                                    h = ""
	                                }
	                            } else {
	                                if ($chk(d.get("code"))) {
	                                    k.code = d.get("code");
	                                    h = d.get("text")
	                                } else {
	                                    if ($chk(d.get("format"))) {
	                                        h = d.get("realvalue")
	                                    } else {
	                                        h = d.get("text")
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                k.value = h;
	                b.tds[d.get("name")] = k
	            }
	        }, this);
	        return b;
	    }
	}else{
		obj.getOneRowData = function(a) {
	        if (!$defined(a)) {
	            return null
	        }
	        var h = this.getRow(a);
	        if (!$chk(h)) {
	            return;
	        }
	        var b = h.get("status");
	        var g;
	        if (b == "insert") {
	            g = this.getOneRowDataFromDiv(h);
	            var f = h.retrieve("rowData").tds;
	            for (var c in f) {
	                var d = g.tds;
	                if (!$defined(d[c])) {
	                    d[c] = {
	                        value: f[c]["value"]
	                    };
	                }
	            }
	            g.getValue = function(k) {
	                var l = this.tds[k];
	                if (!$defined(l)) {
	                    return null;
	                }
	                return l.value;
	            }
	        } else {
	        	g = this.getOneRowDataFromDiv(h);
	            var f = h.retrieve("rowData").tds;
	            for (var c in f) {
	                var d = g.tds;
	                if (!$defined(d[c])) {
	                    d[c] = {
	                        value: f[c]["value"]
	                    };
	                }
	            }
	            g.getValue = function(k) {
	                var l = this.tds[k];
	                if (!$defined(l)) {
	                    return null;
	                }
	                return l.value;
	            }
	            if ($chk(g) && this.selPuls) {
	                this.selPuls.each(function(k) {
	                    var m = k.name;
	                    var o = k.sbmitcontent;
	                    if ($chk(g.tds[m])) {
	                        var n = g.tds[m] ? g.tds[m].value : "";
	                        if (n && n.contains("|") && n.contains("code") && n.contains("caption")) {
	                            if ($type(n) == "string") {
	                                n = n.toHash();
	                            }
	                            var l = {};
	                            if ($type(n) == "hash") {
	                                n.each(function(q, p) {
	                                    l[p] = q;
	                                }, this);
	                            }
	                            g.tds[m].value = o.substitute(l);
	                        }
	                    }
	                });
	            }
	            this.addGV(g);
	        }
	        return g;
	    };
		obj.getOneRowDataFromDiv = function(a) {
	        var c = this.getRow(a);
	        var b = {
	            tds: {},
	            status: "insert"
	        };
	        c.getElements("*[name][dataEl=true]").each(function(d) {
	            var h, k = {};
	            var f = d.get("type");
	            if (f != "hidden") {
	                if (f == "checkbox" || f == "radio") {
	                    h = d.getElement("input[type=" + f + "]").get("checked") == true ? 1 : 0
	                } else {
	                    if (["select", "pulltree", "pullbigtree", "text"].contains(f)) {
	                        if("text"==f){
//	                        	h = d.get("showvalue");
//	                        	if(h==null){
//	                            if(d.innerHTML==null||d.innerHTML=="null"){
//	                              h = "";
//	                            }else{
	                              h = d.innerHTML;
	                              if(h!=null&&h.indexOf("input")>0){
	                                h = d.get("realvalue");
	                              }
//	                            }
//	                        	}
	                        }else{
	                        	h = d.get("realvalue");
//	                        	if(d.get("popDisplay")!=null&&h!=null){
//	                        	  h += "_popDisplay_"+d.get("popDisplay");
//	                        	}
	                        }
	                    } else {
	                        if (f == "password") {
	                            h = d.retrieve("realvalue")
	                        } else {
	                            if (f == "file2") {
	                                var g = d.retrieve("up");
	                                if (g) {
	                                    h = d.retrieve("up").getValue()
	                                } else {
	                                    h = ""
	                                }
	                            } else {
	                                if ($chk(d.get("code"))) {
	                                    k.code = d.get("code");
	                                    h = d.get("text")
	                                } else {
	                                    if ($chk(d.get("format"))) {
	                                        h = d.get("realvalue")
	                                    } else {
	                                        h = d.get("text")
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                k.value = h;
	                b.tds[d.get("name")] = k
	            }
	        }, this);
	        return b;
	    }
	}
}
// $(name + "_iframe").contentWindow.init();

function onErrorPrint(){
	swordAlert("打印失败")
	return;
}
//多张报表打印

function gyManyPagesPrint(){
	
	var mblj=printmany();
	var zbdymbuuid = setZbdymbuuid();
	var zbcount=openzb.length;
		var printBtn = new SwordSubmit();// 定义打印提交按钮
		var sendKeys = "print";
		var sendkeyArray=[];
		var haveFb = false;
		var iframeArrs1 = [];
		var iframeArrs2 = [];
		var iframeArrs3 = [];
		var count=0;
		var dyxx=[];
		var bdname=[];
		var hxPrintArrs=[];
		var calHj=[];
		var printRepFormFlagArrs=[];
		var printRepGridFlagArrs=[];
		for (var i = 0;i < openfb.length;i++){
			if(typeof(openfb[i]) != 'undefined' && openfb[i].indexOf("iframe") > 0){
				// <div id="table01" style="display: none; height: 100%;
				// overflow:
				// hidden;">
				// <iframe id="table01iframe" name="table01iframe"></iframe>
				// </div>
				iframeArrs1[i] = openfb[i].substring(0,openfb[i].indexOf("iframe"));
			}
		}
		
		for (var i = 0;i < openfb.length;i++){
			if(typeof(openfb[i]) != 'undefined' && openfb[i].indexOf("iframe") > 0){
				// <div id="A108010" style="display: none">
				// <iframe id="tableA108010iframe" src=""
				// name="tableA108010iframe"
				// style="height: 675px; width: 100%" scrolling="auto"></iframe>
				// </div>
				iframeArrs2[i] = openfb[i].substring(openfb[i].indexOf("table")+5,openfb[i].indexOf("iframe"));
			}
		}
		
		for (var i = 0;i < openfb.length;i++){
			if(typeof(openfb[i]) != 'undefined' &&openfb[i].indexOf("iframe") > 0){
				// <div id="sb402_cztdsyssb2_div" style="display: none">
				// <iframe id="sb402_cztdsyssb2_iframe"></iframe>
				// </div>
				iframeArrs3[i] = openfb[i].substring(0,openfb[i].indexOf("iframe")) + "div";
			}
		}
		for(var i=0;i<openzb.length;i++){
			dyzbmbuuid = setZbdymbuuid();
			dyxx[count]=dyzbmbuuid;
			bdname[count]=openzb[0];
			sendkeyArray[count]="print";
			if(typeof(caculateGridHJFlag) != 'undefined'){
				calHj[count]=caculateGridHJFlag;
			}else{
				calHj[count]="";
			}
			if(typeof(printRepeatFormFlag) != 'undefined'){
				printRepFormFlagArrs[count]=printRepeatFormFlag;
			}else{
				printRepFormFlagArrs[count]="";
			}
			if(typeof(printRepeatGridFlag) != 'undefined'){
				printRepGridFlagArrs[count]=printRepeatGridFlag;
			}else{
				printRepGridFlagArrs[count]="";
			}
			$$("div[sword='SwordForm']").each(function(o) {// 将页面表单中的Form名称记录在sendKeys变量中
				var n = o.get("name");
				cxSubmit($w(n));
				printBtn.pushData($w(n).getSubmitData());
				cxSubmit($w(n),true);
				sendkeyArray[count] = sendkeyArray[count]+ "," + n + ":form";
			});
			$$("div[sword='SwordGrid']").each(function(o) {// 将页面表单中的Grid名称记录在sendKeys变量中
				var n = o.get("name");
				cxGrid($w(n),false);
				printBtn.pushData($w(n).getAllNoDeleteGridData());
				cxGrid($w(n),true);
				sendkeyArray[count] = sendkeyArray[count] + "," + n + ":grid";
			});
			count=count+1;
		}
		var isPrintFb = false;
	
		for (var j = 0;j < openfb.length;j++){			
        if($(iframeArrs1[j]) != null && $(iframeArrs1[j]) != undefined && $(iframeArrs1[j]) != ""){		
			sendkeyArray[count]="print";    
			haveFb = true;
		    bdname[count]=openfb[j];
		        try{
					$(openfb[j]).contentWindow.setFbdymbuuid();
					dyxx[count]=dymbuuid;// 附表打印模板路径
					if(typeof(hxdyForPrint) != 'undefined'){
			        	hxPrintArrs[count]=hxdyForPrint;
					}else{
						hxPrintArrs[count]="";
					}
					if(typeof(caculateGridHJFlag) != 'undefined'){
						calHj[count]=caculateGridHJFlag;
					}else{
						calHj[count]="";
					}
					if(typeof(printRepeatFormFlag) != 'undefined'){
						printRepFormFlagArrs[count]=printRepeatFormFlag;
					}else{
						printRepFormFlagArrs[count]="";
					}
					if(typeof(printRepeatGridFlag) != 'undefined'){
						printRepGridFlagArrs[count]=printRepeatGridFlag;
					}else{
						printRepGridFlagArrs[count]="";
					}
					var nsrxxFlag = false;
					$(openfb[j]).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						cxSubmit($(openfb[j]).contentWindow.$w(n));
						if("nsrxxForm" == n){
							nsrxxFlag = true;
						}
						printBtn.pushData($(openfb[j]).contentWindow.$w(n).getSubmitData());
						cxSubmit($(openfb[j]).contentWindow.$w(n),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + n + ":form";
						
					});
					if(!nsrxxFlag){
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
					   }
				    }
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
					}
					$(openfb[j]).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {// 将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						cxGrid($(openfb[j]).contentWindow.$w(n),false);
						printBtn.pushData($(openfb[j]).contentWindow.$w(n).getAllNoDeleteGridData());
						cxGrid($(openfb[j]).contentWindow.$w(n),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + n + ":grid";
					});
					
					isPrintFb = true;
					count=count+1;// 放置前台频繁调用后台，把所有的数据全部一次性提交到后天
				}catch(e){
					swordAlert("请先打开需要打印的申报表，再打印");
					return;	
				}
		              
			}
		}	
		if(!isPrintFb){
			for (var j = 0;j < openfb.length;j++){					
				if($(iframeArrs2[j]) != null && $(iframeArrs2[j]) != undefined && $(iframeArrs2[j]) != ""){
					sendkeyArray[count]="print";
					haveFb = true;
					bdname[count]=openfb[j];				
				try{
					$(openfb[j]).contentWindow.setFbdymbuuid();
					dyxx[count]=dymbuuid;// 附表打印模板路径
					if(typeof(hxdyForPrint) != 'undefined'){
			        	hxPrintArrs[count]=hxdyForPrint;
					}else{
						hxPrintArrs[count]="";
					}
					if(typeof(caculateGridHJFlag) != 'undefined'){
						calHj[count]=caculateGridHJFlag;
					}else{
						calHj[count]="";
					}
					if(typeof(printRepeatFormFlag) != 'undefined'){
						printRepFormFlagArrs[count]=printRepeatFormFlag;
					}else{
						printRepFormFlagArrs[count]="";
					}
					if(typeof(printRepeatGridFlag) != 'undefined'){
						printRepGridFlagArrs[count]=printRepeatGridFlag;
					}else{
						printRepGridFlagArrs[count]="";
					}
					var nsrxxFlag = false;
					$(openfb[j]).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						cxSubmit($(openfb[j]).contentWindow.$w(n));
						if("nsrxxForm" == n){
							nsrxxFlag = true;
						}
						printBtn.pushData($(openfb[j]).contentWindow.$w(n).getSubmitData());
						cxSubmit($(openfb[j]).contentWindow.$w(n),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + n + ":form";
						
					});
					if(!nsrxxFlag){
					var name = "nsrxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
					   }
				    }
					var name = "slxxForm";
					if($w(name) != null && $w(name) != undefined && $w(name) != ""){
						cxSubmit($w(name));
						printBtn.pushData($w(name).getSubmitData());
						cxSubmit($w(name),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
					}
					$(openfb[j]).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {// 将附表中的Grid名称记录在sendKeys变量中
						var n = o.get("name");
						cxGrid($(openfb[j]).contentWindow.$w(n),false);
						printBtn.pushData($(openfb[j]).contentWindow.$w(n).getAllNoDeleteGridData());
						cxGrid($(openfb[j]).contentWindow.$w(n),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + n + ":grid";
					});
					isPrintFb = true;
					count=count+1;// 放置前台频繁调用后台，把所有的数据全部一次性提交到后天
				}catch(e){				
						swordAlert("请先打开需要打印的申报表，再打印");
						return;						
				}
			}
		}
	}		
	if(!isPrintFb){
		for (var j = 0;j < openfb.length;j++){			
			if($(iframeArrs3[j]) != null && $(iframeArrs3[j]) != undefined && $(iframeArrs3[j]) != ""){
				sendkeyArray[count]="print";
				haveFb = true;
				bdname[count]=openfb[j];
				try{
					$(openfb[j]).contentWindow.setFbdymbuuid();
					dyxx[count]=dymbuuid;// 附表打印模板路径
					if(typeof(caculateGridHJFlag) != 'undefined'){
						calHj[count]=caculateGridHJFlag;
					}else{
						calHj[count]="";
					}
					if(typeof(hxdyForPrint) != 'undefined'){
			        	hxPrintArrs[count]=hxdyForPrint;
					}else{
						hxPrintArrs[count]="";
					}
					if(typeof(printRepeatFormFlag) != 'undefined'){
						printRepFormFlagArrs[count]=printRepeatFormFlag;
					}else{
						printRepFormFlagArrs[count]="";
					}
					if(typeof(printRepeatGridFlag) != 'undefined'){
						printRepGridFlagArrs[count]=printRepeatGridFlag;
					}else{
						printRepGridFlagArrs[count]="";
					}
					var nsrxxFlag = false;
					$(openfb[j]).contentWindow.$$("div[sword='SwordForm']").each(function(o) {// 将附表中的Form名称记录在sendKeys变量中
						var n = o.get("name");
						cxSubmit($(openfb[j]).contentWindow.$w(n));
						if("nsrxxForm" == n){
							nsrxxFlag = true;
						}
						printBtn.pushData($(openfb[j]).contentWindow.$w(n).getSubmitData());
						cxSubmit($(openfb[j]).contentWindow.$w(n),true);
						sendkeyArray[count] = sendkeyArray[count] + "," + n + ":form";
						
					});
					if(!nsrxxFlag){
						var name = "nsrxxForm";
						if($w(name) != null && $w(name) != undefined && $w(name) != ""){
							cxSubmit($w(name));
							printBtn.pushData($w(name).getSubmitData());
							cxSubmit($w(name),true);
							sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
						   }
					    }
						var name = "slxxForm";
						if($w(name) != null && $w(name) != undefined && $w(name) != ""){
							cxSubmit($w(name));
							printBtn.pushData($w(name).getSubmitData());
							cxSubmit($w(name),true);
							sendkeyArray[count] = sendkeyArray[count] + "," + name + ":form";
						}
						$(openfb[j]).contentWindow.$$("div[sword='SwordGrid']").each(function(o) {// 将附表中的Grid名称记录在sendKeys变量中
							var n = o.get("name");
							cxGrid($(openfb[j]).contentWindow.$w(n),false);
							printBtn.pushData($(openfb[j]).contentWindow.$w(n).getAllNoDeleteGridData());
							cxGrid($(openfb[j]).contentWindow.$w(n),true);
							sendkeyArray[count] = sendkeyArray[count] + "," + n + ":grid";
						});
					isPrintFb = true;
// break;
					count=count+1;
				}catch(e){

					swordAlert("请先打开选择的所有申报表，再打印");
					return;	
				
				}
			}
		}
	}
	printBtn.pushData("printRepFormFlagArrs",printRepFormFlagArrs);
	printBtn.pushData("printRepGridFlagArrs",printRepGridFlagArrs);
	printBtn.pushData("calHj",calHj);	
    printBtn.pushData("dyxx",dyxx);
	printBtn.pushData("bdname",bdname);
	printBtn.pushData("hxPrintArrs",hxPrintArrs);	
	printBtn.pushData("sendkeyArray",sendkeyArray);
	if(typeof(mblj) != 'undefined'){
		printBtn.pushData("mblj",mblj);
	}else{
		printBtn.pushData("mblj","");
	}		    
	/*
	 * if(typeof(hxdyForPrint) != 'undefined'){
	 * printBtn.pushData("hxdyForPrint",hxdyForPrint); }else{
	 * printBtn.pushData("hxdyForPrint",""); } if(typeof(printTitle) !=
	 * 'undefined'){ printBtn.pushData("printTitle",printTitle); }else{
	 * printBtn.pushData("printTitle",""); } if(typeof(caculateGridHJFlag) !=
	 * 'undefined'){
	 * printBtn.pushData("caculateGridHJFlag",caculateGridHJFlag); }else{
	 * printBtn.pushData("caculateGridHJFlag",""); }
	 * if(typeof(printRepeatFormFlag) != 'undefined'){
	 * printBtn.pushData("printRepeatFormFlag",printRepeatFormFlag); }else{
	 * printBtn.pushData("printRepeatFormFlag",""); }
	 * if(typeof(printRepeatGridFlag) != 'undefined'){
	 * printBtn.pushData("printRepeatGridFlag",printRepeatGridFlag); }else{
	 * printBtn.pushData("printRepeatGridFlag",""); }
	 */
	if(typeof(printManyTitle) != 'undefined'){
		printBtn.pushData("printTitle",printManyTitle);
	}else{
		printBtn.pushData("printTitle","");
	}
	if(typeof(printManyType) != 'undefined'){
		printBtn.pushData("printFileType",printManyType);
	}else{
		printBtn.pushData("printFileType","");
	}
	/*
	 * if(typeof(ccbg) != 'undefined'){ printBtn.pushData("ccbg",ccbg); }
	 * if(typeof(tsxx) != 'undefined'){ printBtn.pushData("tsxx",tsxx); }
	 * if(typeof(fykg) != 'undefined'){ printBtn.pushData("fykg",fykg); }
	 * if(typeof(zzlx) != 'undefined'){ printBtn.pushData("zzlx",zzlx); }
	 * if(typeof(printMode) != 'undefined'){
	 * printBtn.pushData("printMode",printMode); }
	 */
	if(printManyType == "excel" || printManyType == ""){
		printBtn.setCtrl("GY011GyDyCtrl_gyManyPagesPrint");
		swordOpenWin('/sword?ctrl=GY011GyDyCtrl_gyManyPagesPrint&r=' + Math
				.random(), printBtn);

	}else{
		swordAlert("请指定打印方式为为Excel");
		return;
	}
	printBtn.setFunction("onError","onErrorPrint");
}
function getUUid(){
  var printBtn = new SwordSubmit();//定义打印提交按钮
  var sendKeys = "print";
  var haveFb = false;
//  var iframes = document.all.tags("IFRAME");
  var iframes =  document.getElementsByTagName("IFRAME");
  var iframeArrs1 = [];
  var iframeArrs2 = [];
  var iframeArrs3 = [];
  for (var i = 0;i < iframes.length;i++){
    if(iframes[i].id.indexOf("iframe") > 0){
      iframeArrs1[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe"));
    }
  }
  
  for (var i = 0;i < iframes.length;i++){
    if(iframes[i].id.indexOf("iframe") > 0){
      iframeArrs2[i] = iframes[i].id.substring(iframes[i].id.indexOf("table")+5,iframes[i].id.indexOf("iframe"));
    }
  }
  
  for (var i = 0;i < iframes.length;i++){
    if(iframes[i].id.indexOf("iframe") > 0){
      iframeArrs3[i] = iframes[i].id.substring(0,iframes[i].id.indexOf("iframe")) + "div";
    }
  }
  
  var isPrintFb = false;
  for(var index = 0;index < iframeArrs1.length;index++){
    if($(iframeArrs1[index]) != null && $(iframeArrs1[index]) != undefined && $(iframeArrs1[index]) != ""){
      haveFb = true;
      if($(iframeArrs1[index]).style.display != "none"){
        $(iframes[index]).contentWindow.setFbdymbuuid();
        isPrintFb = true;
        break;
      }
    }
  }
  
  if(!isPrintFb){
    for(var index = 0;index < iframeArrs2.length;index++){
      if($(iframeArrs2[index]) != null && $(iframeArrs2[index]) != undefined && $(iframeArrs2[index]) != ""){
        haveFb = true;
        if($(iframeArrs2[index]).style.display != "none"){
          $(iframes[index]).contentWindow.setFbdymbuuid();
          isPrintFb = true;
          break;
        }
      }
    }
  }
  
  if(!isPrintFb){
    for(var index = 0;index < iframeArrs3.length;index++){
      if($(iframeArrs3[index]) != null && $(iframeArrs3[index]) != undefined && $(iframeArrs3[index]) != ""){
        haveFb = true;
        if($(iframeArrs3[index]).style.display != "none"){
          $(iframes[index]).contentWindow.setFbdymbuuid();
          isPrintFb = true;
          break;
        }
      }
    }
  }
  if(!isPrintFb){
    if(haveFb){
      dymbuuid = setZbdymbuuid();
      if(dymbuuid == false){
        return;
      }
    }
  }
}

//核心代码  代码转名称改为了前台转化 的公共方法抽取方便调用
function gridCodeCaptionTransform(n){
	var codeToCaption = {};
	var rowels = $w(n).dataDiv().getChildren();
	rowels.each(function(rowel){
		var cells = $w(n).getRow(rowel).getChildren();
		cells.each(function(cell){
			if(cell.type == "select"){
				var obj = {};
				var realvalue = cell.getProperty("realvalue");
				if($chk(realvalue)){
					var title = cell.getProperty("title");
					var key = cell.name;
					if($chk(codeToCaption[key])){
						var map = codeToCaption[key];
						map[realvalue] = title;
						codeToCaption[key] = map;
					}else{
						obj[realvalue] = title;
						codeToCaption[key] = obj;
					}
				}
			}
		})
	});
	var oldData = $w(n).getAllNoDeleteGridData();
	var data = JSON.decode(JSON.encode(oldData));
	for(var key in codeToCaption){
		for(var i=0;i<data.trs.length;i++){
			var tds = data.trs[i].tds;
			if(tds[key]!=undefined&&tds[key]!=null&&$chk(tds[key].value)){
				var code = tds[key].value;
				tds[key].value = codeToCaption[key][code];
				tds.xh={value:i+1};
			}
		}
	}
	return data;
}
function cxSwordOpenWin(flag){
  if(flag){
    swordOpenWin = function(c, p) {
      var a = screen.availHeight;
      var m = screen.availWidth - 10;
      var h = navigator.userAgent;
      var d = h.indexOf("Windows NT 6.1") > -1 || h.indexOf("Windows 7") > -1;
      if (d) {
          a = a - 40
      }
      var g = "top=0,left=0,toolbar=no,menubar=no,scrollbars=no,width=" + m + ",height=" + a + ",resizable=no,location=no, status=no";
      if ($chk(p) && $type(p) == "hash") {
          var f = document.createElement("form");
          f.id = "openPrintWindowForm";
          f.method = "post";
          f.action = AddBizCode2URL(c);
          var k = Math.random() + "";
          if (k.indexOf(".") != -1) {
              k = k.substr(k.indexOf(".") + 1, k.length)
          }
          var b = "openPrintWindowName" + k;
          f.target = b;
          p.each(function(s, r) {
              var q = document.createElement("input");
              q.type = "hidden";
              q.name = r;
              q.value = s;
              f.appendChild(q)
          });
          var o = window.open("about:blank", b, g);
//          o.name = b;
          document.body.appendChild(f);
          f.submit();
          document.body.removeChild(f)
      } else {
          if ($chk(p) && $type(p) == "SwordSubmit") {
              var k = Math.random() + "";
              if (k.indexOf(".") != -1) {
                  k = k.substr(k.indexOf(".") + 1, k.length)
              }
              var b = "openPrintWindowName" + k;
              var l;
              try {
                  l = top.window
              } catch (n) {
                  l = window
              }
              //重写部分
//              var o = l.open("about:blank", "", g);
//              o.name = b;
              p.options.postType = "form_" + b;
              p.submit()
          } else {
              window.open(AddBizCode2URL(c), "", g)
          }
      }
  }
    PageContainer.SwordformSubmit = function(d, f) {
      var a = "";
      if ($chk(d.page)) {
          a = d.page
      } else {
          a = "form.sword";
          if (d.bindParam) {
              var g = d.tid;
              var b = d.ctrl;
              if ($chk(g) && g.indexOf("?") != -1) {
                  a = a + g.substr(g.indexOf("?"), g.length - 1)
              } else {
                  if ($chk(b) && b.indexOf("?") != -1) {
                      a = a + b.substr(b.indexOf("?"), b.length - 1)
                  }
              }
          }
          a = this.AddBaseCode2URL(a)
      }
      var c = this.getDownLoadForm().set({
          //重写
          target: '_blank',
          action: a
      });
      c.postReqInput.set("value", JSON.encode(d));
      c.submit()
  };
  }else{
    
    swordOpenWin = function(c, p) {
      var a = screen.availHeight;
      var m = screen.availWidth - 10;
      var h = navigator.userAgent;
      var d = h.indexOf("Windows NT 6.1") > -1 || h.indexOf("Windows 7") > -1;
      if (d) {
          a = a - 40
      }
      var g = "top=0,left=0,toolbar=no,menubar=no,scrollbars=no,width=" + m + ",height=" + a + ",resizable=no,location=no, status=no";
      if ($chk(p) && $type(p) == "hash") {
          var f = document.createElement("form");
          f.id = "openPrintWindowForm";
          f.method = "post";
          f.action = AddBizCode2URL(c);
          var k = Math.random() + "";
          if (k.indexOf(".") != -1) {
              k = k.substr(k.indexOf(".") + 1, k.length)
          }
          var b = "openPrintWindowName" + k;
          f.target = b;
          p.each(function(s, r) {
              var q = document.createElement("input");
              q.type = "hidden";
              q.name = r;
              q.value = s;
              f.appendChild(q)
          });
          var o = window.open("about:blank", b, g);
//          o.name = b;
          document.body.appendChild(f);
          f.submit();
          document.body.removeChild(f)
      } else {
          if ($chk(p) && $type(p) == "SwordSubmit") {
              var k = Math.random() + "";
              if (k.indexOf(".") != -1) {
                  k = k.substr(k.indexOf(".") + 1, k.length)
              }
              var b = "openPrintWindowName" + k;
              var l;
              try {
                  l = top.window
              } catch (n) {
                  l = window
              }
              var o = l.open("about:blank", "", g);
              o.name = b;
              p.options.postType = "form_" + b;
              p.submit()
          } else {
              window.open(AddBizCode2URL(c), "", g)
          }
      }
  }
    PageContainer.SwordformSubmit = function(d, f) {
      var a = "";
      if ($chk(d.page)) {
          a = d.page
      } else {
          a = "form.sword";
          if (d.bindParam) {
              var g = d.tid;
              var b = d.ctrl;
              if ($chk(g) && g.indexOf("?") != -1) {
                  a = a + g.substr(g.indexOf("?"), g.length - 1)
              } else {
                  if ($chk(b) && b.indexOf("?") != -1) {
                      a = a + b.substr(b.indexOf("?"), b.length - 1)
                  }
              }
          }
          a = this.AddBaseCode2URL(a)
      }
      var c = this.getDownLoadForm().set({
          target: f,
          action: a
      });
      c.postReqInput.set("value", JSON.encode(d));
      c.submit()
  };
  }
}
