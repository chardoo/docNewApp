import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../../errors/bad-request-error';
import prismaClient from '../../extensions/prisma_ext';
import accessTokenUtils from '../../utils/usersAccessToken';
import generateJwtToken from '../../utils/jwt_Utils';
import { Prisma } from '.prisma/client';
import constants from '../../constants/constants';
import { body } from 'express-validator';
// import moment from 'moment';
import QueueExt from '../../extensions/queues_ext';
import { Decimal } from '@prisma/client/runtime';
// import Uplaods from "../../helpers/cloudinary"
//import fs from 'fs'
// let today = moment().format("MMMM Do YYYY");


const createMerchant = async(req:Request, res:Response, next:NextFunction) =>{
  try{
         const { password, email, name, image, contact, startTime, closeTime, location } = req.body; 
         const { accessToken, hashedToken } = await accessTokenUtils.generateUserAccessToken(password);
         const CreateUser = await prismaClient.merchant.create({
           data:{
             name, 
             email,
             password: hashedToken,
             contact,
             location,
             startTime,
             closeTime,
             image,
             role:"merchant",
             status:"active"
           },
           select:{
             name:true,
             email:true,
            
           }
          });
      
         if (!CreateUser) {
           throw new BadRequestError('Registration Failed!');
         }
        
         return res.status(200).json({message:"merchant succefully created " });
 
     } 
     catch (error) {
         return next(error);
       }
 }
const merchantLogin = async(req:Request, res:Response, next:NextFunction) =>{
  try{
         const { password, email } = req.body;   
         const adminExists = await prismaClient.merchant.findFirst({
           where: {
             email,
             AND: {
               role: 'merchant',
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
         });
 
     } 
     catch (error) {
         return next(error);
       }
 }
 
 const addFood = async(req:Request, res:Response, next:NextFunction) =>{
  try{
     const {merchantId, price, Images, quantity, description, name } = req.body;

     console.log("ehehelrlrre");
     console.log(quantity);
     const Food =  await prismaClient.good.create({
       data:{
         merchantId,
         Images,
         price,
         quantity,
         description,
         name
       }
     })
    if(!Food){
      throw new BadRequestError('food now created please');
    }

  return  res.status(201).json(Food);
  }
  catch(error){
    return next(error);
  }
}

const editFood = async(req:Request, res:Response, next:NextFunction) =>{
  try{
     const {merchantId, price, Images, description, name, foodId } = req.body;
     const Food =  await prismaClient.good.update({
      where:{
        id: foodId
      },
      data:{
         merchantId,
         price,
         Images,
         description,
         name
       }
     })
    if(!Food){
      throw new BadRequestError('food now created please');
    }

  return  res.status(201).json(Food);
  }
  catch(error){
    return next(error);
  }
}



export default{
  createMerchant,
  merchantLogin,
  addFood,
  editFood,
 
}