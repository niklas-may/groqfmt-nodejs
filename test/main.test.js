import { test, expect } from "vitest";
import { format } from "../index.js";
import fs from "fs";

test("Should format", async () => {
  const result = format(queryIn);
  expect(result).toEqual(reference);
});

const reference = fs.readFileSync("./test/reference.txt", "utf-8");

const queryIn = `
*[_type == 'page'] {
    mainSection {
      pageTitle,
      
gallery[] {
  _key,
  caption,
   
media {
  _type,
  type,
  type == 'image' => {
    'image': image.asset->{
  url,
    'lqip': metadata.lqip,
    'ratio': metadata.dimensions.aspectRatio
  },
  crop,
  hotspot
  },
  type == 'video' => {
    'player': player.asset->{
      'playbackId': playbackId,
      'ratio': data.aspect_ratio,
      thumbTime
  
    },
    'mood': mood.asset->{
    'playbackId': playbackId,
    'ratio': data.aspect_ratio
    }
  }
}
,
},
    },
    
  'seoTitle': coalesce(seoTitle[$lang], seoTitle.en),
  'seoDescription': coalesce(seoDescription[$lang], seoDescription.en),
   seoKeywords
,
    
callToActions {
    title,
    url
}
,
  }




`;
