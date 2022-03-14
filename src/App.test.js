import { render, screen } from '@testing-library/react';
import App from './App';
import { getBestPos } from './data/letterpos';
import { shouldHilightCandidate } from './components/possibilities';

test('Get the most frequent position for a letter', () => {
    const pos = getBestPos('A');
    expect(pos).toBe(1);
});

test('"S" best position should be 3', () => {
    expect(getBestPos('S')).toBe(3);
});
