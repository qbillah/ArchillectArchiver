/*
    Written by Quazi Yasin Billah
    2019 ©
    https://yasin.design/
*/

//Request variables

var request = require("request");
var request2 = require("request");
var cheerio = require("cheerio");
var cheerio2 = require("cheerio");

//Url for Archillect
var url = "https://archillect.com/archive";

//Links to full resolution images from Archillect
var fullImgLink = [];

//Image Downloader (Node)
const download = require('image-downloader');

/*
    First request is to gather post links for all the archive thumbnails.
    Second request opens each individual post and downloads them into a given directory.
*/

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
                            dest: "" //Change this to whatever directory you want the images to be downloaded in
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

