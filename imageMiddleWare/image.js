// const multer = require('multer')
// const path = require('path')

// const multerStorage = multer.diskStorage({   
//     destination: 'public/assets/images',
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//    });
//    const upload = multer({
//         storage: multerStorage,
//         fileFilter:  (req,file, cb)=> {
//             const filetypes = /jpeg|jpg|png|pdf/; 
//             const mimetype = filetypes.test(file.mimetype);
//             const extname = filetypes.test(path.extname(file.originalname));        
//             if(mimetype && extname){
//                 return cb(null, true);
//             }
          
//             return cb("this file type not supported, please upload jpeg/jpg/png/pdf  only ");
//         },
//         limits: {
//                      fileSize: 5000000 * 960,
//                 },
            
//             })

// module.exports = {upload};



const multer = require('multer');

// Define the Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/images') // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Set the file name to be the current timestamp + the original file name
  }
});

// Define the Multer file filter options
const fileFilter = function (req, file, cb) {
  // Only accept image files with a certain file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

// Create the Multer middleware function
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;