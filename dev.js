const format = require("./index.js");

const query = `
 

      *[_type == 'page'] {
        mainSection {
          pageTitle,
          
    gallery[] {
      _key,
      caption
       
    media {
      _type,
      type,
      type == "image" => {
        "image": image.asset->{
        url,
        'lqip': metadata.lqip,
        'ratio': metadata.dimensions.aspectRatio
      },
      crop,
      hotspot
      },
      type == "video" => {
        "player": player.asset->{
          "playbackId": playbackId,
          "ratio": data.aspect_ratio,
          thumbTime
      
        },
        "mood": mood.asset->{
        "playbackId": playbackId,
        "ratio": data.aspect_ratio
        }
      }
    }
    ,
    },
        },
        
      "seoTitle": coalesce(seoTitle[$lang], seoTitle.en),
      "seoDescription": coalesce(seoDescription[$lang], seoDescription.en),
       seoKeywords
    ,
        
    callToActions {
        title,
        url
    }
,
      }

    
`;

async function main() {
  try {
    const res = await format(query);
    console.log(res);
  } catch (e) {
    console.log(e.message);
  }
}

main()
