const FeedbackReply = require('../database/models/feedbackReplyModel');
const User = require('../database/models/userModel')


exports.addAFeedbackReply =  async (req, res)=>{
    try{
        const newFeedbackReply = new FeedbackReply(req.body);
        const saveFeedbackReply = await newFeedbackReply.save();
        if (req.body.user) {
            const user = User.findById(req.body.user);
           
            await user.updateOne({ $push: { newFeedbackReply: saveFeedbackReply._id } });
          }


        res.status(200).send(saveFeedbackReply);
    }catch(err){
        res.status(500).json(err);
    }
};
// exports.getAllType  = async (req, res)=>{
//     try{
//         const allType = await Type.find();
//         res.status(200).json(allType);
//     }catch(err){
//         res.status(500).json(err);
//     }
// };
// exports.getAType = async (req, res) => {
//     try{
//         const type = await Type.findById(req.params.id);
//         res.status(200).json(type);
//     }catch(err){
//         res.status(500).json(err);
//     }
// };
// exports.updateType= async (req,res) => {
//     try{
//         const type = await Type.findById(req.params.id);
//         await type.updateOne({$set:req.body});
//         res.status(200).json('Type updated');
//     }catch(err){
//         res.status(500).json(err);
//     }
    
// };
// exports.deleteType= async (req, res)=>{
//     try{
//         // await Product.updateMany({category:req.params.id},{category:null});
//         await Type.findByIdAndDelete(req.params.id);
//         res.status(200).json('Type deleted');
//     }catch(err){
//         res.status(500).json(err);
//     }
// };