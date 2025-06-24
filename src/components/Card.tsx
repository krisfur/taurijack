'use client';

import { Card as CardType } from '@/lib/blackjack';

interface CardProps {
  card: CardType;
  isNew?: boolean;
}

export function Card({ card, isNew = false }: CardProps) {
  return (
    <span 
      className={`inline-block px-2 py-1 rounded text-sm font-mono border ${
        isNew ? 'animate-pulse bg-blue-500/20' : ''
      }`}
    >
      {card.rank}{card.suit}
    </span>
  );
} 