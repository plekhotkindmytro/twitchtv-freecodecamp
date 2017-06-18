var CHANNELS_URL = "https://wind-bow.glitch.me/twitch-api/channels/";
var USERS_URL = "https://wind-bow.glitch.me/twitch-api/users/";
var STREAMS_URL = "https://wind-bow.glitch.me/twitch-api/streams/";

var USERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function () {
    loadTwitchData();

    $(".btn-outline-primary").on("click", function () {
        $(".btn-outline-primary").removeClass("active");
        $(this).addClass("active");
        var id = $(this).attr("id");
        if (id === "all") {
            $(".online,.offline").removeClass("filtered");
        } else if (id === "online") {
            $(".online").removeClass("filtered");
            $(".offline").addClass("filtered");
        } else if (id === "offline") {
            $(".offline").removeClass("filtered");
            $(".online").addClass("filtered");
        }
    });

    $("#search-input").on("keyup change", function () {
        var value = $(this).val();

        $(".online,.offline").each(function (i, e) {
            if (value && $(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                $(this).removeClass("not-found");
            } else if (!value) {
                $(this).removeClass("not-found");
            } else {
                $(this).addClass("not-found");
            }
        });
    });
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
                displayName = stream.channel.display_name;
                game = stream.channel.game;
                var template = ONLINE_CARD_TEMPLATE.replace("{url}", "https://www.twitch.tv/" + user);
                template = template.replace("{displayName}", displayName);
                template = template.replace("{logo}", chanelLogo);
                template = template.replace("{description}", game + ": " + chanelStatus);
                $("#result").append(template);

            } else {
                $.getJSON(USERS_URL + user, function (json) {
                    var displayName = json.display_name;
                    var logo = json.logo;
                    var template = OFFLINE_CARD_TEMPLATE.replace("{url}", "https://www.twitch.tv/" + user);
                    template = template.replace("{displayName}", displayName);
                    template = template.replace("{logo}", logo ? logo : "no-logo.png");
                    $("#result").append(template);
                });

            }

        });

    });
}
var ONLINE_CARD_TEMPLATE = '<a href="{url}" class="list-group-item list-group-item-action flex-column align-items-start online"> \
    <div class="d-flex w-100 justify-content-between"> \
        <img src="{logo}" width="50" height="50"> \
        <h5 class="mb-1">{displayName}</h5> \
            <i class="fa fa-check" aria-hidden="true"></i>\
    </div> \
    <p class="mb-1">{description}</p> \
</a>';

var OFFLINE_CARD_TEMPLATE = '<a href="{url}" class="list-group-item list-group-item-action flex-column align-items-start offline"> \
    <div class="d-flex w-100 justify-content-between"> \
        <img src="{logo}" width="50" height="50"> \
        <h5 class="mb-1">{displayName}</h5> \
            <i class="fa fa-exclamation" aria-hidden="true"></i>\
    </div> \
</a>';
