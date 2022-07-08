 import express from 'express';
 import merchantController from '../../controllers/merchant/merchant_Controller';
 import authMiddleware from '../../middlewares/authorization_middleware';
 import validateRequestWare from '../../middlewares/validate_request_middleware';
 import loginValidator from '../../validators/loginValidator'
 import assetMiddleWare from '../../middlewares/media_asset_middleware'
 const merchantRouter =  express.Router();
 merchantRouter.post('/registerMerchant', validateRequestWare, merchantController.createMerchant);
 merchantRouter.post('/login', loginValidator,validateRequestWare, merchantController.merchantLogin);
 merchantRouter.post('/addFoodByMerchant', merchantController.addFood);
 
// photographerRouter.post('/createphtographer', photographerController.createPhotographerAccount )
// photographerRouter.post('/uploadImages', assetMiddleWare.localMediaAssetMiddleware(), photographerController.uploadLoadingEventImage )
// photographerRouter.post('/eventFolders', photographerController.getEventFolders )
// photographerRouter.post('/images/:eventName', photographerController.getAllImagesbyEventName )
// photographerRouter.post('/deleteImages/:eventName', photographerController.deleteAllEventImage )
// photographerRouter.post('/deleteImage/:id', photographerController.deleteEventImage )
// photographerRouter.post('/giveMoneyToAgent',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.giveMoneyToAgent )
// photographerRouter.get('/allAgent',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.getAllAgent )  
// photographerRouter.get('/agentInformations/:agentId', authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.getAllAgentInformationbyId)
// photographerRouter.get('/dashboard',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.getdashboardData)
// photographerRouter.get('/defaulter',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.defaluter)
// photographerRouter.post('/updatedisbursement',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.editdisbursement)
// photographerRouter.delete('/deletedisbursement/:disburseId',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.deletebursement)

// bankingAdminRouter.get('/getTodayPayments',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.agentPaymentsForDay)

// bankingAdminRouter.get('/agentPaymentsForRecieversForToday',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.agentPaymentsForRecieversForToday)
// bankingAdminRouter.post('/searchagentPaymentsForRecieversForToday',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.searchAgentPaymentsForRecieversForToday)

// bankingAdminRouter.post('/getPaymentsWithinRange',authMiddleware.authorizationRequestWare(), authMiddleware.adminAuthorizationRequestWare, bankingAdminController.agentPaymentsForWeek)
 export default merchantRouter;