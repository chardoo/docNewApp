import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../../errors/bad-request-error';
import prismaClient from '../../extensions/prisma_ext';
import accessTokenUtils from '../../utils/usersAccessToken';
import generateJwtToken from '../../utils/jwt_Utils';
import { Prisma } from '.prisma/client';
import constants from '../../constants/constants';
import { body } from 'express-validator';
import moment from 'moment';
//import redisConnect from '../../extensions/redis_ext';
import QueueExt from '../../extensions/queues_ext';
import { Decimal } from '@prisma/client/runtime';
// import Uplaods from "../../helpers/cloudinary";
// import payments from "../../helpers/payment";

import fs from 'fs'
 let today = moment().format("MMMM Do YYYY");
const clientLogIn = async(req:Request, res:Response, next:NextFunction) =>{
  try{
         const { password, email } = req.body;
         const adminExists = await prismaClient.client.findFirst({
           where: {
             email,
             AND: {
               role: 'user',
             },
           },
           select: {
             id: true, email: true, password: true, role: true, name: true, 
           },
         });
         console.log("kwame",adminExists);
         if (!adminExists) {
           throw new BadRequestError('Login Failed!');
         }
         const isValidPassword = await accessTokenUtils.checkAccessToken(String(password),
          String(adminExists.password));
         if (!isValidPassword) {
           throw new BadRequestError('Login Failed');
         }
         const { jwtToken, expiration } = generateJwtToken(adminExists.email, adminExists.id,
             adminExists.role.toString());
         return res.status(200).json({
           id: adminExists.id,
           email: adminExists.email,
           role: adminExists.role,
           name: adminExists.name,
           token: jwtToken,
           expiration,
           isValid: true
         });
 
     } 
     catch (error) {
         return next(error);
       }
 
 
 
 }

 const getallFoodsAndCategories = async(req:Request, res:Response, next:NextFunction) =>{
  try{
     const Restaurant =  await prismaClient.merchant.findMany({
       select:{
         name:true,
         id:true
       }
     });
     const Food =  await prismaClient.good.findMany({
      select:{
        id:true,
        name:true,
        description:true,
        Images:true,
        price:true,
        merchantId:true
      }
     })
    if(!Restaurant){
      throw new BadRequestError('food now created please');
    }
    const restaurantAndFood =  {
      restaurant:Restaurant,
      good: Food
    }
  return  res.status(201).json(restaurantAndFood);
  }
  catch(error){
    return next(error);
  }
}
 
//  const editProfile = async(req:Request, res:Response, next:NextFunction) =>{
//   try{
//      {email}


//   }
//   catch(error){
//     return next(error)
//   }


export default{

    clientLogIn,
    getallFoodsAndCategories
    
    

}