var EventCenter = (function(){
  var events = {}
  function on(event,handler){
    events[event] = events[event] || []
    events[event].push({
      handler:handler
    })
  }
  function fire(event,args){
    if(!events[event]){
      return
    }
    for(let i=0;i<events[event].length;i++){
      events[event][i].handler(args)
    }
  }
  return {
    on: on,
    fire: fire
  }
})()
module.exports = EventCenter
// window.EventCenter = EventCenter

    // {
    //   click: Array(2)
    //     0: {handler: "s"}
    //     1: {handler: "5"}
    // }
  // EventCenter.on('text-change', function(data){
  //  console.log(data);
  // });
  
  // EventCenter.on('text-change', function(data){
  //  alert(1);
  // });
  

  // EventCenter.fire('text-change', 100);
