const mongoose=require('mongoose');

const homeDataSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    buttonText:{
        type:String,
        require:true
    }
})  
const homeSocialSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    link:{
        type:String,
        require:true,
        unique:true
    }
})  
const aboutSchema=new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    buttonText:{
        type:String,
        require:true
    }
})  
const aboutInfoSchema=new mongoose.Schema({
    title1:{
        type:String,
        require:true
    },
    subtitle1:{
        type:String,
        require:true
    },
    title2:{
        type:String,
        require:true
    },
    subtitle2:{
        type:String,
        require:true
    }
})  

const footerSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    link:{
        type:String,
        require:true,
        unique:true
    }
})
const projectsProjectSchema=new mongoose.Schema({
    imgUrl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true,
        unique:true
    },
    category:{
        type:String,
        require:true
    },
    title1:{
        type:String,
        require:true
    },
    description1:{
        type:String,
        require:true
    },
    title2:{
        type:String,
        require:true
    },
    description2:{
        type:String,
        require:true
    },
    title3:{
        type:String,
        require:true
    },
    description3:{
        type:String,
        require:true
    },
    title4:{
        type:String,
        require:true
    },
    description4:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true,
    }
})

const qualificationEducationSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    subtitle:{
        type:String,
        require:true
    },
    calender:{
        type:String,
        require:true,
    }
})
const qualificationExperienceSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    subtitle:{
        type:String,
        require:true
    },
    calender:{
        type:String,
        require:true,
    }
})

const skillsSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    level:{
        type:String,
        require:true
    }
})

const themeSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    color:{
        type:String,
        require:true
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
const QualificationExperience=mongoose.model('QualificationExperience',qualificationExperienceSchema);
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
    QualificationExperience,
    Skills,
    Theme
};