import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Cheatle title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Cheatle/i);
  expect(linkElement).toBeInTheDocument();
});
