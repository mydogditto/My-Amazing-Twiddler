
$(document).ready(() => {
  const $buttonSection = $('<button id = "home" type="button"> See More Tweets </button>')
  const $body = $('body');
  const $sectionTweets = $('<section></section>')
  const $filterUsers = $('<section></section>')
  window.visitor = 'defaultUser'; // Set a default visitor
  // Create DOM elements for input form
  // const $body = $('body');
   const $tweetsDiv = $('<div id= new-tweet></div>');
  
   const $tweetInput = $('<input type="text" placeholder="Type your tweet here...">');
   const $tweetButton = $('<button type="button"> Post </button>');
   const $usernameInput = $('<input type="text" placeholder="Your username">');
   const $createNewUser = $('<input type="text" placeholder="Create New User">');
 const $createButton = $('<button type="button"> Create User</button>')
   const $form = $('<form></form>');
   
 // const $currentTime = new Date()
  $body.html('');// clears the body
  // this sections adds the time stamp with the date full year month hour minuets and seconds
  var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
	var date_time = current_date+" "+current_time;
  const endResult = date_time.toString()
  const $userFTime = moment().startOf(addNewTweets).fromNow()
 // this function adds new tweets in the form of divs when invoked

function addNewTweets(){
  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const $user = tweet.user
   
    const $users = $(`<span class = ${$user}  ></span>`).append(`@:${$user}: `)
    $users.on('click', function(){
     $('#marcus').html('')
      filterbyUser($user)
    })
    const $time2 = $('<span></span>').append(`${$userFTime} `)
    const $message = $('<span></span>').append(`${tweet.message} `)
    const $time = $('<span></span>').append(`${endResult}: `)
   //const $text = `${tweet.message} ${endResult}`;
  
    
   
   $tweet.append($users)
  $tweet.append($message)
  $tweet.append($time)
  $tweet.append($time2)
  $body.append($sectionTweets)
   //$tweet.text($text)
   
    return $tweet;
   
  });
  $body.append($sectionTweets)
  $sectionTweets.append($tweets)
  // this creates a new section tag
  //$body.append($sectionTweets)
  // this moves the tweets inside the section tag
  
  // this adds the date stamp to the end of the div tweet
 //$("div").append(endResult)
  
  
return $tweets
 
}
addNewTweets(); 
 // this creates a new section tag
//  $body.append($sectionTweets)
//  // this moves the tweets inside the section tag
//  $sectionTweets.append($tweets)
//('.$user').click(filterbyUser)
// this adds the button to the body tag
$body.append($buttonSection)
// adds new tweets when the Refresh button is pushed
$buttonSection.on('click', function(){
  addNewTweets()
})
//$buttonSection.click(addNewTweets)


$('<div id = spacer > </div>').insertAfter($buttonSection)

// When I click on a user  I need to display
// a new section of tweets with everthing linked to @thatuser
//$('#usernames').click(filterbyUser())
//users timelines
$("#spacer").append('<section id= marcus></section>')
function filterbyUser(username){
  const $mapUserContent = streams.users[username].map((tweets) => {
    const $tweet2 = $('<div></div>');
    const $user = tweets.user
    const $users = $('<span class = usernames ></span>').text(`@:${$user}: `)
    const $message = $('<span></span>').text(`${tweets.message}`)
    const $time = $('<span></span>').text(`${endResult}`)
   //const $text = `${tweet.message} ${endResult}`;
   
   $tweet2.append($users)
  $tweet2.append($message)
  $tweet2.append($time)
   //$tweet.text($text)
   
   
    return $tweet2;
   
  });

  $('#marcus').append($mapUserContent)
  return $mapUserContent
 
 
}

// made the background light purple
  $('body').css('background-color', "#CBC3E3");
//$('#marcus').append($mapUserContent)
$body.append($filterUsers)

$body.prepend($tweetsDiv)
  $filterUsers.prepend($form,);
     $form.prepend($usernameInput, $tweetInput, $tweetButton, $createNewUser, $createButton);

  // Render a single tweet
  const renderTweet = (tweet) => {
    const $tweet = $("<div></div>");
    const text = `@${tweet.user}: ${tweet.message}`;
    const timestamp = moment(tweet.created_at).format("MMMM Do YYYY, h:mm:ss a");
    const timeAgo = moment(tweet.created_at).fromNow();
    $tweet.html(text).append(` - ${timestamp}`).append(` - ${timeAgo}`);
    return $tweet;
  };
 
//   // Post a new tweet when button is clicked
  $tweetButton.on("click", () => {
    event.preventDefault();
    const username = $usernameInput.val().trim();
    const message = $tweetInput.val().trim();
    if (username && message) { // Check if username and message are not empty
      const newTweet = {
        user: username,
        message: message,
        created_at: new Date(),
      };
      addTweet(newTweet); // Add the new tweet to the data structure
      renderTweet(newTweet).prependTo($tweetsDiv); // Render the new tweet and prepend it to the tweets container
      $tweetInput.val(""); // Clear the input field
    } else {
      alert("Please enter both username and tweet message!");
    }
  });
    // Define the addTweet function to add new tweets to the data structure
  const addTweet = (newTweet) => {
    streams.users[newTweet.user].push(newTweet); // Add the tweet to the user’s tweets
    streams.home.push(newTweet); // Add the tweet to the home timeline
  };
     // Handle hover effect for usernames
     $tweetsDiv.on("mouseenter", ".username", function() {
      $(this).css("color", "red"); // Change text color to blue on hover
  });
  $tweetsDiv.on("mouseleave", ".username", function() {
      $(this).css("color", "blue"); // Revert text color to default on hover out
  });
  $createButton.on("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const createUser = $createNewUser.val().trim();
    if (createUser) {
      if (!streams.users[createUser]) {
        streams.users[createUser] = []; // Add the new user to the data structure
        alert(`User ${createUser} was created successfully!`);
      } else {
        alert(`User ${createUser} already exists!`);
      }
    } else {
      alert(`Please enter a valid username`);
    }
  })

$body.prepend("<h1> The Amazing Twiddler </h1>")
$("h1").addClass("Amazing")
//$('section').css("background","yellow");
// syntax for adding css for using class
$('.' + "Amazing" ).css("background","green")
$('.' + "Amazing" ).css("color","white")
$("#" + "marcus").css("float", "right")
$("#" + "marcus").css("background-color", "#c36b00", "color", "white")
$("#" + "marcus").css("color", "white")
$("#" + "new-tweet").css("background", "#EDD012")

});






