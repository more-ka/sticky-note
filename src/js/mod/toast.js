require('less/toast.less')

function toast(msg,time){
  this.msg = msg
  this.dismissTime = time||1000
  this.createToast()
  this.showToast()
}
toast.prototype = {
  createToast: function(){
    var template = `<div class="toast">${this.msg}</div>`
    this.$toast = $(template)
    $('body').append(this.$toast)
  },
  showToast: function(){
    var that = this
    that.$toast.fadeIn(300,function(){
      setTimeout(function(){
        that.$toast.fadeOut(300,function(){
          that.$toast.remove()
        })
      },that.dismissTime)
    })
  }
}

function Toast(msg,time){
  return new toast(msg,time)
}
module.exports.Toast = Toast