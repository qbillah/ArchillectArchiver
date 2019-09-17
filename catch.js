var request = require("request");
var request2 = require("request");
var cheerio = require("cheerio");
var cheerio2 = require("cheerio");

var url = "https://archillect.com/archive";

var fullImgLink = [];

const download = require('image-downloader');

request(url , function(err , response , html){
    if(!err){

        var $ = cheerio.load(html);
        var a = []
        $("a.post").attr('href' , (i, val) => {
            a.push(val);
        });

        for(link in a){
            var temp = "https://archillect.com" + a[link];
            request2(temp , function(err , response , html){
                if(!err){
                    var $ = cheerio2.load(html);
                    $("img").attr('src' , (i, val) => {
                        fullImgLink.push(val);
                    });
                    for(img in fullImgLink){
                        var temp = fullImgLink[img];
                        const options = {
                            url: temp,
                            dest: "/Users/qbillah/Downloads"
                        }
                        async function downloadIMG(){
                            try{
                                const {filename, image } = await download.image(options)
                                console.log(filename)
                            }catch(e){
                                console.error(e)
                            }
                        }
                        downloadIMG();
                    }
                }else{
                    console.log("Error -- Unknown");
                }
            });
        }
    }
});

