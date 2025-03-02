import React, { useState, useEffect } from 'react';
import { App } from 'antd';
import runningRecordService from '../../../../services/runningRecord.service';
import TournamentService from '../../../../services/tournament.service';
import TournamentSelect from './components/TournamentSelect';
import DistanceSelect from './components/DistanceSelect';
import TimeSelect from './components/TimeSelect';
import ImageUpload from './components/ImageUpload';
import './AddAchievementModal.css';

const AddAchievementModal = ({ isOpen, onClose, onSuccess }) => {
  const { message } = App.useApp();
  const [formData, setFormData] = useState({
    race_name: '',
    race_year: '',
    distance: '',
    duration: '',
    surface_type: '',
    run_date: new Date().toISOString().split('T')[0],
    image: null
  });

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tournamentYears, setTournamentYears] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadTournaments();
    }
  }, [isOpen]);

  const loadTournaments = async () => {
    try {
      const response = await TournamentService.getAllTournaments();
      if (response.success) {
        setTournaments(response.data);
        const years = response.data.reduce((acc, tournament) => {
          const startYear = new Date(tournament.tournament_start_date).getFullYear();
          if (!acc.includes(startYear)) {
            acc.push(startYear);
          }
          return acc;
        }, []);
        setTournamentYears(years.sort((a, b) => b - a));
      }
    } catch (error) {
      message.error('Không thể tải danh sách giải đấu');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recordData = {
        race_name: formData.race_name,
        race_year: formData.race_year,
        distance: parseFloat(formData.distance),
        duration: formData.duration,
        surface_type: formData.surface_type,
        run_date: formData.run_date
      };

      const response = await runningRecordService.createRecord(recordData);
      
      if (response.success) {
        message.success('Thêm thành tích thành công');
        onSuccess && onSuccess(response.data);
        onClose();
      }
    } catch (error) {
      message.error(error.message || 'Lỗi khi thêm thành tích');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="achievement-modal-overlay">
      <div className="achievement-modal-content">
        <div className="achievement-modal-header">
          <h2>
            <i className="fas fa-trophy" style={{color: '#ff6b6b', marginRight: '10px'}}></i>
            Thêm thành tích mới
          </h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="achievement-form">
          <TournamentSelect
            tournaments={tournaments}
            tournamentYears={tournamentYears}
            selectedTournament={selectedTournament}
            formData={formData}
            setFormData={setFormData}
            setSelectedTournament={setSelectedTournament}
            setTournamentYears={setTournamentYears}
          />

          <DistanceSelect
            formData={formData}
            setFormData={setFormData}
          />

          <TimeSelect
            formData={formData}
            setFormData={setFormData}
          />

          <ImageUpload
            formData={formData}
            setFormData={setFormData}
          />

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="submit-button">
              <i className="fas fa-medal" style={{fontSize: '1.2rem'}}></i>
              Thêm thành tích
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievementModal;