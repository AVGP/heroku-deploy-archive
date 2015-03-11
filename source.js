var request = require("request"),
    Promise = require("bluebird"),
    fs      = require("fs");

module.exports = {
    create: function(appName, authToken) {
        return new Promise(function(resolve, reject) {
            request.post("https://api.heroku.com/apps/" + appName + "/sources", {
                headers: {
                    "Accept": "application/vnd.heroku+json; version=3",
                    "Authorization": "Bearer " + authToken
                }
            }, function(err, res) {
                if(err) {
                    console.error("Error creating the source URLs: ", err);
                    reject(err);
                    return;
                }

                try {
                    var result = JSON.parse(res.body);
                } catch(e) {
                    console.error("Error parsing source URLs: ", err);
                    reject(err);
                    return;
                }

                if(!result.source_blob || !result.source_blob.get_url || !result.source_blob.put_url) {
                    console.error("Missing source URLs!", result);
                    reject(result);
                    return;
                }

                var source = {
                    uploadUrl:   result.source_blob.put_url,
                    downloadUrl: result.source_blob.get_url
                };

                console.log("Successfully obtained source URLs:", source);

                resolve(source);
            });
        });
    },
    upload: function(uploadUrl, archivePath) {
        var data = fs.readFileSync(archivePath);

        return new Promise(function(resolve, reject) {
            request.put(uploadUrl, {
                headers: {
                    "Content-Type": "",
                    "Content-Length": data.length
                },
                body: data
            }, function(err, res) {
                if(err) {
                    console.error("Error creating the source URLs: ", err);
                    reject(err);
                    return;
                }

                resolve(res.body);
            });
        });
    }
};