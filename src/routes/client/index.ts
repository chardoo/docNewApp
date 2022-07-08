import express from 'express';
import clientController from '../../controllers/client/user_controller';
import authMiddleware from '../../middlewares/authorization_middleware';
import validateRequestWare from '../../middlewares/validate_request_middleware';
import loginValidator from '../../validators/loginValidator'
import assetMiddleWare from '../../middlewares/media_asset_middleware'

const clientRouter =  express.Router();
clientRouter.post('/login', validateRequestWare, clientController.clientLogIn)
clientRouter.get("/getAllFoodAndRestaurants", clientController.getallFoodsAndCategories)
// clientRouter.post('/createClient', assetMiddleWare.localMediaAssetMiddleware(), clientController.createClientAccount )
// clientRouter.post('/searchEventImages',  clientController.searchEventImage )

// clientRouter.post('/payForImages',  clientController.PayForImages);


// bankingAgentRouter.post('/createBorrower',authMiddleware.authorizationRequestWare(), bankingAgentController.createBorrower )

// bankingAgentRouter.get('/agentInformations/:agentId',authMiddleware.authorizationRequestWare(), bankingAgentController.getAllAgentInformationbyId)

// bankingAgentRouter.post('/borrowermakePayment',authMiddleware.authorizationRequestWare(), bankingAgentController.borrowerMakePayment )
// bankingAgentRouter.get('/allBorrowersByAgentId/:agentId',authMiddleware.authorizationRequestWare(), bankingAgentController.getborrowersByAgentId)  
// bankingAgentRouter.get('/borrower/:borrowerId',authMiddleware.authorizationRequestWare(), bankingAgentController.getBorrowerbyId)
// bankingAgentRouter.post('/login',loginValidator, validateRequestWare, bankingAgentController.agentLogin)
// bankingAgentRouter.post('/changePassword', authMiddleware.authorizationRequestWare(), bankingAgentController.changePassword)
// bankingAgentRouter.post('/allocateMoneytoreceiver', authMiddleware.authorizationRequestWare(), bankingAgentController.allocateMoneyToexistingReciever)

// bankingAgentRouter.post('/agentPays',  authMiddleware.authorizationRequestWare(),  bankingAgentController.agentPayments)
// bankingAgentRouter.post('/getAgentTodayPayments', authMiddleware.authorizationRequestWare(), bankingAgentController.agentPaymentsForDay)
// bankingAgentRouter.post('/getPaymentsWithinRange', authMiddleware.authorizationRequestWare(), bankingAgentController.agentPaymentsForWeek)
 export default clientRouter;
