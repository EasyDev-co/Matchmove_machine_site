import img1 from "./images/tutorial1.png"
import img2 from "./images/tutorial2.png"
import img3 from "./images/tutorial3.png"

export const pfp ="https://s3-alpha-sig.figma.com/img/63c4/be83/222c85e6c852819bc5d4b24a87a87fb6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jjWiwnjHXcnlXxoAXpCkfw25Npp5ezpJr3hI3~h2Qh8tiQ6gUXcRQMYkGd9TYRgqJBTGXHfSQeMpGPPLfyLa18jPPYnxMdHSMEfolb-20uLTUAzrWMhE47r1rp9zaZJG3OtqzjThCCh7MgkCvgRfiyq7YSQ1dTuEfnVcHaC1NunUR00A3ZjEDqig03EboaEhQdCIMBlzdjWQBiyxWRCFmeq8ah7c7aIOmfV8nodAl6Q6GaIL-Pi1qkxoROLoWhqn4DOsTKIorQvn8pxziiQZrpnRGMp2fOclkQM8WvThCiVqJU~zyBepUc5PKuDwhwzdfz2ZRt8t8mSMsprMQwQATA__"

export const tutorialPreview = [
  {
    id: 1,
    title: "Multi-Camera Geometry Tracking",
    text: "Welcome to an in-depth exploration of Multi-Camera Geometry Tracking Technology. In this video, we'll unlock the mysteries behind this cutting-edge innovation and its incredible applications.",
    image: img1,
  },

  {
    id: 2,
    title: "Extract Focal Length",
    text: "The script allows you to copy the Focal Length curve from the EXR metadata directly to the Curve Editor, as well as to the lens connected to the camera (if the focal length does not change and the curve is not needed, you can just get it from the EXR and write it to Lens).",
    image: img2,
  },

  {
    id: 3,
    title: "OpenEXR Metadata Reader",
    text: "The script allows you to view the metadata of EXR files inside the 3DEqualizer",
    image: img3,
  },
];

export const files = [
  { id: 1, file: "Distortion grid for 100mm f/4.5 0.3m", price: "free" },
  { id: 2, file: "Sigma 100-300mm f/4 APO EX DG HSM + Kenko Teleplus PRO 300 AF 1.4× DGX ext.", price: "10" },
  { id: 3, file: "XF 27mm f/2.8 R WR", price: "free" },
  { id: 4, file: "Canon EF 50mm f/1.8 STM", price: "free" },
  { id: 5, file: "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR", price: "10" },
  { id: 6, file: "Sony FE 24-105mm f/4 G OSS", price: "10" },
  { id: 7, file: "Tamron SP 70-200mm f/2.8 Di VC USD G2", price: "free" },
  { id: 8, file: "Olympus M.Zuiko Digital ED 12-40mm f/2.8 PRO", price: "free" },
  { id: 9, file: "Leica Summicron-M 50mm f/2", price: "free" },
  { id: 10, file: "Fujifilm XF 16-55mm f/2.8 R LM WR", price: "10" },
  { id: 11, file: "Panasonic Lumix G X Vario 12-35mm f/2.8 II ASPH", price: "free" },
  { id: 12, file: "Sigma 14-24mm f/2.8 DG HSM Art", price: "free" },
  { id: 13, file: "Voigtländer Nokton 40mm f/1.2 Aspherical", price: "free" },
  { id: 14, file: "Pentax DA 18-135mm f/3.5-5.6 ED AL", price: "free" },
  { id: 15, file: "Zeiss Otus 28mm f/1.4", price: "free" }
];


export 
const questions = {
  techSpecs: [
    {
      id: 1,
      title: "What are the technical specifications of the grid sets?",
      text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
    },

    {   id: 2,
        title: "What technical standards do your grid sets adhere to?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },

    {   id: 3,
        title: "Do you support customization of grid sets to meet specific requirements of a film project?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
  ],

  pricing:[
    {
        id: 1,
        title: "What are the prices of your grid sets?",
        text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
      },
  
      {   id: 2,
          title: "Do you offer discounts or special offers for regular customers?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  
      {   id: 3,
          title: "Is the cost of shipping included in the price of the grid sets?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  ],

  payment:[
    {
        id: 1,
        title: "What payment methods do you accept?",
        text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
      },
  
      {   id: 2,
          title: "Is it safe to make payments on your website?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  
      {   id: 3,
          title: "Can I request an invoice for my purchase?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  ],

  howToUse:[
    {
        id: 1,
        title: "How to Multi-Camera Geometry Tracking? ",
        text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
      },
  
      {   id: 2,
          title: "How to Extract Focal Length?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  
      {   id: 3,
          title: "How to OpenEXR Metadata Reader?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },

      {   id: 4,
        title: "How to Favorite's Project?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
    {   id: 5,
        title: "How to Extract Focus Distance?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
    {   id: 6,
        title: "How to Camera Database?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
    {   id: 7,
        title: "How to Change Setting for Points?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
    {   id: 8,
        title: "How to Export Camera and Lens?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
    {   id: 9,
        title: "How to Replace Ref Cams Paths?",
        text:"Lorem ipsum dolor sit amet consectetur."
    },
  ],

  personalAccount:[
    {
        id: 1,
        title: "How do I create a personal account on your website?",
        text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
      },
  
      {   id: 2,
          title: "What are the benefits of having a personal account?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  
      {   id: 3,
          title: "How do I update my personal information or preferences in my account?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  ],

  license:[
    {
        id: 1,
        title: "What type of license do I need to use your grid sets for film production?",
        text: "Lorem ipsum dolor sit amet consectetur. Habitant quam eget mollis dui justo duis euismod sit quis. Velit ullamcorper arcu sit pellentesque dictum morbi leo cursus tortor. Facilisi sem neque convallis ultriciesullamcorper metus. Senectus quam interdum dictum consecteturvestibulum.",
      },
  
      {   id: 2,
          title: "Can I use your grid sets in multiple film projects with a single license?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  
      {   id: 3,
          title: "Are there any restrictions on how I can use your grid sets in film production?",
          text:"Lorem ipsum dolor sit amet consectetur."
      },
  ],


};
