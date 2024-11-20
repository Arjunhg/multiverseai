import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock the actions module
jest.mock('../lib/actions', () => ({
  genContent: jest.fn().mockResolvedValue({
    content: '<h1>AI Generated Content</h1>'
  })
}));

describe('Home', () => {
  it('renders ai generated content', async () => {
    render(<Home />);

    // Wait for the heading to appear
    const heading = await screen.findByRole('heading', { level: 1 });
    
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('AI Generated Content');
  });

  it('shows loading state initially', () => {
    render(<Home />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    // Override mock for this test
    const mockGenContent = jest.requireMock('../lib/actions').genContent;
    mockGenContent.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<Home />);
    
    // Wait for error message to appear
    const errorMessage = await screen.findByText(/Failed to fetch/i);
    expect(errorMessage).toBeInTheDocument();
  });
});