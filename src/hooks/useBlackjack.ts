'use client';

import { useState, useCallback } from 'react';
import { BlackjackGame, Card } from '@/lib/blackjack';

export interface GameData {
  status: string;
  playerHand: Card[];
  dealerHand: Card[];
  playerValue: number;
  dealerValue: number;
  gameOver: boolean;
}

export function useBlackjack() {
  const [game, setGame] = useState<BlackjackGame | null>(null);
  const [gameData, setGameData] = useState<GameData>({
    status: 'Press "Deal" to start!',
    playerHand: [],
    dealerHand: [],
    playerValue: 0,
    dealerValue: 0,
    gameOver: false
  });

  const deal = useCallback(() => {
    const newGame = new BlackjackGame();
    const result = newGame.deal();
    
    setGame(newGame);
    setGameData({
      status: result.status,
      playerHand: newGame.getPlayerHand(),
      dealerHand: newGame.getDealerHand(),
      playerValue: result.playerValue,
      dealerValue: result.dealerValue,
      gameOver: result.gameOver
    });
  }, []);

  const hit = useCallback(() => {
    if (!game) return;
    
    const result = game.hit();
    setGameData({
      status: result.status,
      playerHand: game.getPlayerHand(),
      dealerHand: game.getDealerHand(),
      playerValue: result.playerValue,
      dealerValue: result.dealerValue,
      gameOver: result.gameOver
    });
  }, [game]);

  const stand = useCallback(() => {
    if (!game) return;
    
    const result = game.stand();
    setGameData({
      status: result.status,
      playerHand: game.getPlayerHand(),
      dealerHand: game.getDealerHand(),
      playerValue: result.playerValue,
      dealerValue: result.dealerValue,
      gameOver: result.gameOver
    });
  }, [game]);

  return {
    gameData,
    deal,
    hit,
    stand,
    canHit: !gameData.gameOver && game !== null,
    canStand: !gameData.gameOver && game !== null
  };
} 