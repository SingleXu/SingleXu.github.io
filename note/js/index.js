$(document).ready(function(){
    var $content = $(".content");
    var $container = $(".container");
    var $wrapNavItem = $(".wrap-nav-item");
    var $wrapContent = $(".wrap-content");
    var $navItemSecond = $(".nav-item-second");
    var $nav = $(".nav");
    var $wrapContentItem = $(".wrap-content-item");
    var $iconMenu = $(".icon-menu");

    function navActive(){
        // 导航的点击事件
        $navItemSecond.click(function(){
            $wrapNavItem.attr("data-scroll","on");
            $navItemSecond.removeClass("active");
            $(this).addClass("active");
            var href = $(this).find("a").attr("data-href").replace(/\w+.html/,'');
            var scroll = $(href).offset().top - $wrapContent.offset().top;
            $content.animate({scrollTop:scroll},500);

            // 点击滚动时给一个状态
            setTimeout(function(){
                $wrapNavItem.attr("data-scroll","off");
            },500);

            // 移动端且导航为active状态时，点击导航标签，导航取消active状态
            var navStatus = $nav.attr("data-on");
            if (navStatus == "on") {
                $nav.removeClass("active");
                $nav.attr("data-on","off");
            }
        });
    }
    navActive();

    function contentScroll(){
        var wrapContentItemCount = $wrapContentItem.length;
        // content滚动事件
        $content.scroll(function(){
            var scroll = $wrapNavItem.attr("data-scroll");
            //判断是否处于导航点击事件时间中
            if (scroll == "off") {
                var $navItemSecond = $(".nav-item-second");
                for(var i = 0;i<wrapContentItemCount;i++){
                    var height = $wrapContentItem.eq(i).offset().top;
                    if (height <= 30) {
                        $navItemSecond.removeClass("active");
                        $navItemSecond.eq(i).addClass("active");
                    }
                }
            }
        });
    }
    contentScroll();

    function iconMenu(){
        // 移动端菜单的点击事件
        $iconMenu.click(function(){
            var data = $nav.attr("data-on");
            if (data == "on") {
                $nav.removeClass("active");
                $nav.attr("data-on","off");
            }else{
                $nav.addClass("active");
                $nav.attr("data-on","on");
            }
        });
    }
    iconMenu();


});