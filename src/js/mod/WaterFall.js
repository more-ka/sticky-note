
var WaterFall = (function(){
  var $content;
  var $items;

  function render($element){
    $content = $element;
    $items = $content.children();

    var nodeWidth = $items.outerWidth(true),
    
      colNum = parseInt(($(window).width())/nodeWidth),
      colSumHeight = [];

    for(var i = 0; i<colNum;i++){
      colSumHeight.push(0);
    }

    $items.each(function(){
      var $current = $(this);

      //colSumHeight = [100, 250, 80, 200]

      var index = 0,
        minSumHeight = colSumHeight[0];

      for(var i=0;i<colSumHeight.length; i++){
        if(colSumHeight[i] < minSumHeight){
          index = i;
          minSumHeight = colSumHeight[i];
        }
      }

      $current.css({
        left: nodeWidth*index,
        top: minSumHeight
      });
      colSumHeight[index] = $current.outerHeight(true) + colSumHeight[index];
    });
  }


  $(window).on('resize', function(){
    render($content);
  })


  return {
    init: render
  }
})();

module.exports = WaterFall

// WaterFall.init($('#content'))