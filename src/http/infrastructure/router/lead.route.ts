import express, { Router } from "express";
import container from "../../../ioc";
import LeadCtrl from "../controller/lead.ctrl";

const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadCtrl = container.get("lead.ctrl");
router.post("/", leadCtrl.sendCtrl);

export { router };
