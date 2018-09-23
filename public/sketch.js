var socket;
var text = {
    text: ''
};

function setup(){
    socket = io.connect('https://halissimsek.herokuapp.com/' || 'http://localhost:8080');
    $("#text").on("froalaEditor.keyup", function(){
        var html = $(this).froalaEditor('html.get');
        var data = {
            text: html,
            selection : $('#text').froalaEditor('selection.blocks')
        };
        socket.emit('text', data);
    });
    
    /**
    $('#text').on('froalaEditor.mousedown', function (e, editor, mouseupEvent) {
        var data = {
            selection : $('#text').froalaEditor('selection.blocks')
        };
                socket.emit('cursor', data);
     });
    **/
    
    $('#text').froalaEditor({
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
        fullPage: true
    });

    //socket.on('cursor', setSelectionText);
    socket.on('text', handleRecievedText);
    socket.on('newUser', updateText);
}

function updateText(data){
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    editor.selection.setAfter(data.selection);
    editor.selection.restore();
    
   // $('#text').froalaEditor('selection.setAfter', data.selection);
   // $('#text').froalaEditor('selection.restore');
    //editor.selection.setAtEnd(editor.$el.get(0));
    //editor.selection.restore();
}

function handleRecievedText(data){
    console.log(data);
    text.text = data.text;
    $("#text").froalaEditor('html.set', data.text);
    var editor = $('#text').data('froala.editor');
    
    $('#text').froalaEditor('selection.setAfter', data.selection);
    $('#text').froalaEditor('selection.restore');
    
    //editor.selection.setAtEnd(editor.$el.get(0));
   // editor.selection.restore();


}

function setSelectionText(data)
{
    $('#text').froalaEditor('selection.setAfter', data.selection);
    $('#text').froalaEditor('selection.restore');
}


