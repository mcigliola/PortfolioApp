import LoginImg from './assets/images/Login.png';
import InventoryImg from './assets/images/Inventory.png';
import ItemDetailImg from './assets/images/ItemDetail.png';
import ExpressImg from './assets/images/Express Frontend.png';
import AngularImg from './assets/images/Angular Frontend.png';
import ProjectSceneImg from './assets/images/ProjectScene.jpg';
import OpenGLSceneImg from './assets/images/openglScene.png';

const projectsData = [
    {
        id: 1,
        title: 'Asset Ally',
        brief: 'Mobile Inventory App',
        details: 'AssetAlly is an Android application designed to simplify inventory management by providing users with essential tools to track, manage, and receive alerts for their assets. The app is ideal for small businesses or personal use, offering a straightforward interface and essential features to keep your inventory organized.',
        link: 'https://github.com/mcigliola/Asset_Ally',
        texture: './assets/textures/moon1.jpg',
        images: [LoginImg, InventoryImg, ItemDetailImg], 
    },
    {
        id: 2,
        title: 'Travlr Getaways Web App',
        brief: 'Full stack - MEAN',
        details: 'This project is a full-stack web application. The customer-facing side uses Express with Handlebars for server-side rendering. The admin-facing interface, built as an Angular single-page application (SPA), delivers a seamless, interactive user experience. On the backend, MongoDB powers the application with its flexible, scalable NoSQL database.',
        link: 'https://github.com/mcigliola/Travlr-Getaways',
        texture: './assets/textures/moon2.jpg',
        images: [ExpressImg, AngularImg],
    },
    {
        id: 3,
        title: 'OpenGL 3D Rendering',
        brief: 'An interactive 3D scene.',
        details: 'This project is a 3D scene created using OpenGL, designed to showcase fundamental rendering techniques, custom geometry calculations, and user-controlled navigation. The scene consists of obelisk-like crystals and a small jar arranged on a tiled base, demonstrating the modular and scalable design of custom shapes built without external shape-rendering libraries.',
        link: 'https://github.com/mcigliola/3D_Graphics',
        texture: './assets/textures/moon3.jpg',
        images: [ProjectSceneImg, OpenGLSceneImg],
    },
    {
        id: 4,
        title: 'Portfolio Web App',
        brief: '',
        details: `This website, developed with React, integrates 3D graphics using the Fiber and Three libraries for an immersive user experience. Ongoing improvements I am working to implement include better responsiveness for different screen sizes, animated transitions between screens, and additional interactive components.`,
        link: 'https://github.com/mcigliola/PortfolioApp',
        texture: './assets/textures/moon3.jpg',
        images: [],
    },
];

export default projectsData;
