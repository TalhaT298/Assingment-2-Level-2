"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_route_1 = require("./modules/order/order.route");
const product_route_1 = require("./modules/product/product.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    const a = "Hello World";
    res.send(a);
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Founde",
    });
});
exports.default = app;
