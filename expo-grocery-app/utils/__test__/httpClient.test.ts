import { get, post, put, patch, remove } from '../httpClient';
import { ERROR_MESSAGES } from '@/constants';

global.fetch = jest.fn();

describe('httpClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should fetch data successfully', async () => {
      const mockResponse = { data: 'test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await get<typeof mockResponse>('https://example.com');
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('https://example.com');
    });

    it('should throw an error if the response is not ok', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(get('https://example.com')).rejects.toThrow(
        ERROR_MESSAGES.SERVER_ERROR,
      );
    });
  });

  describe('post', () => {
    it('should post data successfully', async () => {
      const mockRequest = { name: 'test' };
      const mockResponse = { id: 1, name: 'test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await post<typeof mockRequest, typeof mockResponse>(
        'https://example.com',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockRequest),
      });
    });

    it('should throw an error if the response is not ok', async () => {
      const mockRequest = { name: 'test' };
      const mockErrorResponse = { status: 400 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(post('https://example.com', mockRequest)).rejects.toThrow(
        'Request failed with status 400',
      );
    });
  });

  describe('put', () => {
    it('should put data successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await expect(
        put('https://example.com', { name: 'test' }),
      ).resolves.toBeUndefined();
      expect(fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'test' }),
      });
    });

    it('should throw an error if the response is not ok', async () => {
      const mockErrorResponse = { status: 400 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(
        put('https://example.com', { name: 'test' }),
      ).rejects.toThrow('Request failed with status 400');
    });
  });

  describe('patch', () => {
    it('should patch data successfully', async () => {
      const mockRequest = { name: 'test' };
      const mockResponse = { id: 1, name: 'test' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await patch<typeof mockRequest, typeof mockResponse>(
        'https://example.com',
        mockRequest,
      );
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockRequest),
      });
    });

    it('should throw an error if the response is not ok', async () => {
      const mockRequest = { name: 'test' };
      const mockErrorResponse = { status: 400 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(patch('https://example.com', mockRequest)).rejects.toThrow(
        'Request failed with status 400',
      );
    });
  });

  describe('remove', () => {
    it('should delete data successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await expect(remove('https://example.com')).resolves.toBeUndefined();
      expect(fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'DELETE',
      });
    });

    it('should throw an error if the response is not ok', async () => {
      const mockErrorResponse = { status: 400 };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      await expect(remove('https://example.com')).rejects.toThrow(
        'Request failed with status 400',
      );
    });
  });
});
