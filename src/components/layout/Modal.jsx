import React, { useState } from 'react';
import Modal from 'react-modal';

function FightScene() {
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAttack = () => {
    const damage = calculateDamage(); // replace this with your own logic
    const newEnemyHealth = enemyHealth - damage;
    setEnemyHealth(newEnemyHealth);

    if (newEnemyHealth <= 0) {
      setModalIsOpen(true);
      dispatch(setEnemyPkmId(null));
    }
  };

  const handleConfirm = () => {
    setModalIsOpen(false);
    alert('Enemy Pokemon fainted!');
  };

  return (
    <div>
      <h2>Enemy Pokemon Health: {enemyHealth}</h2>
      <button onClick={handleAttack}>Attack</button>

      <Modal isOpen={modalIsOpen}>
        <h2>Confirm</h2>
        <p>Enemy Pokemon fainted! Do you want to continue?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={() => setModalIsOpen(false)}>No</button>
      </Modal>
    </div>
  );
}

export default FightScene;
