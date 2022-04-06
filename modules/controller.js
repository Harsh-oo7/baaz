const {
    SERVERERROR,
    SUCCESSCODE,
    CLIENTSIDEERROR
} = require('../constants/common');
const Users = require('../Models/userModel');
const Activities = require('../models/userActivityModel');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
const uploadFile = require('../helper/uploadFile')

const controller = {};

controller.signup = async (req, res) => {
    try {
        const userName = req.body.username;
        const user = await Users.findOne({ username: userName });
        const userInfo = req.body;

        // if user already exist
        if (user) {
            res.status(CLIENTSIDEERROR.ALREADYEXISTCODE).json({
                errors: { message: "Username already exist." },
                status: false,
            });
        }
        else {
            const logo = req.body.logo;
            const fileName = req.body.fileName;
            const logoUrl = await uploadFile(logo, fileName);

            userInfo.logo = logoUrl;
            // console.log(logoUrl)
            let userData = new Users(userInfo);
            let createdUser = await userData.save();

            res.status(SUCCESSCODE.CREATED)
                .json({
                    message: "User registered successfully",
                    status: true,
                    user: createdUser
                });
        }


    } catch (error) {
        res.status(SERVERERROR.CODE).json({
            errors: { message: error.toString() },
            status: false,
        });
    }
}



controller.signin = async (req, res) => {
    try {
        const userName = req.body.username;
        const userPassword = req.body.password;

        const user = await Users.findOne({ username: userName, password: userPassword });

        // if user does not exist in database
        if (!user) {
            return res.status(CLIENTSIDEERROR.NOTFOUNDCODE)
                .json({
                    message: "Wrong Username or Password",
                    status: false,
                });
        }

        // await uploadFile('../modules/Add_new_movie.png')

        // creating JWT token
        const token = jwt.sign(
            {
                username: userName,
                password: userPassword
            },
            "secret",
            {
                expiresIn: "1h"
            }
        );

        const timeStamp = new Date();
        const activity = {};
        activity.timestamp = timeStamp;
        activity.user = user._id;
        let activityData = new Activities(activity);
        let createdActivity = await activityData.save();

        res.status(SUCCESSCODE.STANDARD)
            .json({
                message: "Login successfully",
                status: true,
                token,
                user
            });

    } catch (error) {
        res.status(SERVERERROR.CODE).json({
            errors: { message: error.toString() },
            status: false,
        });
    }
}

controller.userInfo = async (req, res) => {
    try {
        const userName = req.body.username;
        const user = await Users.findOne({ username: userName });
        // if user does not exist in database
        if (!user) {
            return res.status(CLIENTSIDEERROR.NOTFOUNDCODE)
                .json({
                    message: "Wrong Username or Password",
                    status: false,
                });
        }
        console.log(user)
        const userActivities = await Activities.find({ userId: user._id }, { _id: 1, user: 1, timestamp: 1 }).populate([
            {
                path: 'user',
                select: { "_id": 1, "name": 1, "username": 1, "password": 1, "email": 1, "logo": 1 }
            },

        ]);
        console.log(userActivities)
        // if user does not exist in database
        if (!userActivities) {
            return res.status(CLIENTSIDEERROR.NOTFOUNDCODE)
                .json({
                    message: "Wrong Username",
                    status: false,

                });
        }


        res.status(SUCCESSCODE.STANDARD)
            .json({
                message: "User information fetched successfully",
                status: true,
                userActivities
            });

    } catch (error) {
        res.status(SERVERERROR.CODE).json({
            errors: { message: error.toString() },
            status: false,
        });
    }
}


module.exports = controller;