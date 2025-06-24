export interface Card {
  suit: string;
  rank: string;
}

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
}

export class BlackjackGame {
  private deck: Card[];
  private playerHand: Card[];
  private dealerHand: Card[];

  constructor(state?: GameState) {
    if (state) {
      this.deck = state.deck.map(card => ({ ...card }));
      this.playerHand = state.playerHand.map(card => ({ ...card }));
      this.dealerHand = state.dealerHand.map(card => ({ ...card }));
    } else {
      this.deck = this.createDeck();
      this.shuffleDeck();
      this.playerHand = [];
      this.dealerHand = [];
    }
  }

  exportState(): GameState {
    return {
      deck: this.deck.map(card => ({ ...card })),
      playerHand: this.playerHand.map(card => ({ ...card })),
      dealerHand: this.dealerHand.map(card => ({ ...card }))
    };
  }

  private createDeck(): Card[] {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank });
      }
    }
    return deck;
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCard(hand: Card[]): void {
    if (this.deck.length === 0) {
      this.deck = this.createDeck();
      this.shuffleDeck();
    }
    const card = this.deck.pop()!;
    hand.push(card);
  }

  calculateHandValue(hand: Card[]): number {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
      if (['J', 'Q', 'K'].includes(card.rank)) {
        value += 10;
      } else if (card.rank === 'A') {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(card.rank);
      }
    }
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }
    return value;
  }

  // Game actions
  deal(): { status: string; gameOver: boolean; playerValue: number; dealerValue: number } {
    this.dealCard(this.playerHand);
    this.dealCard(this.playerHand);
    this.dealCard(this.dealerHand);

    const playerValue = this.calculateHandValue(this.playerHand);
    const dealerValue = this.calculateHandValue(this.dealerHand);

    let status = 'Game started';
    let gameOver = false;

    if (playerValue === 21) {
      status = 'Blackjack! Player wins!';
      gameOver = true;
    }

    return { status, gameOver, playerValue, dealerValue };
  }

  hit(): { status: string; gameOver: boolean; playerValue: number; dealerValue: number } {
    this.dealCard(this.playerHand);
    const playerValue = this.calculateHandValue(this.playerHand);

    let status = `Player hand value: ${playerValue}`;
    let gameOver = false;

    if (playerValue > 21) {
      status = 'Player busts! Dealer wins.';
      gameOver = true;
    } else if (playerValue === 21) {
      status = 'Blackjack! Player wins!';
      gameOver = true;
    }

    return { 
      status, 
      gameOver, 
      playerValue, 
      dealerValue: this.calculateHandValue(this.dealerHand) 
    };
  }

  stand(): { status: string; gameOver: boolean; playerValue: number; dealerValue: number } {
    while (this.calculateHandValue(this.dealerHand) < 17) {
      this.dealCard(this.dealerHand);
    }

    const playerValue = this.calculateHandValue(this.playerHand);
    const dealerValue = this.calculateHandValue(this.dealerHand);

    let status = `Player: ${playerValue} | Dealer: ${dealerValue}`;
    const gameOver = true;

    if (dealerValue > 21 || playerValue > dealerValue) {
      status += ' — Player wins!';
    } else if (playerValue < dealerValue) {
      status += ' — Dealer wins!';
    } else {
      status += ' — Tie!';
    }

    return { status, gameOver, playerValue, dealerValue };
  }

  // Getters
  getPlayerHand(): Card[] {
    return [...this.playerHand];
  }

  getDealerHand(): Card[] {
    return [...this.dealerHand];
  }
} 