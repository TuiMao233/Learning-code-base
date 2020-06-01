//禁止所有默认行为
document.addEventListener('touchstart', function (ev) {
    ev=ev||event
    ev.preventDefault()
})


// rem适配
var styleNode =  document.createElement('style')
var remCount = document.documentElement.clientWidth / 16
styleNode.innerHTML = `html{font-size:${remCount}px !important}`
document.head.appendChild(styleNode)
console.log(`1rem === ${remCount}px`)

