import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBoards, deleteBoard } from '../services/api';
import Sidebar from '../components/Sidebar';
import { LoadingOverlay, ErrorMessage } from '../components/common/Spinner';

export default function HomePage({ boards, setBoards }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBoards = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchBoards();
      setBoards(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (!window.confirm('Are you sure you want to delete this board?')) return;
    try {
      await deleteBoard(boardId);
      setBoards((prev) => prev.filter((b) => b.id !== boardId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete board');
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  const handleBoardCreated = (newBoard) => {
    setBoards((prev) => [newBoard, ...prev]);
  };

  const handleSelectBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <div className="app-layout">
      <Sidebar
        boards={boards}
        onSelectBoard={handleSelectBoard}
        onBoardCreated={handleBoardCreated}
      />
      <main className="main-content">
        {loading ? (
          <LoadingOverlay message="Loading boards..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadBoards} />
        ) : (
          <div className="home-content">
            <div className="home-content__header">
              <h1>ZenFlow Boards</h1>
              <p>Select a workspace board or initialize a new project pipeline</p>
            </div>

            {boards.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">📋</div>
                <h2>No boards yet</h2>
                <p>Create your first board to get started</p>
              </div>
            ) : (
              <div className="boards-grid">
                {boards.map((board) => (
                  <div
                    key={board.id}
                    className="board-card"
                    onClick={() => handleSelectBoard(board.id)}
                  >
                    <div className="board-card__header">
                      <h3 className="board-card__title">{board.title}</h3>
                      <button
                        className="board-card__delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBoard(board.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--danger)',
                          fontSize: '14px',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title="Delete Board"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="board-card__description">
                      {board.description || 'No description'}
                    </p>
                    <div className="board-card__footer">
                      <span className="board-card__meta">
                        {board.lists?.length || 0} lists
                      </span>
                      <span className="board-card__meta">
                        {board.lists?.reduce((acc, l) => acc + (l.cards?.length || 0), 0) || 0} cards
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
