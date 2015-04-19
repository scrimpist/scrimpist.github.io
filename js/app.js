'use strict';
var lock = null;
$(document).ready(function() {
   lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_NAMESPACE');
});
var userProfile;

$('.btn-login').click(function(e) {
  e.preventDefault();
  lock.show(function(err, profile, token) {
    if (err) {
      // Error callback
      alert('There was an error');
    } else {
      // Success calback

      // Save the JWT token.
      localStorage.setItem('userToken', token);

      // Save the profile
      userProfile = profile;
      console.log(userProfile);
    }
  });
});