"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producerController_1 = __importDefault(require("../controllers/producerController"));
const promPortController_1 = __importDefault(require("../controllers/promPortController"));
const router = express_1.default.Router();
router.get('/total-request-count', promPortController_1.default.getSavedPortFromElectronStore, producerController_1.default.totalProducerRequests, (req, res) => {
    return res.status(200).json(res.locals.totalProducerRequests); //also contains producer requests for EACH topic
});
router.get('/total-failed-count', promPortController_1.default.getSavedPortFromElectronStore, producerController_1.default.totalFailedProducerRequests, (req, res) => {
    return res.status(200).json(res.locals.totalFailedProducerRequests);
});
exports.default = router;
//# sourceMappingURL=producerRouter.js.map