import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from './models/product.model.js';
import userModel from './models/user.model.js';

dotenv.config();

const dummyProducts = [
    // Men's Products
    {
        title: "Classic Oxford Shirt",
        description: "A timeless Oxford shirt tailored for a perfect fit. Made from breathable cotton for all-day comfort.",
        category: "men",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "White", hex: "#FFFFFF" },
            { name: "Light Blue", hex: "#ADD8E6" }
        ],
        price: { amount: 1499, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1976&auto=format&fit=crop" }]
    },
    {
        title: "Tailored Wool Blend Blazer",
        description: "Elevate your evening wear with this structured wool blend blazer featuring a slim lapel.",
        category: "men",
        sizes: ["M", "L", "XL"],
        colors: [
            { name: "Navy Blue", hex: "#000080" },
            { name: "Charcoal", hex: "#36454F" }
        ],
        price: { amount: 4999, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" }]
    },
    {
        title: "Minimalist Linen Trousers",
        description: "Breathable and lightweight linen trousers, perfect for summer getaways and casual Fridays.",
        category: "men",
        sizes: ["30", "32", "34", "36"],
        colors: [
            { name: "Sand", hex: "#C2B280" },
            { name: "Olive", hex: "#808000" }
        ],
        price: { amount: 2499, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1994&auto=format&fit=crop" }]
    },

    // Women's Products
    {
        title: "Silk Slip Dress",
        description: "An elegant midi-length silk slip dress with delicate straps. Effortlessly chic.",
        category: "women",
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "Champagne", hex: "#F7E7CE" },
            { name: "Black", hex: "#000000" }
        ],
        price: { amount: 3999, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop" }]
    },
    {
        title: "Oversized Cashmere Sweater",
        description: "Luxuriously soft cashmere blend sweater in an oversized fit for maximum comfort and style.",
        category: "women",
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Camel", hex: "#C19A6B" },
            { name: "Ivory", hex: "#FFFFF0" }
        ],
        price: { amount: 5499, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop" }]
    },
    {
        title: "High-Waisted Wide Leg Jeans",
        description: "Premium denim wide-leg jeans with a flattering high waist. A versatile wardrobe staple.",
        category: "women",
        sizes: ["26", "28", "30", "32"],
        colors: [
            { name: "Vintage Wash", hex: "#7CB9E8" }
        ],
        price: { amount: 2899, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop" }]
    },

    // Kids Products
    {
        title: "Organic Cotton Graphic Tee",
        description: "Playful and comfortable. Made from 100% organic cotton that's gentle on the skin.",
        category: "kids",
        sizes: ["2Y", "4Y", "6Y", "8Y"],
        colors: [
            { name: "Mustard", hex: "#FFDB58" }
        ],
        price: { amount: 899, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=2000&auto=format&fit=crop" }]
    },
    {
        title: "Fleece Hooded Jacket",
        description: "Keep them warm and cozy during outdoor adventures with this soft fleece jacket.",
        category: "kids",
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        colors: [
            { name: "Red", hex: "#FF0000" },
            { name: "Navy", hex: "#000080" }
        ],
        price: { amount: 1599, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1974&auto=format&fit=crop" }]
    },

    // Accessories
    {
        title: "Italian Leather Tote Bag",
        description: "A spacious and sophisticated tote crafted from genuine Italian leather. Perfect for work or travel.",
        category: "accessories",
        sizes: ["One Size"],
        colors: [
            { name: "Tan", hex: "#D2B48C" },
            { name: "Black", hex: "#000000" }
        ],
        price: { amount: 6999, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop" }]
    },
    {
        title: "Minimalist Chronograph Watch",
        description: "Sleek and precise. Features a matte black dial and a premium mesh strap.",
        category: "accessories",
        sizes: ["One Size"],
        colors: [
            { name: "Silver", hex: "#C0C0C0" },
            { name: "Rose Gold", hex: "#B76E79" }
        ],
        price: { amount: 4599, currency: "INR" },
        image: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" }]
    }
];

const seedDatabase = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Successfully.");

        console.log("Clearing existing products...");
        await productModel.deleteMany({});
        
        let seller = await userModel.findOne({ email: "seller@vastraelite.com" });
        if (!seller) {
            console.log("Creating dummy seller account...");
            seller = new userModel({
                fullname: "Vastra Elite Studio",
                email: "seller@vastraelite.com",
                password: "password123",
                role: "seller"
            });
            await seller.save();
        }

        console.log("Seeding new products...");
        const productsWithSeller = dummyProducts.map(prod => ({
            ...prod,
            seller: seller._id
        }));

        await productModel.insertMany(productsWithSeller);

        console.log("Database seeded successfully with premium products!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

seedDatabase();
