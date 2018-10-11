$.getJSON("/articles", function(data) {

    for (var i = 0; i < data.length; i++) {
        
        
          var article = '<div class="uk-flex uk-flex-column uk-width-1-2"><div class="uk-width-1-1 uk-card uk-card-default uk-card-body uk-card-small"><article class="uk-article"><h1 class="uk-article-title"><a class="uk-link-reset" href="">'+data[i].title+'</a></h1><p class="uk-article-meta">Written by <a href="#">Super User</a> on 12 April 2012. Posted in <a href="'+ data[i].link +'">NEWS LINK</a></p><p class="uk-text-lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><div class="uk-grid-small uk-child-width-auto" uk-grid><div><a class="uk-button uk-button-text" href="#">Read more</a></div><div><a class="uk-button uk-button-text" href="#">5 Comments</a></div></div></article></div></div>'
        var comments = '<div class=".uk-align-center">TEST COMMENTS</div>'
        
      $("#articles").append(article);
      $("#comments").append(comments);
    }
  });

