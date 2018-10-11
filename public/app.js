$("#scrapeButton").on('click', function(){

$("#articles").html("");

$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {
        

        var comment = '<article class="uk-comment"><header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid><div class="uk-width-auto"><img class="uk-comment-avatar" src="images/avatar.jpg" width="80" height="80" alt=""></div><div class="uk-width-expand"><h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">Author</a></h4><ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"><li><a href="#">12 days ago</a></li><li><a href="#">Reply</a></li></ul></div></header><div class="uk-comment-body" id="comments"><p>Lorem ipsum</p></div></article>'

        var dropdown = '<button class="uk-button uk-button-default" type="button">5 Comments</button><div uk-dropdown="mode: click">'+comment+'</div>'

        var article = '<div class="uk-flex uk-flex-column uk-width-1-2">'+

                        '<div class="uk-width-1-1 uk-card uk-card-default uk-card-body uk-card-small">'+

                          '<article class="uk-article">'+

                            '<h1 class="uk-article-title">'+
                              '<a class="uk-link-reset" target="_blank" href="">'+data[i].title+'</a>'+
                            '</h1>'+

                            '<p class="uk-article-meta">Written by '+
                              '<a href="#">'+ data[i].author +'</a> on 12 April 2012. Posted in '+
                              '<a target="_blank" href="https://breitbart.com'+ data[i].link +'">NEWS LINK</a>'+
                            '</p>'+

                            '<p class="uk-text-lead">Lorem ipsum dolor </p>'+

                            '<p>Lorem ipsum </p>'+
                            
                            '<div class="uk-grid-small uk-child-width-auto" uk-grid>'+

                              '<div>'+

                                '<a class="uk-button uk-button-text" target="_blank" href="https://breitbart.com'+ data[i].link +'">Read more</a>'+

                              '</div>'+

                              '<div>'+

                                '<a class="uk-button uk-button-text" id="commentButton" href="'+ dropdown +'</a>'+

                              '</div>'+

                            '</div>'+

                          '</article>'+

                        '</div>'+
                        
                      '</div>'

        $("#articles").append(article);

        $("#commentButton").on('click', function(){
            
            var thisId = $(this).attr("data-id");
            
            $.ajax({
              method: "GET",
              url: "/articles" + thisId
            })
              
              .then(function(data) {
                console.log(data);
                
                $("#comments").append("<h2>" + data.title + "</h2>");
                
                $("#comments").append("<input id='titleinput' name='title' >");
                
                $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
                
                $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
          
                
                if (data.comment) {
                  // Place the title of the note in the title input
                  $("#titleinput").val(data.comment.title);
                  // Place the body of the comment in the body textarea
                  $("#bodyinput").val(data.comment.body);
                }
              });
          });
    
      
        
     
    }
  });
});
