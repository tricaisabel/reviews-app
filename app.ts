import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import { setupMongoDB } from "./database";
import cookieParser from "cookie-parser";
import companyRoutes from "./routes/company.routes";
import authRoutes from "./routes/user.routes";
import authMiddleware from "./middleware/auth.middleware";
import cors from "cors";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

setupMongoDB();

app.use("/companies", authMiddleware, companyRoutes);
app.use("/auth", authRoutes);

export default app;
