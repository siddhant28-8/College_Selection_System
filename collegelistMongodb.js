const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://127.0.0.1/collegeList')
.then(()=>console.log('mongodb connected')).catch(()=>console.log(error));

// Define the Admission Intake schema
const admissionIntakeSchema = new Schema({
    total: { type: Number, required: true },
    cap_other_than_mi: { type: Number, required: true },
    il_seats: { type: Number, required: true },
    cap_for_mi: { type: Number, required: true }
});

// Define the Course schema
const courseSchema = new Schema({
    choice_code: { type: String, required: true },
    course_name: { type: String, required: true },
    course_type: { type: String, required: true },
    accreditation_status: { type: String, required: true },
    start_year: { type: Number, required: true },
    admission_intake: { type: admissionIntakeSchema, required: true },
    court_case_remark: { type: String, default: "" },
    tfws: { type: Boolean, required: true }
});

// Define the Location schema
const locationSchema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }
});

// Define the Affiliation schema
const affiliationSchema = new Schema({
    type: { type: String, required: true },
    university: { type: String, required: true },
    status: { type: String, required: true },
    minority_status: { type: String, required: true }
});

// Define the College schema
const collegeSchema = new Schema({
    name: { type: String, required: true },
    location: { type: locationSchema, required: true },
    affiliation: { type: affiliationSchema, required: true },
    aicte_approval: { type: String, required: true },
    established_year: { type: Number, required: true },
    courses: { type: [courseSchema], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create the College model
const College = mongoose.model('College', collegeSchema);

/*
const collegeData = {
    name: "Veermata Jijabai Technological Institute (VJTI)",
    location: {
        address: "H.R. Mahajani Marg, Matunga, Mumbai",
        city: "Mumbai",
        state: "Maharashtra"
    },
    affiliation: {
        type: "Government-Aided",
        university: "Mumbai University",
        status: "Autonomous",
        minority_status: "Non-Minority"
    },
    aicte_approval: "1-5149491",
    established_year: 1949,
    courses: [
        {
            choice_code: "0301219110",
            course_name: "Civil Engineering",
            course_type: "Regular",
            accreditation_status: "Newly Accredited",
            start_year: 1949,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301224510",
            course_name: "Computer Engineering",
            course_type: "Regular",
            accreditation_status: "Renewal of Accreditation",
            start_year: 1986,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301224610",
            course_name: "Information Technology",
            course_type: "Regular",
            accreditation_status: "Eligible but Not Applied",
            start_year: 2001,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301229310",
            course_name: "Electrical Engineering",
            course_type: "Regular",
            accreditation_status: "Renewal of Accreditation",
            start_year: 1949,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301237210",
            course_name: "Electronics and Telecommunication Engg",
            course_type: "Regular",
            accreditation_status: "Eligible but Not Applied",
            start_year: 2010,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301237610",
            course_name: "Electronics Engineering",
            course_type: "Regular",
            accreditation_status: "Renewal of Accreditation",
            start_year: 1986,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301261210",
            course_name: "Mechanical Engineering",
            course_type: "Regular",
            accreditation_status: "Eligible but Not Applied",
            start_year: 1947,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301262610",
            course_name: "Production Engineering [Sandwich]",
            course_type: "Regular",
            accreditation_status: "PreQualifierUploaded",
            start_year: 2021,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        },
        {
            choice_code: "0301289610",
            course_name: "Textile Technology",
            course_type: "Regular",
            accreditation_status: "PreQualifierUploaded",
            start_year: 1946,
            admission_intake: {
                total: 60,
                cap_other_than_mi: 60,
                il_seats: 0,
                cap_for_mi: 0
            },
            court_case_remark: "",
            tfws: true
        }
    ],
    created_at: new Date(), // Automatically set the creation date
    updated_at: new Date() // Automatically set the update date
};


*/

const collegeData = [
    {
        name: "Indian Institute of Technology Bombay (IIT Bombay)",
        location: {
            address: "Powai",
            city: "Mumbai",
            state: "Maharashtra"
        },
        affiliation: {
            type: "Government",
            university: "IIT Bombay",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-102030",
        established_year: 1958,
        courses: [
            {
                choice_code: "0101010101",
                course_name: "Computer Science and Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1960,
                admission_intake: {
                    total: 90,
                    cap_other_than_mi: 90,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            },
            {
                choice_code: "0101010202",
                course_name: "Mechanical Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1958,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "College of Engineering Pune (COEP)",
        location: {
            address: "Shivajinagar",
            city: "Pune",
            state: "Maharashtra"
        },
        affiliation: {
            type: "Government",
            university: "Savitribai Phule Pune University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-9876543",
        established_year: 1854,
        courses: [
            {
                choice_code: "0301219210",
                course_name: "Civil Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1949,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            },
            {
                choice_code: "0301224510",
                course_name: "Computer Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1986,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "Symbiosis Institute of Technology",
        location: {
            address: "Lavale",
            city: "Pune",
            state: "Maharashtra"
        },
        affiliation: {
            type: "Private",
            university: "Symbiosis International University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-4567891",
        established_year: 2008,
        courses: [
            {
                choice_code: "0301290110",
                course_name: "Mechanical Engineering",
                course_type: "Regular",
                accreditation_status: "Eligible but Not Applied",
                start_year: 2008,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "Vishwakarma Institute of Technology",
        location: {
            address: "Bibwewadi",
            city: "Pune",
            state: "Maharashtra"
        },
        affiliation: {
            type: "Private",
            university: "Savitribai Phule Pune University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-2143567",
        established_year: 1983,
        courses: [
            {
                choice_code: "0301218410",
                course_name: "Electronics and Telecommunication Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1983,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "MIT World Peace University",
        location: {
            address: "Kothrud",
            city: "Pune",
            state: "Maharashtra"
        },
        affiliation: {
            type: "Private",
            university: "MIT World Peace University",
            status: "Deemed",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-5467890",
        established_year: 1983,
        courses: [
            {
                choice_code: "0301221010",
                course_name: "Civil Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1983,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "R.V. College of Engineering",
        location: {
            address: "Mysore Road",
            city: "Bangalore",
            state: "Karnataka"
        },
        affiliation: {
            type: "Private",
            university: "Visvesvaraya Technological University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-1234567",
        established_year: 1963,
        courses: [
            {
                choice_code: "0401234510",
                course_name: "Computer Science and Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1963,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            },
            {
                choice_code: "0401267810",
                course_name: "Electrical and Electronics Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1963,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "Manipal Institute of Technology",
        location: {
            address: "Manipal",
            city: "Udupi",
            state: "Karnataka"
        },
        affiliation: {
            type: "Private",
            university: "Manipal Academy of Higher Education",
            status: "Deemed",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-2233445",
        established_year: 1957,
        courses: [
            {
                choice_code: "0401245310",
                course_name: "Aeronautical Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1957,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            },
            {
                choice_code: "0401278910",
                course_name: "Biotechnology Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1998,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "B.M.S. College of Engineering",
        location: {
            address: "Basavanagudi",
            city: "Bangalore",
            state: "Karnataka"
        },
        affiliation: {
            type: "Private",
            university: "Visvesvaraya Technological University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-8765432",
        established_year: 1946,
        courses: [
            {
                choice_code: "0401210110",
                course_name: "Civil Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1946,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            },
            {
                choice_code: "0401280610",
                course_name: "Computer Science and Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1983,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "PES University",
        location: {
            address: "Banashankari",
            city: "Bangalore",
            state: "Karnataka"
        },
        affiliation: {
            type: "Private",
            university: "PES University",
            status: "Deemed",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-3344556",
        established_year: 1972,
        courses: [
            {
                choice_code: "0401269810",
                course_name: "Electronics and Communication Engineering",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 1972,
                admission_intake: {
                    total: 120,
                    cap_other_than_mi: 120,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: "MS Ramaiah Institute of Technology",
        location: {
            address: "MSR Nagar",
            city: "Bangalore",
            state: "Karnataka"
        },
        affiliation: {
            type: "Private",
            university: "Visvesvaraya Technological University",
            status: "Autonomous",
            minority_status: "Non-Minority"
        },
        aicte_approval: "1-4455667",
        established_year: 1962,
        courses: [
            {
                choice_code: "0401298710",
                course_name: "Information Technology",
                course_type: "Regular",
                accreditation_status: "Accredited",
                start_year: 2000,
                admission_intake: {
                    total: 60,
                    cap_other_than_mi: 60,
                    il_seats: 0,
                    cap_for_mi: 0
                },
                court_case_remark: "",
                tfws: true
            }
        ],
        created_at: new Date(),
        updated_at: new Date()
    }
];


/*
    College.insertMany(collegeData)
    .then(() => console.log('Colleges have been added successfully'))
    .catch(err => console.log('Error inserting colleges:', err));
*/



/*var result;
if(1){
async function demo() {
 const name='Veermata Jijabai Technological Institute (VJTI)';
 result= await  College.findOne({name});
//console.log(result.json);
}
}
console.log(result.json());
*/

module.exports=College;