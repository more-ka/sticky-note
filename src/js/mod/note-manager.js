/*
 * @Author: your name
 * @Date: 2020-02-23 16:27:38
 * @LastEditTime: 2020-02-23 17:31:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sticky-note\src\js\mod\note-manager.js
 */
var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');


var NoteManager = (function(){

  function load() {
    $.get('/api/notes')
      .done(function(ret){
        if(ret.status == 0){
          $.each(ret.data, function(index, article) {
              new Note({
                id: article.id,
                context: article.text,
                username: article.username,
                time: article.createTime
              });
          });
          Event.fire('waterfall');
        }else{
          Toast(ret.errorMsg);
        }
      })
      .fail(function(){
        Toast('网络异常');
      });


  }

  function add(){
    new Note();
  }

  return {
    load: load,
    add: add
  }

})();

module.exports.NoteManager = NoteManager