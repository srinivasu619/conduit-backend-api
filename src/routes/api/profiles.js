const {
	Router
} = require('express');
const UserController = require('../../controllers/users');
const authorization = require('../../middlewares/extractToken');
const ProfileFactory = require('../../dto/profileDTO');


const route = Router()

route.get('/:username', authorization.optional, async (req, res) => {
	const username = req.params.username;
	const currentUser = req.user;
	try {
		const user = await UserController.findUserByUsername(username);
		if (user == null) {
			return res.status(404).json({
				message: 'User Not Found'
			});
		}
		let following = false;
		if(currentUser){
			following = await user.hasFollower(currentUser);
		}
		const response = ProfileFactory.create(user,following);
		return res.status(200).json({
			profile: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}

})

route.post('/:username/follow', authorization.required, async (req, res) => {
	const username = req.params.username;
	const currentUser = req.user;
	try {
		const user = await UserController.findUserByUsername(username);
		if (user == null) {
			return res.status(404).json({
				status: '404',
				error: "Not Found"
			});
		}
		let following = false;
		if(user.id !== currentUser.id){
			await user.addFollower(currentUser);
			following = true;
		}
		
		const response = ProfileFactory.create(user,following);
		return res.status(200).json({
			profile: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
})

route.delete('/:username/follow', authorization.required, async (req, res) => {
	const username = req.params.username;
	const currentUser = req.user;
	try {
		const user = await UserController.findUserByUsername(username);
		if (user == null) {
			return res.status(404).json({
				status: '404',
				error: "Not Found"
			});
		}
		let following = false;
		if(user.id !== currentUser.id){
			await user.removeFollower(currentUser);
			following = false;
		}
		const response = ProfileFactory.create(user,following);
		return res.status(200).json({
			profile: response
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
})

module.exports = route