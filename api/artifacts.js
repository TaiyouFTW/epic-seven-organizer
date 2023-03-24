const fetch = require("node-fetch");

module.exports = async (req, res) => {
    let headersList = {
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'gc_currentPage': 0,
        'gc_isPaging': 'N',
        'gc_lang': 'en',
        'gc_world': 'world_global',
        'gc_artifact': 'ef320'
    }

    let response = await fetch("https://epic7.smilegatemegaport.com/guide/wearingStatus/getArtifactList", {
        method: "POST",
        headers: headersList
    });

    let data = await response.json();
    res.status(200).json(data);
};