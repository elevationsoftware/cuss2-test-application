const qs = new URLSearchParams(window.location.search);
export const environment = {
  production: true,
  cussUrl: qs.get('CUSS-WSS') || 'https://localhost:22222',
  clientId: qs.get('CLIENT-ID') || 'EL',
  clientSecret:  qs.get('CLIENT-SECRET') || '12345678'
};
