import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  page : {};

  subPage = {
    name:"Marine",
    Elements:[
      {type:"text", header:"Hi", source:"hello there"},

    ]
  }
  constructor() { }

  getPage(type: string) : any{
    if(type == "market"){
      return {
        name:"Marine",
        secondary_title:"Specialists in CCTV systems for the Marine Industry (Onshore and Offshore)",
        lower_title:"Organisations operating in the Marine and Oil & Gas sectors require fully comprehensive and long-lasting CCTV systems that can optimise safety and security whilst boosting productivity. Our wide range of specialised and certified marine and explosionproof cameras provides the highest degree of protection.",
        banner_image:"marketsHero.jpg",
        // thumbnail_image:{type:String,required:false},
        // bonus_cards: {type:Array,required:true},
        pages:[
          {
            id:"001",
            name:"Marine"
          },
          {
            id:"002",
            name:"Marine Onshore"
          },
          {
            id:"003",
            name:"Marine Offshore"
          },
          {
            id:"003",
            name:"Marine Naval"
          },
        ]
  
      }
    }

    if(type == "service"){
      return {
        name:"System Design",
        secondary_title:"",
        lower_title:"We can provide you with design support, from a risk assessment survey, security plan and drawings, with recommendations for suitable equipment – to a comprehensive security design package including CAD drawings, schematics, equipment and cable schedules and tender statement of requirements.",
        banner_image:"serviceHero.png",
        // thumbnail_image:{type:String,required:false},
        // bonus_cards: {type:Array,required:true},
        pages:[
          {
            id:"003",
            name:"System Designs"
          },
          {
            id:"004",
            name:"Build & Test"
          },  
          {
            id:"005",
            name:"Installations & Commissioning"
          }
        ]
  
      }
    }
    if(type == "recourse"){
      return {
        name:"Resources",
        secondary_title:"News & Useful Assets",
        lower_title:"",
        banner_image:"recourseHero.png",
        // thumbnail_image:{type:String,required:false},
        // bonus_cards: {type:Array,required:true},
        pages:[
          {
            id:"003",
            name:"Lens field of view calculator"
          },
          {
            id:"004",
            name:"Recording hard disc calculator"
          },  
          {
            id:"005",
            name:"data protection compliant CCTV sign"
          }
        ]
  
      }
    }
  }
}
