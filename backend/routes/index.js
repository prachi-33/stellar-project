import { Router } from "express";
import nftRouter from "./nft.js";

const router=Router();
router.use('/nft',nftRouter);
export default router;