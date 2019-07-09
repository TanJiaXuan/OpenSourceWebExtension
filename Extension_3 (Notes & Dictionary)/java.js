
const MyNotes = document.getElementById('mnotes');
const gettingItem = browser.storage.local.get('MyAllNotes');
gettingItem.then((res) => {
try{
  if(res.MyAllNotes){
    MyNotes.innerHTML = res.MyAllNotes;
  }
}catch(e){}
});

MyNotes.addEventListener('keyup',()=>{
    browser.storage.local.set({ MyAllNotes: MyNotes.innerHTML});
}, false);


function save(){
	browser.storage.local.set({ MyAllNotes: MyNotes.innerHTML});
}


var editorContent = document.getElementById("mnotes");


document.getElementById("underline").addEventListener("click", underlinee);
document.getElementById("italic").addEventListener("click", italicc);
document.getElementById("bold").addEventListener("click", boldd);
document.getElementById("link").addEventListener("click", linkk);
document.getElementById("cut").addEventListener("click", cutt);
document.getElementById("left").addEventListener("click", leftt);
document.getElementById("center").addEventListener("click", centerr);
document.getElementById("right").addEventListener("click", rightt);
document.getElementById("undo").addEventListener("click", undoo);
document.getElementById("redo").addEventListener("click", redoo);



function underlinee(){document.execCommand('underline', false, '');save();}
function italicc(){document.execCommand('italic', false, '');save();}
function boldd(){document.execCommand('bold', false, '');save();}

function undoo(){document.execCommand('undo',false,'');save();}
function redoo(){document.execCommand('redo',false,'');save();}


function linkk(){
  var url = prompt("Enter the URL & hit OK");
  
  var selectedText=(
        window.getSelection
        ?
            window.getSelection()
        :
            document.getSelection
            ?
                document.getSelection()
            :
                document.selection.createRange().text
     );
 if(!selectedText || selectedText=="")
{
	 if (!url.startsWith('http')){var uu = url; url = "https://"+url;}
	 	 
	 document.execCommand("insertHTML", false, "<a href='"+ url +"' title='CTRL+Click to open "+ url +"'>"+ uu +"</a>");

		 
		 
	
}else{  
if (!url.startsWith('http')){url = "https://"+url;}
  document.execCommand("insertHTML", false, "<a href='"+ url +"' title='CTRL+Click to open "+ url +"'>"+ selectedText +"</a>");
}
  save();
}

function cutt(){document.execCommand('strikeThrough',false,'');save();}
function leftt(){document.execCommand('justifyLeft',false,'');save();}
function centerr(){document.execCommand('justifyCenter',false,'');save();}
function rightt(){document.execCommand('justifyRight',false,'');save();}



function handlePaste (e) {
		
		var selectedText=(
        window.getSelection
        ?
            window.getSelection()
        :
            document.getSelection
            ?
                document.getSelection()
            :
                document.selection.createRange().text
     );

		
		var clipboardData, pastedData;

		
	

		// Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    
    // Do whatever with pasteddata

if(!selectedText || selectedText==""){
	
	
   
if((pastedData.startsWith("http")) || (pastedData.startsWith("www"))){
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
	
	if(pastedData.startsWith("http")){document.execCommand("insertHTML", false, "<a href='"+ pastedData +"' title='CTRL+Click to open '>"+ pastedData +"</a>");}
   if(pastedData.startsWith("www")){document.execCommand("insertHTML", false, "<a href='https://"+ pastedData +"' title='CTRL+Click to open https://"+pastedData+"'>"+ pastedData +"</a>");}
}

   }else{

   if((pastedData.startsWith("http")) || (pastedData.startsWith("www"))){
	// Stop data actually being pasted into div 
	e.stopPropagation();
    e.preventDefault();
	
   if(pastedData.startsWith("http")){document.execCommand("insertHTML", false, "<a href='"+ pastedData +"' title='CTRL+Click to open "+pastedData+"'>"+ selectedText +"</a>");}
   if(pastedData.startsWith("www")){document.execCommand("insertHTML", false, "<a href='https://"+ pastedData +"' title='CTRL+Click to open https://"+pastedData+"'>"+ selectedText +"</a>");}
   
}
	
         }
 save();
}




document.getElementById('mnotes').addEventListener('paste', handlePaste);



 