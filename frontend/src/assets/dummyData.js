import img1 from "./images/tutorial1.png";
import img2 from "./images/tutorial2.png";
import img3 from "./images/tutorial3.png";

export const pfp =
  "https://s3-alpha-sig.figma.com/img/63c4/be83/222c85e6c852819bc5d4b24a87a87fb6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jjWiwnjHXcnlXxoAXpCkfw25Npp5ezpJr3hI3~h2Qh8tiQ6gUXcRQMYkGd9TYRgqJBTGXHfSQeMpGPPLfyLa18jPPYnxMdHSMEfolb-20uLTUAzrWMhE47r1rp9zaZJG3OtqzjThCCh7MgkCvgRfiyq7YSQ1dTuEfnVcHaC1NunUR00A3ZjEDqig03EboaEhQdCIMBlzdjWQBiyxWRCFmeq8ah7c7aIOmfV8nodAl6Q6GaIL-Pi1qkxoROLoWhqn4DOsTKIorQvn8pxziiQZrpnRGMp2fOclkQM8WvThCiVqJU~zyBepUc5PKuDwhwzdfz2ZRt8t8mSMsprMQwQATA__";

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
  {
    id: 2,
    file: "Sigma 100-300mm f/4 APO EX DG HSM + Kenko Teleplus PRO 300 AF 1.4× DGX ext.",
    price: "10",
  },
  { id: 3, file: "XF 27mm f/2.8 R WR", price: "free" },
  { id: 4, file: "Canon EF 50mm f/1.8 STM", price: "free" },
  { id: 5, file: "Nikon AF-S NIKKOR 24-70mm f/2.8E ED VR", price: "10" },
  { id: 6, file: "Sony FE 24-105mm f/4 G OSS", price: "10" },
  { id: 7, file: "Tamron SP 70-200mm f/2.8 Di VC USD G2", price: "free" },
  {
    id: 8,
    file: "Olympus M.Zuiko Digital ED 12-40mm f/2.8 PRO",
    price: "free",
  },
  { id: 9, file: "Leica Summicron-M 50mm f/2", price: "free" },
  { id: 10, file: "Fujifilm XF 16-55mm f/2.8 R LM WR", price: "10" },
  {
    id: 11,
    file: "Panasonic Lumix G X Vario 12-35mm f/2.8 II ASPH",
    price: "free",
  },
  { id: 12, file: "Sigma 14-24mm f/2.8 DG HSM Art", price: "free" },
  { id: 13, file: "Voigtländer Nokton 40mm f/1.2 Aspherical", price: "free" },
  { id: 14, file: "Pentax DA 18-135mm f/3.5-5.6 ED AL", price: "free" },
  { id: 15, file: "Zeiss Otus 28mm f/1.4", price: "free" },
];

export const questions = {
  techSpecs: [
    {
      id: 1,
      title:
        "What are the technical specifications and content of distortion grids packs?",
      text: 'The distortion grids included in each set are usually saved in "jpeg” file format since it gives all required functionality and it is more lightweight due to compression. All packs also contain LDPK node for Nuke, lens preset for 3DEqualizer and .3de project.',
    },

    {
      id: 2,
      title: "What is the resolution of the distortion grids?",
      text: "The distortion grids that we provide are available in a high-res. The actual size may differ depending on camera and lens. Before the upload to the database we ensure that all assets gives users the best possible quality for their projects.",
    },

    {
      id: 3,
      title: "What are the minimum and maximum file sizes?",
      text: 'There is no minimum file size since presets could be very lightweight. High-quality distortion grids in "jpeg” format usually weight 3-4MB minimum. The maximum file size for uploaded assets is set at 1024MB, because we encourage you to upload RAW files, so we could check and prepare assets for the database.',
    },

    {
      id: 4,
      title:
        "Are there any specific technical guidelines for creating the distortion grids?",
      text: 'Yes, there is a "Guide” page on our website that provides detailed instructions on how to shoot distortion grids. We also have guides and tutorials on how to prepare and create ready-to-use distortion grids. We highly recommend following these guidelines to ensure the best results.',
    },
    {
      id: 5,
      title:
        'Do you support customization of distortion grids to meet specific requirements?',
      text: 'Yes, you can customize all distortion grids with provided LDPK node and lens preset for Nuke, as well as with provided 3DEqualizer project. We believe it give you maximum flexibility in use, which is impossible to achieve, for example, with STMaps.'
    },
  ],

  pricing: [
    {
      id: 1,
      title: 'How do you determine the price of the assets?',
      text: 'The price depends on the type of the asset. If you purchase the whole pack, it will be cheaper than the cost of all separate grids included in it. However, if you need to purchase a specific grid, you can choose that option to pay only for what you need. And there is also a separate grid, shot on full sensor. Separate distortion grid cost 5$, and full-sensor grid – 15$.'
    },

    {
      id: 2,
      title: "Do you provide any discounts?",
      text: 'Yes, we offer a 15% discount when you upload assets to the Distortion Grids Database. After your assets are approved, we will send you a promo code on your email. You could apply it at the checkout.',
    },

    {
      id: 3,
      title: "Do you offer any subscription plans?",
      text: "We do not have any subscription plans yet, because usually you don't need to download multiple grids in a short-term period. However, if you feel like you will be purchasing a lot of different assets each month, please contact us, so we could find the best solution for you.",
    },
  ],

  payment: [
    {
      id: 1,
      title: "What payment methods are accepted on your website?",
      text: "We accept all major credit cards, PayPal, Apple Pay and Google Pay for payment. These options were chosen for their worldwide acceptance and security features."
    },

    {
      id: 2,
      title: "Is the purchase secure?",
      text: "Yes, of course, all purchases made on our website are secure. We use Paddle, our merchant of record, for all transactions.",
    },

    {
      id: 3,
      title: "Do you store payment information for future purchases?",
      text: "No, we do not store your payment information. However, you can save your payment details during checkout with Paddle, or you can save and store this information in your own browser.",
    },

    {
      id: 4,
      title: "Are there any additional fees or taxes applied to the purchase?",
      text: "No, the price you see is the price you pay. All taxes already included in price, and we don't charge any additional fees. We believe in transparency in pricing."},
  ],

  howToUse: [
    {
      id: 1,
      title: "How can I find the assets I need?",
      text: "You can find the assets by using the category-based search on the Main page or “Full library” page. You can choose desired camera model and available for this camera lens model, or simply start typing the model name related to the assets you're looking for."
    },

    {
      id: 2,
      title: "How can I upload my assets to the website?",
      text: "You can upload your assets by using special form on the “Affiliate program” page. Fill in required fields and ensure your files meet the upload requirements.",
    },

    {
      id: 3,
      title: "Are there any guides or tutorials available for using the assets?",
      text: `Yes, we have a variety of tutorials available in the "Tutorials" section of our website. You can find the complete guide on how to shoot distortion grids on the "Guide” page. All pages with certain distortion grids set also contain general info on how to install and use assets after download. If you still have any questions left, don't hesitate to contact us via email.`,
    },

    {
      id: 4,
      title: "How can I get technical support if I encounter issues while using the website?",
      text: "If you encounter any issues while using the website or purchased assets, you can contact our support team via email. We strive to respond promptly to all queries.",
    },
    
  ],

  personalAccount: [
    {
      id: 1,
      title: "How do I create a personal account on your website?",
      text: `Press "Sign In” button at the top right corner of the website, then choose the option "Register". You can register an account by providing your email and setting the password, or you can use one of the options with fast Sign In via your Facebook, Google, Apple or Microsoft account.`
    },

    {
      id: 2,
      title: `How can I edit the information in my personal account?`,
      text: `You can edit your personal information by navigating to the "Profile" section. Click on your profile picture and proceed to your profile page. Here you will find options to update your profile details.`,
    },

    {
      id: 3,
      title:
        "How can I recover the password of my account?",
      text: `If you've forgotten your password, you can recover it by clicking on the "Forgot Password" link on the "Sign In” screen. Follow the instructions to reset your password.`,
    },

    {
      id: 4,
      title:
        "Can I track my purchase history?",
      text: `Yes, you can track your purchase history in the "My Purchases" section on your profile page. This allows you to review your past purchases and download them any time.`,
    },

    {
      id: 5,
      title:
        "What are the benefits of having personal account?",
      text: `Only. registered users can purchase and download distortion grids. You should be a registered user also to upload your assets to the website. All contributors are listed on the "Top contributors” page. Your profile will be publicly displayed, as well as all your contact info, portfolio or website links, social media links and description that you will provide.`,
    },

    {
      id: 6,
      title:
        "How can I deactivate or delete my account?",
      text: `To deactivate or delete your account, please contact our team via email. Since our goal is to build the most complete and comprehensive database of distortion grids for the entire community, we want to make sure that all useful data will be saved.`,
    },
  ],

  license: [
    {
      id: 1,
      title:
        "What type of license applies to the assets on your website?",
      text: "A standard one-user license applies to all our assets. This means you can use the assets on your own device(s) multiple times for multiple projects without incurring additional fees."
    },

    {
      id: 2,
      title:
        "Can I use the assets for commercial purposes?",
      text: "Yes, all our assets can be used for both personal and commercial purposes. This allows for great flexibility in how you choose to use our resources.",
    },

    {
      id: 3,
      title:
        "Can I share the assets with my team?",
      text: "No, you may not share the assets within your team or organization. We understand that collaboration is key in creative projects, so if you need a team/studio license, please contact us by email provided on the website. We are happy to offer a tailored pricing plan for both small and large team of professionals.",
    },

    {
      id: 4,
      title:
        "Are there any restrictions on the use of the assets?",
      text: "Yes, while we allow wide usage of our assets, they cannot be resold or redistributed. We want to ensure that our studio and artists who create these assets retain full intellectual property rights for any content on the website.",
    },
  ],
};
