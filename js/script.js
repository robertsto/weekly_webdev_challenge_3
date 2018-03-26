//scrolling page to section
$(document).ready(function(jQuery) {            
  var topMenu = jQuery("#navbar-menu-list"),
      offset = 40,
      topMenuHeight = topMenu.outerHeight()+offset,
      // All list items
      menuItems =  topMenu.find('a[href*="#"]'),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        item = jQuery(id);
        //console.log(item)
        if (item.length) { return item; }
      });

    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#'));
          offsetTop = href === "#" ? 0 : jQuery(id).offset().top-topMenuHeight+1;
      jQuery('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 1100);
      e.preventDefault();
    });

    // Bind to scroll
    jQuery(window).scroll(function(){
       // Get container scroll position
       var fromTop = jQuery(this).scrollTop()+topMenuHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if (jQuery(this).offset().top < fromTop)
           return this;
       });

       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";               
       
       menuItems.removeClass("navbar-menu__link--active");
       if(id){
            menuItems.filter("[href*='#"+id+"']").addClass("navbar-menu__link--active");
       }
       
    })
})


// change menu size
$(document).on("scroll",function(){
  if($(document).scrollTop()>50){ 
    $("#navbar_fixed").removeClass("navbar--large").addClass("navbar--small");
    }
  else{
    $("#navbar_fixed").removeClass("navbar--small").addClass("navbar--large");
    }
});


// hamburger menu
$('.navbar-toggle').on('click', function(){
	$('.navbar-menu').toggleClass('navbar-menu--show');
});

$('.navbar-menu>li>a').on('click', function(){
    $('.navbar-menu').removeClass('navbar-menu--show');
});