const Tournament = require("../models/tournament.model");

exports.getAllTournaments = (req, res) => {
    Tournament.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getTournamentById = (req, res) => {
    const { id } = req.params;
    Tournament.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Tournament not found" });
        res.json(results[0]);
    });
};

exports.createTournament = (req, res) => {
    Tournament.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Tournament created successfully", id: result.insertId });
    });
};

exports.updateTournament = (req, res) => {
    const { id } = req.params;
    Tournament.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Tournament not found" });
        res.json({ message: "Tournament updated successfully" });
    });
};

exports.deleteTournament = (req, res) => {
    const { id } = req.params;
    Tournament.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Tournament not found" });
        res.json({ message: "Tournament deleted successfully" });
    });
};
