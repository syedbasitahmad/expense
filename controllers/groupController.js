const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
    try {
      const { name, members } = req.body;
  
      // Find or create user records based on email addresses
      const memberIds = [];
      for (const memberEmail of members) {
        let user = await User.findOne({ email: memberEmail });
        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({ email: memberEmail });
          await user.save();
        }
        memberIds.push(user.email);
      }
  
      // Create the group
      const group = new Group({ name, members: memberIds });
      await group.save();
  
      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create group' });
    }
  };

  exports.getGroups = async (req, res) => {
    try {
      const groups = await Group.find().populate('members', 'email');
  
      // Map the member emails instead of user IDs
      const formattedGroups = groups.map((group) => ({
        _id: group._id,
        name: group.name,
        members: group.members.map((member) => member.email),
      }));
  
      res.json(formattedGroups);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch groups' });
    }
  };
  
  exports.addMemberToGroup = async (req, res) => {
    try {
      const groupId = req.params.groupId;
      const { email } = req.body;
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Find the user by email or create a new user
      let user = await User.findOne({ email });
      if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({ email });
        await user.save();
      }
  
      // Add the user to the group's members array
      group.members.push(user._id);
      await group.save();
  
      res.json(group);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Failed to add member to group' });
    }
  };
  
