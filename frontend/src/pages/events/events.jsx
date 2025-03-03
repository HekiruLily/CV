import React, { useState, useEffect } from 'react';
import './events.css';
import defaultTournamentImage from '../../assets/default-tournament-image.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TournamentService from '../../services/tournamentService';
import CreateTournament from '../CreateTournament/CreateTournament';
import { useAuth } from '../../hooks/useAuth';

const Events = () => {
  useAuth(true);

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await TournamentService.getAllTournaments();
      if (response.success) {
        setTournaments(response.data);
      } else {
        setError('Failed to fetch tournaments');
      }
    } catch (err) {
      setError('Error fetching tournaments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giải đấu này?')) {
      try {
        const response = await TournamentService.deleteTournament(id);
        if (response.success) {
          fetchTournaments();
        }
      } catch (err) {
        console.error('Error deleting tournament:', err);
      }
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'Pending': 'Sắp diễn ra',
      'Ongoing': 'Đang diễn ra',
      'Completed': 'Đã kết thúc'
    };
    return statusMap[status] || 'Sắp diễn ra';
  };

  const getCategories = (tournament) => {
    try {
      if (tournament.tournament_types) {
        const typeData = typeof tournament.tournament_types === 'string' 
          ? JSON.parse(tournament.tournament_types) 
          : tournament.tournament_types;
        return typeData.categories || [];
      }
      return [];
    } catch (err) {
      console.error('Error parsing tournament types:', err);
      return [];
    }
  };

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.tournament_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.tournament_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTournamentCard = (tournament) => (
    <div className="event-card" key={tournament.tournament_id}>
      <img 
        alt={tournament.tournament_name} 
        className="card-image" 
        height="400" 
        src={tournament.tournament_image || defaultTournamentImage} 
        width="600"
      />
      <div className="card-body">
        <div className="card-header">
          <h2 className="card-title">{tournament.tournament_name}</h2>
          <span className="status-badge">
            {getStatusText(tournament.tournament_status)}
          </span>
        </div>
        <p className="event-id">Mã: {tournament.tournament_code}</p>
        <div className="event-info">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          <span>{tournament.tournament_location}</span>
        </div>
        <div className="event-info">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          <span>
            {new Date(tournament.tournament_start_date).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <div className="tag-container">
          {getCategories(tournament).map((category, index) => (
            <span className="event-tag" key={index}>{category}</span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <button className="btn-icon">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button 
          className="btn-icon"
          onClick={() => handleDelete(tournament.tournament_id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showCreateForm) {
    return (
      <CreateTournament 
        onCancel={() => setShowCreateForm(false)}
        onSuccess={() => {
          fetchTournaments();
          setShowCreateForm(false);
        }}
      />
    );
  }

  return (
    <div className="events-container">
      <div className="header">
        <h1 className="page-title">Quản lý giải đấu</h1>
        <button 
          className="btn-primary" 
          onClick={() => setShowCreateForm(true)}
        >
          Tạo giải mới
        </button>
      </div>

      <div>
        <input 
          className="search-input" 
          placeholder="Tìm kiếm giải đấu..." 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="event-grid">
        {filteredTournaments.map(renderTournamentCard)}
      </div>
    </div>
  );
};

export default Events;
