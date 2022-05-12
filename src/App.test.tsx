import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  test('render qq label and input', () => {
    render(<App />);
    const QQ = screen.getByText(/QQ/i);
    expect(QQ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('render 1234', async () => {
    render(<App />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '1234' }
    })
    expect(screen.getByText(/请输入合法的QQ号/)).toBeInTheDocument();
  })

  test('render abcde', async () => {
    render(<App />);
    expect(screen.queryByText(/请输入合法的QQ号/)).toBeNull();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'abcde' }
    })

    expect(screen.getByText(/请输入合法的QQ号/)).toBeInTheDocument();
  })

  test('render 592378845', async () => {

    render(<App />);

    expect(screen.queryByText(/萝卜不会烧肉/)).toBeNull();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '592378845' }
    })

    expect(await screen.findByText(/萝卜不会烧肉/)).toBeInTheDocument();

  })

  test('render 12345444444 error callback', async () => {

    render(<App />);

    expect(screen.queryByText(/服务器异常/)).toBeNull();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '12345444444' }
    })

    expect(await screen.findByText(/服务器异常/)).toBeInTheDocument();

  })
})



