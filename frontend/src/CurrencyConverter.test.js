import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CurrencyConverter from './components/CurrencyConverter';

jest.mock('../services/api', () => ({
  convertCurrency: jest.fn(() => Promise.resolve({
    converted_amount: 655.96
  }))
}));

test('convert currency correctly', async () => {
  const { getByText, getByLabelText } = render(<CurrencyConverter />);

  fireEvent.change(getByLabelText('Montant :'), { target: { value: '1' } });
  fireEvent.click(getByText('Convertir'));

  await waitFor(() => {
    expect(getByText('1 EUR = 655.96 XOF')).toBeInTheDocument();
  });
});
