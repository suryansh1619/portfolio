const mongoose=require('mongoose');

const homeDataSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    buttonText:{
        type:String,
        required:true
    }
})  
const homeSocialSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    link:{
        type:String,
        required:true,
        unique:true
    }
})  
const aboutSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    buttonText:{
        type:String,
        required:true
    }
})  
const aboutInfoSchema=new mongoose.Schema({
    title1:{
        type:String,
        required:true
    },
    subtitle1:{
        type:String,
        required:true
    },
    title2:{
        type:String,
        required:true
    },
    subtitle2:{
        type:String,
        required:true
    }
})  

const footerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    link:{
        type:String,
        required:true,
        unique:true
    }
})
const projectsProjectSchema=new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    subtitle1:{
        type:String,
        required:true
    },
    subtitle2:{
        type:String,
        required:true
    },
    subtitle3:{
        type:String,
        required:true
    },
    subtitle4:{
        type:String,
        required:true
    },
    subtitle5:{
        type:String,
        required:true
    },
    subtitle6:{
        type:String,
        required:true
    }
})

const qualificationEducationSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    subtitle:{
        type:String,
        required:true
    },
    calender:{
        type:String,
        required:true,
    }
})
const qualificationAchievementSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    subtitle:{
        type:String,
        required:true
    },
    calender:{
        type:String,
        required:true,
    }
})

const skillsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    level:{
        type:String,
        required:true
    }
})

const themeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    color:{
        type:String,
        required:true
    },
    selected:{
        type:Boolean,
        default:false,
    }
})

const HomeData=mongoose.model('HomeData',homeDataSchema);
const HomeSocial=mongoose.model('HomeSocial',homeSocialSchema);
const About=mongoose.model('About',aboutSchema);
const AboutInfo=mongoose.model('AboutInfo',aboutInfoSchema);
const Footer=mongoose.model('Footer',footerSchema);
const ProjectsProject=mongoose.model('ProjectsProject',projectsProjectSchema);
const QualificationEducation=mongoose.model('QualificationEducation',qualificationEducationSchema);
const QualificationAchievement=mongoose.model('QualificationAchievement',qualificationAchievementSchema);
const Skills=mongoose.model('Skills',skillsSchema);
const Theme=mongoose.model('Theme',themeSchema);

module.exports = {
    HomeData,
    HomeSocial,
    About,
    AboutInfo,
    Footer,
    ProjectsProject,
    QualificationEducation,
    QualificationAchievement,
    Skills,
    Theme
};