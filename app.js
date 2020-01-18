window.onload=function () {
    imgLocation("container","box");
    console.log("123");
    var imgdata={"data":[{"src":"0.jpg"},{"src":"10.jpg"},{"src":"5.jpg"},{"src":"7.jpg"},{"src":"4.jpg"},{"src":"2.jpg"},{"src":"6.jpg"},{"src":"3.jpg"},{"src":"8.jpg"},
            {"src":"12.jpg"},{"src":"1.jpg"},{"src":"11.jpg"},{"src":"9.jpg"}]};
    window.onscroll=function () {
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i=0;i<imgdata.data.length;i++){
                var ccontent=document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg=document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img=document.createElement("img");
                img.src=imgdata.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}
function checkFlag() {
    var cparent=document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastContentHeight+":"+scrollTop+":"+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }

}
function imgLocation(parent,content) {
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    console.log(ccontent.length);
    var imgWidth=ccontent[0].offsetWidth;
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="Width:"+imgWidth*num+"px;margin: 0px auto;";
    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            BoxHeightArr[i]=ccontent[i].offsetHeight;
        }else {
            var minHeight=Math.min.apply(null,BoxHeightArr);
            var minIndex=getMinHeightLocation(BoxHeightArr,minHeight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            console.log(ccontent[i].style.left);
            console.log(minIndex);
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
            console.log(BoxHeightArr[minIndex]);
        }
    }
}
function getMinHeightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
        }

    }

}
function getChildElement(parent,content) {
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
