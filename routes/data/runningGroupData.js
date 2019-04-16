const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV]);
const fs = require('fs');

async function signUp(user_id, race_id){
    console.log("Signing Up")
    exists = await isPartOf(user_id, race_id)
    console.log("Already exists", exists)
    if(!exists){
        count = await knex.schema.raw(`SELECT COUNT(*) AS COUNT FROM running_group_member`);
        console.log("Total running groups", count[0].COUNT)
        await knex.schema.raw(`INSERT INTO running_group_member VALUES (?, ?, ?);`, [parseInt(count[0].COUNT+1), parseInt(user_id), parseInt(race_id)])
    }
}

async function isPartOf(user_id, race_id){
    exists = await knex.schema.raw(`SELECT COUNT(*) AS COUNT
    FROM running_group_member
    WHERE user_id = ? AND running_group_id = ?`, [parseInt(user_id), parseInt(race_id)]);
    return exists[0].COUNT > 0;
}

module.exports = {
    SignUp: signUp,
    IsPartOf: isPartOf
}