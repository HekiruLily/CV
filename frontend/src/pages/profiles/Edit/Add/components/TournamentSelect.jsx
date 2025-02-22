import React from 'react';
import { message } from 'antd';
import TournamentService from '../../../../../services/tournament.service';

const TournamentSelect = ({
  tournaments,
  tournamentYears,
  selectedTournament,
  formData,
  setFormData,
  setSelectedTournament,
  setTournamentYears
}) => {
  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    if (name === 'race_name') {
      const selected = tournaments.find(t => t.tournament_name === value);
      setSelectedTournament(selected);
      
      if (selected) {
        try {
          const response = await TournamentService.getTournamentYears(selected.tournament_id);
          if (response.success) {
            setTournamentYears(response.data);
            if (response.data.length > 0) {
              setFormData(prevState => ({
                ...prevState,
                [name]: value,
                race_year: response.data[0].toString()
              }));
            }
          }
        } catch (error) {
          message.error('Không thể lấy danh sách năm của giải đấu');
        }
      } else {
        setTournamentYears([]);
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          race_year: ''
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  return (
    <div className="form-row">
      <div className="form-group tournament-select">
        <label>Tên giải</label>
        <select 
          name="race_name" 
          value={formData.race_name}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Chọn giải chạy</option>
          {tournaments.map(tournament => (
            <option 
              key={tournament.tournament_id} 
              value={tournament.tournament_name}
            >
              {tournament.tournament_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group year-select">
        <label>Năm</label>
        <select
          name="race_year"
          value={formData.race_year}
          onChange={handleChange}
          className="form-select"
          required
          disabled={!selectedTournament}
        >
          <option value="">Chọn năm</option>
          {tournamentYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TournamentSelect; 