'use strict';
const express = require('express');
const router = express.Router();


router.get('/',function(req,res,next){
    get();
});
router.post('/',function(req,res,next){
    save();
});
router.put('/',function(req,res,next){
    update();
});
router.delete('/',function(req,res,next){
    destroy();
});


function get(accountId){

    return new Promise(function (resolve, reject) {

    });

}
function save(accountId){

    return new Promise(function (resolve, reject) {

    });

}
function update(accountId){

    return new Promise(function (resolve, reject) {

    });

}
function destroy(accountId){

    return new Promise(function (resolve, reject) {

    });

}

module.exports = router;
module.exports.get_buttons = get;
module.exports.save_buttons = save;
module.exports.update_buttons = update;
module.exports.destroy_buttons = destroy;