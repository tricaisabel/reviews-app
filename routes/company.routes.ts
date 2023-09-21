import express, { Request, Response } from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  validateNewCompany,
} from "../controllers/company.controller";
import { uploadImage } from "../controllers/upload.controller";
import multer from "multer";
import reviewRoutes from "./review.routes";
import { Directory } from "../enums/directory.enum";
import { errorHandler } from "./errorHandler";

const companyRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

companyRouter.use("/:companyId/reviews", reviewRoutes);

companyRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await getAllCompanies();
    res.status(200).json({ companies });
  } catch (error) {
    errorHandler(error, res);
  }
});

companyRouter.get(
  "/:companyId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { companyId } = req.params;

      const company = await getCompanyById(companyId, false);
      res.status(200).json({ company });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);

companyRouter.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      await validateNewCompany(req.body.name);
      const url = await uploadImage(req.file, Directory.COMPANY_DIRECTORY);
      const newCompany = await createCompany({
        name: req.body.name,
        url,
      });
      res.status(201).json({ company: newCompany });
    } catch (error) {
      errorHandler(error, res);
    }
  }
);

export default companyRouter;
