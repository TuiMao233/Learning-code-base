
var ox = document.querySelector('canvas')
ox.width = document.documentElement.clientWidth
ox.height = document.documentElement.clientHeight
var ctx = ox.getContext('2d')
ctx.lineWidth = 40
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
var img = new Image()
img.src = './img/fengmian.jpg'
img.onload = function(){
      ctx.drawImage(this,0,0,ox.width,ox.height)
      ctx.globalCompositeOperation = 'destination-out'
      ox.addEventListener('touchstart',function(e){
            e = e || event
            let {clientX,clientY} = e.changedTouches[0]
            ctx.moveTo(clientX,clientY)
            ctx.lineTo(clientX,clientY)
            ctx.stroke()
      })
      ox.addEventListener('touchmove',function(e){
            e = e || event
            let {clientX,clientY} = e.changedTouches[0]
            ctx.lineTo(clientX,clientY)
            ctx.stroke()
      })
      ox.addEventListener('touchend',function(){
            let {data} = ctx.getImageData(0,0,ox.width,ox.height)
            let num = 0
            for (var i = 0 ; i < ox.width*ox.height ; i ++) {
                  if (!data[i*4+3]) {
                        num ++
                  }
            }
            if (num >= ox.width*ox.height / 2 ) {
                  this.style.opacity = 0
                  this.addEventListener('transitionend',function(){
                        this.remove()
                       music()
                        viewShow()
                  })
            }
      })
}



function music() {
      var audio = logo.querySelector('.audio')
      sound =  audio.querySelector('audio')
      ;(audio.onclick = function () {
            if(sound.paused){
                  sound.play()
                  $(audio).removeClass('paused')
                  $(audio).addClass('play')
            }else{
                  sound.pause()
                  $(audio).removeClass('play')
                  $(audio).addClass('paused')
            }
      })()
}


function viewShow() {
      
      var num = 0,$viewList = $('#viewList') ,$views =  $('.view')
      $('#touchS').addClass('upperS')
      $viewList.show()
      var height = document.documentElement.clientHeight
      
      
      
      $viewList.swipeUp(move.bind($viewList,1))
      $viewList.swipeDown(move.bind($viewList,-1))
      
      function move(index) {
            var next = num + index
            
            if (next >= 0 && next <= 8){
                  this.css('transform','translate3d(0,'+ -height*next +'px,-10px)')
                  setTimeout(function () {
                        $views.eq(next).addClass('active')
                        $views.eq(num).removeClass('active')
                        num = next
                        if (num === 8){
                              $('#touchS').attr('class','bottomS')
                        }else {
                              $('#touchS').attr('class','upperS')
                        }
                  },1000)
            }
      }
      
}


