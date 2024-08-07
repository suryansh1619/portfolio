const router=require('express').Router();
const {HomeData ,HomeSocial ,About ,AboutInfo ,Footer ,ProjectsProject  ,QualificationEducation ,QualificationAchievement ,Skills ,Theme}=require('../models/portfolioModel');
const {jwtauth}=require('../jwt')
router.get('/data',async(req,res)=>{
    try{
        const homeData=await HomeData.find();
        const homeSocial=await HomeSocial.find();
        const about=await About.find();
        const aboutInfo=await AboutInfo.find();
        const footer=await Footer.find();
        const projectsProject=await ProjectsProject.find();
        const qualificationEducation=await QualificationEducation.find();
        const qualificationAchievement=await QualificationAchievement.find();
        const skills=await Skills.find();
        const theme=await Theme.find();
        console.log('data fetched');
        res.status(200).json({
            homeData:homeData,
            homeSocial:homeSocial,
            about:about,
            aboutInfo:aboutInfo,
            footer:footer,
            projectsProject:projectsProject,
            qualificationEducation:qualificationEducation,
            qualificationAchievement:qualificationAchievement,
            skills:skills,
            theme:theme
        })
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/homedata',jwtauth,async(req,res)=>{
    try{
        const data=await HomeData.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('data updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/homesocial',jwtauth,async(req,res)=>{
    try{
        const data=await HomeSocial.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('data updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/about',jwtauth,async(req,res)=>{
    try{
        const data=await About.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('data updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/aboutinfo',jwtauth,async(req,res)=>{
    try{
        const data=await AboutInfo.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('data updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/skills',jwtauth,async(req,res)=>{
    try{
        const data=await Skills.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('data updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/skills/add', jwtauth,async (req, res) => {
    try {
        const { title, level } = req.body;
        const newSkill = new Skills({title,level});
        await newSkill.save();
        console.log(req.body)
        console.log('New skill added');
        res.status(201).json(newSkill);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add skill' });
    }
});

router.delete('/skills/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteSkill=await Skills.findByIdAndDelete(id);
        if (!deleteSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        console.log("Skill Deleted");
        res.status(200).json(deleteSkill);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/qualification/education',jwtauth,async(req,res)=>{
    try{
        const data=await QualificationEducation.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Qualification Education updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/qualification/education/add', jwtauth,async (req, res) => {
    try {
        const { title, subtitle,calender } = req.body;
        const newEducation = new QualificationEducation({title,subtitle,calender});
        await newEducation.save();
        console.log(req.body)
        console.log('New qualification added');
        res.status(201).json(newEducation);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add qualification' });
    }
});

router.delete('/qualification/education/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteEducation=await QualificationEducation.findByIdAndDelete(id);
        if (!deleteEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
        console.log("Education Deleted");
        res.status(200).json(deleteEducation);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/qualification/achievement',jwtauth,async(req,res)=>{
    try{
        const data=await QualificationAchievement.findByIdAndUpdate(
            { _id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Qualification Achievements updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/qualification/achievement/add', jwtauth,async (req, res) => {
    try {
        const { title, subtitle,calender } = req.body;
        const newAchievements = new QualificationAchievement({title,subtitle,calender});
        await newAchievements.save();
        console.log('New qualification added');
        res.status(201).json(newAchievements);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add qualification' });
    }
});

router.delete('/qualification/achievement/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteAchievements=await QualificationAchievement.findByIdAndDelete(id);
        if (!deleteAchievements) {
            return res.status(404).json({ message: 'Achievements not found' });
        }
        console.log("Achievements Deleted");
        res.status(200).json(deleteAchievements);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/footers',jwtauth,async(req,res)=>{
    try{
        const data=await Footer.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Footer updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/footers/add',jwtauth,async(req,res)=>{
    try{
        const newFooter=new Footer(req.body);
        await newFooter.save();
        console.log('New Footer Added');
        res.status(201).json(newFooter)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/footers/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteFooter=await Footer.findByIdAndDelete(id);
        if (!deleteFooter){
            return res.status(404).json({ message: 'Footer not found' });
        }
        console.log("Footer Deleted");
        res.status(200).json(deleteFooter);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/projects',jwtauth,async(req,res)=>{
    try{
        const data=await ProjectsProject.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Project updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/projects/add',jwtauth,async(req,res)=>{
    try{
        const newProject=new ProjectsProject(req.body);
        await newProject.save();
        console.log('New Project Added');
        res.status(201).json(newProject)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/projects/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteProject=await ProjectsProject.findByIdAndDelete(id);
        if (!deleteProject){
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log("Project Deleted");
        res.status(200).json(deleteProject);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/themes',jwtauth,async(req,res)=>{
    try{
        const data=await Theme.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Theme updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/themes/change',async(req,res)=>{
    try{
        const data=await Theme.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        )
        console.log('Theme updated');
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post('/themes/add',jwtauth,async(req,res)=>{
    try{
        const newTheme=new Theme(req.body);
        await newTheme.save();
        console.log('New Theme Added');
        res.status(201).json(newTheme)
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/themes/:id',jwtauth,async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteTheme=await Theme.findByIdAndDelete(id);
        if (!deleteTheme){
            return res.status(404).json({ message: 'Theme not found' });
        }
        console.log("Theme Deleted");
        res.status(200).json(deleteTheme);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;
