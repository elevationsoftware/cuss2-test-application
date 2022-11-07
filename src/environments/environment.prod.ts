const qs = new URLSearchParams(window.location.search);
export const environment = {
  production: true,
  cussUrl: qs.get('url') || 'https://localhost:22222',
  clientId: qs.get('id') || 'EL',
  clientSecret:  qs.get('secret') || '12345678'
};
