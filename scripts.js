var CHANNELS_URL = "https://wind-bow.glitch.me/twitch-api/channels/";
var USERS_URL = "https://wind-bow.glitch.me/twitch-api/users/";
var STREAMS_URL = "https://wind-bow.glitch.me/twitch-api/streams/";

var USERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function () {
    loadTwitchData();
});

function loadTwitchData() {

    USERS.forEach(function (user) {
        $.getJSON(STREAMS_URL + user, function (json) {
            var stream = json.stream;
            var chanelStatus = "";
            var chanelUrl;
            var chanelLogo;
            var game;
            var displayName;
            if (stream) {
                chanelStatus = stream.channel.status;
                chanelUrl = stream.channel.url;
                chanelLogo = stream.channel.logo;
                displayName = stream.channel.game;
                game = stream.channel.game;
                var template = ONLINE_CARD_TEMPLATE.replace("{url}", "https://www.twitch.tv/" + user);
                template = template.replace("{displayName}", displayName);
                template = template.replace("{description}", game + ": " + chanelStatus);
                $("#result").append(template);

            } else {

                $.getJSON(USERS_URL + user, function (json) {
                    var displayName = json.display_name;
                    var logo = json.logo;
                    var template = OFFLINE_CARD_TEMPLATE.replace("{url}", "https://www.twitch.tv/" + user);
                    template = template.replace("{displayName}", displayName);
                    $("#result").append(template);
                });

            }

        });

    });
}


var ONLINE_CARD_TEMPLATE = '<div class="card"> \
  <div class="card-block"> \
   <h4 class="card-title"><a href="{url}">{displayName}</a></h4>(online) \
    {description} \
  </div> \
</div>';

var OFFLINE_CARD_TEMPLATE = '<div class="card"> \
  <div class="card-block"> \
   <h4 class="card-title"><a href="{url}">{displayName}</a></h4>(offline) \
  </div> \
</div>';
