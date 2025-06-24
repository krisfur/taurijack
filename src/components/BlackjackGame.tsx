'use client';

import { useEffect, useState } from 'react';
import { useBlackjack } from '@/hooks/useBlackjack';
import { Hand } from './Hand';
import { Card as CardType } from '@/lib/blackjack';

export function BlackjackGame() {
  const { gameData, deal, hit, stand, canHit, canStand } = useBlackjack();
  const [previousPlayerHand, setPreviousPlayerHand] = useState<CardType[]>([]);
  const [previousDealerHand, setPreviousDealerHand] = useState<CardType[]>([]);

  // Determine winner for crown display
  const isPlayerWinner = gameData.status.toLowerCase().includes('player wins');
  const isDealerWinner = gameData.status.toLowerCase().includes('dealer wins');

  // Update previous hands for animation
  useEffect(() => {
    setPreviousPlayerHand(gameData.playerHand);
    setPreviousDealerHand(gameData.dealerHand);
  }, [gameData.playerHand, gameData.dealerHand]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      if (key === 'd') {
        deal();
      } else if (key === 'h' && canHit) {
        hit();
      } else if (key === 's' && canStand) {
        stand();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deal, hit, stand, canHit, canStand]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-rose-200">
        Blackjack
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Dealer Hand */}
        <Hand
          cards={gameData.dealerHand}
          value={gameData.dealerValue}
          title="Dealer Hand"
          isWinner={isDealerWinner}
          previousCards={previousDealerHand}
        />

        {/* Player Hand */}
        <Hand
          cards={gameData.playerHand}
          value={gameData.playerValue}
          title="Player Hand"
          isWinner={isPlayerWinner}
          previousCards={previousPlayerHand}
        />

        {/* Game Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={deal}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <b>D</b>eal
          </button>
          <button
            onClick={hit}
            disabled={!canHit}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <b>H</b>it
          </button>
          <button
            onClick={stand}
            disabled={!canStand}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <b>S</b>tand
          </button>
        </div>

        {/* Status */}
        <div className="text-center text-lg font-semibold text-gray-300 bg-gray-700 rounded p-4">
          {gameData.status}
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Use keyboard shortcuts: <kbd className="bg-gray-600 px-2 py-1 rounded">D</kbd> for Deal, 
          <kbd className="bg-gray-600 px-2 py-1 rounded mx-1">H</kbd> for Hit, 
          <kbd className="bg-gray-600 px-2 py-1 rounded mx-1">S</kbd> for Stand
        </div>
      </div>
    </div>
  );
} 