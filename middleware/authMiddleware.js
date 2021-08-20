module.exports = {
    authenticateUser:  function(req, res, next) {
      if (req.session.email !== undefined) {
          console.log("User is authenticated!");
          next();
      } else {
          res.status(403).json({status:"failed",error:"Unauthorised access!"})
      }
    },
    // isValidEndPoint: function(req, res, next){ // WE CAN ADD EXTRA LAYER TO FILTER THE UPCOMING REQUEST BASED ON API URL
    //     
    // }
};