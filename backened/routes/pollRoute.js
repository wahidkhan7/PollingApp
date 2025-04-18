const express =require("express")
const {createPoll,getAllPolls,getVotedPolls,getPollById,voteOnPoll,closePoll,bookmarkPoll,deletePoll,getBookmaredkPolls} = require("../controllers/pollController.js")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create",protect,createPoll)
router.get("/getAllPolls",protect,getAllPolls)
router.post("/votedPolls",protect,getVotedPolls)
router.post("/:id",protect,getPollById)
router.post("/:id/vote",protect,voteOnPoll)
router.post("/:id/close",protect,closePoll)
router.post("/:id/bookmark",protect,bookmarkPoll)
router.post("/:id/delete",protect,deletePoll)
router.post("/user/bookmark",protect,getBookmaredkPolls)


module.exports = router