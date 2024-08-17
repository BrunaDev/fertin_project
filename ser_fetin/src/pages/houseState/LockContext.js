import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LockContext = createContext();

// IP do NodeMCU
const path = '192.168.43.11';

export const LockProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState('');

  const fetchLockState = async () => {
    try {
      console.log('Iniciando a requisição para o NodeMCU...');
      const response = await axios.get(`http://${path}`);
      console.log('Resposta recebida do NodeMCU:', response.data);
      setIsLocked(response.data);
    } catch (error) {
      console.error('Erro ao conectar com o NodeMCU:', error);
    }
  };

  const toggleLockState = async () => {
    try {
      console.log('Enviando solicitação para alternar o estado da tranca...');
      const response = await axios.post(`http://${path}/toggle`); // Substitua pelo endpoint correto
      console.log('Resposta após alternar o estado da tranca:', response.data);
  
      const sensorPort = extractSensorPort(response.data);
      console.log('Valor da porta do sensor após alternância:', sensorPort);
  
      setIsLocked(sensorPort === '1'); // Atualiza o estado após a alternância
    } catch (error) {
      console.error('Erro ao alternar o estado da tranca:', error);
    }
  };  

  useEffect(() => {
    fetchLockState();
  }, []);

  return (
    <LockContext.Provider value={{ isLocked, toggleLockState }}>
      {children}
    </LockContext.Provider>
  );
};