function resetRem() {

  const deviceWidth=document.documentElement.clientWidth;
  document.documentElement.style.fontSize=deviceWidth/7.5+"px";
}
resetRem();
window.onresize=resetRem;
