'use client';

import { Card as CardType } from '@/lib/blackjack';
import { Card } from './Card';

interface HandProps {
  cards: CardType[];
  value: number;
  title: string;
  isWinner?: boolean;
  previousCards?: CardType[];
}

export function Hand({ cards, value, title, isWinner = false, previousCards = [] }: HandProps) {
  const crown = isWinner ? '👑 ' : '';
  
  return (
    <div className="bg-gray-700 rounded p-4 mb-4">
      <div className="text-lg font-semibold mb-2">
        {crown}{title} (Value: {value})
      </div>
      <div className="flex flex-wrap gap-2">
        {cards.map((card, index) => {
          const isNew = index >= previousCards.length;
          return <Card key={`${card.rank}-${card.suit}-${index}`} card={card} isNew={isNew} />;
        })}
      </div>
    </div>
  );
} 