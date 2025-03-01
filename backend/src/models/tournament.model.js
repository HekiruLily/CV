const db = require("../config/database");

const Tournament = {
    getAll: (callback) => {
        db.query("SELECT * FROM tournaments", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM tournaments WHERE tournament_id = ?", [id], callback);
    },

    create: (data, callback) => {
        const {
            tournament_code,
            tournament_name,
            tournament_description,
            tournament_start_date,
            tournament_end_date,
            tournament_location,
            tournament_type,
            tournament_status,
            tournament_prize_pool,
            tournament_registration_deadline,
            tournament_rules,
            tournament_link,
        } = data;

        db.query(
            `INSERT INTO tournaments 
       (tournament_code, tournament_name, tournament_description, tournament_start_date, 
        tournament_end_date, tournament_location, tournament_type, tournament_status, 
        tournament_prize_pool, tournament_registration_deadline, tournament_rules, tournament_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                tournament_code,
                tournament_name,
                tournament_description,
                tournament_start_date,
                tournament_end_date,
                tournament_location,
                JSON.stringify(tournament_type),
                tournament_status,
                tournament_prize_pool,
                tournament_registration_deadline,
                tournament_rules,
                tournament_link,
            ],
            callback
        );
    },

    update: (id, data, callback) => {
        const {
            tournament_code,
            tournament_name,
            tournament_description,
            tournament_start_date,
            tournament_end_date,
            tournament_location,
            tournament_type,
            tournament_status,
            tournament_prize_pool,
            tournament_registration_deadline,
            tournament_rules,
            tournament_link,
        } = data;

        db.query(
            `UPDATE tournaments SET 
        tournament_code = ?, tournament_name = ?, tournament_description = ?, 
        tournament_start_date = ?, tournament_end_date = ?, tournament_location = ?, 
        tournament_type = ?, tournament_status = ?, tournament_prize_pool = ?, 
        tournament_registration_deadline = ?, tournament_rules = ?, tournament_link = ? 
       WHERE tournament_id = ?`,
            [
                tournament_code,
                tournament_name,
                tournament_description,
                tournament_start_date,
                tournament_end_date,
                tournament_location,
                JSON.stringify(tournament_type),
                tournament_status,
                tournament_prize_pool,
                tournament_registration_deadline,
                tournament_rules,
                tournament_link,
                id,
            ],
            callback
        );
    },
    delete: (id, callback) => {
        db.query("DELETE FROM tournaments WHERE tournament_id = ?", [id], callback);
    }
};

module.exports = Tournament;
